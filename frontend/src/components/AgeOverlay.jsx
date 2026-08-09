import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ShieldCheck, Lock, EyeOff, ArrowRight, LogOut, Sparkles } from "lucide-react";

const STORAGE_KEY = "luxsex_age_ok";

const AgeOverlay = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const ok = localStorage.getItem(STORAGE_KEY);
    if (ok !== "1") setVisible(true);
    setMounted(true);
  }, []);

  const confirm = (yes) => {
    if (yes) {
      localStorage.setItem(STORAGE_KEY, "1");
      setVisible(false);
    } else {
      window.location.href = "https://google.com";
    }
  };

  if (!mounted || !visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-[#050208] overflow-y-auto"
      data-testid="age-gate-overlay"
    >
      {/* Ambient purple radial behind everything */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 25% 50%, rgba(75, 22, 130, 0.55), transparent 60%), radial-gradient(ellipse 50% 40% at 80% 60%, rgba(155, 48, 255, 0.18), transparent 70%)",
        }}
      />

      <div className="relative min-h-screen grid lg:grid-cols-2">
        {/* ===================== LEFT — MANIFESTO ===================== */}
        <div className="relative flex items-center px-8 md:px-16 lg:px-24 py-16 lg:py-0 overflow-hidden">
          {/* Corner bracket ornament */}
          <div className="absolute top-10 left-6 md:top-14 md:left-12">
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              className="opacity-80"
            >
              <path
                d="M 4 30 L 4 4 L 30 4"
                stroke="#d4af37"
                strokeWidth="1"
                strokeLinecap="square"
              />
            </svg>
          </div>

          <div className="relative max-w-xl w-full pt-20 lg:pt-0">
            <p className="text-[10px] md:text-[11px] tracking-[0.4em] text-[#d4af37] uppercase mb-10 md:mb-16">
              {t("nda_overlay.access")}
            </p>

            <h1 className="font-serif text-[#f5f0ff] text-5xl sm:text-6xl md:text-7xl lg:text-[88px] leading-[0.98] mb-12 lg:mb-16">
              <span className="block">{t("nda_overlay.h1_line1")}</span>
              <span className="block italic bg-gradient-to-r from-[#d4af37] via-[#e6c971] to-[#b8956b] bg-clip-text text-transparent">
                {t("nda_overlay.h1_line2")}
              </span>
              <span className="block italic bg-gradient-to-r from-[#d4af37] via-[#e6c971] to-[#b8956b] bg-clip-text text-transparent">
                {t("nda_overlay.h1_line3")}
              </span>
            </h1>

            <p
              className="text-[#a89fc4] text-base md:text-lg leading-[1.75] font-light max-w-lg mb-16 lg:mb-24"
              dangerouslySetInnerHTML={{ __html: t("nda_overlay.manifest") }}
            />

            {/* Pillars */}
            <div className="grid grid-cols-3 gap-6 md:gap-10 pt-10 border-t border-[#1f1a35]">
              <Pillar number="I" label={t("nda_overlay.pillar1_l1")} label2={t("nda_overlay.pillar1_l2")} t={t} />
              <Pillar number="II" label={t("nda_overlay.pillar2_l1")} label2={t("nda_overlay.pillar2_l2")} t={t} />
              <Pillar number="III" label={t("nda_overlay.pillar3_l1")} label2={t("nda_overlay.pillar3_l2")} t={t} />
            </div>
          </div>
        </div>

        {/* ===================== RIGHT — NDA CARD ===================== */}
        <div className="relative flex items-center justify-center px-6 md:px-12 lg:px-16 py-16">
          <div className="absolute inset-0 pointer-events-none lg:bg-gradient-to-l lg:from-black/40 lg:to-transparent" />

          <div className="relative w-full max-w-md">
            {/* Card glow */}
            <div
              className="absolute -inset-px rounded-[28px] opacity-40 blur-2xl pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, #9b30ff 0%, transparent 50%, #d4af37 100%)",
              }}
            />

            <div className="relative bg-[#0a0612]/95 backdrop-blur-xl border border-[#1f1a35] rounded-[28px] p-8 md:p-10 shadow-2xl shadow-black/60">
              {/* Logo */}
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-xl border border-[#2a2342] bg-[#110a1f] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#d4af37]" strokeWidth={1.5} />
                </div>
                <span className="font-serif text-xl tracking-[0.18em]">
                  <span className="text-[#f5f0ff]">LUX</span>
                  <span className="text-[#d4af37]">.SEX</span>
                </span>
              </div>

              <p className="text-[10px] md:text-[11px] tracking-[0.4em] text-[#d4af37] uppercase mb-6">
                {t("nda_overlay.verify")}
              </p>

              <h2
                className="font-serif text-[#f5f0ff] text-4xl md:text-[44px] leading-[1.05] mb-7"
                dangerouslySetInnerHTML={{ __html: t("nda_overlay.card_title") }}
              />

              <p
                className="text-[#9a93b8] text-[15px] leading-[1.65] font-light mb-8"
                dangerouslySetInnerHTML={{ __html: t("nda_overlay.card_body") }}
              />

              {/* Trust pills */}
              <div className="flex flex-wrap gap-2 mb-9">
                <TrustPill icon={ShieldCheck} label={t("nda_overlay.pill1")} />
                <TrustPill icon={Lock} label={t("nda_overlay.pill2")} />
                <TrustPill icon={EyeOff} label={t("nda_overlay.pill3")} />
              </div>

              {/* Primary CTA with glow */}
              <button
                onClick={() => confirm(true)}
                className="group relative w-full py-4 px-6 rounded-2xl text-white text-[15px] font-medium tracking-wide transition-transform duration-300 active:scale-[0.99] flex items-center justify-center gap-2.5 overflow-hidden"
                style={{
                  background:
                    "linear-gradient(180deg, #b15aff 0%, #9b30ff 50%, #7a18d8 100%)",
                  boxShadow:
                    "0 0 32px rgba(155, 48, 255, 0.55), 0 8px 28px rgba(155, 48, 255, 0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
                }}
                data-testid="age-gate-enter-button"
              >
                <ArrowRight className="w-4 h-4 -rotate-45 group-hover:translate-x-0.5 transition-transform" />
                {t("nda_overlay.enter_button")}
              </button>

              <button
                onClick={() => confirm(false)}
                className="w-full mt-5 py-2.5 text-[#7c7893] hover:text-[#9b30ff] text-sm transition-colors flex items-center justify-center gap-2"
                data-testid="age-gate-exit-button"
              >
                <LogOut className="w-3.5 h-3.5" />
                {t("nda_overlay.exit_button")}
              </button>

              {/* Footer */}
              <div className="mt-10 pt-6 border-t border-[#1f1a35] flex items-center justify-between text-[9px] tracking-[0.4em] uppercase">
                <span className="text-[#5a5470]">MMXXVI · Lux Society</span>
                <span className="flex items-center gap-2 text-[#5a5470]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3ecf8e] shadow-[0_0_8px_#3ecf8e]" />
                  {t("nda_overlay.private_conn")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Pillar = ({ number, label, label2, t }) => (
  <div>
    <p className="text-[10px] tracking-[0.4em] text-[#d4af37] uppercase mb-3">
      {t ? t("nda_overlay.pillar")  : "Pilar"} {number}
    </p>
    <p className="font-serif text-[#f5f0ff] text-xl md:text-2xl leading-tight">
      {label}
    </p>
    <p className="font-serif text-[#f5f0ff] text-xl md:text-2xl leading-tight">
      {label2}
    </p>
  </div>
);

const TrustPill = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#2a2342] bg-[#0f0a1c] text-[10px] tracking-[0.25em] text-[#9a93b8] uppercase">
    <Icon className="w-3 h-3 text-[#d4af37]" strokeWidth={1.8} />
    {label}
  </div>
);

export default AgeOverlay;
