import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { AGNES_LOGO, fetchAgnesReading } from "./horoscopeData";
import ShareRow from "./ShareRow";

const Section = ({ id, label, text }) =>
  text ? (
    <div className="flex flex-col gap-1.5" data-testid={`chinese-section-${id}`}>
      <span className="text-[10px] uppercase tracking-[0.3em] text-[#9b30ff]">
        {label}
      </span>
      <p className="text-sm font-light leading-relaxed text-[#cfc5e8]">{text}</p>
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

  const shareUrl = animal
    ? `${window.location.origin}/bem-estar/horoscopo?animal=${animal.id}`
    : "";

  return (
    <Dialog open={animal !== null} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-h-[90vh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto border-[#1f1a35] bg-[#0b0812] p-6 text-[#f5f0ff] md:p-8"
        data-testid="chinese-zodiac-dialog"
      >
        {animal && (
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-5">
              <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/40 bg-[#12091f] font-serif text-4xl text-[#d4af37]">
                {animal.glyph}
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-[#d4af37]">
                  {t("horoscope.agnes.daily_tag", "Leitura do dia")}
                </p>
                <DialogTitle className="mt-2 font-serif text-3xl text-[#f5f0ff]">
                  {animal.name}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  {t("horoscope.agnes.daily_tag", "Leitura do dia")} — {animal.name}
                </DialogDescription>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 border-t border-[#1f1a35] pt-5">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#7c7893]">
                {t("horoscope.chinese_years", "Anos")}
              </span>
              {animal.years.map((year) => (
                <span
                  key={year}
                  className="rounded-full border border-[#d4af37]/40 bg-[#12091f] px-3 py-1 text-xs text-[#d4af37]"
                >
                  {year}
                </span>
              ))}
            </div>

            {!reading && !error && (
              <div className="flex flex-col gap-3 py-4" data-testid="chinese-loading">
                <div className="h-3 w-full bg-[#1b1427]" />
                <div className="h-3 w-5/6 bg-[#1b1427]" />
                <div className="h-3 w-2/3 bg-[#1b1427]" />
              </div>
            )}

            {error && (
              <p className="py-4 text-sm text-[#a89fc4]" role="alert">
                {t("horoscope.ai.error")}
              </p>
            )}

            {reading && (
              <div className="flex flex-col gap-4 border-t border-[#1f1a35] pt-5">
                <p className="text-sm leading-relaxed text-[#e6dffb]">
                  {reading.essence}
                </p>
                <Section id="overview" label={t("horoscope.section.overview", "Panorama")} text={reading.overview} />
                <Section id="love" label={t("horoscope.section.love", "Amor")} text={reading.love} />
                <Section id="career" label={t("horoscope.section.career", "Carreira")} text={reading.career} />
                <Section id="advice" label={t("horoscope.section.advice", "Conselho")} text={reading.advice} />
                {(reading.lucky_numbers?.length > 0 || reading.lucky_color) && (
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {(reading.lucky_numbers || []).map((n, i) => (
                      <span
                        key={i}
                        className="flex h-8 min-w-8 items-center justify-center rounded-full border border-[#d4af37]/40 bg-[#12091f] px-2 font-serif text-sm text-[#d4af37]"
                      >
                        {n}
                      </span>
                    ))}
                    {reading.lucky_color && (
                      <span className="text-xs text-[#a89fc4]">
                        {t("horoscope.ai.lucky_color", "Cor")}: {reading.lucky_color}
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="border-t border-[#1f1a35] pt-5">
              <ShareRow
                shareUrl={shareUrl}
                shareText={`${animal.name} — ${t("horoscope.agnes.daily_tag", "Leitura do dia")} · Mestre Agnes`}
              />
            </div>

            <div className="flex items-center gap-3">
              <img
                src={AGNES_LOGO}
                alt="Mestre Agnes"
                className="h-8 w-8 rounded-full border border-[#d4af37]/40 object-cover"
              />
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#7c7893]">
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
