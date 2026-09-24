import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { WESTERN_SIGNS, CHINESE_SIGNS } from "./horoscopeData";
import AgnesSignDialog from "./AgnesSignDialog";
import AgnesChineseDialog from "./AgnesChineseDialog";

const SectionHeader = ({ eyebrow, title1, title2, subtitle }) => (
  <div className="mb-8">
    <span className="text-[10px] tracking-[0.5em] text-[#9b30ff] uppercase">
      {eyebrow}
    </span>
    <h2 className="font-serif text-[#f5f0ff] text-3xl md:text-4xl mt-3">
      {title1} <span className="text-[#d4af37] italic">{title2}</span>
    </h2>
    <p className="text-[#a89fc4] text-sm md:text-base font-light mt-3 max-w-xl leading-[1.7]">
      {subtitle}
    </p>
  </div>
);

const ZodiacWidget = () => {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const [sign, setSign] = useState(null);
  const [animal, setAnimal] = useState(null);

  useEffect(() => {
    const signo = params.get("signo");
    const zodiaco = params.get("animal");
    if (signo) {
      const found = WESTERN_SIGNS.find((s) => s.id === signo);
      if (found) setSign(found);
    } else if (zodiaco) {
      const found = CHINESE_SIGNS.find((a) => a.id === zodiaco);
      if (found) setAnimal(found);
    }
  }, [params]);

  return (
    <section id="horoscopo" className="py-8" data-testid="zodiac-widget">
      {/* Western / Greek zodiac */}
      <SectionHeader
        eyebrow={t("horoscope.greek_eyebrow", "Astrologia ocidental")}
        title1={t("horoscope.greek_title1", "Seu horóscopo")}
        title2={t("horoscope.greek_title2", "do dia")}
        subtitle={t(
          "horoscope.greek_subtitle",
          "Escolha o seu signo e receba a leitura do dia do Mestre Agnes.",
        )}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
        {WESTERN_SIGNS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSign(s)}
            className="group relative block w-full overflow-hidden rounded-2xl border border-[#1f1a35] bg-[#0a0612] transition-[transform,border-color] duration-300 hover:border-[#9b30ff]/60 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#9b30ff]"
            data-testid={`sign-card-${s.id}`}
          >
            <img
              src={s.img}
              alt={s.name}
              loading="lazy"
              className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#050208] via-[#050208]/70 to-transparent p-3">
              <p className="font-serif text-base md:text-lg text-[#f5f0ff]">
                {s.name}
              </p>
              <p className="text-[9px] tracking-[0.2em] text-[#d4af37] uppercase">
                {s.range}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Chinese zodiac */}
      <div className="mt-16">
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
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
        {CHINESE_SIGNS.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => setAnimal(a)}
            className="group flex flex-col items-center gap-3 rounded-2xl border border-[#1f1a35] bg-[#0a0612] p-6 text-center transition-[transform,border-color] duration-300 hover:border-[#9b30ff]/60 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#9b30ff]"
            data-testid={`chinese-card-${a.id}`}
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[#d4af37]/40 bg-[#12091f] font-serif text-3xl text-[#d4af37] transition-colors group-hover:border-[#9b30ff]">
              {a.glyph}
            </span>
            <span className="font-serif text-base md:text-lg text-[#f5f0ff]">
              {a.name}
            </span>
            <span className="text-[9px] tracking-[0.2em] text-[#d4af37] uppercase">
              {a.years.slice(0, 2).join(" · ")}
            </span>
          </button>
        ))}
      </div>

      <AgnesSignDialog sign={sign} onClose={() => setSign(null)} />
      <AgnesChineseDialog animal={animal} onClose={() => setAnimal(null)} />
    </section>
  );
};

export default ZodiacWidget;
