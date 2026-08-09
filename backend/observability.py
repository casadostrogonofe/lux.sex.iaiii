from __future__ import annotations

import logging
import os
import re
from typing import Any, Dict, Optional

import sentry_sdk
from fastapi import FastAPI
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
from opentelemetry.instrumentation.pymongo import PymongoInstrumentor
from sentry_sdk.integrations.otlp import OTLPIntegration

_EMAIL_PATTERN = re.compile(r"[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}")
_BEARER_PATTERN = re.compile(r"Bearer\s+\S+", re.IGNORECASE)
_MONGO_PATTERN = re.compile(r"mongodb(?:\+srv)?://\S+", re.IGNORECASE)
_initialized = False


def scrub_text(value: str) -> str:
    value = _EMAIL_PATTERN.sub("[email]", value)
    value = _BEARER_PATTERN.sub("Bearer [redacted]", value)
    return _MONGO_PATTERN.sub("[mongodb-uri]", value)


def before_send(event: Dict[str, Any], _: Optional[Dict[str, Any]]) -> Dict[str, Any]:
    event.pop("user", None)
    request = event.get("request")
    if isinstance(request, dict):
        for field in ("cookies", "data", "headers", "query_string"):
            request.pop(field, None)
    if isinstance(event.get("message"), str):
        event["message"] = scrub_text(event["message"])
    exception = event.get("exception", {})
    for value in exception.get("values", []) if isinstance(exception, dict) else []:
        if isinstance(value.get("value"), str):
            value["value"] = scrub_text(value["value"])
    return event


class PiiRedactionFilter(logging.Filter):
    def filter(self, record: logging.LogRecord) -> bool:
        record.msg = scrub_text(str(record.msg))
        if record.args:
            record.args = tuple(
                scrub_text(str(arg)) if isinstance(arg, str) else arg for arg in record.args
            )
        return True


def init_observability() -> bool:
    global _initialized
    dsn = os.environ.get("SENTRY_DSN")
    if not dsn or _initialized:
        return bool(dsn)

    sentry_sdk.init(
        dsn=dsn,
        environment=os.environ.get("SENTRY_ENVIRONMENT"),
        release=os.environ.get("SENTRY_RELEASE"),
        integrations=[OTLPIntegration(setup_propagator=True)],
        send_default_pii=False,
        before_send=before_send,
    )
    PymongoInstrumentor().instrument()
    _initialized = True
    return True


def instrument_fastapi(app: FastAPI) -> None:
    if _initialized:
        FastAPIInstrumentor.instrument_app(app, excluded_urls="/api/health")


def install_log_redaction() -> None:
    redaction_filter = PiiRedactionFilter()
    for handler in logging.getLogger().handlers:
        handler.addFilter(redaction_filter)