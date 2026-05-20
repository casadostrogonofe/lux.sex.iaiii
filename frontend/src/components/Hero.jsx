import React from "react";
import { ArrowRight, Clock, User } from "lucide-react";
import { featuredHero } from "../mock/mockData";

const Hero = () => {
  return (
    <section className="relative pt-32 md:pt-40 pb-20 overflow-hidden">
      {/* Eyebrow */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex items-center justify-center gap-6 mb-10">
          <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-[#d4af37]" />
          <span className="text-[10px] md:text-xs tracking-[0.5em] text-[#d4af37] uppercase">
            Lifestyle · Editorial MMXXVI
          </span>
          <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-[#d4af37]" />
        </div>

        <h1 className="font-serif text-center text-[#f5f0e6] text-5xl md:text-7xl lg:text-[88px] leading-[1.05] mb-6">
          A estética <br />
          do desejo em forma <br />
          de <span className="italic bg-gradient-to-r from-[#d4af37] via-[#b48cff] to-[#e6d5b8] bg-clip-text text-transparent">palavra</span>.
        </h1>

        <p className="text-center text-[#a0998a] max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-16 font-light">
          Ensaios, reportagens e vídeos sobre o que move a vida de quem entende o prazer como extensão do estilo. Curadoria editorial Lux Society.
        </p>
      </div>

      {/* Featured cover article */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <a
          href="#article"
          className="group block relative overflow-hidden border border-[#2b2b2b] hover:border-[#d4af37]/60 transition-colors duration-700"
        >
          <div className="grid lg:grid-cols-2">
            {/* Image */}
            <div className="relative h-[320px] md:h-[480px] lg:h-[560px] overflow-hidden">
              <img
                src={featuredHero.image}
                alt={featuredHero.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/60" />
            </div>

            {/* Content */}
            <div className="relative bg-[#0f0f10] p-8 md:p-14 lg:p-16 flex flex-col justify-center">
              <span className="text-[10px] md:text-xs tracking-[0.4em] text-[#d4af37] uppercase mb-6">
                {featuredHero.category}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#f5f0e6] leading-[1.15] mb-6">
                {featuredHero.title}
              </h2>
              <p className="text-[#a0998a] text-base md:text-lg leading-relaxed mb-10 font-light">
                {featuredHero.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-5 text-xs tracking-wider text-[#6b6356] uppercase mb-10">
                <span className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5" /> {featuredHero.author}
                </span>
                <span className="w-1 h-1 rounded-full bg-[#6b6356]" />
                <span>{featuredHero.date}</span>
                <span className="w-1 h-1 rounded-full bg-[#6b6356]" />
                <span className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" /> {featuredHero.readTime}
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
      </div>
    </section>
  );
};

export default Hero;
