"""Real visitor counter backed by MongoDB (works on Vercel serverless)."""

from __future__ import annotations

import logging

from fastapi import APIRouter
from motor.motor_asyncio import AsyncIOMotorDatabase
from pymongo import ReturnDocument

logger = logging.getLogger("stats")

_KEY = {"key": "visits"}


def make_router(db: AsyncIOMotorDatabase) -> APIRouter:
    router = APIRouter(prefix="/api/stats", tags=["stats"])

    @router.get("/visits")
    async def get_visits() -> dict:
        try:
            doc = await db.site_stats.find_one(_KEY, {"_id": 0, "count": 1})
            return {"count": int(doc.get("count", 0)) if doc else 0}
        except Exception as exc:
            logger.warning("visits read failed: %s", exc)
            return {"count": 0}

    @router.post("/visits")
    async def add_visit() -> dict:
        try:
            doc = await db.site_stats.find_one_and_update(
                _KEY,
                {"$inc": {"count": 1}},
                upsert=True,
                return_document=ReturnDocument.AFTER,
                projection={"_id": 0, "count": 1},
            )
            return {"count": int(doc.get("count", 0)) if doc else 1}
        except Exception as exc:
            logger.warning("visit increment failed: %s", exc)
            return {"count": 0}

    return router
