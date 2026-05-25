import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Filter } from "lucide-react";
import TimelinePostCard, { TimelineAdCard } from "../components/TimelinePostCard";
import PartnersSidebar from "../components/PartnersSidebar";
import Newsletter from "../components/Newsletter";
import { menuConfig } from "../mock/mockData";
import { fetchAllArticles } from "../sanity/articles";
import { fetchAdsByPlacement } from "../sanity/ads";

// Editorial sections we want to show as latest
const EDITORIAL_SECTIONS = [
  { id: "turismo", label: "Turismo" },
  { id: "bem-estar", label: "Bem Estar" },
  { id: "vida-noturna", label: "Vida Noturna" },
  { id: "gastronomia", label: "Gastronomia" },
];

const getLatestPerSection = (posts) => {
  const latest = [];
  for (const s of EDITORIAL_SECTIONS) {
    const candidates = posts.filter(
      (p) => p.path && p.path.startsWith(s.id + "/")
    );
    if (candidates.length === 0) continue;
    const featured = candidates.find((p) => p.featured) || candidates[0];
    latest.push({ ...featured, isNew: true, sectionId: s.id });
  }
  return latest;
};

const EditorialHome = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [ads, setAds] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const list = await fetchAdsByPlacement("timeline_inline");
      setAds(list || []);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await fetchAllArticles();
      setPosts(data || []);
    })();
  }, []);

  const latestPerSection = useMemo(
    () => getLatestPerSection(posts),
    [posts]
  );

  // Build extended feed: latest per section first, then more recent posts mixed
  const feed = useMemo(() => {
    const newestIds = new Set(latestPerSection.map((p) => p.id));
    const others = posts
      .filter((p) => !newestIds.has(p.id))
      .filter(
        (p) =>
          activeFilter === "all" ||
          (p.path && p.path.startsWith(activeFilter + "/"))
      );

    const filteredLatest =
      activeFilter === "all"
        ? latestPerSection
        : latestPerSection.filter(
            (p) => p.path && p.path.startsWith(activeFilter + "/")
          );

    return [...filteredLatest, ...others.slice(0, 20)];
  }, [activeFilter, latestPerSection, posts]);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-12 border-b border-[#1a1526] overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 20% 30%, rgba(75, 22, 130, 0.35), transparent 60%), radial-gradient(ellipse 40% 30% at 80% 70%, rgba(155, 48, 255, 0.15), transparent 70%)",
          }}
        />
        <div className="relative max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="flex items-center gap-6 mb-8">
            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <span className="text-[10px] md:text-xs tracking-[0.5em] text-[#d4af37] uppercase flex items-center gap-2">
              <Sparkles className="w-3 h-3" />
              Editorial · Atualizado em tempo real
            </span>
          </div>

          <h1 className="font-serif text-[#f5f0ff] text-5xl md:text-7xl lg:text-[88px] leading-[1.02] mb-6">
            O que está acontecendo hoje{" "}
            <span className="italic bg-gradient-to-r from-[#9b30ff] via-[#b48cff] to-[#e6d5ff] bg-clip-text text-transparent">
              na Lux.
            </span>
          </h1>

          <p className="text-[#a89fc4] text-base md:text-lg leading-[1.75] font-light max-w-2xl mb-10">
            Feed editorial com a matéria mais recente de cada editoria. Atualiza sozinho a cada publicação — você sempre vê o que há de novo, primeiro.
          </p>
        </div>
      </section>

      {/* Filter chips */}
      <section className="sticky top-[72px] md:top-[80px] z-30 bg-[#050208]/95 backdrop-blur-lg border-b border-[#1a1526]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin">
            <Filter className="w-3.5 h-3.5 text-[#5a5470] flex-shrink-0" />
            <button
              onClick={() => setActiveFilter("all")}
              className={`shrink-0 text-[10px] md:text-[11px] tracking-[0.25em] uppercase px-4 py-2 rounded-full border transition-colors duration-300 whitespace-nowrap ${
                activeFilter === "all"
                  ? "border-[#9b30ff] text-[#9b30ff] bg-[#9b30ff]/10"
                  : "border-[#1a1526] text-[#7c7893] hover:border-[#9b30ff]/40 hover:text-[#f5f0ff]"
              }`}
            >
              Tudo
            </button>
            {EDITORIAL_SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveFilter(s.id)}
                className={`shrink-0 text-[10px] md:text-[11px] tracking-[0.25em] uppercase px-4 py-2 rounded-full border transition-colors duration-300 whitespace-nowrap ${
                  activeFilter === s.id
                    ? "border-[#9b30ff] text-[#9b30ff] bg-[#9b30ff]/10"
                    : "border-[#1a1526] text-[#7c7893] hover:border-[#9b30ff]/40 hover:text-[#f5f0ff]"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline feed + partners sidebar */}
      <section className="py-12">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 flex gap-10 justify-center">
          <div className="flex-1 max-w-[760px]">
            {feed.length === 0 ? (
              <p className="text-center text-[#7c7893] py-24 font-serif text-2xl">
                Nenhuma matéria nesta editoria ainda.
              </p>
            ) : (
              <div className="space-y-6">
                {feed.map((post, idx) => (
                  <React.Fragment key={post.id}>
                    <TimelinePostCard post={post} isNew={post.isNew} />
                    {(idx + 1) % 4 === 0 && ads.length > 0 && (
                      <TimelineAdCard
                        banner={ads[Math.floor(idx / 4) % ads.length]}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* Explore more */}
            <div className="mt-16 border-t border-[#1a1526] pt-10 text-center">
              <span className="text-[10px] tracking-[0.5em] text-[#9b30ff] uppercase block mb-5">
                Explore as editorias
              </span>
              <div className="flex flex-wrap justify-center gap-3">
                {menuConfig
                  .filter((m) => !m.external && m.children && m.label !== "Shop")
                  .map((m) => (
                    <Link
                      key={m.href}
                      to={m.href}
                      className="text-[11px] tracking-[0.3em] uppercase px-5 py-3 border border-[#1a1526] text-[#7c7893] hover:border-[#9b30ff] hover:text-[#9b30ff] rounded-full transition-colors duration-300 flex items-center gap-2"
                    >
                      {m.label}
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  ))}
              </div>
            </div>
          </div>

          <PartnersSidebar />
        </div>
      </section>

      <Newsletter />
    </>
  );
};

export default EditorialHome;
