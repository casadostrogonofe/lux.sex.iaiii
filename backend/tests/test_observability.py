import logging
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from observability import PiiRedactionFilter, before_send, scrub_text  # noqa: E402


def test_scrub_text_masks_sensitive_values():
    mongo_uri = "mongodb+srv://" + "user:pass" + "@cluster/db"
    raw = f"ana@example.com Bearer top-secret {mongo_uri}"
    assert scrub_text(raw) == "[email] Bearer [redacted] [mongodb-uri]"


def test_before_send_removes_request_pii():
    event = {
        "user": {"email": "ana@example.com"},
        "request": {
            "headers": {"authorization": "Bearer secret"},
            "cookies": {"session": "secret"},
            "data": {"name": "Ana"},
            "query_string": "email=ana@example.com",
        },
        "message": "Falha para ana@example.com",
    }
    cleaned = before_send(event, None)
    assert "user" not in cleaned
    assert cleaned["request"] == {}
    assert cleaned["message"] == "Falha para [email]"


def test_log_filter_masks_message_and_args():
    record = logging.LogRecord(
        name="test",
        level=logging.ERROR,
        pathname=__file__,
        lineno=1,
        msg="token %s",
        args=("Bearer hidden",),
        exc_info=None,
    )
    assert PiiRedactionFilter().filter(record)
    assert record.args == ("Bearer [redacted]",)