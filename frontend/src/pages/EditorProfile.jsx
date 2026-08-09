import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import {
  Instagram,
  Youtube,
  ExternalLink,
  ChevronRight,
  ArrowLeft,
  Twitter,
} from "lucide-react";
import { sanityClient } from "../sanity/client";
import TimelinePostCard from "../components/TimelinePostCard";
import PartnersSidebar from "../components/PartnersSidebar";
import Newsletter from "../components/Newsletter";

const TikTokIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19.6 6.6a5.4 5.4 0 01-3-1V14a5.7 5.7 0 11-5.7-5.7c.24 0 .47.02.7.05v2.86a2.9 2.9 0 102 2.74V2h2.78a3 3 0 003.22 2.78V6.6z" />
  </svg>
);

const SOCIALS = [
  { key: "instagram", Icon: Instagram, color: "#ff2bd6", label: "Instagram" },
  { key: "twitter", Icon: Twitter, color: "#1da1f2", label: "Twitter / X" },
  { key: "tiktok", Icon: TikTokIcon, color: "#f5f0ff", label: "TikTok" },
  { key: "youtube", Icon: Youtube, color: "#ff0033", label: "YouTube" },
  { key: "site", Icon: ExternalLink, color: "#d4af37", label: "Site" },
];

const EDITOR_QUERY = `
*[_type == "editor" && slug.current == $slug][0]{
  _id,
  name,
  "slug": slug.current,
  role,
  bio,
  "photo": photo.asset->url,
  "banner": banner.asset->url,
  instagram, twitter, tiktok, youtube, site,
  sections,
  "articles": *[_type == "article" && references(^._id)] | order(publishedAt desc){
    _id, title,
    "slug": slug.current,
    excerpt,
    "path": path,
    "author": coalesce(editor->name, authorName, "Lux Society"),
    "date": publishedAt,
    "readTime": readTime,
    "image": mainImage.asset->url,
    featured,
    sign,
    adult
  }
}`;

const EditorProfile = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const [editor, setEditor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const data = await sanityClient.fetch(EDITOR_QUERY, { slug });
        if (!cancelled) setEditor(data);
      } catch (err) {
        if (!cancelled) setEditor(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <section className="pt-32 pb-24 max-w-[1340px] mx-auto px-6">
        <p className="text-[#a89fc4] text-sm">{t("common.loading")}</p>
      </section>
    );
  }

  if (!editor) {
    return (
      <section className="pt-32 pb-24 max-w-[1340px] mx-auto px-6 text-center">
        <h1 className="font-serif text-3xl text-[#f5f0ff] mb-3">
          {t("editor.not_found_title")}
        </h1>
        <p className="text-[#a89fc4] text-sm mb-8">
          {t("editor.not_found_text")}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#9b30ff] text-xs tracking-[0.3em] uppercase hover:text-[#b15aff]"
        >
          <ArrowLeft className="w-3 h-3" /> {t("common.back_to")} Lux
        </Link>
      </section>
    );
  }

  const articles = editor.articles || [];

  return (
    <>
      {/* HERO */}
      <section className="relative pt-28 pb-12 border-b border-[#1a1526] overflow-hidden">
        {editor.banner && (
          <>
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${editor.banner})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(16px) brightness(0.4)",
                transform: "scale(1.05)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(5,2,8,0.7) 0%, rgba(5,2,8,0.95) 100%)",
              }}
            />
          </>
        )}
        <div className="relative max-w-[1340px] mx-auto px-6 lg:px-10">
          <nav className="flex items-center gap-2 text-[10px] tracking-[0.3em] text-[#5a5470] uppercase mb-8">
            <Link to="/" className="hover:text-[#9b30ff]">
              {t("menu.home")}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#9b30ff]">{t("editor.profile")}</span>
          </nav>

          <div className="grid md:grid-cols-[220px_1fr] gap-8 md:gap-12 items-center">
            <div className="relative w-44 h-44 md:w-52 md:h-52 mx-auto md:mx-0 rounded-full overflow-hidden border-2 border-[#9b30ff]/40 shadow-[0_0_40px_rgba(155,48,255,0.35)]">
              {editor.photo ? (
                <img
                  src={editor.photo}
                  alt={editor.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-[#0a0612] text-6xl font-serif text-[#9b30ff]/40">
                  {editor.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              {editor.role && (
                <span className="text-[10px] tracking-[0.5em] text-[#d4af37] uppercase mb-3 block">
                  {editor.role}
                </span>
              )}
              <h1 className="font-serif text-[#f5f0ff] text-5xl md:text-7xl leading-[1.02] mb-6">
                {editor.name}
              </h1>
              {editor.bio && (
                <p className="text-[#a89fc4] text-lg leading-[1.7] font-light max-w-2xl mb-6">
                  {editor.bio}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-3">
                {SOCIALS.map(({ key, Icon, color, label }) => {
                  const url = editor[key];
                  if (!url) return null;
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-[#1f1a35] hover:border-[#9b30ff]/50 transition-colors group"
                      style={{ color }}
                      data-testid={`editor-social-${key}`}
                      aria-label={label}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-[10px] tracking-[0.3em] uppercase text-[#a89fc4] group-hover:text-[#f5f0ff]">
                        {label}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLES BY THIS EDITOR */}
      <section className="py-14">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 flex flex-col lg:flex-row gap-10 lg:justify-center">
          <div className="flex-1 lg:max-w-[760px]">
            <span className="text-[10px] tracking-[0.5em] text-[#9b30ff] uppercase block mb-3">
              {t("editor.bylined_articles")}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#f5f0ff] leading-tight mb-8">
              {t("editor.read_their_work")}
            </h2>
            {articles.length === 0 ? (
              <p className="text-[#7c7893] font-serif text-2xl py-10">
                {t("editor.no_articles")}
              </p>
            ) : (
              <div className="space-y-6">
                {articles.map((post) => (
                  <TimelinePostCard
                    key={post._id || post.slug}
                    post={{ ...post, id: post.slug || post._id }}
                  />
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

export default EditorProfile;
