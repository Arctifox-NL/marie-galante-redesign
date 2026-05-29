import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import nl from "./locales/nl.json";
import en from "./locales/en.json";
import de from "./locales/de.json";

if (!i18n.isInitialized) {
  const base = i18n.use(initReactI18next);
  const withDetector = typeof window !== "undefined" ? base.use(LanguageDetector) : base;
  withDetector.init({
    resources: {
      nl: { translation: nl },
      en: { translation: en },
      de: { translation: de },
    },
    fallbackLng: "nl",
    lng: typeof window === "undefined" ? "nl" : undefined,
    supportedLngs: ["nl", "en", "de"],
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "mg_lang",
      caches: ["localStorage"],
    },
    react: { useSuspense: false },
  });
}

export default i18n;