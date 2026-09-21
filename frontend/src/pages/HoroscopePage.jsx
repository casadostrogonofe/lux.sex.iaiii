import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Sparkles, ChevronRight } from "lucide-react";
import { menuLabel } from "../i18n/menuMap";
import PartnersSidebar from "../components/PartnersSidebar";
import Newsletter from "../components/Newsletter";
import ZodiacWidget from "../components/horoscope/ZodiacWidget";
import PersonalReading from "../components/horoscope/PersonalReading";
import CompatibilityCard from "../components/horoscope/CompatibilityCard";
import EditorialBanner from "../components/EditorialBanner";

const SECTION_PATH = "bem-estar/horoscopo";
const AGNES_BG = "/agnes-horoscopo-bg.png";
const AGNES_LOGO = "/agnes-logo.jpeg";

const HoroscopePage = () => {
  const { t } = useTranslation();

  const sectionLabel = menuLabel(t, "/bem-estar", "Bem Estar");
  const subLabel = menuLabel(t, "/" + SECTION_PATH, "Horóscopo");

  return (
    <>
      {/* ============ HEADER ============ */}
      <section className="relative pt-32 pb-16 border-b border-[#1a1526] overflow-hidden">
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
          <h1 className="font-['Cinzel'] text-[#f5f0ff] text-5xl md:text-7xl lg:text-[80px] leading-[1.05] mb-6">
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

      {/* ============ ZODIAC WIDGET (cards + pop-ups no estilo Mestre Agnes) ============ */}
      <ZodiacWidget />

      {/* ============ COMPATIBILIDADE + LEITURA PESSOAL + PARCEIROS ============ */}
      <section className="py-16">
        <div className="max-w-[1340px] mx-auto px-4 md:px-6 lg:px-10 flex flex-col lg:flex-row gap-10 lg:justify-center">
          <div className="flex-1 lg:max-w-[900px]">
            <CompatibilityCard />
            <PersonalReading />
          </div>
          <PartnersSidebar />
        </div>
      </section>

      <Newsletter />
    </>
  );
};

export default HoroscopePage;
