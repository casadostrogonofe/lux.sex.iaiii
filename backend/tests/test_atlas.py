"""Atlas connectivity + Vercel entry boot test.

Does NOT modify /app/backend/.env or restart supervisor. Uses env-var injection.
"""
import os
import subprocess
import sys
import uuid
from pathlib import Path

import pytest
from dotenv import dotenv_values
from pymongo import MongoClient
import requests

ATLAS_URI = "mongodb+srv://hub3pixellab_db_user:9Ikoqj5HXaKEVWZ8@horoscopo.hmts3pj.mongodb.net/?appName=Horoscopo"
ATLAS_DB = "luxsex"


# ---------------------------------------------------------------------------
# 1. Atlas connectivity + write/read/delete round-trip
# ---------------------------------------------------------------------------
def test_atlas_server_info():
    client = MongoClient(ATLAS_URI, serverSelectionTimeoutMS=15000)
    info = client.server_info()
    assert "version" in info
    print(f"Atlas server version: {info['version']}")
    client.close()


def test_atlas_write_read_delete():
    client = MongoClient(ATLAS_URI, serverSelectionTimeoutMS=15000)
    coll = client[ATLAS_DB]["test_connectivity"]
    doc_id = f"TEST_{uuid.uuid4().hex}"
    coll.insert_one({"id": doc_id, "value": 42})

    fetched = coll.find_one({"id": doc_id}, {"_id": 0})
    assert fetched == {"id": doc_id, "value": 42}

    res = coll.delete_one({"id": doc_id})
    assert res.deleted_count == 1
    assert coll.find_one({"id": doc_id}) is None
    client.close()


# ---------------------------------------------------------------------------
# 2. Vercel entry (/app/api/index.py) imports cleanly against Atlas
# ---------------------------------------------------------------------------
def test_vercel_entry_boots_against_atlas():
    script = (
        "import os,sys; "
        "sys.path.insert(0, '/app/api'); "
        "from index import app; "
        "print('APP_OK', app.title if hasattr(app,'title') else type(app).__name__)"
    )
    env = os.environ.copy()
    env["MONGO_URL"] = ATLAS_URI
    env["DB_NAME"] = ATLAS_DB
    # Ensure we don't inherit backend/.env local values via python-dotenv side-effects
    result = subprocess.run(
        [sys.executable, "-c", script],
        env=env,
        capture_output=True,
        text=True,
        timeout=60,
    )
    print("STDOUT:", result.stdout)
    print("STDERR:", result.stderr[-2000:])
    assert result.returncode == 0, f"Import failed: {result.stderr}"
    assert "APP_OK" in result.stdout


# ---------------------------------------------------------------------------
# 3. Exercise /api/banners against Atlas via uvicorn on a spare port
# ---------------------------------------------------------------------------
@pytest.fixture(scope="module")
def atlas_uvicorn():
    import socket
    import time

    # find free port
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        port = s.getsockname()[1]

    env = os.environ.copy()
    env["MONGO_URL"] = ATLAS_URI
    env["DB_NAME"] = ATLAS_DB
    env["PYTHONPATH"] = "/app/backend"

    proc = subprocess.Popen(
        [sys.executable, "-m", "uvicorn", "server:app", "--host", "127.0.0.1", "--port", str(port)],
        env=env,
        cwd="/app/backend",
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
    )

    # wait for startup (seed runs on startup)
    base = f"http://127.0.0.1:{port}"
    for _ in range(40):
        try:
            r = requests.get(f"{base}/api/", timeout=2)
            if r.status_code == 200:
                break
        except Exception:
            pass
        time.sleep(0.5)
    else:
        proc.kill()
        out = proc.stdout.read().decode(errors="ignore") if proc.stdout else ""
        pytest.fail(f"uvicorn did not start against Atlas. Logs:\n{out[-3000:]}")

    yield base

    proc.terminate()
    try:
        proc.wait(timeout=5)
    except subprocess.TimeoutExpired:
        proc.kill()


def test_atlas_banners_endpoint(atlas_uvicorn):
    r = requests.get(f"{atlas_uvicorn}/api/banners", timeout=10)
    assert r.status_code == 200, r.text
    data = r.json()
    assert isinstance(data, list)
    print(f"Atlas /api/banners returned {len(data)} banners")
    # Seed should have populated banners
    assert len(data) > 0, "startup seed did not populate banners on Atlas"
    for b in data:
        assert "id" in b
        assert "_id" not in b  # Mongo internal id must not leak


# ---------------------------------------------------------------------------
# 4. Regression: local preview backend still healthy
# ---------------------------------------------------------------------------
def _preview_base():
    env = dotenv_values("/app/frontend/.env")
    url = os.environ.get("REACT_APP_BACKEND_URL") or env.get("REACT_APP_BACKEND_URL")
    assert url, "REACT_APP_BACKEND_URL missing"
    return url.rstrip("/")


def test_preview_root_healthy():
    r = requests.get(f"{_preview_base()}/api/", timeout=15)
    assert r.status_code == 200, r.text


def test_preview_horoscope_daily_cached():
    r = requests.get(
        f"{_preview_base()}/api/horoscope/daily",
        params={"sign": "aries", "lang": "pt"},
        timeout=30,
    )
    assert r.status_code == 200, r.text
    ctype = r.headers.get("content-type", "")
    assert "application/json" in ctype, f"unexpected content-type: {ctype}"
    body = r.json()
    assert isinstance(body, dict)
    assert body  # non-empty
