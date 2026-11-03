import { identity, languageNames, ui } from '@/content/site';
import { useI18n } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';

/**
 * Small furniture: the wordmark at one end, the two controls at the other, on
 * the page's own margins with no bar, border or background behind it.
 */
export function SiteHeader() {
  const { t, language, toggleLanguage } = useI18n();
  const { theme, toggleTheme } = useTheme();

  const nextLanguage = language === 'id' ? 'en' : 'id';

  return (
    <header className="wrap flex items-center justify-between gap-6 pt-6 sm:pt-8">
      <a
        href="#top"
        className="text-body font-medium no-underline transition-opacity duration-300 hover:opacity-60"
      >
        {identity.wordmark}
      </a>

      <nav className="flex items-center gap-5 sm:gap-7" aria-label={t(ui.languageLabel)}>
        <button
          type="button"
          onClick={toggleLanguage}
          lang={nextLanguage}
          className="text-body text-muted transition-colors duration-300 hover:text-ink"
        >
          {languageNames[nextLanguage]}
        </button>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? t(ui.switchToLight) : t(ui.switchToDark)}
          aria-pressed={theme === 'dark'}
          className="group grid size-7 place-items-center"
        >
          {/* A disc half-filled in ink: it reads as the two themes themselves
              rather than as a sun-and-moon pictogram. It turns on press. */}
          <svg
            viewBox="0 0 24 24"
            className="size-5 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110"
            style={{ transform: theme === 'dark' ? 'rotate(180deg)' : 'rotate(0deg)' }}
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10.5" className="fill-none stroke-ink" strokeWidth="1.5" />
            <path d="M12 1.5a10.5 10.5 0 0 1 0 21Z" className="fill-ink" />
          </svg>
        </button>
      </nav>
    </header>
  );
}
