import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../ui/dialog";
import { AGNES_LOGO, AGNES_PLANS, fetchAgnesReading } from "./horoscopeData";

const Section = ({ label, text }) =>
  text ? (
    <div className="flex flex-col gap-1.5" data-testid={`sign-section-${label}`}>
      <span className="font-['Jost'] text-[10px] uppercase tracking-[0.3em] text-[#d4af37]/85">
        {label}
      </span>
      <p className="font-['Jost'] text-sm font-light leading-relaxed tracking-wide text-[#f4ecdd]/75">
        {text}
      </p>
    </div>
  ) : null;

const AgnesSignDialog = ({ sign, onClose }) => {
  const { t, i18n } = useTranslation();
  const [reading, setReading] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!sign) return undefined;
    let cancelled = false;
    setReading(null);
    setError(false);
    (async () => {
      try {
        const lang = (i18n.resolvedLanguage || "pt").split("-")[0];
        const data = await fetchAgnesReading("western", sign.id, lang);
        if (!cancelled) setReading(data);
      } catch {
        if (!cancelled) setError(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [sign, i18n.resolvedLanguage]);

  return (
    <Dialog open={sign !== null} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-h-[90vh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto border-[#d4af37]/30 bg-[#0b0a1a] p-0 text-[#f4ecdd]"
        data-testid="sign-horoscope-dialog"
      >
        {sign && (
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,280px)_minmax(0,1fr)]">
            <div className="relative hidden md:block">
              <img
                src={sign.img}
                alt={sign.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0b0a1a]/70" />
            </div>

            <div className="flex flex-col gap-5 p-6 md:p-8">
              <div>
                <p className="font-['Jost'] text-[10px] uppercase tracking-[0.4em] text-[#d4af37]/85">
                  {t("horoscope.agnes.daily_tag", "Leitura do dia")}
                </p>
                <DialogTitle className="mt-2 font-['Cinzel'] text-3xl text-[#f4ecdd]">
                  {sign.name}
                </DialogTitle>
                <p className="mt-1 font-['Jost'] text-[11px] uppercase tracking-[0.3em] text-[#f4ecdd]/50">
                  {sign.range}
                </p>
              </div>

              {!reading && !error && (
                <div className="flex flex-col gap-3 py-6" data-testid="sign-loading">
                  <div className="h-3 w-full bg-[#1b1636]" />
                  <div className="h-3 w-5/6 bg-[#1b1636]" />
                  <div className="h-3 w-2/3 bg-[#1b1636]" />
                </div>
              )}

              {error && (
                <p className="py-6 font-['Jost'] text-sm text-[#f4ecdd]/60" role="alert">
                  {t("horoscope.ai.error")}
                </p>
              )}

              {reading && (
                <>
                  <div className="flex flex-col gap-3 border-t border-[#d4af37]/15 pt-5">
                    <p className="font-['Jost'] text-sm leading-relaxed tracking-wide text-[#f4ecdd]/85">
                      {reading.essence}
                    </p>
                    <div className="mt-2 flex flex-col gap-4">
                      <Section label={t("horoscope.section.overview", "Panorama")} text={reading.overview} />
                      <Section label={t("horoscope.section.love", "Amor")} text={reading.love} />
                      <Section label={t("horoscope.section.career", "Carreira")} text={reading.career} />
                      <Section label={t("horoscope.section.advice", "Conselho")} text={reading.advice} />
                    </div>
                  </div>

                  {(reading.lucky_numbers?.length > 0 || reading.lucky_color) && (
                    <div className="flex flex-wrap items-center gap-3 border-t border-[#d4af37]/15 pt-5">
                      <span className="font-['Jost'] text-[10px] uppercase tracking-[0.3em] text-[#f4ecdd]/50">
                        {t("horoscope.ai.lucky_number", "Números da sorte")}
                      </span>
                      {(reading.lucky_numbers || []).map((n, i) => (
                        <span
                          key={i}
                          className="flex h-8 min-w-8 items-center justify-center rounded-full border border-[#d4af37]/40 bg-[#2a1a5e]/40 px-2 font-['Cinzel'] text-sm text-[#d4af37]"
                        >
                          {n}
                        </span>
                      ))}
                      {reading.lucky_color && (
                        <span className="ml-2 font-['Jost'] text-xs tracking-wide text-[#f4ecdd]/70">
                          {t("horoscope.ai.lucky_color", "Cor")}: {reading.lucky_color}
                        </span>
                      )}
                    </div>
                  )}
                </>
              )}

              <div className="mt-auto flex items-center gap-3 border-t border-[#d4af37]/15 pt-5">
                <img
                  src={AGNES_LOGO}
                  alt="Mestre Agnes"
                  className="h-8 w-8 rounded-full object-cover border border-[#d4af37]/40"
                />
                <span className="font-['Jost'] text-[10px] uppercase tracking-[0.25em] text-[#f4ecdd]/50">
                  {t("horoscope.agnes.updated_by", "Atualizado por Mestre Agnes")}
                </span>
              </div>

              <a
                href={AGNES_PLANS}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#d4af37] px-7 py-3.5 font-['Jost'] text-[11px] uppercase tracking-[0.3em] text-[#0b0a1a] transition-colors hover:bg-[#e8c96a]"
                data-testid="sign-cta"
              >
                {t("horoscope.agnes.full_consult", "Consulta completa com o Mestre")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AgnesSignDialog;
