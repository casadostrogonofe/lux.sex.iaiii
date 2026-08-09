"""LLM helper with key fallback: user's Gemini key first, Emergent universal key as backup."""
from __future__ import annotations

import logging
import os
from typing import AsyncGenerator, List

from emergentintegrations.llm.chat import LlmChat, UserMessage, TextDelta, StreamDone

logger = logging.getLogger(__name__)

MODEL = "gemini-3-flash-preview"


def llm_keys() -> List[str]:
    keys = [os.environ.get("GEMINI_API_KEY"), os.environ.get("EMERGENT_LLM_KEY")]
    return [k for k in keys if k]


def _chat(key: str, session_id: str, system_message: str) -> LlmChat:
    return LlmChat(
        api_key=key, session_id=session_id, system_message=system_message
    ).with_model("gemini", MODEL)


async def send_with_fallback(session_id: str, system_message: str, text: str) -> str:
    last_exc: Exception | None = None
    for key in llm_keys():
        try:
            return await _chat(key, session_id, system_message).send_message(
                UserMessage(text=text)
            )
        except Exception as exc:
            logger.warning("LLM key %s... failed, trying next: %s", key[:10], exc)
            last_exc = exc
    raise last_exc or RuntimeError("No LLM keys configured")


async def stream_with_fallback(
    session_id: str, system_message: str, text: str
) -> AsyncGenerator[str, None]:
    """Yields text deltas; switches key only if the primary fails before any output."""
    last_exc: Exception | None = None
    for key in llm_keys():
        yielded = False
        try:
            async for ev in _chat(key, session_id, system_message).stream_message(
                UserMessage(text=text)
            ):
                if isinstance(ev, TextDelta):
                    yielded = True
                    yield ev.content
                elif isinstance(ev, StreamDone):
                    return
            return
        except Exception as exc:
            logger.warning("LLM stream key %s... failed: %s", key[:10], exc)
            last_exc = exc
            if yielded:
                raise
    raise last_exc or RuntimeError("No LLM keys configured")
