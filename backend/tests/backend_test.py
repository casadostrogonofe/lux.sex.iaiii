"""Backend tests for horoscope endpoints (daily + personal SSE)."""
from __future__ import annotations

import json
import os
from pathlib import Path

import pytest
import requests
from dotenv import dotenv_values

frontend_env = dotenv_values("/app/frontend/.env")
BASE_URL = (
    os.environ.get("REACT_APP_BACKEND_URL")
    or frontend_env.get("REACT_APP_BACKEND_URL")
    or ""
).rstrip("/")

if not BASE_URL:
    raise RuntimeError("REACT_APP_BACKEND_URL not set")


@pytest.fixture(scope="module")
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# --- Health endpoint ---
class TestHealthEndpoint:
    def test_health_reports_ok_and_connected_database(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/health", timeout=20)
        assert r.status_code == 200, r.text[:400]
        data = r.json()
        assert data.get("status") == "ok"
        assert data.get("database") == "connected"


# --- Daily horoscope endpoint ---
class TestDailyHoroscope:
    def test_daily_valid_sign_pt(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/horoscope/daily", params={"sign": "aries", "lang": "pt"}, timeout=60)
        assert r.status_code == 200, r.text[:400]
        data = r.json()
        assert data["sign"] == "aries"
        assert data["lang"] == "pt"
        assert "reading" in data
        reading = data["reading"]
        for k in ("overview", "love", "career", "advice", "lucky_color", "lucky_number"):
            assert k in reading, f"Missing key {k} in reading: {reading}"
            assert isinstance(reading[k], str) and reading[k].strip()

    def test_daily_cache_second_call(self, api_client):
        # warm
        api_client.get(f"{BASE_URL}/api/horoscope/daily", params={"sign": "leao", "lang": "pt"}, timeout=60)
        r2 = api_client.get(f"{BASE_URL}/api/horoscope/daily", params={"sign": "leao", "lang": "pt"}, timeout=60)
        assert r2.status_code == 200
        assert r2.json().get("cached") is True

    def test_daily_invalid_sign(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/horoscope/daily", params={"sign": "bogus", "lang": "pt"}, timeout=15)
        assert r.status_code == 400


# --- Personal SSE horoscope endpoint ---
class TestPersonalHoroscope:
    def test_personal_missing_fields(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/horoscope/personal", json={"name": "", "birthdate": ""}, timeout=15)
        assert r.status_code == 400

    def test_personal_streams_sse(self, api_client):
        payload = {"name": "Tester", "birthdate": "1990-05-12", "lang": "pt"}
        with requests.post(
            f"{BASE_URL}/api/horoscope/personal",
            json=payload,
            stream=True,
            timeout=60,
        ) as r:
            assert r.status_code == 200, r.text[:400]
            assert "text/event-stream" in r.headers.get("content-type", "")
            got_text = False
            got_done = False
            collected_chars = 0
            for raw_line in r.iter_lines(decode_unicode=True):
                if not raw_line:
                    continue
                if raw_line.startswith("data: "):
                    body = raw_line[len("data: "):]
                    try:
                        obj = json.loads(body)
                    except Exception:
                        continue
                    if "t" in obj:
                        got_text = True
                        collected_chars += len(obj["t"])
                    if obj.get("done"):
                        got_done = True
                        break
                    if obj.get("error"):
                        pytest.fail(f"Stream returned error event: {obj}")
            assert got_text, "Never received any text delta chunks"
            assert got_done, "Stream did not end with done:true"
            assert collected_chars > 30, f"Only received {collected_chars} chars total"
