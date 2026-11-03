import { about, intro, playground } from '@/content/site';
import { useI18n } from '@/lib/i18n';

/**
 * The reference carries this copy with no heading of its own. A section a
 * visitor cannot name is the commonest thing readers complain about, so the
 * block gets a heading; everything else is the reference's own content and
 * its two-column split.
 */
export function About() {
  const { t } = useI18n();

  return (
    <section aria-labelledby="about-heading" className="wrap">
      <h2 id="about-heading" className="heading" data-reveal="rise">
        {t(about.heading)}
      </h2>

      <div className="mt-10 grid gap-x-(--gutter) gap-y-8 sm:mt-14 md:grid-cols-12">
        <p className="statement md:col-span-6" data-reveal="rise" style={{ '--reveal-delay': '90ms' } as React.CSSProperties}>{t(intro.greeting)}</p>
        <p className="copy md:col-span-5 md:col-start-8 md:pt-2" data-reveal="rise" style={{ '--reveal-delay': '180ms' } as React.CSSProperties}>{t(intro.experience)}</p>
      </div>

      <div className="mt-16 grid gap-x-(--gutter) gap-y-8 sm:mt-24 md:grid-cols-12">
        <div className="md:col-span-5" data-reveal="rise">
          <p className="text-muted">{t(playground.question)}</p>
          <a
            href={playground.href}
            className="group mt-3 inline-block text-head leading-none font-semibold tracking-[-0.025em] no-underline transition-transform duration-[140ms] active:scale-[0.98]"
          >
            <span className="relative inline-block pb-1 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-500 after:ease-[cubic-bezier(.16,1,.3,1)] after:content-[''] group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100">
              {t(playground.label)}
            </span>
          </a>
        </div>

        <p className="copy md:col-span-6 md:col-start-7 md:pt-2" data-reveal="rise" style={{ '--reveal-delay': '120ms' } as React.CSSProperties}>
          {t(intro.specialism)}
        </p>
      </div>
    </section>
  );
}
