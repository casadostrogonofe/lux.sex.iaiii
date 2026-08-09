"""
Article translation service — uses Emergent LLM Key + Gemini 3 Flash to translate
Sanity articles (title, excerpt, portable-text body) on demand and caches the result
in MongoDB so the same (slug, lang) pair is paid only once.

Routes:
  GET /api/i18n/article?slug=...&lang=...
"""
from __future__ import annotations

import json
import logging
import os
from typing import Any, Dict, List, Optional

import httpx
from fastapi import APIRouter, HTTPException, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase

from llm import llm_keys, send_with_fallback
from rate_limit import rate_limit

logger = logging.getLogger(__name__)

SUPPORTED_LANGS = {"en", "es", "it", "fr", "de"}
SOURCE_LANG = "pt"
LANG_NAMES = {
    "en": "English",
    "es": "Spanish (es-ES)",
    "it": "Italian",
    "fr": "French",
    "de": "German",
}


def make_router(db: AsyncIOMotorDatabase) -> APIRouter:
    router = APIRouter(prefix="/api/i18n", tags=["i18n"])

    sanity_project = os.environ.get("SANITY_PROJECT_ID")
    sanity_dataset = os.environ.get("SANITY_DATASET", "production")
    sanity_api_ver = os.environ.get("SANITY_API_VERSION", "2024-01-01")
    sanity_token = os.environ.get("SANITY_READ_TOKEN")

    if not llm_keys():
        logger.warning("No LLM keys configured — translation route disabled")

    async def fetch_article(slug: str) -> Optional[Dict[str, Any]]:
        groq = (
            '*[_type == "article" && slug.current == $slug][0]'
            '{ _id, _updatedAt, title, "slug": slug.current, excerpt, body }'
        )
        url = (
            f"https://{sanity_project}.api.sanity.io/v{sanity_api_ver}"
            f"/data/query/{sanity_dataset}"
        )
        params = {"query": groq, "$slug": json.dumps(slug)}
        headers = {}
        if sanity_token:
            headers["Authorization"] = f"Bearer {sanity_token}"
        async with httpx.AsyncClient(timeout=15) as client:
            r = await client.get(url, params=params, headers=headers)
            if r.status_code != 200:
                logger.error("sanity fetch failed with status %s", r.status_code)
                return None
            data = r.json()
            return data.get("result")

    async def translate_payload(
        payload: Dict[str, Any], target: str
    ) -> Dict[str, Any]:
        if not llm_keys():
            raise HTTPException(503, "Translation service unavailable")
        target_name = LANG_NAMES[target]
        sys_msg = (
            "You are a luxury editorial translator for an adult lifestyle magazine "
            "called Lux Society. Translate the provided JSON content from Portuguese "
            f"to {target_name}. Preserve sensual, sophisticated tone, idioms when "
            "natural, and DO NOT translate brand names or proper nouns. "
            "Return ONLY the translated JSON with the exact same structure and keys."
        )
        raw = await send_with_fallback(
            f"translate-{target}",
            sys_msg,
            "Translate this JSON. Keep keys and structure identical. "
            "Only translate string VALUES.\n\n"
            + json.dumps(payload, ensure_ascii=False),
        )
        # The model may wrap in ```json ... ```
        text = (raw or "").strip()
        if text.startswith("```"):
            text = text.strip("`")
            # Drop leading "json" tag if present
            if text.lower().startswith("json"):
                text = text[4:]
            text = text.strip()
        try:
            return json.loads(text)
        except Exception:
            logger.warning("translation parse failed, raw=%r", text[:300])
            # Fallback: at least return original so the page still renders
            return payload

    @router.get("/article", dependencies=[Depends(rate_limit("i18n-article", 30, 60))])
    async def translated_article(slug: str, lang: str) -> Dict[str, Any]:
        lang = (lang or "").lower()
        if lang == SOURCE_LANG or lang not in SUPPORTED_LANGS:
            raise HTTPException(400, "Unsupported target language")

        source = await fetch_article(slug)
        if not source:
            raise HTTPException(404, "Article not found")

        cache_key = {"slug": slug, "lang": lang}
        cached = await db.translations.find_one(cache_key)
        # invalidate cache when article was updated after translation
        if cached and cached.get("source_updated_at") == source.get("_updatedAt"):
            return {
                "slug": slug,
                "lang": lang,
                "title": cached["title"],
                "excerpt": cached.get("excerpt"),
                "body": cached.get("body"),
                "cached": True,
            }

        payload = {
            "title": source.get("title", ""),
            "excerpt": source.get("excerpt", ""),
            "body": source.get("body", []),
        }
        translated = await translate_payload(payload, lang)

        record = {
            **cache_key,
            "title": translated.get("title", payload["title"]),
            "excerpt": translated.get("excerpt", payload["excerpt"]),
            "body": translated.get("body", payload["body"]),
            "source_updated_at": source.get("_updatedAt"),
        }
        await db.translations.update_one(
            cache_key, {"$set": record}, upsert=True
        )
        return {
            "slug": slug,
            "lang": lang,
            "title": record["title"],
            "excerpt": record["excerpt"],
            "body": record["body"],
            "cached": False,
        }

    @router.get("/cards", dependencies=[Depends(rate_limit("i18n-cards", 15, 60))])
    async def translated_cards(lang: str) -> Dict[str, Any]:
        """Return a compact map of {slug: {title, excerpt}} translations for cards."""
        lang = (lang or "").lower()
        if lang == SOURCE_LANG or lang not in SUPPORTED_LANGS:
            return {"lang": lang, "items": {}}

        # Get all articles (slug + title + excerpt only) from Sanity
        groq = (
            '*[_type == "article" && defined(slug.current)]'
            '{ "slug": slug.current, _updatedAt, title, excerpt }'
        )
        url = (
            f"https://{sanity_project}.api.sanity.io/v{sanity_api_ver}"
            f"/data/query/{sanity_dataset}"
        )
        async with httpx.AsyncClient(timeout=15) as client_:
            r = await client_.get(url, params={"query": groq})
            if r.status_code != 200:
                return {"lang": lang, "items": {}}
            articles = r.json().get("result") or []

        # Look up cache for all slugs
        cached_docs = {}
        if articles:
            async for doc in db.translations.find(
                {"slug": {"$in": [a["slug"] for a in articles]}, "lang": lang}
            ):
                cached_docs[doc["slug"]] = doc

        items: Dict[str, Dict[str, str]] = {}
        for art in articles:
            slug = art["slug"]
            cached = cached_docs.get(slug)
            if cached and cached.get("source_updated_at") == art.get("_updatedAt"):
                items[slug] = {
                    "title": cached["title"],
                    "excerpt": cached.get("excerpt") or "",
                }
                continue
            # Translate this card (only title + excerpt — body stays for full page)
            try:
                tr = await translate_payload(
                    {"title": art.get("title", ""), "excerpt": art.get("excerpt", "")},
                    lang,
                )
            except Exception as exc:
                logger.warning("card translate failed for %s: %s", slug, exc)
                tr = {"title": art.get("title", ""), "excerpt": art.get("excerpt", "")}
            await db.translations.update_one(
                {"slug": slug, "lang": lang},
                {
                    "$set": {
                        "title": tr.get("title", art.get("title", "")),
                        "excerpt": tr.get("excerpt", art.get("excerpt", "")),
                        "source_updated_at": art.get("_updatedAt"),
                    }
                },
                upsert=True,
            )
            items[slug] = {
                "title": tr.get("title", art.get("title", "")),
                "excerpt": tr.get("excerpt", art.get("excerpt", "")),
            }
        return {"lang": lang, "items": items}

    return router
