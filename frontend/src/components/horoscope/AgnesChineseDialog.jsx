import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { AGNES_LOGO, fetchAgnesReading } from "./horoscopeData";

const Section = ({ label, text }) =>
  text ? (
    <div className="flex flex-col gap-1.5">
      <span className="font-['Jost'] text-[10px] uppercase tracking-[0.3em] text-[#d4af37]/85">
        {label}
      </span>
      <p className="font-['Jost'] text-sm font-light leading-relaxed tracking-wide text-[#f4ecdd]/75">
        {text}
      </p>
    </div>
  ) : null;

const AgnesChineseDialog = ({ animal, onClose }) => {
  const { t, i18n } = useTranslation();
  const [reading, setReading] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!animal) return undefined;
    let cancelled = false;
    setReading(null);
    setError(false);
    (async () => {
      try {
        const lang = (i18n.resolvedLanguage || "pt").split("-")[0];
        const data = await fetchAgnesReading("chinese", animal.id, lang);
        if (!cancelled) setReading(data);
      } catch {
        if (!cancelled) setError(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [animal, i18n.resolvedLanguage]);

  return (
    <Dialog open={animal !== null} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-h-[90vh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto border-[#d4af37]/30 bg-[#0b0a1a] p-0 text-[#f4ecdd]"
        data-testid="chinese-zodiac-dialog"
      >
        {animal && (
          <div className="flex flex-col gap-5 p-6 md:p-8">
            <div className="flex items-center gap-5">
              <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/40 bg-[#2a1a5e]/40 font-['Cinzel'] text-4xl text-[#d4af37]">
                {animal.glyph}
              </span>
              <div>
                <p className="font-['Jost'] text-[10px] uppercase tracking-[0.4em] text-[#d4af37]/85">
                  {t("horoscope.agnes.daily_tag", "Leitura do dia")}
                </p>
                <DialogTitle className="mt-2 font-['Cinzel'] text-3xl text-[#f4ecdd]">
                  {animal.name}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  {t("horoscope.agnes.daily_tag", "Leitura do dia")} — {animal.name}
                </DialogDescription>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 border-t border-[#d4af37]/15 pt-5">
              <span className="font-['Jost'] text-[10px] uppercase tracking-[0.3em] text-[#f4ecdd]/50">
                {t("horoscope.chinese_years", "Anos")}
              </span>
              {animal.years.map((year) => (
                <span
                  key={year}
                  className="rounded-full border border-[#d4af37]/40 bg-[#2a1a5e]/30 px-3 py-1 font-['Jost'] text-xs tracking-wide text-[#d4af37]"
                >
                  {year}
                </span>
              ))}
            </div>

            {!reading && !error && (
              <div className="flex flex-col gap-3 py-4" data-testid="chinese-loading">
                <div className="h-3 w-full bg-[#1b1636]" />
                <div className="h-3 w-5/6 bg-[#1b1636]" />
                <div className="h-3 w-2/3 bg-[#1b1636]" />
              </div>
            )}

            {error && (
              <p className="py-4 font-['Jost'] text-sm text-[#f4ecdd]/60" role="alert">
                {t("horoscope.ai.error")}
              </p>
            )}

            {reading && (
              <div className="flex flex-col gap-4 border-t border-[#d4af37]/15 pt-5">
                <p className="font-['Jost'] text-sm leading-relaxed tracking-wide text-[#f4ecdd]/85">
                  {reading.essence}
                </p>
                <Section label={t("horoscope.section.overview", "Panorama")} text={reading.overview} />
                <Section label={t("horoscope.section.love", "Amor")} text={reading.love} />
                <Section label={t("horoscope.section.career", "Carreira")} text={reading.career} />
                <Section label={t("horoscope.section.advice", "Conselho")} text={reading.advice} />
                {(reading.lucky_numbers?.length > 0 || reading.lucky_color) && (
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {(reading.lucky_numbers || []).map((n, i) => (
                      <span
                        key={i}
                        className="flex h-8 min-w-8 items-center justify-center rounded-full border border-[#d4af37]/40 bg-[#2a1a5e]/40 px-2 font-['Cinzel'] text-sm text-[#d4af37]"
                      >
                        {n}
                      </span>
                    ))}
                    {reading.lucky_color && (
                      <span className="font-['Jost'] text-xs tracking-wide text-[#f4ecdd]/70">
                        {t("horoscope.ai.lucky_color", "Cor")}: {reading.lucky_color}
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center gap-3 border-t border-[#d4af37]/15 pt-5">
              <img
                src={AGNES_LOGO}
                alt="Mestre Agnes"
                className="h-8 w-8 rounded-full object-cover border border-[#d4af37]/40"
              />
              <span className="font-['Jost'] text-[10px] uppercase tracking-[0.25em] text-[#f4ecdd]/50">
                {t("horoscope.agnes.updated_by", "Atualizado por Mestre Agnes")}
              </span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AgnesChineseDialog;
