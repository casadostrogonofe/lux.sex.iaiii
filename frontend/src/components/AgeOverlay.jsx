import React, { useState, useEffect } from "react";
import { ShieldCheck, Lock, EyeOff, ArrowRight, LogOut, Sparkles } from "lucide-react";

const STORAGE_KEY = "luxsex_age_ok";

const AgeOverlay = () => {
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
    <div className="fixed inset-0 z-[9999] bg-[#050208] overflow-y-auto">
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
              Acesso Restrito · A Estética do Desejo
            </p>

            <h1 className="font-serif text-[#f5f0ff] text-5xl sm:text-6xl md:text-7xl lg:text-[88px] leading-[0.98] mb-12 lg:mb-16">
              <span className="block">A discrição</span>
              <span className="block italic bg-gradient-to-r from-[#d4af37] via-[#e6c971] to-[#b8956b] bg-clip-text text-transparent">
                como
              </span>
              <span className="block italic bg-gradient-to-r from-[#d4af37] via-[#e6c971] to-[#b8956b] bg-clip-text text-transparent">
                manifesto.
              </span>
            </h1>

            <p className="text-[#a89fc4] text-base md:text-lg leading-[1.75] font-light max-w-lg mb-16 lg:mb-24">
              A <strong className="text-[#f5f0ff] font-medium">Lux.sex</strong> é um ecossistema privado dedicado ao público adulto que entende o prazer como uma extensão do estilo de vida. Plataforma sob curadoria, fechada e construída para quem exige o extraordinário.
            </p>

            {/* Pillars */}
            <div className="grid grid-cols-3 gap-6 md:gap-10 pt-10 border-t border-[#1f1a35]">
              <Pillar number="I" label="Verificação" label2="real" />
              <Pillar number="II" label="100%" label2="discreto" />
              <Pillar number="III" label="Curadoria" label2="premium" />
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
                Verificação de idade
              </p>

              <h2 className="font-serif text-[#f5f0ff] text-4xl md:text-[44px] leading-[1.05] mb-7">
                Conteúdo adulto<br />sob NDA.
              </h2>

              <p className="text-[#9a93b8] text-[15px] leading-[1.65] font-light mb-8">
                Este site contém conteúdo exclusivo para maiores de 18 anos. Ao continuar, você confirma ter 18 anos ou mais e concorda com nossos{" "}
                <a href="#termos" className="text-[#d4af37] underline decoration-[#d4af37]/40 hover:decoration-[#d4af37] underline-offset-2 transition-colors">
                  Termos de Uso
                </a>{" "}
                e{" "}
                <a href="#privacidade" className="text-[#d4af37] underline decoration-[#d4af37]/40 hover:decoration-[#d4af37] underline-offset-2 transition-colors">
                  Política de Privacidade
                </a>
                .
              </p>

              {/* Trust pills */}
              <div className="flex flex-wrap gap-2 mb-9">
                <TrustPill icon={ShieldCheck} label="ECA Digital" />
                <TrustPill icon={Lock} label="LGPD 2026" />
                <TrustPill icon={EyeOff} label="Não indexado" />
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
              >
                <ArrowRight className="w-4 h-4 -rotate-45 group-hover:translate-x-0.5 transition-transform" />
                Tenho 18+ anos — Entrar
              </button>

              <button
                onClick={() => confirm(false)}
                className="w-full mt-5 py-2.5 text-[#7c7893] hover:text-[#9b30ff] text-sm transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sair do site
              </button>

              {/* Footer */}
              <div className="mt-10 pt-6 border-t border-[#1f1a35] flex items-center justify-between text-[9px] tracking-[0.4em] uppercase">
                <span className="text-[#5a5470]">MMXXVI · Lux Society</span>
                <span className="flex items-center gap-2 text-[#5a5470]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3ecf8e] shadow-[0_0_8px_#3ecf8e]" />
                  Conexão Privada
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Pillar = ({ number, label, label2 }) => (
  <div>
    <p className="text-[10px] tracking-[0.4em] text-[#d4af37] uppercase mb-3">
      Pilar {number}
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
