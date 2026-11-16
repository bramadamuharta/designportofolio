import { AboutCta } from '@/components/home/AboutCta';
import { Experience } from '@/components/home/Experience';
import { Hero } from '@/components/home/Hero';
import { Playground } from '@/components/home/Playground';
import { SiteFooter } from '@/components/home/SiteFooter';
import { SiteHeader } from '@/components/home/SiteHeader';
import { Work } from '@/components/home/Work';
import { ui } from '@/content/site';
import { useI18n } from '@/lib/i18n';
import { useRevealOnScroll } from '@/lib/useRevealOnScroll';

/**
 * The board.
 *
 * `data-surface="board"` scopes the dark scrapbook palette to this page. The
 * home page does not follow the light/dark toggle: the Figma direction is dark
 * the way a photograph is dark, and a light variant of it would be a different
 * design rather than the same one inverted. Case study pages keep the themed
 * palette.
 *
 * Each section carries its own vertical rhythm here rather than taking a
 * shared gap, because the board runs continuously from the hero photograph to
 * the footer with no breaks between fields.
 */
export function Home() {
  const { t, language } = useI18n();
  useRevealOnScroll(language);

  return (
    <div data-surface="board" className="relative min-h-svh">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-acid focus:px-5 focus:py-2.5 focus:text-board"
      >
        {t(ui.skipToContent)}
      </a>

      <div id="top">
        <SiteHeader />
      </div>

      <main id="main">
        <Hero />
        <Work />
        <Playground />
        <Experience />
        <AboutCta />
      </main>

      <SiteFooter />
    </div>
  );
}
