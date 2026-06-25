import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import {
  Instagram,
  Music,
  Youtube,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { fetchArtists } from "../sanity/people";
import { menuConfig } from "../mock/mockData";
import { menuLabel } from "../i18n/menuMap";
import PartnersSidebar from "../components/PartnersSidebar";
import Newsletter from "../components/Newsletter";

// Icon-only inline SVG for Spotify (lucide doesn't ship it)
const SpotifyIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0a12 12 0 100 24 12 12 0 000-24zm5.51 17.32a.75.75 0 01-1.03.25c-2.82-1.73-6.37-2.12-10.55-1.16a.75.75 0 11-.33-1.46c4.55-1.04 8.47-.59 11.6 1.34.36.22.47.7.31 1.03zm1.47-3.27a.94.94 0 01-1.29.31c-3.23-1.99-8.16-2.57-12-1.4a.94.94 0 11-.55-1.8c4.39-1.34 9.83-.68 13.55 1.6.44.27.59.85.29 1.29zm.13-3.4c-3.88-2.3-10.27-2.51-13.97-1.39a1.13 1.13 0 11-.66-2.16c4.26-1.3 11.31-1.05 15.78 1.6a1.13 1.13 0 11-1.15 1.95z" />
  </svg>
);
const TikTokIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19.6 6.6a5.4 5.4 0 01-3-1V14a5.7 5.7 0 11-5.7-5.7c.24 0 .47.02.7.05v2.86a2.9 2.9 0 102 2.74V2h2.78a3 3 0 003.22 2.78V6.6z" />
  </svg>
);

const SOCIAL_LINKS = [
  { key: "instagram", Icon: Instagram, color: "#ff2bd6" },
  { key: "spotify", Icon: SpotifyIcon, color: "#1DB954" },
  { key: "soundcloud", Icon: Music, color: "#ff7700" },
  { key: "youtube", Icon: Youtube, color: "#ff0033" },
  { key: "tiktok", Icon: TikTokIcon, color: "#f5f0ff" },
  { key: "site", Icon: ExternalLink, color: "#d4af37" },
];

const ArtistsPage = () => {
  const { t } = useTranslation();
  const { label: labelParam } = useParams();
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    (async () => {
      const list = await fetchArtists(labelParam || null);
      setArtists(list);
    })();
  }, [labelParam]);

  const sectionLabel = menuLabel(t, "/vida-noturna", "Vida Noturna");
  const subLabel = labelParam
    ? menuLabel(
        t,
        `/vida-noturna/artistas/${labelParam}`,
        labelParam.replace("-", " ")
      )
    : menuLabel(t, "/vida-noturna/artistas", "Artistas");

  return (
    <>
      <section className="relative pt-32 pb-12 border-b border-[#1a1526]">
        <div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 70% 20%, rgba(212,175,55,0.18) 0%, transparent 55%), radial-gradient(ellipse at 30% 90%, rgba(155,48,255,0.16) 0%, transparent 60%), #050208",
          }}
        />
        <div className="relative max-w-[1340px] mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] text-[#5a5470] uppercase mb-8">
            <Link to="/vida-noturna" className="hover:text-[#9b30ff]">
              {sectionLabel}
            </Link>
            <ChevronRight className="w-3 h-3" />
            {labelParam ? (
              <>
                <Link
                  to="/vida-noturna/artistas"
                  className="hover:text-[#9b30ff]"
                >
                  {menuLabel(t, "/vida-noturna/artistas", "Artistas")}
                </Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-[#9b30ff]">{subLabel}</span>
              </>
            ) : (
              <span className="text-[#9b30ff]">{subLabel}</span>
            )}
          </div>
          <h1 className="font-serif text-[#f5f0ff] text-5xl md:text-7xl lg:text-[88px] leading-[1.02] mb-4">
            {subLabel}
          </h1>
          <p className="text-[#a89fc4] text-lg max-w-2xl leading-[1.7] font-light">
            {labelParam === "zetta-records"
              ? t("artists.subtitle_zetta")
              : t("artists.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-[1340px] mx-auto px-4 md:px-6 lg:px-10 flex flex-col lg:flex-row gap-10 lg:justify-center">
          <div className="flex-1 lg:max-w-[920px]">
            {artists.length === 0 ? (
              <p className="text-center text-[#7c7893] py-16 font-serif text-2xl">
                {t("artists.empty")}
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {artists.map((a) => (
                  <article
                    key={a.id}
                    className="group bg-[#0a0612] border border-[#1f1a35] rounded-2xl overflow-hidden hover:border-[#9b30ff]/50 transition-colors duration-500"
                    data-testid={`artist-card-${a.slug || a.id}`}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#0a0612]">
                      {a.photo ? (
                        <img
                          src={a.photo}
                          alt={a.name}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-7xl text-[#9b30ff]/30 font-serif">
                          {a.name?.charAt(0) || "?"}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        {a.label && (
                          <span className="inline-block text-[9px] tracking-[0.3em] uppercase text-[#d4af37] mb-2 bg-black/30 backdrop-blur px-2 py-0.5 rounded">
                            {a.label === "zetta-records"
                              ? "Zetta Records"
                              : a.label}
                          </span>
                        )}
                        <h3 className="font-serif text-2xl text-[#f5f0ff] leading-tight">
                          {a.name}
                        </h3>
                        {a.genre && (
                          <p className="text-[10px] tracking-[0.2em] uppercase text-[#a89fc4] mt-1">
                            {a.genre}
                          </p>
                        )}
                      </div>
                    </div>
                    {a.bio && (
                      <p className="px-5 pt-4 text-[13px] text-[#a89fc4] leading-relaxed line-clamp-4 font-light">
                        {a.bio}
                      </p>
                    )}
                    <div className="flex items-center gap-3 px-5 py-4 border-t border-[#1a1526] mt-3 flex-wrap">
                      {SOCIAL_LINKS.map(({ key, Icon, color }) => {
                        const url = a[key];
                        if (!url) return null;
                        return (
                          <a
                            key={key}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="opacity-70 hover:opacity-100 transition-opacity"
                            style={{ color }}
                            aria-label={key}
                            data-testid={`artist-social-${a.slug}-${key}`}
                          >
                            <Icon className="w-4 h-4" />
                          </a>
                        );
                      })}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
          <PartnersSidebar />
        </div>
      </section>

      <Newsletter />
    </>
  );
};

export default ArtistsPage;
