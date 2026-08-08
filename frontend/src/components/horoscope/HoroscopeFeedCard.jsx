import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Sparkles, Loader2, RefreshCw } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const SIGN_KEY = "luxsex_zodiac_sign";

const SIGNS = [
  { id: "aries", symbol: "♈", name: "Áries" },
  { id: "touro", symbol: "♉", name: "Touro" },
  { id: "gemeos", symbol: "♊", name: "Gêmeos" },
  { id: "cancer", symbol: "♋", name: "Câncer" },
  { id: "leao", symbol: "♌", name: "Leão" },
  { id: "virgem", symbol: "♍", name: "Virgem" },
  { id: "libra", symbol: "♎", name: "Libra" },
  { id: "escorpiao", symbol: "♏", name: "Escorpião" },
  { id: "sagitario", symbol: "♐", name: "Sagitário" },
  { id: "capricornio", symbol: "♑", name: "Capricórnio" },
  { id: "aquario", symbol: "♒", name: "Aquário" },
  { id: "peixes", symbol: "♓", name: "Peixes" },
];

const HoroscopeFeedCard = () => {
  const { t, i18n } = useTranslation();
  const [signId, setSignId] = useState(() => localStorage.getItem(SIGN_KEY) || "");
  const [reading, setReading] = useState(null);
  const [loading, setLoading] = useState(false);
  const sign = SIGNS.find((s) => s.id === signId);

  useEffect(() => {
    if (!signId) return;
    let cancelled = false;
    setLoading(true);
    setReading(null);
    (async () => {
      try {
        const lang = (i18n.resolvedLanguage || "pt").split("-")[0];
        const res = await fetch(`${API}/horoscope/daily?sign=${signId}&lang=${lang}`);
        if (!res.ok) throw new Error("bad status");
        const data = await res.json();
        if (!cancelled) setReading(data.reading);
      } catch {
        // silently keep card compact
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [signId, i18n.resolvedLanguage]);

  const pickSign = (id) => {
    localStorage.setItem(SIGN_KEY, id);
    setSignId(id);
  };

  const resetSign = () => {
    localStorage.removeItem(SIGN_KEY);
    setSignId("");
    setReading(null);
  };

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-[#d4af37]/25 bg-[#0a0612] hover:border-[#d4af37]/50 transition-colors duration-500"
      data-testid="horoscope-feed-card"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 85% 15%, rgba(212,175,55,0.12) 0%, transparent 55%), radial-gradient(ellipse at 10% 90%, rgba(155,48,255,0.14) 0%, transparent 55%)",
        }}
      />
      <div className="relative p-6 md:p-8">
        <div className="flex items-center justify-between mb-5">
          <span className="text-[10px] tracking-[0.4em] text-[#d4af37] uppercase flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            {t("horoscope.feed.title")}
          </span>
          {sign && (
            <button
              onClick={resetSign}
              className="flex items-center gap-1.5 text-[9px] tracking-[0.25em] uppercase text-[#7c7893] hover:text-[#9b30ff] transition-colors"
              data-testid="horoscope-feed-change-sign"
            >
              <RefreshCw className="w-3 h-3" />
              {t("horoscope.feed.change")}
            </button>
          )}
        </div>

        {!sign && (
          <>
            <h3 className="font-serif text-2xl md:text-3xl text-[#f5f0ff] mb-6">
              {t("horoscope.feed.pick")}
            </h3>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
              {SIGNS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => pickSign(s.id)}
                  className="group flex flex-col items-center gap-1 py-3 rounded-xl border border-[#1f1a35] hover:border-[#d4af37]/60 hover:-translate-y-0.5 transition-all duration-300"
                  data-testid={`feed-sign-${s.id}`}
                >
                  <span
                    className="text-2xl transition-transform group-hover:scale-110"
                    style={{ color: "#d4af37", textShadow: "0 0 10px rgba(212,175,55,0.45)" }}
                  >
                    {s.symbol}
                  </span>
                  <span className="text-[9px] tracking-[0.15em] text-[#7c7893] uppercase">
                    {s.name}
                  </span>
                </button>
              ))}
            </div>
          </>
        )}

        {sign && (
          <>
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-4xl"
                style={{ color: "#d4af37", textShadow: "0 0 14px rgba(212,175,55,0.55)" }}
              >
                {sign.symbol}
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-[#f5f0ff]">{sign.name}</h3>
            </div>

            {loading && (
              <div className="flex items-center gap-3 py-4" data-testid="horoscope-feed-loading">
                <Loader2 className="w-5 h-5 text-[#9b30ff] animate-spin" />
                <span className="text-[#a89fc4] text-sm font-light">
                  {t("horoscope.ai.consulting")}
                </span>
              </div>
            )}

            {reading && (
              <div data-testid="horoscope-feed-reading">
                <p className="text-[#cfc5e8] text-[15px] leading-[1.75] font-light mb-5">
                  {reading.overview}
                </p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-5">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#7c7893]">
                    {t("horoscope.ai.lucky_color")}:{" "}
                    <span className="text-[#f5f0ff] normal-case tracking-normal font-serif text-sm">
                      {reading.lucky_color}
                    </span>
                  </span>
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#7c7893]">
                    {t("horoscope.ai.lucky_number")}:{" "}
                    <span className="text-[#d4af37] font-serif text-sm">{reading.lucky_number}</span>
                  </span>
                </div>
              </div>
            )}

            <Link
              to="/bem-estar/horoscopo"
              className="inline-flex items-center gap-2 text-[#9b30ff] text-[10px] tracking-[0.3em] uppercase hover:text-[#b15aff] transition-colors"
              data-testid="horoscope-feed-full-link"
            >
              {t("horoscope.feed.full")} →
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default HoroscopeFeedCard;
