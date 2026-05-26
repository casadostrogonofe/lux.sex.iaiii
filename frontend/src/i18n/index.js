// Lux Novo i18n setup
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import pt from "./locales/pt.json";
import en from "./locales/en.json";
import es from "./locales/es.json";
import it from "./locales/it.json";
import fr from "./locales/fr.json";
import de from "./locales/de.json";

export const SUPPORTED_LANGS = [
  { code: "pt", label: "Português", short: "PT", flag: "🇧🇷" },
  { code: "en", label: "English", short: "EN", flag: "🇬🇧" },
  { code: "es", label: "Español", short: "ES", flag: "🇪🇸" },
  { code: "it", label: "Italiano", short: "IT", flag: "🇮🇹" },
  { code: "fr", label: "Français", short: "FR", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", short: "DE", flag: "🇩🇪" },
];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      pt: { translation: pt },
      en: { translation: en },
      es: { translation: es },
      it: { translation: it },
      fr: { translation: fr },
      de: { translation: de },
    },
    fallbackLng: "pt",
    supportedLngs: SUPPORTED_LANGS.map((l) => l.code),
    nonExplicitSupportedLngs: true, // accept "en-US" -> "en"
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
      lookupLocalStorage: "lux_lang",
    },
  });

export default i18n;
