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
    source: "sanity",
  };
};

const safe = async (promise, fallback) => {
  try {
    const data = await promise;
    return data;
  } catch (err) {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line no-console
      console.warn("[sanity]", err?.message || err);
    }
    return fallback;
  }
};

export const fetchAllArticles = async () => {
  const docs = await safe(sanityClient.fetch(ARTICLES_QUERY), []);
  const sanityPosts = (docs || []).map(normalize).filter(Boolean);
  if (sanityPosts.length > 0) return sanityPosts;
  return mockPosts;
};

export const fetchArticlesByPath = async (path) => {
  const docs = await safe(
    sanityClient.fetch(ARTICLES_BY_PATH_QUERY, { path }),
    []
  );
  const sanityPosts = (docs || []).map(normalize).filter(Boolean);
  if (sanityPosts.length > 0) return sanityPosts;
  return mockPosts.filter((p) => p.path === path);
};

export const fetchArticlesBySection = async (section) => {
  const docs = await safe(
    sanityClient.fetch(ARTICLES_BY_SECTION_QUERY, { section }),
    []
  );
  const sanityPosts = (docs || []).map(normalize).filter(Boolean);
  if (sanityPosts.length > 0) return sanityPosts;
  return mockPosts.filter((p) => p.path.startsWith(section + "/"));
};

export const fetchArticleBySlug = async (slug) => {
  const doc = await safe(
    sanityClient.fetch(ARTICLE_BY_SLUG_QUERY, { slug }),
    null
  );
  if (doc) return normalize(doc);
  return mockPosts.find((p) => p.id === slug || p.slug === slug) || null;
};
