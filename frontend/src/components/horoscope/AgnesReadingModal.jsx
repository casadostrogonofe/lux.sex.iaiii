import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { X, Sparkles, RefreshCw, ExternalLink } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL || ""}/api`;
const AGNES_SITE = "https://frontend-nu-opal-d1fi47s48v.vercel.app";
const AGNES_LOGO = "/agnes-logo.jpeg";

const AgnesReadingModal = ({ item, onClose }) => {
  const { t, i18n } = useTranslation();
  const [reading, setReading] = useState(null);
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setReading(null);
    setError(false);
    (async () => {
      try {
        const lang = (i18n.resolvedLanguage || "pt").split("-")[0];
        const res = await fetch(
          `${API}/horoscope/agnes?system=${item.system}&sign=${item.id}&lang=${lang}`,
        );
        if (!res.ok) throw new Error("bad status");
        const data = await res.json();
        if (!cancelled) setReading(data.reading);
      } catch {
        if (!cancelled) setError(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [item.system, item.id, i18n.resolvedLanguage, reloadKey]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-[90] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
      data-testid="agnes-reading-modal"
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 6 }}
        transition={{ duration: 0.22 }}
        className="w-full max-w-xl bg-[#0b0812] border border-[#1f1a35] max-h-[88vh] overflow-y-auto rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between px-7 pt-7 pb-4">
          <div>
            <span className="text-[9px] tracking-[0.4em] text-[#d4af37] uppercase flex items-center gap-2">
              <Sparkles className="w-3 h-3" />
              {t("horoscope.agnes.daily_tag", "Leitura do dia")}
            </span>
            <h2 className="font-serif text-3xl text-[#f5f0ff] mt-3 flex items-center gap-3">
              <span
                style={{
                  color: "#d4af37",
                  textShadow: "0 0 14px rgba(212,175,55,0.55)",
                }}
              >
                {item.symbol}
              </span>
              {item.name}
            </h2>
            {item.dates && (
              <span className="text-[10px] tracking-[0.25em] text-[#7c7893] uppercase">
                {item.dates}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-[#7c7893] hover:text-[#9b30ff] transition-colors p-1"
            data-testid="close-agnes-reading"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-7 pb-7">
          {!reading && !error && (
            <div
              className="space-y-3 py-14"
              data-testid="agnes-reading-loading"
              role="status"
              aria-label={t("horoscope.ai.consulting")}
            >
              <div className="h-3 w-full bg-[#1b1427]" />
              <div className="h-3 w-5/6 bg-[#1b1427]" />
              <div className="h-3 w-2/3 bg-[#1b1427]" />
            </div>
          )}

          {error && (
            <div
              className="py-10 text-center"
              data-testid="agnes-reading-error"
              role="alert"
            >
              <p className="text-[#a89fc4] text-sm">{t("horoscope.ai.error")}</p>
              <button
                type="button"
                onClick={() => setReloadKey((value) => value + 1)}
                className="mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#9b30ff] transition-colors duration-150 hover:text-[#b15aff]"
                data-testid="agnes-reading-retry-button"
              >
                <RefreshCw className="h-3 w-3" aria-hidden="true" />
                {t("horoscope.feed.full")}
              </button>
            </div>
          )}

          {reading && (
            <div className="space-y-6" data-testid="agnes-reading-content">
              <p className="text-[#cfc5e8] text-[15px] leading-[1.8] font-light">
                {reading.message}
              </p>

              <div className="flex gap-6 pt-4 border-t border-[#1f1a35]">
                {reading.lucky_color && (
                  <div>
                    <span className="text-[9px] tracking-[0.3em] text-[#7c7893] uppercase block">
                      {t("horoscope.ai.lucky_color")}
                    </span>
                    <span className="text-[#f5f0ff] text-sm font-serif">
                      {reading.lucky_color}
                    </span>
                  </div>
                )}
                {reading.lucky_number && (
                  <div>
                    <span className="text-[9px] tracking-[0.3em] text-[#7c7893] uppercase block">
                      {t("horoscope.ai.lucky_number")}
                    </span>
                    <span className="text-[#d4af37] text-sm font-serif">
                      {reading.lucky_number}
                    </span>
                  </div>
                )}
              </div>

              <a
                href={`${AGNES_SITE}/#pagamento`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#9b30ff] text-[11px] tracking-[0.3em] uppercase hover:text-[#b15aff] transition-colors"
                data-testid="agnes-full-consult-link"
              >
                {t("horoscope.agnes.full_consult", "Consulta completa com o Mestre")}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-[#1f1a35] flex items-center gap-3">
            <img
              src={AGNES_LOGO}
              alt="Mestre Agnes"
              className="w-9 h-9 rounded-full object-cover border border-[#d4af37]/40"
            />
            <span className="text-[10px] tracking-[0.25em] text-[#7c7893] uppercase">
              {t("horoscope.agnes.updated_by", "Atualizado por Mestre Agnes")}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AgnesReadingModal;
