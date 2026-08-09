import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link, useLocation } from "react-router-dom";
import { Clock, User, ChevronRight, ArrowRight } from "lucide-react";
import PostInteractions from "../components/PostInteractions";
import TimelinePostCard, { TimelineAdCard } from "../components/TimelinePostCard";
import AdBanner from "../components/AdBanner";
import EditorialBanner from "../components/EditorialBanner";
import Newsletter from "../components/Newsletter";
import PartnersSidebar from "../components/PartnersSidebar";
import { sectionMeta, menuConfig } from "../mock/mockData";
import { menuLabel } from "../i18n/menuMap";
import { fetchArticlesByPath, fetchArticlesBySection } from "../sanity/articles";
import { fetchAdsByPlacement } from "../sanity/ads";

const BlogPage = () => {
  const { t, i18n } = useTranslation();
  const { section, sub } = useParams();
  const location = useLocation();

  // Compose paths from URL
  const fullPath = sub ? `${section}/${sub}` : section || "";
  const meta = sectionMeta[fullPath] || sectionMeta[section] || {
    title: "Editorial",
    tagline: "",
    description: "",
  };

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const lang = (i18n.resolvedLanguage || "pt").split("-")[0];
      let data = [];
      if (sub) data = await fetchArticlesByPath(`${section}/${sub}`, lang);
      else if (section) data = await fetchArticlesBySection(section, lang);
      if (!cancelled) setPosts(data || []);
    })();
    return () => {
      cancelled = true;
    };
  }, [section, sub, i18n.resolvedLanguage]);

  const [banners, setBanners] = useState({ inline: null, footer: null });
  const [gridAds, setGridAds] = useState([]);
  useEffect(() => {
    (async () => {
      const [inlineList, footerList, ads] = await Promise.all([
        fetchAdsByPlacement("section_inline"),
        fetchAdsByPlacement("section_footer"),
        fetchAdsByPlacement("timeline_inline"),
      ]);
      setBanners({
        inline: (inlineList && inlineList[0]) || null,
        footer: (footerList && footerList[0]) || null,
      });
      setGridAds(ads || []);
    })();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const parentItem = menuConfig.find((m) => m.href === "/" + section);
  const subItems = parentItem?.children || [];
  const featured = posts.find((p) => p.featured) || posts[0];
  const rest = posts.filter((p) => p.id !== featured?.id);
  const isAdult = meta.adult;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-12 border-b border-[#1a1526]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] text-[#5a5470] uppercase mb-8 flex-wrap">
            {parentItem && (
              <>
                <Link to={parentItem.href} className="hover:text-[#9b30ff] transition-colors">
                  {menuLabel(t, parentItem.href, parentItem.label)}
                </Link>
                {sub && (
                  <>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-[#9b30ff]">
                      {menuLabel(t, `/${section}/${sub}`, meta.title)}
                    </span>
                  </>
                )}
              </>
            )}
          </div>

          {meta.tagline && (
            <div className="flex items-center gap-6 mb-8">
              <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-[#9b30ff]" />
              <span className="text-[10px] md:text-xs tracking-[0.5em] text-[#9b30ff] uppercase">
                {meta.tagline}
              </span>
            </div>
          )}

          <h1 className="font-serif text-[#f5f0ff] text-5xl md:text-7xl lg:text-[88px] leading-[1.05] mb-8">
            {sub
              ? menuLabel(t, `/${section}/${sub}`, meta.title)
              : menuLabel(t, `/${section}`, meta.title)}
            {isAdult && (
              <span className="ml-4 align-middle text-xs tracking-[0.4em] uppercase text-[#9b30ff] border border-[#9b30ff] px-2.5 py-1.5">
                {t("common.adult_18")}
              </span>
            )}
          </h1>

          {meta.description && (
            <p className="text-[#7c7893] max-w-2xl text-base md:text-lg leading-relaxed font-light">
              {meta.description}
            </p>
          )}

          {/* Sub-tabs */}
          {!sub && subItems.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-12">
              {subItems.map((c) => (
                <Link
                  key={c.href}
                  to={c.href}
                  className="text-[10px] tracking-[0.3em] uppercase px-4 py-2.5 border border-[#1a1526] text-[#7c7893] hover:border-[#9b30ff] hover:text-[#9b30ff] transition-colors duration-300"
                >
                  {menuLabel(t, c.href, c.label)}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Editorial banner (banner + 4 editor reels) — only shows if Sanity has editors for this section */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pt-2">
        <EditorialBanner section={sub ? `${section}/${sub}` : section} />
      </section>

      {posts.length === 0 ? (
        <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 text-center">
          <p className="font-serif text-3xl text-[#7c7893] mb-3">
            Matérias em preparação.
          </p>
          <p className="text-[#5a5470] text-sm">
            A redação Lux está trabalhando em conteúdo inédito para esta editoria.
          </p>
        </section>
      ) : (
        <>
          {/* Featured */}
          {featured && (
            <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
              <article className="group block relative overflow-hidden border border-[#1a1526] hover:border-[#9b30ff]/40 transition-colors duration-700">
                <div className="grid lg:grid-cols-2">
                  <div className="relative h-[320px] md:h-[480px] lg:h-[560px] overflow-hidden">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-2000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/60" />
                    {featured.sign && (
                      <div className="absolute top-6 right-6 font-serif text-6xl text-[#9b30ff]">
                        {featured.sign}
                      </div>
                    )}
                  </div>
                  <div className="relative bg-[#0b0812] p-8 md:p-14 lg:p-16 flex flex-col justify-center">
                    <span className="text-[10px] md:text-xs tracking-[0.4em] text-[#9b30ff] uppercase mb-6">
                      Em destaque
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#f5f0ff] leading-[1.15] mb-6">
                      {featured.title}
                    </h2>
                    <p className="text-[#7c7893] text-base md:text-lg leading-relaxed mb-8 font-light">
                      {featured.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-5 text-xs tracking-wider text-[#5a5470] uppercase mb-8">
                      <span className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5" /> {featured.author}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-[#5a5470]" />
                      <span>{featured.date}</span>
                      <span className="w-1 h-1 rounded-full bg-[#5a5470]" />
                      <span className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" /> {featured.readTime}
                      </span>
                    </div>
                    <PostInteractions postId={featured.id} postTitle={featured.title} />
                  </div>
                </div>
              </article>
            </section>
          )}

          {banners.inline && <AdBanner variant="inline" data={banners.inline} />}

          {/* Timeline feed + partners sidebar */}
          {rest.length > 0 && (
            <section className="py-12">
              <div className="max-w-[1200px] mx-auto px-4 md:px-6 flex flex-col lg:flex-row gap-10 lg:justify-center">
                <div className="flex-1 lg:max-w-[760px] space-y-6">
                  {rest.map((p, idx) => (
                    <React.Fragment key={p.id}>
                      <TimelinePostCard post={p} />
                      {(idx + 1) % 4 === 0 && gridAds.length > 0 && (
                        <TimelineAdCard
                          banner={gridAds[Math.floor(idx / 4) % gridAds.length]}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <PartnersSidebar />
              </div>
            </section>
          )}
        </>
      )}

      {/* Continue exploring */}
      {parentItem && subItems.length > 0 && (
        <section className="border-t border-[#1a1526]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
            <span className="text-[10px] tracking-[0.5em] text-[#9b30ff] uppercase block mb-6">
              Continue em {parentItem.label}
            </span>
            <div className="flex flex-wrap gap-3">
              {subItems
                .filter((c) => c.href !== location.pathname)
                .map((c) => (
                  <Link
                    key={c.href}
                    to={c.href}
                    className="text-[11px] tracking-[0.3em] uppercase px-5 py-3 border border-[#1a1526] text-[#7c7893] hover:border-[#9b30ff] hover:text-[#9b30ff] transition-colors duration-300"
                  >
                    {c.label}
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}

      {banners.footer && <AdBanner variant="footer" data={banners.footer} />}
      <Newsletter />
    </>
  );
};

export default BlogPage;
