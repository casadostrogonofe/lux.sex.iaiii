import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Instagram, Play, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchEditorsBySection } from "../sanity/people";
import { fetchArticlesByPath } from "../sanity/articles";
import { menuConfig, fallbackEditors } from "../mock/mockData";
import { menuLabel } from "../i18n/menuMap";
import TimelinePostCard from "../components/TimelinePostCard";
import PartnersSidebar from "../components/PartnersSidebar";
import Newsletter from "../components/Newsletter";

const SECTION_PATH = "bem-estar/sexualidade";

// Detect Instagram reel ID from URL
const extractReelId = (url) => {
  if (!url) return null;
  const m = url.match(/instagram\.com\/(?:reel|p|tv)\/([\w-]+)/);
  return m ? m[1] : null;
};

const SexualidadePage = () => {
  const { t, i18n } = useTranslation();
  const [editors, setEditors] = useState([]);
  const [posts, setPosts] = useState([]);
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    (async () => {
      const lang = (i18n.resolvedLanguage || "pt").split("-")[0];
      const [eds, articles] = await Promise.all([
        fetchEditorsBySection(SECTION_PATH),
        fetchArticlesByPath(SECTION_PATH, lang),
      ]);
      setEditors(eds.length > 0 ? eds : fallbackEditors[SECTION_PATH] || []);
      setPosts(articles);
    })();
  }, [i18n.resolvedLanguage]);

  // Build banners list: from editors that have a banner, fallback to ads
  const bannerSlides = editors.filter((e) => e.banner);

  // Auto-rotate banner every 6s
  useEffect(() => {
    if (bannerSlides.length <= 1) return;
    const id = setInterval(
      () => setBannerIndex((i) => (i + 1) % bannerSlides.length),
      6000
    );
    return () => clearInterval(id);
  }, [bannerSlides.length]);

  // Pick the most recent posts per editor (by author name match) for the 4 "reels"
  const reelEditors = editors.slice(0, 4);
  const reelEditorsWithLatest = reelEditors.map((ed) => {
    const latest = posts
      .filter(
        (p) =>
          (p.author || "").toLowerCase().trim() ===
          (ed.name || "").toLowerCase().trim()
      )
      .sort((a, b) => (a.date < b.date ? 1 : -1))[0];
    return { editor: ed, latest };
  });

  // Hero article = first post (sorted by date)
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  const hero = sorted[0];
  const rest = sorted.slice(1);

  const menuItem = menuConfig.find((m) => m.href === "/bem-estar");
  const sectionLabel = menuLabel(t, "/bem-estar", "Bem Estar");
  const subLabel = menuLabel(t, "/" + SECTION_PATH, "Sexualidade");

  return (
    <>
      {/* ============ BANNER CARROSSEL ============ */}
      <section
        className="relative pt-28 pb-10 border-b border-[#1a1526] bg-[#050208]"
        data-testid="sexualidade-banner"
      >
        <div className="max-w-[1340px] mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] text-[#5a5470] uppercase mb-6">
            <Link to="/bem-estar" className="hover:text-[#9b30ff]">
              {sectionLabel}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#9b30ff]">{subLabel}</span>
          </div>

          {bannerSlides.length > 0 ? (
            <div className="relative aspect-[21/8] md:aspect-[21/7] w-full overflow-hidden rounded-2xl border border-[#1f1a35] bg-[#0a0612]">
              {bannerSlides.map((s, i) => (
                <a
                  key={s.id}
                  href={s.instagram || "#"}
                  target={s.instagram ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    i === bannerIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                  data-testid={`banner-slide-${i}`}
                >
                  <img
                    src={s.banner}
                    alt={s.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#050208]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 max-w-md">
                    <span className="text-[9px] tracking-[0.4em] text-[#d4af37] uppercase block mb-3">
                      {s.role}
                    </span>
                    <h2 className="font-serif text-[#f5f0ff] text-3xl md:text-5xl leading-[1.05]">
                      {s.name}
                    </h2>
                  </div>
                </a>
              ))}

              {bannerSlides.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setBannerIndex(
                        (i) => (i - 1 + bannerSlides.length) % bannerSlides.length
                      )
                    }
                    className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/40 backdrop-blur text-white hover:bg-[#9b30ff]/80 transition-colors"
                    aria-label="Anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setBannerIndex((i) => (i + 1) % bannerSlides.length)
                    }
                    className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/40 backdrop-blur text-white hover:bg-[#9b30ff]/80 transition-colors"
                    aria-label="Próximo"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                    {bannerSlides.map((_, i) => (
                      <span
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${
                          i === bannerIndex ? "bg-[#9b30ff]" : "bg-white/30"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="aspect-[21/8] w-full flex items-center justify-center border border-[#1f1a35] rounded-2xl text-[#5a5470] text-sm">
              {t("sexuality.empty_banner")}
            </div>
          )}
        </div>
      </section>

      {/* ============ HERO ARTICLE ============ */}
      {hero && (
        <section className="py-14 border-b border-[#1a1526]">
          <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
            <Link
              to={`/${hero.path}/${hero.slug}`}
              className="grid md:grid-cols-2 gap-10 group"
              data-testid="sexualidade-hero"
            >
              {hero.image && (
                <div className="aspect-[4/5] md:aspect-[4/5] overflow-hidden rounded-2xl border border-[#1f1a35]">
                  <img
                    src={hero.image}
                    alt={hero.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
              )}
              <div className="flex flex-col justify-center">
                <span className="text-[10px] tracking-[0.5em] text-[#d4af37] uppercase mb-5">
                  {t("sexuality.cover_story")}
                </span>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#f5f0ff] leading-[1.05] mb-6 group-hover:text-[#b15aff] transition-colors">
                  {hero.title}
                </h2>
                {hero.excerpt && (
                  <p className="text-[#a89fc4] text-lg leading-[1.7] mb-8 font-light">
                    {hero.excerpt}
                  </p>
                )}
                <span className="inline-flex items-center gap-2 text-[#9b30ff] text-xs tracking-[0.3em] uppercase">
                  {t("common.read_full")} <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ============ 4 REELS DOS EDITORES ============ */}
      {reelEditorsWithLatest.length > 0 && (
        <section className="py-14 border-b border-[#1a1526]">
          <div className="max-w-[1340px] mx-auto px-6 lg:px-10">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-[10px] tracking-[0.5em] text-[#9b30ff] uppercase block mb-3">
                  {t("sexuality.editors_tagline")}
                </span>
                <h3 className="font-serif text-3xl md:text-4xl text-[#f5f0ff] leading-tight">
                  {t("sexuality.editors_title")}
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {reelEditorsWithLatest.map(({ editor: ed, latest }) => {
                const targetHref =
                  ed.instagramReelUrl ||
                  ed.instagram ||
                  (latest ? `/${latest.path}/${latest.slug}` : "#");
                const isExternal =
                  targetHref.startsWith("http") || targetHref.startsWith("//");
                const reelId = extractReelId(ed.instagramReelUrl);
                const Wrapper = isExternal ? "a" : Link;
                const wrapperProps = isExternal
                  ? {
                      href: targetHref,
                      target: "_blank",
                      rel: "noopener noreferrer",
                    }
                  : { to: targetHref };
                return (
                  <Wrapper
                    key={ed.id}
                    {...wrapperProps}
                    className="group block aspect-[9/16] relative overflow-hidden rounded-2xl border border-[#1f1a35] hover:border-[#9b30ff]/60 transition-colors duration-300"
                    data-testid={`editor-reel-${ed.slug}`}
                  >
                    {reelId ? (
                      <iframe
                        src={`https://www.instagram.com/p/${reelId}/embed`}
                        className="absolute inset-0 w-full h-full"
                        title={ed.name}
                        scrolling="no"
                        frameBorder="0"
                      />
                    ) : (
                      <>
                        {ed.photo && (
                          <img
                            src={ed.photo}
                            alt={ed.name}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-300"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                        {/* Play badge */}
                        <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#9b30ff] flex items-center justify-center shadow-[0_0_18px_rgba(155,48,255,0.55)]">
                          <Play className="w-4 h-4 text-white fill-white" />
                        </div>
                        {/* Bottom card */}
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <Instagram className="w-3 h-3 text-[#ff2bd6]" />
                            <span className="text-[8px] tracking-[0.3em] uppercase text-[#ff2bd6]">
                              Reels
                            </span>
                          </div>
                          <p className="font-serif text-[#f5f0ff] text-base md:text-lg leading-tight">
                            {ed.name}
                          </p>
                          {ed.role && (
                            <p className="text-[10px] text-[#a89fc4] tracking-wide mt-1 truncate">
                              {ed.role}
                            </p>
                          )}
                          {latest && (
                            <p className="text-[9px] text-[#d4af37] mt-2 truncate">
                              ▸ {latest.title}
                            </p>
                          )}
                        </div>
                      </>
                    )}
                  </Wrapper>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ============ FEED OF MORE ARTICLES ============ */}
      <section className="py-14">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 flex flex-col lg:flex-row gap-10 lg:justify-center">
          <div className="flex-1 lg:max-w-[760px] space-y-6">
            {rest.length === 0 ? (
              <p className="text-center text-[#7c7893] py-16 font-serif text-2xl">
                {t("home.empty")}
              </p>
            ) : (
              rest.map((post) => <TimelinePostCard key={post.id} post={post} />)
            )}
          </div>
          <PartnersSidebar />
        </div>
      </section>

      <Newsletter />
    </>
  );
};

export default SexualidadePage;
