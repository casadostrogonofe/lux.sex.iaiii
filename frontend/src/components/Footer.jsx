import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LOGO_IAIII } from "../mock/mockData";

const Footer = () => (
  <footer className="bg-black border-t border-[#1a1526] pt-20 pb-10">
    <div className="max-w-[1400px] mx-auto px-6 md:px-10">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <img src={LOGO_IAIII} alt="lux" className="h-11 w-11 object-contain" />
            <span className="font-serif text-2xl tracking-[0.2em]">
              <span className="text-[#f5f0ff]">LUX</span>
              <span className="text-[#9b30ff]">.SEX</span>
            </span>
          </div>
          <p className="text-[#7c7893] text-sm leading-relaxed max-w-md font-light">
            Plataforma premium de entretenimento adulto. Curadoria editorial Lux Society. Acesso restrito (18+), conteúdo não indexado.
          </p>
        </div>

        {/* Links */}
        <div>
          <h5 className="text-[10px] tracking-[0.5em] text-[#9b30ff] uppercase mb-5">
            Editorial
          </h5>
          <ul className="space-y-3 text-sm text-[#7c7893]">
            {["Sensualidade", "Bem-estar", "Vinhos & Charutos", "Viagens", "Cultura"].map((x) => (
              <li key={x}>
                <a href="#" className="hover:text-[#9b30ff] transition-colors">{x}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="text-[10px] tracking-[0.5em] text-[#9b30ff] uppercase mb-5">
            Institucional
          </h5>
          <ul className="space-y-3 text-sm text-[#7c7893]">
            {["Sobre a Lux", "Manifesto", "Termos de Uso", "Privacidade (LGPD)", "Contato"].map((x) => (
              <li key={x}>
                <a href="#" className="hover:text-[#9b30ff] transition-colors">{x}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-10 border-t border-[#1a1526]">
        <div className="flex items-center gap-3 text-[10px] tracking-[0.4em] text-[#5a5470] uppercase">
          <span>MMXXVI</span>
          <span className="w-1 h-1 rounded-full bg-[#5a5470]" />
          <span>Lux Society</span>
          <span className="w-1 h-1 rounded-full bg-[#5a5470]" />
          <span>Conexão Privada</span>
        </div>
        <div className="flex items-center gap-4 text-[10px] tracking-[0.4em] text-[#5a5470] uppercase">
          <span>ECA Digital</span>
          <span>·</span>
          <span>LGPD</span>
          <span>·</span>
          <span>Não indexado</span>
        </div>
      </div>
    </div>
  </footer>
);

export const CookieBanner = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const ok = localStorage.getItem("luxsex_cookies");
    if (ok !== "1") setTimeout(() => setShow(true), 1200);
  }, []);
  if (!show) return null;
  const accept = () => {
    localStorage.setItem("luxsex_cookies", "1");
    setShow(false);
  };
  return (
    <div
      className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-40 bg-[#0b0812] border border-[#1a1526] p-6 shadow-2xl"
      data-testid="cookie-banner"
    >
      <h6 className="font-serif text-lg text-[#f5f0ff] mb-2">
        {t("cookies.title")}
      </h6>
      <p className="text-[#7c7893] text-xs leading-relaxed mb-5 font-light">
        {t("cookies.text")}
      </p>
      <button
        onClick={accept}
        className="w-full px-6 py-3 bg-[#9b30ff] hover:bg-[#b15aff] text-black text-[10px] tracking-[0.4em] uppercase font-medium transition-colors"
        data-testid="cookie-accept"
      >
        {t("cookies.accept")}
      </button>
    </div>
  );
};

export default Footer;
