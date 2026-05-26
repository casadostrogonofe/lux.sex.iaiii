import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link, useLocation } from "react-router-dom";
import { ArrowLeft, Clock, ChevronRight } from "lucide-react";
import { PortableText } from "@portabletext/react";
import PostInteractions from "../components/PostInteractions";
import PartnersSidebar from "../components/PartnersSidebar";
import Newsletter from "../components/Newsletter";
import { menuConfig } from "../mock/mockData";
import { menuLabel } from "../i18n/menuMap";
import { fetchArticleBySlug } from "../sanity/articles";
import { urlFor } from "../sanity/client";

const formatDate = (iso) => {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
};

const ptComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-serif text-3xl md:text-4xl text-[#f5f0ff] mt-12 mb-5 leading-[1.2]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-2xl text-[#f5f0ff] mt-10 mb-4 leading-[1.25]">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-[#9b30ff] pl-6 my-8 text-[#d4af37] font-serif text-xl italic">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-[#cfc5e8] text-[17px] leading-[1.85] mb-6 font-light">
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="text-[#f5f0ff]">{children}</strong>
    ),
    em: ({ children }) => <em className="text-[#d4af37]">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#9b30ff] underline decoration-[#9b30ff]/40 hover:decoration-[#9b30ff]"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      const src = value?.asset ? urlFor(value).width(1400).url() : value?.url;
      if (!src) return null;
      return (
        <figure className="my-10 -mx-2 md:mx-0">
          <img
            src={src}
            alt={value?.alt || ""}
            className="w-full rounded-xl border border-[#1f1a35]"
          />
          {value?.caption && (
            <figcaption className="text-center text-xs text-[#7c7893] mt-3 tracking-wide">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

const ArticlePage = () => {
  const { t, i18n } = useTranslation();
  const { section, sub, slug } = useParams();
  const location = useLocation();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setNotFound(false);
      const data = await fetchArticleBySlug(slug);
      if (cancelled) return;
      if (!data) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      setPost(data);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  const sectionMenu = menuConfig.find((m) => m.href === "/" + section);
  const sectionLabel = sectionMenu?.label || section;
  const subLabel = sub
    ? sectionMenu?.children?.find((c) => c.href.endsWith("/" + sub))?.label || sub
    : null;

  return (
    <div className="bg-[#050208] min-h-screen pt-28 pb-20">
      <div className="max-w-[1340px] mx-auto px-6 lg:px-10">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#7c7893] mb-10"
          data-testid="article-breadcrumb"
        >
          <Link to="/" className="hover:text-[#9b30ff]">
            {t("menu.home")}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link to={`/${section}`} className="hover:text-[#9b30ff]">
            {sectionLabel}
          </Link>
          {sub && (
            <>
              <ChevronRight className="w-3 h-3" />
              <Link
                to={`/${section}/${sub}`}
                className="hover:text-[#9b30ff]"
              >
                {subLabel}
              </Link>
            </>
          )}
        </nav>

        {loading && (
          <div className="text-[#a89fc4] text-sm" data-testid="article-loading">
            Carregando matéria...
          </div>
        )}

        {notFound && !loading && (
          <div
            className="text-center py-20 text-[#a89fc4]"
            data-testid="article-not-found"
          >
            <h1 className="font-serif text-3xl text-[#f5f0ff] mb-3">
              Matéria não encontrada
            </h1>
            <p className="mb-8 text-sm">
              Esta matéria pode ter sido removida ou ainda não foi publicada.
            </p>
            <Link
              to={`/${section}${sub ? "/" + sub : ""}`}
              className="inline-flex items-center gap-2 text-[#9b30ff] text-xs tracking-[0.3em] uppercase hover:text-[#b15aff]"
            >
              <ArrowLeft className="w-3 h-3" />
              Voltar para {sectionLabel}
            </Link>
          </div>
        )}

        {post && !loading && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-10 lg:gap-12">
            <article data-testid="article-content">
              {/* Header */}
              <header className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[10px] tracking-[0.4em] uppercase text-[#9b30ff]">
                    {sectionLabel}
                    {subLabel && ` · ${subLabel}`}
                  </span>
                  {post.adult && (
                    <span className="text-[9px] tracking-[0.3em] uppercase px-2 py-0.5 bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/40 rounded-full">
                      {t("common.adult_18")}
                    </span>
                  )}
                </div>

                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#f5f0ff] leading-[1.05] mb-6">
                  {post.title}
                  {post.sign && (
                    <span className="ml-4 text-5xl text-[#9b30ff] align-middle">
                      {post.sign}
                    </span>
                  )}
                </h1>

                {post.excerpt && (
                  <p className="text-[#a89fc4] text-lg md:text-xl leading-[1.6] font-light mb-8">
                    {post.excerpt}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 text-xs text-[#7c7893] tracking-wide">
                  {post.author && (
                    <span>
                      por{" "}
                      <span className="text-[#f5f0ff]">{post.author}</span>
                    </span>
                  )}
                  {post.date && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-[#1f1a35]" />
                      <span>{formatDate(post.date)}</span>
                    </>
                  )}
                  {post.readTime && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-[#1f1a35]" />
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </>
                  )}
                </div>
              </header>

              {/* Cover image */}
              {post.image && (
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[#1f1a35] mb-12">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    data-testid="article-cover-image"
                  />
                </div>
              )}

              {/* Body */}
              <div className="max-w-[720px]">
                {Array.isArray(post.body) && post.body.length > 0 ? (
                  <PortableText
                    value={post.body}
                    components={ptComponents}
                  />
                ) : (
                  <p className="text-[#a89fc4] text-[17px] leading-[1.85] font-light">
                    {post.excerpt}
                  </p>
                )}
              </div>

              {/* Interactions */}
              <div className="mt-14 pt-8 border-t border-[#1f1a35]">
                <PostInteractions
                  postId={post.id || post._id}
                  postTitle={post.title}
                />
              </div>

              <div className="mt-12">
                <Link
                  to={`/${section}${sub ? "/" + sub : ""}`}
                  className="inline-flex items-center gap-2 text-[#9b30ff] text-xs tracking-[0.3em] uppercase hover:text-[#b15aff]"
                >
                  <ArrowLeft className="w-3 h-3" />
                  {t("common.back_to")} {sectionLabel}
                </Link>
              </div>
            </article>

            <PartnersSidebar />
          </div>
        )}

        <div className="mt-24">
          <Newsletter />
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
