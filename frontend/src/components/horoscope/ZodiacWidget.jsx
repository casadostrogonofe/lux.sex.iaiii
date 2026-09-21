import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Sparkle } from "lucide-react";
import {
  WESTERN_SIGNS,
  CHINESE_SIGNS,
  ZODIAC_BACKGROUND,
} from "./horoscopeData";
import AgnesSignDialog from "./AgnesSignDialog";
import AgnesChineseDialog from "./AgnesChineseDialog";

const SectionHeader = ({ eyebrow, title1, title2, subtitle }) => (
  <div className="flex flex-col items-center gap-4 text-center">
    <div className="flex items-center gap-3">
      <span className="h-px w-8 bg-[#d4af37]" />
      <span className="font-['Jost'] text-[11px] uppercase tracking-[0.35em] text-[#d4af37]">
        {eyebrow}
      </span>
      <Sparkle className="h-3 w-3 text-[#d4af37]/70" strokeWidth={1.5} />
    </div>
    <h2 className="font-['Cinzel'] text-4xl leading-tight text-[#f4ecdd] md:text-5xl">
      {title1} <span className="italic text-[#d4af37]">{title2}</span>
    </h2>
    <p className="max-w-lg font-['Jost'] text-sm font-light leading-relaxed tracking-wide text-[#f4ecdd]/60">
      {subtitle}
    </p>
  </div>
);

const ZodiacWidget = () => {
  const { t } = useTranslation();
  const [sign, setSign] = useState(null);
  const [animal, setAnimal] = useState(null);

  return (
    <section
      id="horoscopo"
      className="relative overflow-hidden bg-[#07061a] py-20 md:py-28"
      data-testid="zodiac-widget"
    >
      <img
        src={ZODIAC_BACKGROUND}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="pointer-events-none absolute inset-0 bg-[#07061a]/60" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-[#9b30ff]/20 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeader
          eyebrow={t("horoscope.greek_eyebrow", "Astrologia ocidental")}
          title1={t("horoscope.greek_title1", "Seu horóscopo")}
          title2={t("horoscope.greek_title2", "do dia")}
          subtitle={t(
            "horoscope.greek_subtitle",
            "Escolha o seu signo e receba a leitura do dia do Mestre Agnes.",
          )}
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-6">
          {WESTERN_SIGNS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSign(s)}
              className="group relative overflow-hidden rounded-md border border-[#d4af37]/25 bg-[#0b0a1a]/60 text-left transition duration-500 hover:border-[#d4af37]/70 hover:shadow-[0_0_30px_rgba(212,175,55,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37]"
              data-testid={`sign-card-${s.id}`}
            >
              <img
                src={s.img}
                alt={s.name}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#07061a] via-[#07061a]/70 to-transparent p-3">
                <p className="font-['Cinzel'] text-base text-[#f4ecdd] md:text-lg">
                  {s.name}
                </p>
                <p className="font-['Jost'] text-[9px] uppercase tracking-[0.25em] text-[#d4af37]/80">
                  {s.range}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-20 flex items-center gap-4">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4af37]/40" />
          <Sparkle className="h-3.5 w-3.5 shrink-0 text-[#d4af37]/80" strokeWidth={1.5} />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4af37]/40" />
        </div>

        <div className="mt-12">
          <SectionHeader
            eyebrow={t("horoscope.chinese_eyebrow", "Astrologia chinesa")}
            title1={t("horoscope.chinese_title1", "Zodíaco")}
            title2={t("horoscope.chinese_title2", "chinês")}
            subtitle={t(
              "horoscope.chinese_subtitle",
              "Descubra o seu animal e a energia que ele rege hoje.",
            )}
          />
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-6">
          {CHINESE_SIGNS.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => setAnimal(a)}
              className="group flex flex-col items-center gap-3 rounded-md border border-[#d4af37]/25 bg-[#0b0a1a]/60 p-5 text-center transition duration-500 hover:border-[#d4af37]/70 hover:shadow-[0_0_30px_rgba(212,175,55,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37]"
              data-testid={`chinese-card-${a.id}`}
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[#d4af37]/40 bg-[#2a1a5e]/40 font-['Cinzel'] text-3xl text-[#d4af37] transition group-hover:border-[#d4af37]">
                {a.glyph}
              </span>
              <span className="font-['Cinzel'] text-base text-[#f4ecdd] md:text-lg">
                {a.name}
              </span>
              <span className="font-['Jost'] text-[9px] uppercase tracking-[0.25em] text-[#d4af37]/80">
                {a.years.slice(0, 2).join(" · ")}
              </span>
            </button>
          ))}
        </div>
      </div>

      <AgnesSignDialog sign={sign} onClose={() => setSign(null)} />
      <AgnesChineseDialog animal={animal} onClose={() => setAnimal(null)} />
    </section>
  );
};

export default ZodiacWidget;
