import React from "react";
import { ArrowUpRight } from "lucide-react";

const AdBanner = ({ variant = "premium", data }) => {
  if (variant === "premium") {
    return (
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-8 bg-[#5a5470]" />
          <span className="text-[9px] tracking-[0.5em] text-[#5a5470] uppercase">
            Conteúdo Patrocinado · {data.sponsor}
          </span>
        </div>

        <a
          href="#sponsor"
          className="group relative block overflow-hidden border border-[#1a1526] hover:border-[#9b30ff]/50 transition-colors duration-300"
        >
          <div className="grid md:grid-cols-[1.2fr_1fr] items-stretch">
            <div className="relative h-[260px] md:h-[340px] overflow-hidden bg-black">
              <img
                src={data.image}
                alt={data.headline}
                className="absolute inset-0 w-full h-full object-cover opacity-80 transition-[opacity,transform] duration-300 group-hover:opacity-100 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            </div>
            <div className="bg-[#0b0812] p-8 md:p-12 flex flex-col justify-center">
              <h3 className="font-serif text-2xl md:text-3xl text-[#f5f0ff] leading-tight mb-4">
                {data.headline}
              </h3>
              <p className="text-[#7c7893] text-sm md:text-base leading-relaxed mb-8 font-light">
                {data.description}
              </p>
              <div className="inline-flex items-center gap-3 text-[#9b30ff] text-xs tracking-[0.3em] uppercase">
                <span className="group-hover:tracking-[0.4em] transition-[letter-spacing] duration-300">
                  {data.cta}
                </span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </a>
      </section>
    );
  }

  if (variant === "inline") {
    return (
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-8">
        <a
          href="#sponsor"
          className="group block border-y border-[#1a1526] hover:border-[#9b30ff]/40 py-8 md:py-10 transition-colors duration-300"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <span className="text-[9px] tracking-[0.5em] text-[#5a5470] uppercase block mb-2">
                Patrocinado · {data.sponsor}
              </span>
              <h4 className="font-serif text-xl md:text-2xl text-[#f5f0ff] mb-1">
                {data.headline}
              </h4>
              <p className="text-[#7c7893] text-sm font-light">{data.description}</p>
            </div>
            <div className="inline-flex items-center gap-3 text-[#9b30ff] text-xs tracking-[0.3em] uppercase whitespace-nowrap">
              <span className="group-hover:tracking-[0.4em] transition-[letter-spacing] duration-300">
                {data.cta}
              </span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </div>
          </div>
        </a>
      </section>
    );
  }

  // footer variant
  return (
    <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-14">
      <a
        href="#sponsor"
        className="group block bg-gradient-to-br from-[#0f0c18] to-[#050208] border border-[#9b30ff]/20 hover:border-[#9b30ff]/50 p-10 md:p-16 transition-colors duration-300"
      >
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[9px] tracking-[0.5em] text-[#5a5470] uppercase block mb-6">
            Patrocinado · {data.sponsor}
          </span>
          <h3 className="font-serif text-3xl md:text-4xl text-[#f5f0ff] mb-5 leading-tight">
            {data.headline}
          </h3>
          <p className="text-[#7c7893] text-base md:text-lg leading-relaxed mb-10 font-light">
            {data.description}
          </p>
          <div className="inline-flex items-center gap-3 px-8 py-3 border border-[#9b30ff] text-[#9b30ff] hover:bg-[#9b30ff] hover:text-black text-xs tracking-[0.3em] uppercase transition-colors duration-300">
            {data.cta}
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </a>
    </section>
  );
};

export default AdBanner;
