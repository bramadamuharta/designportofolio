import { createContext, use, useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'brama.theme';

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
  /** True when the visitor has never chosen, so the OS setting still rules. */
  followsSystem: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStored(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    // Private mode, or site data blocked. The OS preference still works.
    return null;
  }
}

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useState<Theme | null>(() =>
    typeof window === 'undefined' ? null : readStored(),
  );
  const [system, setSystem] = useState<Theme>(() =>
    typeof window === 'undefined' ? 'light' : systemTheme(),
  );

  // Follow the OS while the visitor has not chosen for themselves.
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => setSystem(query.matches ? 'dark' : 'light');
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const theme = stored ?? system;

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;

    // Keep the browser chrome in step with the page on mobile.
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute(
        'content',
        getComputedStyle(root).getPropertyValue('--ground').trim() || '',
      );
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setStored((current) => {
      const next: Theme = (current ?? systemTheme()) === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        // Not fatal: the choice simply does not survive a reload.
      }
      return next;
    });
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, toggleTheme, followsSystem: stored === null }),
    [theme, toggleTheme, stored],
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
}

export function useTheme(): ThemeContextValue {
  const value = use(ThemeContext);
  if (!value) throw new Error('useTheme must be used inside <ThemeProvider>');
  return value;
}
