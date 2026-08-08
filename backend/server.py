from fastapi import FastAPI, APIRouter, HTTPException, Header
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import Any, Dict, List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="LUX.SEX Lifestyle API")
api_router = APIRouter(prefix="/api")


# =============================================================
# Models
# =============================================================
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


# Banner slots:
# - lifestyle_premium  : big visual banner on lifestyle page
# - lifestyle_inline   : horizontal text banner between sections
# - lifestyle_footer   : CTA banner before newsletter
# - lifestyle_sidebar  : small banner in articles sidebar
# - shop_top           : marketplace hero banner
# - shop_grid          : banner injected inside store grid
class Banner(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    slot: str
    sponsor: str
    headline: str
    description: str
    cta: str = "Saiba mais"
    link: str = "#"
    image: Optional[str] = None
    active: bool = True
    priority: int = 0
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# Post interactions models
class Comment(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    post_id: str
    author: str
    text: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class CommentCreate(BaseModel):
    author: str = "Anônimo"
    text: str


class BannerCreate(BaseModel):
    slot: str
    sponsor: str
    headline: str
    description: str
    cta: str = "Saiba mais"
    link: str = "#"
    image: Optional[str] = None
    active: bool = True
    priority: int = 0


class BannerUpdate(BaseModel):
    slot: Optional[str] = None
    sponsor: Optional[str] = None
    headline: Optional[str] = None
    description: Optional[str] = None
    cta: Optional[str] = None
    link: Optional[str] = None
    image: Optional[str] = None
    active: Optional[bool] = None
    priority: Optional[int] = None


# =============================================================
# Helpers
# =============================================================
def _serialize_doc(doc: Dict[str, Any]) -> Dict[str, Any]:
    if doc is None:
        return doc
    doc.pop("_id", None)
    if "created_at" in doc and isinstance(doc["created_at"], datetime):
        doc["created_at"] = doc["created_at"].isoformat()
    return doc


# =============================================================
# Status routes (legacy)
# =============================================================
@api_router.get("/")
async def root() -> Dict[str, str]:
    return {"message": "LUX.SEX Lifestyle API"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(payload: StatusCheckCreate) -> StatusCheck:
    obj = StatusCheck(**payload.model_dump())
    doc: Dict[str, Any] = obj.model_dump()
    doc["timestamp"] = doc["timestamp"].isoformat()
    await db.status_checks.insert_one(doc)
    return obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks() -> List[Dict[str, Any]]:
    rows: List[Dict[str, Any]] = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for r in rows:
        if isinstance(r.get("timestamp"), str):
            r["timestamp"] = datetime.fromisoformat(r["timestamp"])
    return rows


# =============================================================
# Banner routes
# =============================================================
@api_router.get("/banners", response_model=List[Banner])
async def list_banners(
    slot: Optional[str] = None,
    active_only: bool = True,
) -> List[Dict[str, Any]]:
    query: Dict[str, Any] = {}
    if slot:
        query["slot"] = slot
    if active_only:
        query["active"] = True
    rows: List[Dict[str, Any]] = (
        await db.banners.find(query, {"_id": 0}).sort("priority", -1).to_list(500)
    )
    for r in rows:
        if isinstance(r.get("created_at"), str):
            try:
                r["created_at"] = datetime.fromisoformat(r["created_at"])
            except ValueError:
                pass
    return rows


@api_router.get("/banners/{banner_id}", response_model=Banner)
async def get_banner(banner_id: str) -> Dict[str, Any]:
    doc = await db.banners.find_one({"id": banner_id}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Banner not found")
    if isinstance(doc.get("created_at"), str):
        try:
            doc["created_at"] = datetime.fromisoformat(doc["created_at"])
        except ValueError:
            pass
    return doc


@api_router.post("/banners", response_model=Banner, status_code=201)
async def create_banner(payload: BannerCreate) -> Banner:
    obj = Banner(**payload.model_dump())
    doc: Dict[str, Any] = obj.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.banners.insert_one(doc)
    return obj


@api_router.put("/banners/{banner_id}", response_model=Banner)
async def update_banner(banner_id: str, payload: BannerUpdate) -> Dict[str, Any]:
    update_data = {k: v for k, v in payload.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
    result = await db.banners.update_one({"id": banner_id}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Banner not found")
    doc = await db.banners.find_one({"id": banner_id}, {"_id": 0})
    if isinstance(doc.get("created_at"), str):
        try:
            doc["created_at"] = datetime.fromisoformat(doc["created_at"])
        except ValueError:
            pass
    return doc


@api_router.delete("/banners/{banner_id}")
async def delete_banner(banner_id: str) -> Dict[str, str]:
    result = await db.banners.delete_one({"id": banner_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Banner not found")
    return {"status": "deleted", "id": banner_id}


# =============================================================
# Post interactions (likes + comments) — anonymous
# =============================================================
@api_router.get("/posts/{post_id}/stats")
async def get_post_stats(post_id: str) -> Dict[str, int]:
    doc = await db.post_stats.find_one({"post_id": post_id}, {"_id": 0})
    likes = int(doc.get("likes", 0)) if doc else 0
    comments = await db.comments.count_documents({"post_id": post_id})
    return {"likes": likes, "comments": comments}


@api_router.post("/posts/{post_id}/like")
async def like_post(post_id: str) -> Dict[str, int]:
    await db.post_stats.update_one(
        {"post_id": post_id},
        {"$inc": {"likes": 1}, "$setOnInsert": {"post_id": post_id}},
        upsert=True,
    )
    doc = await db.post_stats.find_one({"post_id": post_id}, {"_id": 0})
    return {"likes": int(doc.get("likes", 1))}


@api_router.post("/posts/{post_id}/unlike")
async def unlike_post(post_id: str) -> Dict[str, int]:
    doc = await db.post_stats.find_one({"post_id": post_id}, {"_id": 0})
    current = int(doc.get("likes", 0)) if doc else 0
    new_value = max(0, current - 1)
    await db.post_stats.update_one(
        {"post_id": post_id},
        {"$set": {"likes": new_value, "post_id": post_id}},
        upsert=True,
    )
    return {"likes": new_value}


@api_router.get("/posts/{post_id}/comments", response_model=List[Comment])
async def list_comments(post_id: str) -> List[Dict[str, Any]]:
    rows: List[Dict[str, Any]] = (
        await db.comments.find({"post_id": post_id}, {"_id": 0})
        .sort("created_at", -1)
        .to_list(500)
    )
    for r in rows:
        if isinstance(r.get("created_at"), str):
            try:
                r["created_at"] = datetime.fromisoformat(r["created_at"])
            except ValueError:
                pass
    return rows


@api_router.post("/posts/{post_id}/comments", response_model=Comment, status_code=201)
async def add_comment(post_id: str, payload: CommentCreate) -> Comment:
    author = (payload.author or "").strip() or "Anônimo"
    text = (payload.text or "").strip()
    if not text:
        raise HTTPException(status_code=400, detail="Comment text is required")
    if len(text) > 2000:
        raise HTTPException(status_code=400, detail="Comment too long")
    obj = Comment(post_id=post_id, author=author[:80], text=text)
    doc: Dict[str, Any] = obj.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.comments.insert_one(doc)
    return obj


# Note: Articles & ads are now managed in Sanity CMS (project 8um1375u).
# Legacy admin/article endpoints removed.


# =============================================================
# Seed banners on startup
# =============================================================
SEED_BANNERS: List[Dict[str, Any]] = [
    {
        "slot": "lifestyle_premium",
        "sponsor": "L.S Maison",
        "headline": "Fragrâncias Exclusivas para o Boudoir",
        "description": "Coleção primavera-verão MMXXVI — distribuição limitada a 200 frascos numerados.",
        "cta": "Reservar Agora",
        "link": "#l-s-maison",
        "image": "https://images.pexels.com/photos/3818315/pexels-photo-3818315.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "priority": 100,
    },
    {
        "slot": "lifestyle_inline",
        "sponsor": "Quinta do Vale Real",
        "headline": "Reserva Particular — Safra de 2018",
        "description": "Apenas 1.200 garrafas. Selo L.S Premium.",
        "cta": "Explorar a Adega",
        "link": "#vale-real",
        "priority": 80,
    },
    {
        "slot": "lifestyle_footer",
        "sponsor": "L.S Concierge",
        "headline": "Sua noite, desenhada por especialistas.",
        "description": "Concierge 24h para hóspedes verificados da plataforma.",
        "cta": "Solicitar Atendimento",
        "link": "#concierge",
        "priority": 70,
    },
    {
        "slot": "lifestyle_sidebar",
        "sponsor": "L.S Atelier",
        "headline": "L.S Atelier",
        "description": "Peças exclusivas sob encomenda. Curadoria fechada.",
        "cta": "Conhecer",
        "link": "#atelier",
        "priority": 60,
    },
    {
        "slot": "shop_top",
        "sponsor": "Velvet Noire",
        "headline": "Lingerie Couture — Coleção Maison MMXXVI",
        "description": "Peças numeradas, feitas à mão em São Paulo. Frete privado em todo o país.",
        "cta": "Visitar Boutique",
        "link": "https://example.com/velvet-noire",
        "image": "https://images.pexels.com/photos/7567725/pexels-photo-7567725.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "priority": 100,
    },
    {
        "slot": "shop_grid",
        "sponsor": "Domaine Privé",
        "headline": "Champagne & Acessórios Sensoriais",
        "description": "Kit boudoir edição limitada — entrega refrigerada e discreta.",
        "cta": "Explorar Kit",
        "link": "https://example.com/domaine-prive",
        "priority": 90,
    },
    {
        "slot": "shop_grid",
        "sponsor": "Obsidian Toys",
        "headline": "Design Erótico de Autor",
        "description": "Objetos de luxo em vidro borossilicato e obsidiana negra.",
        "cta": "Ver Coleção",
        "link": "https://example.com/obsidian",
        "priority": 85,
    },
]


@app.on_event("startup")
async def seed_banners() -> None:
    try:
        count = await db.banners.count_documents({})
        if count == 0:
            now_iso = datetime.now(timezone.utc).isoformat()
            docs: List[Dict[str, Any]] = []
            for b in SEED_BANNERS:
                obj = Banner(**b)
                d = obj.model_dump()
                d["created_at"] = now_iso
                docs.append(d)
            if docs:
                await db.banners.insert_many(docs)
                logging.info("Seeded %d banners", len(docs))
    except Exception as exc:  # pragma: no cover
        logging.warning("Banner seed failed: %s", exc)


# Include router
app.include_router(api_router)

# Translation router (Gemini-powered article translations)
from routers.translation import make_router as make_translation_router
app.include_router(make_translation_router(db))

# Horoscope router (Gemini-powered AI readings)
from routers.horoscope import make_router as make_horoscope_router
app.include_router(make_horoscope_router(db))

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client() -> None:
    client.close()
