import React from "react";
import { ArrowRight, Clock } from "lucide-react";
import { featuredArticles } from "../mock/mockData";

const FeaturedArticles = () => {
  return (
    <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-20">
      {/* Section title */}
      <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
        <div>
          <span className="text-[10px] tracking-[0.5em] text-[#d4af37] uppercase block mb-3">
            Em Destaque
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#f5f0e6] leading-tight">
            Matérias da semana
          </h2>
        </div>
        <a
          href="#all"
          className="text-xs tracking-[0.3em] text-[#a0998a] hover:text-[#d4af37] uppercase transition-colors flex items-center gap-2 group"
        >
          Ver todas
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredArticles.map((a) => (
          <a
            key={a.id}
            href={`#article-${a.id}`}
            className="group block"
          >
            <div className="relative h-[300px] md:h-[360px] overflow-hidden mb-6 border border-[#2b2b2b] group-hover:border-[#d4af37]/50 transition-colors duration-500">
              <img
                src={a.image}
                alt={a.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute top-5 left-5">
                <span className="text-[9px] tracking-[0.4em] text-[#d4af37] bg-black/60 backdrop-blur-sm px-3 py-1.5 uppercase">
                  {a.category}
                </span>
              </div>
            </div>

            <h3 className="font-serif text-2xl md:text-[26px] text-[#f5f0e6] leading-[1.25] mb-4 group-hover:text-[#d4af37] transition-colors duration-500">
              {a.title}
            </h3>
            <p className="text-[#a0998a] text-sm leading-relaxed mb-5 font-light">
              {a.excerpt}
            </p>
            <div className="flex items-center gap-4 text-[10px] tracking-[0.3em] text-[#6b6356] uppercase">
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
    </section>
  );
};

export default FeaturedArticles;
