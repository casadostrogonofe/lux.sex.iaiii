import React from "react";
import { Link } from "react-router-dom";
import { MoreHorizontal, Sparkles } from "lucide-react";
import PostInteractions from "./PostInteractions";
import { menuConfig } from "../mock/mockData";

// Helper to derive a relative time from a date label / id
const timeAgo = (post) => {
  // We have free-form date strings in mock; produce friendly relative phrases
  const map = {
    "18 Maio, MMXXVI": "agora há pouco",
    "17 Maio, MMXXVI": "há 1 dia",
    "16 Maio, MMXXVI": "há 2 dias",
    "15 Maio, MMXXVI": "há 3 dias",
    "14 Maio, MMXXVI": "há 4 dias",
    "13 Maio, MMXXVI": "há 5 dias",
    "12 Maio, MMXXVI": "há 6 dias",
  };
  if (map[post.date]) return map[post.date];
  if (typeof post.date === "string" && post.date.includes("Maio")) return "há 1 semana";
  if (typeof post.date === "string" && post.date.includes("Abril")) return "há 3 semanas";
  if (typeof post.date === "string" && post.date.includes("Mar\u00e7o")) return "há 1 mês";
  if (typeof post.date === "string" && post.date.includes("Semana")) return "esta semana";
  return "recente";
};

const getSectionMeta = (path) => {
  const [section] = (path || "").split("/");
  const parent = menuConfig.find((m) => m.href === "/" + section);
  return { sectionLabel: parent?.label || section, href: "/" + path };
};

const articleHref = (post) => {
  // Always link to /section/sub/slug when we have a slug; otherwise fall back to listing
  const slug = post.slug || post.id;
  if (post.path && slug) return `/${post.path}/${slug}`;
  if (post.path) return `/${post.path}`;
  return "/";
};

const TimelinePostCard = ({ post, isNew = false }) => {
  const href = articleHref(post);
  const initials = (post.author || "L")
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="bg-[#0a0612] border border-[#1f1a35] rounded-2xl overflow-hidden hover:border-[#9b30ff]/35 transition-colors duration-500">
      {/* Header — author + time only */}
      <div className="flex items-start gap-4 px-6 pt-6 pb-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center font-serif text-base text-white flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #9b30ff 0%, #5e1599 100%)",
            boxShadow: "0 0 16px rgba(155,48,255,0.3)",
          }}
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-serif text-base text-[#f5f0ff] truncate">
              {post.author}
            </span>
            {isNew && (
              <span className="text-[9px] tracking-[0.3em] uppercase px-2 py-0.5 bg-[#9b30ff]/15 text-[#9b30ff] border border-[#9b30ff]/40 rounded-full flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                Nova
              </span>
            )}
          </div>
          <div className="mt-1 text-[10px] tracking-[0.25em] text-[#7c7893] uppercase">
            {timeAgo(post)}
          </div>
        </div>
        <button className="text-[#5a5470] hover:text-[#9b30ff] transition-colors p-1">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Title + excerpt */}
      <div className="px-6 pb-5">
        <Link to={href} className="block group">
          <h2 className="font-serif text-2xl md:text-3xl text-[#f5f0ff] leading-[1.2] mb-3 group-hover:text-[#9b30ff] transition-colors">
            {post.title}
            {post.sign && (
              <span className="ml-3 text-3xl text-[#9b30ff] align-middle">
                {post.sign}
              </span>
            )}
          </h2>
          <p className="text-[#a89fc4] text-[15px] leading-[1.65] font-light">
            {post.excerpt}
          </p>
        </Link>
      </div>

      {/* Image */}
      {post.image && (
        <Link to={href} className="block overflow-hidden">
          <div className="relative aspect-[16/9] bg-[#0f0c18]">
            <img
              src={post.image}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover hover:scale-[1.02] transition-transform duration-[1.2s]"
            />
          </div>
        </Link>
      )}

      {/* Interactions bar */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-[#1f1a35]">
        <PostInteractions postId={post.id} postTitle={post.title} compact />
        <Link
          to={href}
          className="text-[10px] tracking-[0.3em] uppercase px-3 py-2 text-[#9b30ff] hover:text-[#b15aff] transition-colors"
        >
          Ler matéria →
        </Link>
      </div>
    </article>
  );
};

export const TimelineAdCard = ({ banner }) => (
  <a
    href={banner.link || "#"}
    target="_blank"
    rel="noopener noreferrer sponsored"
    className="block bg-gradient-to-br from-[#1a0d2e] to-[#0a0612] border border-[#9b30ff]/25 hover:border-[#9b30ff]/60 rounded-2xl overflow-hidden transition-colors duration-500"
  >
    <div className="grid md:grid-cols-[1fr_1.3fr]">
      {banner.image && (
        <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[220px] overflow-hidden bg-[#0a0612]">
          <img
            src={banner.image}
            alt={banner.headline}
            className="absolute inset-0 w-full h-full object-cover opacity-85 hover:opacity-100 transition-opacity duration-500"
          />
        </div>
      )}
      <div className="p-7 md:p-9 flex flex-col justify-center">
        <span className="text-[9px] tracking-[0.5em] text-[#5a5470] uppercase block mb-4">
          Patrocinado · {banner.sponsor}
        </span>
        <h3 className="font-serif text-2xl md:text-3xl text-[#f5f0ff] mb-4 leading-tight">
          {banner.headline}
        </h3>
        <p className="text-[#a89fc4] text-sm md:text-base leading-relaxed mb-6 font-light">
          {banner.description}
        </p>
        <span className="inline-flex items-center gap-2 text-[#9b30ff] text-xs tracking-[0.3em] uppercase">
          {banner.cta} →
        </span>
      </div>
    </div>
  </a>
);

export default TimelinePostCard;
