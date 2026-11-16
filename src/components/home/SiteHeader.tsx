import { headerActions, nav, ui } from '@/content/site';
import { useI18n } from '@/lib/i18n';

/**
 * The bar from the Figma frame: section links at one margin, two actions at
 * the other, laid straight over the hero photograph with no chrome behind it.
 *
 * The reference set the links at 13px with positive tracking. They are at a
 * readable size here instead, which is the house rule the project has followed
 * since the first port.
 */
export function SiteHeader() {
  const { t } = useI18n();

  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-6">
        <nav aria-label={t(ui.primaryNavLabel)}>
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-2 sm:gap-x-9">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-small no-underline opacity-90 transition-opacity duration-200 hover:opacity-100"
                >
                  {t(item.label)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {headerActions.map((action) => (
            <a
              key={action.href + t(action.label)}
              href={action.href}
              className={`rounded-full px-5 py-3 text-small leading-none font-bold no-underline transition-transform duration-200 hover:-translate-y-0.5 ${
                action.primary ? 'bg-acid text-board' : 'bg-white text-board'
              }`}
            >
              {t(action.label)}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
