// middleware.js — Edge Middleware do Vercel
// Injeta Open Graph no HTML antes do crawler ler (resolve SPA + age-gate)
import { NextResponse } from "next/server";

const PROJECT_ID = "8um1375u"; // mesmo do frontend
const DATASET = "production";
const API_VERSION = "2024-01-01";
const SITE_URL = "https://luxsexiaiii.com"; // troque pelo seu domínio
const DEFAULT_IMAGE = `${SITE_URL}/og-default.jpg`; // crie essa imagem em frontend/public
const SITE_NAME = "Lux.Sex";

// Rotas internas que NÃO são matérias (não injetar)
const SKIP_PATHS = [
  "/static/",
  "/manifest.json",
  "/favicon",
  "/robots.txt",
  "/sitemap",
  "/logo",
  "/og-",
];

// Extrai o slug da matéria da URL
// Ajuste conforme a rota real (ex.: /artigo/:slug, /materia/:slug)
function extractSlug(pathname) {
  const parts = pathname.split("/").filter(Boolean);
  return parts.length ? parts[parts.length - 1] : null;
}

function isStaticAsset(pathname) {
  if (SKIP_PATHS.some((p) => pathname.startsWith(p))) return true;
  // arquivos com extensão = asset estático
  return /\.[a-zA-Z0-9]{2,5}$/.test(pathname);
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Só processa páginas HTML, ignora assets
  if (isStaticAsset(pathname)) return NextResponse.next();

  const slug = extractSlug(pathname);
  const url = `${SITE_URL}${pathname}`;

  // Busca a matéria no Sanity (leitura pública, sem token)
  const query = encodeURIComponent(
    `*[_type == "article" && slug.current == $slug][0]{ title, excerpt, "image": mainImage.asset->url, slug }`
  );
  const params = encodeURIComponent(JSON.stringify({ slug }));
  const apiUrl = `https://${PROJECT_ID}.apicdn.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${query}&$slug=${params}`;

  let title = SITE_NAME;
  let description = "Lux.Sex — lifestyle, turismo, bem-estar, vida noturna e gastronomia.";
  let image = DEFAULT_IMAGE;

  try {
    const res = await fetch(apiUrl, { headers: { "Content-Type": "application/json" } });
    const data = await res.json();
    const article = data?.result;
    if (article?.title) {
      title = article.title;
      description = article.excerpt || description;
      if (article.image) image = article.image;
    }
  } catch {
    // fallback para tags padrão
  }

  // Busca o HTML original (o shell do CRA)
  const htmlRes = await fetch(request.nextUrl.origin + pathname, {
    headers: request.headers,
  });
  let html = await htmlRes.text();

  // Injeta as meta tags no <head>
  const tags = `
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:url" content="${url}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${image}" />
  `;

  html = html.replace(/<head[^>]*>/, (m) => `${m}${tags}`);

  return new NextResponse(html, {
    status: htmlRes.status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Executa em todas as rotas exceto as de API
export const config = {
  matcher: ["/((?!api/).*)"],
};
