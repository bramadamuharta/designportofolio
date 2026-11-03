import { About } from '@/components/home/About';
import { Contact } from '@/components/home/Contact';
import { Experience } from '@/components/home/Experience';
import { Hero } from '@/components/home/Hero';
import { SiteHeader } from '@/components/home/SiteHeader';
import { Work } from '@/components/home/Work';
import { ui } from '@/content/site';
import { useI18n } from '@/lib/i18n';
import { useRevealOnScroll } from '@/lib/useRevealOnScroll';

/**
 * Section rhythm is set here, once, so no section carries its own outer
 * spacing and the gap between sections always exceeds the gaps inside them.
 */
export function Home() {
  const { t, language } = useI18n();
  useRevealOnScroll(language);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-ground"
      >
        {t(ui.skipToContent)}
      </a>

      <div id="top">
        <SiteHeader />
      </div>

      <main id="main" className="flex flex-col gap-(--section-gap)">
        <Hero />
        <About />
        <Work />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
