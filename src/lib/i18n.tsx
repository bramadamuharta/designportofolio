import { createContext, use, useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Language } from '@/content/site';

export const LANGUAGE_STORAGE_KEY = 'brama.lang';

type I18nContextValue = {
  language: Language;
  setLanguage: (next: Language) => void;
  toggleLanguage: () => void;
  /** Picks the right side of a bilingual string. */
  t: (entry: Record<Language, string>) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function readStored(): Language | null {
  try {
    const value = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return value === 'id' || value === 'en' ? value : null;
  } catch {
    return null;
  }
}

/** Indonesian for Indonesian browsers, English for everyone else. */
function preferredLanguage(): Language {
  if (typeof navigator === 'undefined') return 'en';
  return navigator.languages?.some((tag) => tag.toLowerCase().startsWith('id')) ? 'id' : 'en';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en';
    return readStored() ?? preferredLanguage();
  });

  // The lang attribute drives screen-reader pronunciation and hyphenation, so
  // it has to move with the toggle, not just be set once in the HTML.
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
    } catch {
      // Not fatal: the choice simply does not survive a reload.
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((current) => {
      const next: Language = current === 'id' ? 'en' : 'id';
      try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t: (entry) => entry[language],
    }),
    [language, setLanguage, toggleLanguage],
  );

  return <I18nContext value={value}>{children}</I18nContext>;
}

export function useI18n(): I18nContextValue {
  const value = use(I18nContext);
  if (!value) throw new Error('useI18n must be used inside <I18nProvider>');
  return value;
}
