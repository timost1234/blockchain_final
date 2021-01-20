import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "assets/i18n/en.json";
import cn from "assets/i18n/zh-CN.json";
import tw from "assets/i18n/zh-TW.json";

const resources = {
  en: {
    translation: en,
  },
  "zh-CN": {
    translation: cn,
  },
  "zh-TW": {
    translation: tw,
  },
};

i18n
  .use(Backend)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    react: {
      useSuspense: false,
    },
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
