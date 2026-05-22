import React, { useState, useEffect } from "react";
import { LOGO_IAIII } from "../mock/mockData";

const AgeOverlay = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const ok = localStorage.getItem("luxsex_age_ok");
    if (ok === "1") setVisible(false);
  }, []);

  const confirm = (yes) => {
    if (yes) {
      localStorage.setItem("luxsex_age_ok", "1");
      setVisible(false);
    } else {
      window.location.href = "https://google.com";
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md px-6">
      <div className="max-w-xl w-full text-center">
        <div className="flex items-center justify-center gap-3 mb-10">
          <img src={LOGO_IAIII} alt="lux" className="h-12 w-12 object-contain" />
          <span className="font-serif text-3xl tracking-[0.25em]">
            <span className="text-[#f5f0ff]">LUX</span>
            <span className="text-[#9b30ff]">.SEX</span>
          </span>
        </div>

        <p className="text-xs tracking-[0.4em] text-[#9b30ff] uppercase mb-4">
          Verificação de idade
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-[#f5f0ff] mb-6 leading-tight">
          Conteúdo adulto sob NDA.
        </h2>
        <p className="text-[#7c7893] text-sm md:text-base mb-10 leading-relaxed max-w-md mx-auto">
          Este site contém conteúdo exclusivo para maiores de 18 anos. Ao continuar, você confirma ter 18 anos ou mais e concorda com nossos{" "}
          <span className="text-[#9b30ff] underline cursor-pointer">Termos de Uso</span> e{" "}
          <span className="text-[#9b30ff] underline cursor-pointer">Política de Privacidade</span>.
        </p>

        <div className="flex items-center justify-center gap-4 text-[10px] tracking-[0.3em] text-[#5a5470] uppercase mb-8">
          <span>ECA Digital</span>
          <span className="w-1 h-1 rounded-full bg-[#5a5470]" />
          <span>LGPD 2026</span>
          <span className="w-1 h-1 rounded-full bg-[#5a5470]" />
          <span>Não indexado</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => confirm(true)}
            className="px-8 py-4 bg-[#9b30ff] hover:bg-[#b15aff] text-black font-medium tracking-[0.2em] text-sm uppercase transition-colors duration-300"
          >
            Tenho 18+ anos — Entrar
          </button>
          <button
            onClick={() => confirm(false)}
            className="px-8 py-4 border border-[#1a1526] hover:border-[#9b30ff] text-[#7c7893] hover:text-[#9b30ff] tracking-[0.2em] text-sm uppercase transition-colors duration-300"
          >
            Sair do site
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgeOverlay;
