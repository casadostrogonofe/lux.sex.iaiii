// middleware.js — Edge Middleware do Vercel (CRA / sem Next.js)
// Injeta Open Graph no HTML antes do crawler ler (resolve SPA + age-gate)
const PROJECT_ID = "8um1375u";
const DATASET = "production";
const API_VERSION = "2024-01-01";
const SITE_URL = "https://luxsexiaiii.com";
const DEFAULT_IMAGE = SITE_URL + "/og-default.jpg";
const SITE_NAME = "Lux.Sex";

const SKIP_PATHS = [
  "/static/",
  "/manifest.json",
  "/favicon",
  "/robots.txt",
  "/sitemap",
  "/logo",
  "/og-"
];

// Extrai path (editoria) e slug da URL
// Ex.: /turismo/hoteis/villamor-x -> path="turismo/hoteis", slug="villamor-x"
function extractPathAndSlug(pathname) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return { path: "", slug: "" };
  const slug = parts[parts.length - 1];
  const path = parts.slice(0, parts.length - 1).join("/");
  return { path: path, slug: slug };
}

function isStaticAsset(pathname) {
  for (let i = 0; i < SKIP_PATHS.length; i++) {
    if (pathname.indexOf(SKIP_PATHS[i]) === 0) return true;
  }
  return /\.([a-zA-Z0-9]{2,5})$/.test(pathname);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default async function middleware(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Só processa páginas HTML, ignora assets
  if (isStaticAsset(pathname)) return new Response(null, { status: 404 });

  const extracted = extractPathAndSlug(pathname);
  const slug = extracted.slug;
  const path = extracted.path;
  const pageUrl = SITE_URL + pathname;

  // Busca a matéria no Sanity por path + slug (leitura pública, sem token)
  const query = encodeURIComponent('*[_type == "article" && path == $path && slug.current == $slug][0]{ title, excerpt, "image": mainImage.asset->url }');
  const params = encodeURIComponent(JSON.stringify({ path: path, slug: slug }));
  const apiUrl = "https://" + PROJECT_ID + ".apicdn.sanity.io/v" + API_VERSION + "/data/query/" + DATASET + "?query=" + query + "&$path=" + params + "&$slug=" + params;

  let title = SITE_NAME;
  let description = "Lux.Sex - lifestyle, turismo, bem-estar, vida noturna e gastronomia.";
  let image = DEFAULT_IMAGE;

  try {
    const res = await fetch(apiUrl, { headers: { "Content-Type": "application/json" } });
    const data = await res.json();
    const article = data && data.result;
    if (article && article.title) {
      title = article.title;
      if (article.excerpt) description = article.excerpt;
      if (article.image) image = article.image;
    }
  } catch (e) {
    // fallback para tags padrão
  }

  // Busca o HTML original (o shell do CRA)
  const htmlRes = await fetch(url.origin + pathname, { headers: request.headers });
  let html = await htmlRes.text();

  const tags =
    "<title>" + escapeHtml(title) + "</title>" +
    '<meta name="description" content="' + escapeHtml(description) + '" />' +
    '<meta property="og:type" content="article" />' +
    '<meta property="og:site_name" content="' + SITE_NAME + '" />' +
    '<meta property="og:title" content="' + escapeHtml(title) + '" />' +
    '<meta property="og:description" content="' + escapeHtml(description) + '" />' +
    '<meta property="og:image" content="' + image + '" />' +
    '<meta property="og:url" content="' + pageUrl + '" />' +
    '<meta name="twitter:card" content="summary_large_image" />' +
    '<meta name="twitter:title" content="' + escapeHtml(title) + '" />' +
    '<meta name="twitter:description" content="' + escapeHtml(description) + '" />' +
    '<meta name="twitter:image" content="' + image + '" />';

  html = html.replace(/<head[^>]*>/, function (m) { return m + tags; });

  return new Response(html, {
    status: htmlRes.status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300"
    }
  });
}

export const config = {
  matcher: ["/((?!api/).*)"]
};
