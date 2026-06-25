import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Instagram,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { fetchEditorsBySection } from "../sanity/people";
import { fallbackEditors } from "../mock/mockData";

const extractReelId = (url) => {
  if (!url) return null;
  const m = url.match(/instagram\.com\/(?:reel|p|tv)\/([\w-]+)/);
  return m ? m[1] : null;
};

/**
 * Reusable banner carousel of editor banners + 4 reel cards
 * for any editorial section. Renders nothing if no editors exist.
 *
 * Props:
 *  - section: string (e.g. "bem-estar/sexualidade")
 */
const EditorialBanner = ({ section }) => {
  const { t } = useTranslation();
  const [editors, setEditors] = useState([]);
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const live = await fetchEditorsBySection(section);
      if (cancelled) return;
      setEditors(live.length > 0 ? live : fallbackEditors[section] || []);
    })();
    return () => {
      cancelled = true;
    };
  }, [section]);

  const bannerSlides = editors.filter((e) => e.banner);

  useEffect(() => {
    if (bannerSlides.length <= 1) return;
    const id = setInterval(
      () => setBannerIndex((i) => (i + 1) % bannerSlides.length),
      6000
    );
    return () => clearInterval(id);
  }, [bannerSlides.length]);

  if (editors.length === 0) return null;
  const reelEditors = editors.slice(0, 4);

  return (
    <div data-testid={`editorial-banner-${section}`}>
      {bannerSlides.length > 0 && (
        <div className="relative aspect-[21/8] md:aspect-[21/7] w-full overflow-hidden rounded-2xl border border-[#1f1a35] bg-[#0a0612] mb-10">
          {bannerSlides.map((s, i) => (
            <a
              key={s._id || s.id}
              href={s.instagram || "#"}
              target={s.instagram ? "_blank" : undefined}
              rel="noopener noreferrer"
              className={`absolute inset-0 transition-opacity duration-[1.2s] ${
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
                {s.role && (
                  <span className="text-[9px] tracking-[0.4em] text-[#d4af37] uppercase block mb-3">
                    {s.role}
                  </span>
                )}
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
      )}

      {reelEditors.length > 0 && (
        <div className="mb-12">
          <span className="text-[10px] tracking-[0.5em] text-[#9b30ff] uppercase block mb-4">
            {t("editorial.editors")}
          </span>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
            {reelEditors.map((ed) => {
              const reelId = extractReelId(ed.instagramReelUrl);
              const targetHref =
                ed.instagramReelUrl || ed.instagram || "#";
              return (
                <a
                  key={ed._id || ed.id}
                  href={targetHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block aspect-[9/16] relative overflow-hidden rounded-2xl border border-[#1f1a35] hover:border-[#9b30ff]/60 transition-colors duration-500"
                  data-testid={`editor-reel-${ed.slug || ed.id}`}
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
                      {ed.photo ? (
                        <img
                          src={ed.photo}
                          alt={ed.name}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0d2e] to-[#0a0612] flex items-center justify-center text-6xl font-serif text-[#9b30ff]/40">
                          {ed.name?.charAt(0) || "?"}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                      <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#9b30ff] flex items-center justify-center shadow-[0_0_18px_rgba(155,48,255,0.55)]">
                        <Play className="w-4 h-4 text-white fill-white" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Instagram className="w-3 h-3 text-[#ff2bd6]" />
                          <span className="text-[8px] tracking-[0.3em] uppercase text-[#ff2bd6]">
                            Reels
                          </span>
                        </div>
                        <p className="font-serif text-[#f5f0ff] text-base leading-tight">
                          {ed.name}
                        </p>
                        {ed.role && (
                          <p className="text-[10px] text-[#a89fc4] tracking-wide mt-1 truncate">
                            {ed.role}
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default EditorialBanner;
