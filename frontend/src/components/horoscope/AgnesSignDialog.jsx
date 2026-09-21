import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { AGNES_LOGO, AGNES_PLANS, fetchAgnesReading } from "./horoscopeData";
import ShareRow from "./ShareRow";

const Section = ({ id, label, text }) =>
  text ? (
    <div className="flex flex-col gap-1.5" data-testid={`sign-section-${id}`}>
      <span className="text-[10px] uppercase tracking-[0.3em] text-[#9b30ff]">
        {label}
      </span>
      <p className="text-sm font-light leading-relaxed text-[#cfc5e8]">{text}</p>
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

  const shareUrl = sign
    ? `${window.location.origin}/bem-estar/horoscopo?signo=${sign.id}`
    : "";

  return (
    <Dialog open={sign !== null} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-h-[90vh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto border-[#1f1a35] bg-[#0b0812] p-0 text-[#f5f0ff]"
        data-testid="sign-horoscope-dialog"
      >
        {sign && (
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,260px)_minmax(0,1fr)]">
            <div className="relative hidden md:block">
              <img src={sign.img} alt={sign.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0b0812]/80" />
            </div>

            <div className="flex flex-col gap-5 p-6 md:p-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-[#d4af37]">
                  {t("horoscope.agnes.daily_tag", "Leitura do dia")}
                </p>
                <DialogTitle className="mt-2 font-serif text-3xl text-[#f5f0ff]">
                  {sign.name}
                </DialogTitle>
                <DialogDescription className="mt-1 text-[11px] uppercase tracking-[0.3em] text-[#7c7893]">
                  {sign.range}
                </DialogDescription>
              </div>

              {!reading && !error && (
                <div className="flex flex-col gap-3 py-6" data-testid="sign-loading">
                  <div className="h-3 w-full bg-[#1b1427]" />
                  <div className="h-3 w-5/6 bg-[#1b1427]" />
                  <div className="h-3 w-2/3 bg-[#1b1427]" />
                </div>
              )}

              {error && (
                <p className="py-6 text-sm text-[#a89fc4]" role="alert">
                  {t("horoscope.ai.error")}
                </p>
              )}

              {reading && (
                <>
                  <div className="flex flex-col gap-4 border-t border-[#1f1a35] pt-5">
                    <p className="text-sm leading-relaxed text-[#e6dffb]">
                      {reading.essence}
                    </p>
                    <Section id="overview" label={t("horoscope.section.overview", "Panorama")} text={reading.overview} />
                    <Section id="love" label={t("horoscope.section.love", "Amor")} text={reading.love} />
                    <Section id="career" label={t("horoscope.section.career", "Carreira")} text={reading.career} />
                    <Section id="advice" label={t("horoscope.section.advice", "Conselho")} text={reading.advice} />
                  </div>

                  {(reading.lucky_numbers?.length > 0 || reading.lucky_color) && (
                    <div className="flex flex-wrap items-center gap-3 border-t border-[#1f1a35] pt-5">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-[#7c7893]">
                        {t("horoscope.ai.lucky_number", "Números da sorte")}
                      </span>
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
                </>
              )}

              <div className="border-t border-[#1f1a35] pt-5">
                <ShareRow shareUrl={shareUrl} shareText={`${sign.name} — ${t("horoscope.agnes.daily_tag", "Leitura do dia")} · Mestre Agnes`} />
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

              <a
                href={AGNES_PLANS}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#9b30ff] px-7 py-3.5 text-[11px] uppercase tracking-[0.3em] text-white transition-colors hover:bg-[#8420e8]"
                data-testid="sign-cta"
              >
                {t("horoscope.agnes.full_consult", "Consulta completa com o Mestre")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AgnesSignDialog;
