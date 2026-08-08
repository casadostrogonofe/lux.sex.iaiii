"""Simple in-memory sliding-window rate limiter (per client IP)."""
from __future__ import annotations

import time
from collections import defaultdict, deque
from typing import Deque, Dict

from fastapi import HTTPException, Request

_buckets: Dict[str, Deque[float]] = defaultdict(deque)


def _client_ip(request: Request) -> str:
    fwd = request.headers.get("x-forwarded-for")
    if fwd:
        return fwd.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def rate_limit(name: str, max_calls: int, window_seconds: int):
    async def dependency(request: Request) -> None:
        key = f"{name}:{_client_ip(request)}"
        now = time.monotonic()
        if len(_buckets) > 10000:
            for k in [k for k, v in _buckets.items() if not v or now - v[-1] > window_seconds]:
                _buckets.pop(k, None)
        bucket = _buckets[key]
        while bucket and now - bucket[0] > window_seconds:
            bucket.popleft()
        if len(bucket) >= max_calls:
            raise HTTPException(429, "Too many requests. Try again shortly.")
        bucket.append(now)

    return dependency
