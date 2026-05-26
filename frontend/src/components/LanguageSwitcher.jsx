import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Globe, Check } from "lucide-react";
import { SUPPORTED_LANGS } from "../i18n";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const current =
    SUPPORTED_LANGS.find((l) => l.code === i18n.resolvedLanguage) ||
    SUPPORTED_LANGS.find((l) => i18n.resolvedLanguage?.startsWith(l.code)) ||
    SUPPORTED_LANGS[0];

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  const changeLang = (code) => {
    i18n.changeLanguage(code);
    document.documentElement.lang = code;
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="hidden md:flex items-center gap-1.5 text-[#7c7893] hover:text-[#9b30ff] transition-colors"
        aria-label="Choose language"
        data-testid="language-switcher-trigger"
      >
        <Globe className="w-4 h-4" />
        <span className="text-[10px] tracking-[0.2em] uppercase">
          {current.short}
        </span>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 min-w-[180px] bg-[#0b0812] border border-[#1a1526] shadow-2xl shadow-black/60 py-1 z-50 animate-[fadeIn_0.2s_ease]"
          data-testid="language-switcher-menu"
        >
          {SUPPORTED_LANGS.map((l) => {
            const active = l.code === current.code;
            return (
              <button
                key={l.code}
                onClick={() => changeLang(l.code)}
                data-testid={`language-option-${l.code}`}
                className={`w-full text-left px-4 py-2.5 text-[11px] tracking-[0.2em] uppercase transition-colors flex items-center justify-between gap-2 ${
                  active
                    ? "text-[#9b30ff] bg-[#110e1a]"
                    : "text-[#f5f0ff] hover:text-[#9b30ff] hover:bg-[#110e1a]"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-base leading-none">{l.flag}</span>
                  <span>{l.label}</span>
                </span>
                {active && <Check className="w-3 h-3 text-[#9b30ff]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
