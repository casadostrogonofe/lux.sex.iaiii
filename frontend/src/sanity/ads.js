// Sanity-backed banners & partners with graceful fallback to FastAPI / mock data
import { sanityClient, urlFor } from "./client";
import { fetchBanners as fetchBackendBanners } from "../api/banners";
import { articleSidebarPartners as mockPartners } from "../mock/mockData";

// =============================================================
// Random placeholder image per format
// =============================================================
const PLACEHOLDER_POOL = [
  "https://images.unsplash.com/photo-1603189343302-e603f7add05a?auto=format&fit=crop&w=1200&q=70",
  "https://images.pexels.com/photos/3818315/pexels-photo-3818315.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.unsplash.com/photo-1645996830739-8fe3df27c33f?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1561501900-3701fa6a0864?auto=format&fit=crop&w=1200&q=70",
  "https://images.pexels.com/photos/7567725/pexels-photo-7567725.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.unsplash.com/photo-1778548646491-8afb9849e1df?auto=format&fit=crop&w=1200&q=70",
  "https://images.pexels.com/photos/32628115/pexels-photo-32628115.jpeg?auto=compress&cs=tinysrgb&w=1200",
];
const pickPlaceholder = (seed) => {
  const idx = Math.abs(
    String(seed || Math.random())
      .split("")
      .reduce((a, c) => a + c.charCodeAt(0), 0)
  ) % PLACEHOLDER_POOL.length;
  return PLACEHOLDER_POOL[idx];
};

// =============================================================
// Format metadata (matches Lux.Sex rate card)
// =============================================================
export const AD_FORMATS = {
  skyscraper: { w: 120, h: 600, label: "Arranha-céu" },
  "wide-skyscraper": { w: 160, h: 600, label: "Arranha-céu Largo" },
  banner: { w: 468, h: 60, label: "Banner" },
  "large-mobile-banner": { w: 320, h: 100, label: "Banner Grande Mobile" },
  "vertical-banner": { w: 120, h: 240, label: "Banner Vertical" },
  button: { w: 125, h: 125, label: "Botão" },
  leaderboard: { w: 728, h: 90, label: "Cabeçalho" },
  "large-leaderboard": { w: 970, h: 90, label: "Cabeçalho Grande" },
  "mobile-leaderboard": { w: 320, h: 50, label: "Cabeçalho Mobile" },
  "half-page": { w: 300, h: 600, label: "Meia-página" },
  "half-banner": { w: 234, h: 60, label: "Meio-banner" },
  billboard: { w: 970, h: 250, label: "Outdoor" },
  square: { w: 250, h: 250, label: "Quadrado" },
  "small-square": { w: 200, h: 200, label: "Quadrado Pequeno" },
  "small-rectangle": { w: 180, h: 150, label: "Retângulo Pequeno" },
  "medium-rectangle": { w: 300, h: 250, label: "Retângulo Médio" },
  "large-rectangle": { w: 336, h: 280, label: "Retângulo Grande" },
  portrait: { w: 300, h: 1050, label: "Retrato" },
};

const AD_QUERY = `
*[_type == "ad" && active == true
  && (!defined(startsAt) || startsAt <= now())
  && (!defined(endsAt) || endsAt >= now())
] | order(priority desc){
  _id,
  name,
  format,
  placement,
  "image": image.asset->url,
  "imageRef": image,
  sponsor,
  headline,
  description,
  cta,
  link,
  priority
}
`;

const PARTNERS_QUERY = `
*[_type == "partner" && active == true] | order(priority desc){
  _id,
  name,
  "logo": logo.asset->url,
  link,
  backgroundColor,
  priority
}
`;

const safe = async (promise, fallback) => {
  try {
    return await promise;
  } catch (err) {
    if (typeof window !== "undefined") {
      console.warn("[sanity-ads]", err?.message || err);
    }
    return fallback;
  }
};

const normalizeAd = (doc) => {
  if (!doc) return null;
  const fmt = AD_FORMATS[doc.format] || { w: 1200, h: 628, label: "Custom" };
  const image =
    doc.image ||
    (doc.imageRef ? urlFor(doc.imageRef).width(fmt.w * 2).url() : pickPlaceholder(doc._id || doc.name));
  return {
    id: doc._id,
    name: doc.name,
    format: doc.format,
    formatLabel: fmt.label,
    formatW: fmt.w,
    formatH: fmt.h,
    placement: doc.placement,
    image,
    sponsor: doc.sponsor || "Patrocinado",
    headline: doc.headline || doc.name,
    description: doc.description || "",
    cta: doc.cta || "Saiba mais",
    link: doc.link || "#",
    priority: doc.priority || 0,
  };
};

let _adsCache = null;
const getAllAds = async () => {
  if (_adsCache) return _adsCache;
  const docs = await safe(sanityClient.fetch(AD_QUERY), []);
  _adsCache = (docs || []).map(normalizeAd).filter(Boolean);
  // Auto-bust after 60s
  setTimeout(() => {
    _adsCache = null;
  }, 60_000);
  return _adsCache;
};

// =============================================================
// Public API
// =============================================================
export const fetchAdsByPlacement = async (placement) => {
  const all = await getAllAds();
  const sanityAds = all.filter((a) => a.placement === placement);
  if (sanityAds.length > 0) return sanityAds;
  // Fallback to old FastAPI slots
  const legacySlot =
    placement === "timeline_inline" ? "shop_grid"
    : placement === "section_inline" ? "lifestyle_inline"
    : placement === "section_footer" ? "lifestyle_footer"
    : placement === "lifestyle_premium" ? "lifestyle_premium"
    : placement === "shop_top" ? "shop_top"
    : placement === "shop_grid" ? "shop_grid"
    : placement;
  const legacy = await fetchBackendBanners(legacySlot);
  return (legacy || []).map((b) => ({
    id: b.id,
    name: b.sponsor,
    placement,
    image: b.image || pickPlaceholder(b.id),
    sponsor: b.sponsor,
    headline: b.headline,
    description: b.description,
    cta: b.cta,
    link: b.link,
    priority: b.priority || 0,
  }));
};

export const fetchPartners = async () => {
  const docs = await safe(sanityClient.fetch(PARTNERS_QUERY), []);
  const items = (docs || []).map((p) => ({
    id: p._id,
    name: p.name,
    logo: p.logo,
    link: p.link,
    bg: p.backgroundColor || "#ffffff",
  }));
  if (items.length > 0) return items;
  return mockPartners;
};
