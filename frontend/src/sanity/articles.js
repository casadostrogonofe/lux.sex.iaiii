// Article service — fetches from Sanity, falls back to local mock when empty
import { sanityClient } from "./client";
import {
  ARTICLES_QUERY,
  ARTICLES_BY_PATH_QUERY,
  ARTICLES_BY_SECTION_QUERY,
  ARTICLE_BY_SLUG_QUERY,
} from "./queries";
import { blogPosts as mockPosts } from "../mock/mockData";

// Normalize a Sanity doc into our internal post shape
const normalize = (doc) => {
  if (!doc) return null;
  return {
    id: doc.slug || doc._id,
    _id: doc._id,
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    path: doc.path,
    author: doc.author,
    date: doc.date,
    readTime: doc.readTime ? `${doc.readTime} min` : "5 min",
    image: doc.image,
    body: doc.body,
    featured: Boolean(doc.featured),
    sign: doc.sign,
    adult: Boolean(doc.adult),
    editorSlug: doc.editorSlug || null,
    editorPhoto: doc.editorPhoto || null,
    editorInstagram: doc.editorInstagram || null,
    editorRole: doc.editorRole || null,
    videoUrl: doc.videoUrl || null,
    videoFile: doc.videoFile || null,
    source: "sanity",
  };
};

const safe = async (promise, fallback) => {
  try {
    const data = await promise;
    return data;
  } catch (err) {
    if (typeof window !== "undefined") {
      console.warn("[sanity]", err?.message || err);
    }
    return fallback;
  }
};

// =============================================================
// Batch translation cache for cards
// =============================================================
let _cardsTranslationCache = { lang: null, items: {} };

const fetchCardTranslations = async (lang) => {
  if (!lang || lang === "pt") return {};
  if (_cardsTranslationCache.lang === lang) return _cardsTranslationCache.items;
  try {
    const base = process.env.REACT_APP_BACKEND_URL || "";
    const res = await fetch(
      `${base}/api/i18n/cards?lang=${encodeURIComponent(lang)}`
    );
    if (!res.ok) return {};
    const data = await res.json();
    _cardsTranslationCache = { lang, items: data.items || {} };
    return _cardsTranslationCache.items;
  } catch (err) {
    console.warn("[i18n] cards translation failed", err);
    return {};
  }
};

const applyCardTranslations = (posts, items) => {
  if (!items || Object.keys(items).length === 0) return posts;
  return posts.map((p) => {
    const tr = items[p.slug];
    if (!tr) return p;
    return {
      ...p,
      title: tr.title || p.title,
      excerpt: tr.excerpt || p.excerpt,
    };
  });
};

export const fetchAllArticles = async (lang = "pt") => {
  const docs = await safe(sanityClient.fetch(ARTICLES_QUERY), []);
  const sanityPosts = (docs || []).map(normalize).filter(Boolean);
  if (sanityPosts.length > 0) {
    const items = await fetchCardTranslations(lang);
    return applyCardTranslations(sanityPosts, items);
  }
  return mockPosts;
};

export const fetchArticlesByPath = async (path, lang = "pt") => {
  const docs = await safe(
    sanityClient.fetch(ARTICLES_BY_PATH_QUERY, { path }),
    []
  );
  const sanityPosts = (docs || []).map(normalize).filter(Boolean);
  if (sanityPosts.length > 0) {
    const items = await fetchCardTranslations(lang);
    return applyCardTranslations(sanityPosts, items);
  }
  return mockPosts.filter((p) => p.path === path);
};

export const fetchArticlesBySection = async (section, lang = "pt") => {
  const docs = await safe(
    sanityClient.fetch(ARTICLES_BY_SECTION_QUERY, { section }),
    []
  );
  const sanityPosts = (docs || []).map(normalize).filter(Boolean);
  if (sanityPosts.length > 0) {
    const items = await fetchCardTranslations(lang);
    return applyCardTranslations(sanityPosts, items);
  }
  return mockPosts.filter((p) => p.path.startsWith(section + "/"));
};

export const fetchArticleBySlug = async (slug, lang = "pt") => {
  const doc = await safe(
    sanityClient.fetch(ARTICLE_BY_SLUG_QUERY, { slug }),
    null
  );
  const base = doc
    ? normalize(doc)
    : mockPosts.find((p) => p.id === slug || p.slug === slug) || null;
  if (!base) return null;

  // For Portuguese (source) or mock data → return as is
  if (!lang || lang === "pt" || base.source !== "sanity") return base;

  try {
    const apiBase = process.env.REACT_APP_BACKEND_URL || "";
    const res = await fetch(
      `${apiBase}/api/i18n/article?slug=${encodeURIComponent(
        slug
      )}&lang=${encodeURIComponent(lang)}`
    );
    if (!res.ok) return base;
    const tr = await res.json();
    return {
      ...base,
      title: tr.title || base.title,
      excerpt: tr.excerpt || base.excerpt,
      body: tr.body || base.body,
    };
  } catch (err) {
    console.warn("[i18n] translation failed", err);
    return base;
  }
};
