import React, { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowRight, Clock, User, ChevronRight } from "lucide-react";
import AdBanner from "../components/AdBanner";
import Newsletter from "../components/Newsletter";
import {
  articlesByCategory,
  categoryMeta,
  lifestyleCategories,
} from "../mock/mockData";
import { fetchBannerBySlot } from "../api/banners";

const CategoryPage = () => {
  const { category } = useParams();
  const meta = categoryMeta[category];
  const articles = articlesByCategory[category] || [];
  const [banners, setBanners] = useState({ inline: null, footer: null });

  useEffect(() => {
    (async () => {
      const [inline, footer] = await Promise.all([
        fetchBannerBySlot("lifestyle_inline"),
        fetchBannerBySlot("lifestyle_footer"),
      ]);
      setBanners({ inline, footer });
    })();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [category]);

  if (!meta) return <Navigate to="/lifestyle" replace />;

  const featured = articles.find((a) => a.featured) || articles[0];
  const rest = articles.filter((a) => a.id !== featured?.id);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 md:pt-48 pb-16 border-b border-[#2b2b2b]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] text-[#6b6356] uppercase mb-8">
            <Link to="/lifestyle" className="hover:text-[#d4af37] transition-colors">
              Lifestyle
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#d4af37]">{meta.title}</span>
          </div>

          <div className="flex items-center gap-6 mb-8">
            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <span className="text-[10px] md:text-xs tracking-[0.5em] text-[#d4af37] uppercase">
              {meta.tagline}
            </span>
          </div>

          <h1 className="font-serif text-[#f5f0e6] text-5xl md:text-7xl lg:text-[88px] leading-[1.05] mb-8">
            {meta.title}
          </h1>

          <p className="text-[#a0998a] max-w-2xl text-base md:text-lg leading-relaxed font-light">
            {meta.description}
          </p>
        </div>
      </section>

      {/* Featured */}
      {featured && (
        <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
          <a
            href={`#article-${featured.id}`}
            className="group block relative overflow-hidden border border-[#2b2b2b] hover:border-[#d4af37]/60 transition-colors duration-700"
          >
            <div className="grid lg:grid-cols-2">
              <div className="relative h-[320px] md:h-[480px] lg:h-[560px] overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-2000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/60" />
              </div>
              <div className="relative bg-[#0f0f10] p-8 md:p-14 lg:p-16 flex flex-col justify-center">
                <span className="text-[10px] md:text-xs tracking-[0.4em] text-[#d4af37] uppercase mb-6">
                  Em destaque · {featured.categoryLabel}
                </span>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#f5f0e6] leading-[1.15] mb-6">
                  {featured.title}
                </h2>
                <p className="text-[#a0998a] text-base md:text-lg leading-relaxed mb-10 font-light">
                  {featured.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-5 text-xs tracking-wider text-[#6b6356] uppercase mb-10">
                  <span className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5" /> {featured.author}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#6b6356]" />
                  <span>{featured.date}</span>
                  <span className="w-1 h-1 rounded-full bg-[#6b6356]" />
                  <span className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" /> {featured.readTime}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[#d4af37] text-sm tracking-[0.3em] uppercase">
                  <span className="group-hover:tracking-[0.4em] transition-all duration-500">
                    Ler a matéria
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                </div>
              </div>
            </div>
          </a>
        </section>
      )}

      {/* Inline ad */}
      {banners.inline && <AdBanner variant="inline" data={banners.inline} />}

      {/* Rest of articles */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">
        {rest.length === 0 ? (
          <p className="text-center text-[#a0998a] py-12 font-serif text-xl">
            Mais matérias em breve.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((a) => (
              <a key={a.id} href={`#article-${a.id}`} className="group block">
                <div className="relative h-[300px] md:h-[340px] overflow-hidden mb-6 border border-[#2b2b2b] group-hover:border-[#d4af37]/50 transition-colors duration-500">
                  <img
                    src={a.image}
                    alt={a.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute top-5 left-5">
                    <span className="text-[9px] tracking-[0.4em] text-[#d4af37] bg-black/60 backdrop-blur-sm px-3 py-1.5 uppercase">
                      {a.categoryLabel}
                    </span>
                  </div>
                </div>
                <h3 className="font-serif text-2xl md:text-[26px] text-[#f5f0e6] leading-[1.25] mb-4 group-hover:text-[#d4af37] transition-colors duration-500">
                  {a.title}
                </h3>
                <p className="text-[#a0998a] text-sm leading-relaxed mb-5 font-light">
                  {a.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-[10px] tracking-[0.3em] text-[#6b6356] uppercase">
                  <span>{a.author}</span>
                  <span className="w-1 h-1 rounded-full bg-[#6b6356]" />
                  <span>{a.date}</span>
                  <span className="w-1 h-1 rounded-full bg-[#6b6356]" />
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3" /> {a.readTime}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* Other categories */}
      <section className="border-t border-[#2b2b2b]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
          <span className="text-[10px] tracking-[0.5em] text-[#d4af37] uppercase block mb-6">
            Continue explorando
          </span>
          <div className="flex flex-wrap gap-3">
            {lifestyleCategories
              .filter((c) => c.id !== category)
              .map((c) => (
                <Link
                  key={c.id}
                  to={c.href}
                  className="text-[11px] tracking-[0.3em] uppercase px-5 py-3 border border-[#2b2b2b] text-[#a0998a] hover:border-[#d4af37] hover:text-[#d4af37] transition-colors duration-300"
                >
                  {c.label}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {banners.footer && <AdBanner variant="footer" data={banners.footer} />}
      <Newsletter />
    </>
  );
};

export default CategoryPage;
