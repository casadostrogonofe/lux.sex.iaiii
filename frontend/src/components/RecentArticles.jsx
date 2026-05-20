import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { categories, recentArticles, lifestyleCategories } from "../mock/mockData";

const RecentArticles = () => {
  return (
    <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-20">
      <div className="grid lg:grid-cols-[1fr_280px] gap-12 lg:gap-16">
        {/* Articles list */}
        <div>
          <div className="mb-12">
            <span className="text-[10px] tracking-[0.5em] text-[#d4af37] uppercase block mb-3">
              Recentes
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#f5f0e6] leading-tight">
              Últimas publicações
            </h2>
          </div>

          <div className="space-y-12">
            {recentArticles.map((a) => (
              <a
                key={a.id}
                href={`#article-${a.id}`}
                className="group grid md:grid-cols-[280px_1fr] gap-6 md:gap-8 pb-12 border-b border-[#2b2b2b] last:border-0"
              >
                <div className="relative h-[200px] md:h-[220px] overflow-hidden border border-[#2b2b2b] group-hover:border-[#d4af37]/40 transition-colors duration-500">
                  <img
                    src={a.image}
                    alt={a.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[10px] tracking-[0.4em] text-[#d4af37] uppercase mb-3">
                    {a.categoryLabel || a.category}
                  </span>
                  <h3 className="font-serif text-2xl md:text-[28px] text-[#f5f0e6] leading-[1.2] mb-4 group-hover:text-[#d4af37] transition-colors duration-500">
                    {a.title}
                  </h3>
                  <p className="text-[#a0998a] text-sm md:text-[15px] leading-relaxed mb-5 font-light">
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
                </div>
              </a>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <button className="inline-flex items-center gap-3 px-8 py-4 border border-[#2b2b2b] hover:border-[#d4af37] text-[#a0998a] hover:text-[#d4af37] text-xs tracking-[0.3em] uppercase transition-colors duration-500">
              Carregar mais
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="border border-[#2b2b2b] p-8">
            <span className="text-[10px] tracking-[0.5em] text-[#d4af37] uppercase block mb-5">
              Editorias
            </span>
            <ul className="space-y-1">
              {lifestyleCategories.map((c, idx) => {
                const meta = categories.find((x) => x.id === c.id) || categories[idx];
                return (
                  <li key={c.id}>
                    <Link
                      to={c.href}
                      className="group flex items-center justify-between py-3 border-b border-[#2b2b2b] last:border-0 hover:border-[#d4af37]/40 transition-colors"
                    >
                      <span className="font-serif text-lg text-[#f5f0e6] group-hover:text-[#d4af37] transition-colors">
                        {c.label}
                      </span>
                      <span className="text-[10px] tracking-widest text-[#6b6356]">
                        {(meta?.count || 0).toString().padStart(3, "0")}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Sticky ad */}
          <div className="mt-8 border border-[#d4af37]/20 bg-gradient-to-br from-[#1a1410] to-[#0b0b0b] p-6 text-center">
            <span className="text-[9px] tracking-[0.5em] text-[#6b6356] uppercase block mb-3">
              Patrocinado
            </span>
            <h4 className="font-serif text-xl text-[#f5f0e6] mb-2">
              L.S Atelier
            </h4>
            <p className="text-[#a0998a] text-xs leading-relaxed mb-5 font-light">
              Peças exclusivas sob encomenda. Curadoria fechada.
            </p>
            <button className="text-[#d4af37] text-[10px] tracking-[0.4em] uppercase hover:tracking-[0.5em] transition-all duration-500">
              Conhecer →
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default RecentArticles;
