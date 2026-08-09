"""Deploy regression tests for Vercel serverless entry + horoscope API flows."""

from __future__ import annotations

import importlib.util
import json
import os
import subprocess
from pathlib import Path

import pytest
import requests
from dotenv import dotenv_values


# Module: external preview API base URL (same endpoint users see)
frontend_env = dotenv_values("/app/frontend/.env")
BASE_URL = (os.environ.get("REACT_APP_BACKEND_URL") or frontend_env.get("REACT_APP_BACKEND_URL") or "").rstrip("/")
if not BASE_URL:
    raise RuntimeError("REACT_APP_BACKEND_URL not set")


@pytest.fixture(scope="module")
def api_client():
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    return session


# Module: dependency resolution for serverless build (uv + Python 3.12)
def test_vercel_rewrites_and_function_bundle_config():
    config = json.loads(Path("/app/vercel.json").read_text(encoding="utf-8"))
    rewrites = config.get("rewrites", [])
    assert len(rewrites) >= 2
    assert rewrites[0].get("source") == "/api/:path*"
    assert rewrites[0].get("destination") == "/api/index"
    assert rewrites[1].get("source") == "/:path*"
    assert rewrites[1].get("destination") == "/index.html"

    fn_cfg = config.get("functions", {}).get("api/index.py", {})
    assert fn_cfg.get("includeFiles") == "backend/**"


# Module: dependency resolution for serverless build (uv + Python 3.12)
def test_requirements_resolve_with_uv_python_312():
    result = subprocess.run(
        [
            "uv",
            "pip",
            "compile",
            "/app/api/requirements.txt",
            "--python-version",
            "3.12",
        ],
        capture_output=True,
        text=True,
        timeout=180,
    )
    assert result.returncode == 0, result.stderr[-4000:]
    output = (result.stdout or "") + (result.stderr or "")
    assert "litellm" in output.lower()


# Module: Vercel serverless index import and route exposure
def test_api_index_imports_and_exposes_routes():
    index_path = Path("/app/api/index.py")
    spec = importlib.util.spec_from_file_location("vercel_index", index_path)
    assert spec and spec.loader
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)

    app = getattr(module, "app", None)
    assert app is not None

    route_paths = {getattr(r, "path", "") for r in app.routes}
    assert "/api/" in route_paths
    assert "/api/horoscope/daily" in route_paths
    assert "/api/horoscope/personal" in route_paths


# Module: GET daily horoscope response must be JSON (never HTML)
def test_daily_horoscope_is_json_not_html(api_client):
    response = api_client.get(
        f"{BASE_URL}/api/horoscope/daily",
        params={"sign": "aries", "lang": "pt"},
        timeout=60,
    )
    assert response.status_code == 200, response.text[:400]
    content_type = response.headers.get("content-type", "")
    assert "application/json" in content_type
    assert "text/html" not in content_type

    data = response.json()
    assert data.get("sign") == "aries"
    assert data.get("lang") == "pt"
    reading = data.get("reading")
    assert isinstance(reading, dict)
    for field in ("overview", "love", "career", "advice", "lucky_color", "lucky_number"):
        assert isinstance(reading.get(field), str) and reading[field].strip()


# Module: POST personal horoscope streaming via Server-Sent Events
def test_personal_horoscope_streaming_sse(api_client):
    payload = {
        "name": "Teste QA",
        "birthdate": "1990-05-12",
        "lang": "pt",
        "focus": "amor e carreira",
        "gender": "female",
    }
    with api_client.post(
        f"{BASE_URL}/api/horoscope/personal",
        json=payload,
        stream=True,
        timeout=90,
    ) as response:
        assert response.status_code == 200, response.text[:300]
        content_type = response.headers.get("content-type", "")
        assert "text/event-stream" in content_type

        got_text = False
        got_done = False
        total_chars = 0

        for raw_line in response.iter_lines(decode_unicode=True):
            if not raw_line or not raw_line.startswith("data: "):
                continue
            data_line = raw_line[6:]
            event = json.loads(data_line)

            if event.get("t"):
                got_text = True
                total_chars += len(event["t"])
            if event.get("done"):
                got_done = True
                break
            if event.get("error"):
                pytest.fail(f"SSE retornou evento de erro: {event}")

        assert got_text, "SSE não retornou chunks de texto"
        assert got_done, "SSE não finalizou com done=true"
        assert total_chars > 30
