import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { en, ar, type Dictionary } from "./translations";

export type Lang = "en" | "ar";

const dictionaries: Record<Lang, Dictionary> = { en, ar };

type I18nValue = {
  lang: Lang;
  dir: "ltr" | "rtl";
  t: Dictionary;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
};

const I18nContext = createContext<I18nValue | null>(null);

const STORAGE_KEY = "meral-lang";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "ar" || stored === "en") setLangState(stored);
  }, []);

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  const value: I18nValue = {
    lang,
    dir: lang === "ar" ? "rtl" : "ltr",
    t: dictionaries[lang],
    setLang,
    toggleLang: () => setLang(lang === "en" ? "ar" : "en"),
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
