import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Sparkles, ChevronRight } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { menuLabel } from "../i18n/menuMap";
import PartnersSidebar from "../components/PartnersSidebar";
import Newsletter from "../components/Newsletter";
import AgnesReadingModal from "../components/horoscope/AgnesReadingModal";
import PersonalReading from "../components/horoscope/PersonalReading";
import CompatibilityCard from "../components/horoscope/CompatibilityCard";
import EditorialBanner from "../components/EditorialBanner";

const SECTION_PATH = "bem-estar/horoscopo";
const AGNES_BG = "/agnes-horoscopo-bg.png";
const AGNES_LOGO = "/agnes-logo.jpeg";

const SIGNS = [
  { id: "aries", symbol: "♈", name: "Áries", dates: "21/Mar – 19/Abr" },
  { id: "touro", symbol: "♉", name: "Touro", dates: "20/Abr – 20/Mai" },
  { id: "gemeos", symbol: "♊", name: "Gêmeos", dates: "21/Mai – 20/Jun" },
  { id: "cancer", symbol: "♋", name: "Câncer", dates: "21/Jun – 22/Jul" },
  { id: "leao", symbol: "♌", name: "Leão", dates: "23/Jul – 22/Ago" },
  { id: "virgem", symbol: "♍", name: "Virgem", dates: "23/Ago – 22/Set" },
  { id: "libra", symbol: "♎", name: "Libra", dates: "23/Set – 22/Out" },
  { id: "escorpiao", symbol: "♏", name: "Escorpião", dates: "23/Out – 21/Nov" },
  { id: "sagitario", symbol: "♐", name: "Sagitário", dates: "22/Nov – 21/Dez" },
  { id: "capricornio", symbol: "♑", name: "Capricórnio", dates: "22/Dez – 19/Jan" },
  { id: "aquario", symbol: "♒", name: "Aquário", dates: "20/Jan – 18/Fev" },
  { id: "peixes", symbol: "♓", name: "Peixes", dates: "19/Fev – 20/Mar" },
];

const CHINESE = [
  { id: "rato", symbol: "🐀", name: "Rato", dates: "2020 · 2008 · 1996" },
  { id: "boi", symbol: "🐂", name: "Boi", dates: "2021 · 2009 · 1997" },
  { id: "tigre", symbol: "🐅", name: "Tigre", dates: "2022 · 2010 · 1998" },
  { id: "coelho", symbol: "🐇", name: "Coelho", dates: "2023 · 2011 · 1999" },
  { id: "dragao", symbol: "🐉", name: "Dragão", dates: "2024 · 2012 · 2000" },
  { id: "serpente", symbol: "🐍", name: "Serpente", dates: "2025 · 2013 · 2001" },
  { id: "cavalo", symbol: "🐎", name: "Cavalo", dates: "2026 · 2014 · 2002" },
  { id: "cabra", symbol: "🐐", name: "Cabra", dates: "2027 · 2015 · 2003" },
  { id: "macaco", symbol: "🐒", name: "Macaco", dates: "2028 · 2016 · 2004" },
  { id: "galo", symbol: "🐓", name: "Galo", dates: "2029 · 2017 · 2005" },
  { id: "cao", symbol: "🐕", name: "Cão", dates: "2030 · 2018 · 2006" },
  { id: "porco", symbol: "🐖", name: "Porco", dates: "2031 · 2019 · 2007" },
];

const SignGrid = ({ items, system, onSelect }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
    {items.map((s) => (
      <button
        key={s.id}
        type="button"
        onClick={() => onSelect({ ...s, system })}
        className="group relative block w-full aspect-square overflow-hidden rounded-2xl border bg-[#0a0612] text-center p-4 md:p-6 transition-[transform,border-color] duration-300 border-[#1f1a35] hover:border-[#9b30ff]/60 hover:-translate-y-1 cursor-pointer"
        data-testid={`horoscope-${system}-${s.id}`}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(circle at 50% 30%, rgba(155,48,255,0.25), transparent 60%)",
          }}
        />
        <div className="relative h-full flex flex-col items-center justify-center">
          <span
            className="text-5xl md:text-6xl mb-3 transition-transform duration-300 group-hover:scale-110"
            style={{
              color: "#d4af37",
              textShadow:
                "0 0 14px rgba(212,175,55,0.55), 0 0 28px rgba(212,175,55,0.25)",
            }}
          >
            {s.symbol}
          </span>
          <h3 className="font-serif text-[#f5f0ff] text-lg md:text-xl leading-tight mb-1">
            {s.name}
          </h3>
          <span className="text-[9px] tracking-[0.2em] text-[#7c7893] uppercase">
            {s.dates}
          </span>
        </div>
      </button>
    ))}
  </div>
);

const HoroscopePage = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(null);

  const sectionLabel = menuLabel(t, "/bem-estar", "Bem Estar");
  const subLabel = menuLabel(t, "/" + SECTION_PATH, "Horóscopo");

  return (
    <>
      {/* ============ HEADER ============ */}
      <section className="relative pt-32 pb-16 border-b border-[#1a1526] overflow-hidden">
        {/* Constellation backdrop from Mestre Agnes */}
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${AGNES_BG})` }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(155,48,255,0.28) 0%, transparent 55%), radial-gradient(ellipse at 70% 80%, rgba(212,175,55,0.16) 0%, transparent 60%), rgba(5,2,8,0.72)",
          }}
        />
        <div className="relative max-w-[1340px] mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] text-[#5a5470] uppercase mb-8">
            <Link to="/bem-estar" className="hover:text-[#9b30ff]">
              {sectionLabel}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#9b30ff]">{subLabel}</span>
          </div>
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <span className="text-[10px] tracking-[0.5em] text-[#d4af37] uppercase">
              {t("horoscope.tagline")}
            </span>
          </div>
          <h1 className="font-serif text-[#f5f0ff] text-5xl md:text-7xl lg:text-[88px] leading-[1.02] mb-6">
            {t("horoscope.title")}
          </h1>
          <p className="text-[#a89fc4] text-lg max-w-2xl leading-[1.7] font-light mb-6">
            {t("horoscope.subtitle")}
          </p>
          <div
            className="inline-flex items-center gap-3 rounded-full border border-[#d4af37]/40 bg-[#0a0612]/70 px-4 py-2"
            data-testid="horoscope-agnes-badge"
          >
            <img
              src={AGNES_LOGO}
              alt="Mestre Agnes"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-[10px] tracking-[0.25em] text-[#d4af37] uppercase">
              {t("horoscope.agnes.updated_by", "Atualizado por Mestre Agnes")}
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1340px] px-6 pt-8 lg:px-10">
        <EditorialBanner section={SECTION_PATH} />
      </section>

      {/* ============ SIGN GRIDS ============ */}
      <section className="py-16">
        <div className="max-w-[1340px] mx-auto px-4 md:px-6 lg:px-10 flex flex-col lg:flex-row gap-10 lg:justify-center">
          <div className="flex-1 lg:max-w-[900px]">
            {/* Western / Greek zodiac */}
            <div className="mb-6 flex items-center gap-3">
              <span className="text-[10px] tracking-[0.5em] text-[#9b30ff] uppercase">
                {t("horoscope.greek_title", "Signos do zodíaco")}
              </span>
              <div className="h-px flex-1 bg-[#1f1a35]" />
            </div>
            <SignGrid items={SIGNS} system="western" onSelect={setSelected} />

            {/* Chinese zodiac */}
            <div className="mt-16 mb-6 flex items-center gap-3">
              <span className="text-[10px] tracking-[0.5em] text-[#d4af37] uppercase">
                {t("horoscope.chinese_title", "Zodíaco chinês")}
              </span>
              <div className="h-px flex-1 bg-[#1f1a35]" />
            </div>
            <SignGrid items={CHINESE} system="chinese" onSelect={setSelected} />

            <CompatibilityCard />

            <PersonalReading />
          </div>
          <PartnersSidebar />
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <AgnesReadingModal item={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>

      <Newsletter />
    </>
  );
};

export default HoroscopePage;
