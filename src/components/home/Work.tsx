import { work } from '@/content/site';
import { useI18n } from '@/lib/i18n';

export function Work() {
  const { t } = useI18n();

  return (
    <section aria-labelledby="work-heading" className="wrap">
      {/* Heading and span of years at opposite ends of one baseline. */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2 id="work-heading" className="heading" data-reveal="rise">
          {t(work.heading)}
        </h2>
        <p className="text-muted tabular-nums" data-reveal="rise" style={{ '--reveal-delay': '90ms' } as React.CSSProperties}>
          {work.range}
        </p>
      </div>

      <ul className="mt-10 grid gap-x-(--gutter) gap-y-12 sm:mt-14 md:grid-cols-2">
        {work.items.map((item, index) => (
          <li key={item.title}>
            <a href={item.href} className="group block no-underline">
              <div
                className="frame bg-surface"
                data-reveal="open"
                style={{ '--reveal-delay': `${index * 110}ms`, '--t-open': '850ms' } as React.CSSProperties}
              >
                <img
                  src={item.cover}
                  srcSet={item.coverSet}
                  sizes="(min-width: 48rem) 48vw, 100vw"
                  alt={t(item.alt)}
                  width={item.width}
                  height={item.height}
                  loading="lazy"
                  decoding="async"
                  className="aspect-3/2 w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.035]"
                />
              </div>

              <div
                className="mt-5 flex items-baseline justify-between gap-4"
                data-reveal="rise"
                style={{ '--reveal-delay': `${160 + index * 110}ms`, '--reveal-y': '14px' } as React.CSSProperties}
              >
                <h3 className="text-body font-medium">{item.title}</h3>
                <span className="text-muted tabular-nums">{item.year}</span>
              </div>
              <p
                className="mt-1 text-muted"
                data-reveal="rise"
                style={{ '--reveal-delay': `${220 + index * 110}ms`, '--reveal-y': '14px' } as React.CSSProperties}
              >
                {t(item.kind)}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
