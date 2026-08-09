import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Sparkles, ChevronRight } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { fetchArticlesByPath } from "../sanity/articles";
import { menuLabel } from "../i18n/menuMap";
import PartnersSidebar from "../components/PartnersSidebar";
import Newsletter from "../components/Newsletter";
import DailyReadingModal from "../components/horoscope/DailyReadingModal";
import PersonalReading from "../components/horoscope/PersonalReading";

const SECTION_PATH = "bem-estar/horoscopo";

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

const HoroscopePage = () => {
  const { t, i18n } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [selectedSign, setSelectedSign] = useState(null);

  useEffect(() => {
    (async () => {
      const lang = (i18n.resolvedLanguage || "pt").split("-")[0];
      const data = await fetchArticlesByPath(SECTION_PATH, lang);
      setPosts(data || []);
    })();
  }, [i18n.resolvedLanguage]);

  // Map each sign to its most recent article (matched by `sign` field or by name in slug)
  const signArticleMap = useMemo(() => {
    const map = {};
    for (const sign of SIGNS) {
      // Match by sign symbol, name, or id present in fields
      const match = posts.find((p) => {
        const sig = (p.sign || "").toLowerCase();
        if (sig === sign.symbol) return true;
        if (sig === sign.id) return true;
        if (sig.includes(sign.name.toLowerCase())) return true;
        if ((p.slug || "").toLowerCase().includes(sign.id)) return true;
        return false;
      });
      map[sign.id] = match || null;
    }
    return map;
  }, [posts]);

  const sectionLabel = menuLabel(t, "/bem-estar", "Bem Estar");
  const subLabel = menuLabel(t, "/" + SECTION_PATH, "Horóscopo");

  return (
    <>
      {/* ============ HEADER ============ */}
      <section className="relative pt-32 pb-16 border-b border-[#1a1526] overflow-hidden">
        {/* Cosmic backdrop */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(155,48,255,0.18) 0%, transparent 55%), radial-gradient(ellipse at 70% 80%, rgba(212,175,55,0.12) 0%, transparent 60%), #050208",
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
          <p className="text-[#a89fc4] text-lg max-w-2xl leading-[1.7] font-light">
            {t("horoscope.subtitle")}
          </p>
        </div>
      </section>

      {/* ============ 12 SIGN CARDS ============ */}
      <section className="py-16">
        <div className="max-w-[1340px] mx-auto px-4 md:px-6 lg:px-10 flex flex-col lg:flex-row gap-10 lg:justify-center">
          <div className="flex-1 lg:max-w-[900px]">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
              {SIGNS.map((s) => {
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedSign(s)}
                    className="group relative block w-full aspect-square overflow-hidden rounded-2xl border bg-[#0a0612] text-center p-4 md:p-6 transition-[transform,border-color] duration-300 border-[#1f1a35] hover:border-[#9b30ff]/60 hover:-translate-y-1 cursor-pointer"
                    data-testid={`horoscope-sign-${s.id}`}
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
                      <span className="mt-3 text-[8px] tracking-[0.3em] uppercase text-[#9b30ff]">
                        {t("horoscope.open_reading")}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
            <PersonalReading />
          </div>
          <PartnersSidebar />
        </div>
      </section>

      <AnimatePresence>
        {selectedSign && (
          <DailyReadingModal
            sign={selectedSign}
            article={signArticleMap[selectedSign.id]}
            onClose={() => setSelectedSign(null)}
          />
        )}
      </AnimatePresence>

      <Newsletter />
    </>
  );
};

export default HoroscopePage;
