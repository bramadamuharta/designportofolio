import { Prop } from '@/components/scrapbook/Prop';
import { footer, languageNames, ui } from '@/content/site';
import { useI18n } from '@/lib/i18n';

/**
 * The close: the invitation at full width, the four ways to reach him beside
 * it, and the line that ends the page.
 *
 * The frame set the gate labels and the bottom line as tracked capitals at
 * 11–18px. They are sentence case at a readable size here, which is the rule
 * this project has followed since the first port.
 *
 * The language toggle lives here rather than in the header: the header is the
 * frame's, and this is the one control the page adds to it.
 */
export function SiteFooter() {
  const { t, language, toggleLanguage } = useI18n();
  const nextLanguage = language === 'id' ? 'en' : 'id';

  return (
    <footer className="wrap pt-32 pb-10">
      <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-14">
        <h2 className="hand-footer" data-reveal="rise">
          {t(footer.headingLines[0])}
          <br />
          {t(footer.headingLines[1])}
        </h2>

        <ul className="grid w-full max-w-[30rem] list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
          {footer.gates.map((gate) => (
            <li key={t(gate.label)} data-reveal="rise">
              <a
                href={gate.href}
                className="flex items-center justify-between gap-4 rounded-md bg-paper-warm py-5 pr-4 pl-5 text-body leading-none font-bold text-board-deep no-underline transition-transform duration-200 hover:-translate-y-0.5"
                style={{ rotate: `${gate.tilt}deg` }}
              >
                {t(gate.label)}
                <span
                  aria-hidden="true"
                  className="grid size-8 shrink-0 place-items-center rounded-full bg-acid text-small"
                >
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <Prop name="wave" className="mt-20 h-auto w-full opacity-70" />

      <div className="mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
        <p className="text-small text-muted">{footer.copyright}</p>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <button
            type="button"
            onClick={toggleLanguage}
            lang={nextLanguage}
            aria-label={t(ui.languageLabel)}
            className="text-small text-muted transition-colors duration-200 hover:text-ink"
          >
            {languageNames[nextLanguage]}
          </button>

          <a href="#top" className="text-small text-muted no-underline hover:text-ink">
            {t(footer.backToTop)} ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
