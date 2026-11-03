import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { work } from '@/content/site';
import { useI18n } from '@/lib/i18n';
import { useMediaQuery } from '@/lib/useMediaQuery';

/**
 * The page's signature moment.
 *
 * The section is a colour field, and the project in hand decides its colour —
 * Bigbird's deep blue, Goldenbird's gold, both taken from the artwork itself.
 * It is also the one thing a visitor can steer: with a pointer it follows the
 * hover, from the keyboard it follows focus, and on a phone — where the cards
 * are stacked and there is no hover to give — it follows whichever card is
 * crossing the middle of the screen as you scroll.
 *
 * With no script, no field: the section stays on the page's own paper and both
 * projects are fully legible. Nothing here is load-bearing for reading.
 */
export function Work() {
  const { t } = useI18n();
  const [active, setActive] = useState<number | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // No hover to read on a touch screen, so the scroll decides instead.
  const scrollDriven = useMediaQuery('(hover: none)');

  const point = useCallback((index: number | null) => setActive(index), []);

  useEffect(() => {
    if (!scrollDriven) return;
    const list = listRef.current;
    if (!list) return;

    const cards = Array.from(list.querySelectorAll<HTMLElement>('[data-work-index]'));
    if (cards.length === 0 || typeof IntersectionObserver === 'undefined') return;

    // A band across the middle of the viewport: whichever card is inside it owns
    // the field, and when none is, the section returns to paper.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = Number(entry.target.getAttribute('data-work-index'));
          setActive((current) => {
            if (entry.isIntersecting) return index;
            return current === index ? null : current;
          });
        }
      },
      { rootMargin: '-42% 0px -42% 0px', threshold: 0 },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [scrollDriven]);

  const field = active === null ? null : work.items[active]?.field ?? null;

  return (
    <section
      aria-labelledby="work-heading"
      className="field-swap py-12 sm:py-20"
      style={
        field
          ? ({ backgroundColor: field.bg, color: field.ink, '--muted': field.ink } as CSSProperties)
          : undefined
      }
    >
      <div className="wrap">
        {/* Heading and span of years at opposite ends of one baseline. */}
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2 id="work-heading" className="heading" data-reveal="rise">
            {t(work.heading)}
          </h2>
          <p
            className="text-muted tabular-nums"
            data-reveal="rise"
            style={{ '--reveal-delay': '90ms' } as CSSProperties}
          >
            {work.range}
          </p>
        </div>

        <ul ref={listRef} className="mt-10 grid gap-x-(--gutter) gap-y-12 sm:mt-14 md:grid-cols-2">
          {work.items.map((item, index) => (
            <li key={item.title} data-work-index={index}>
              <a
                href={item.href}
                className="group block no-underline"
                onPointerEnter={(event) => {
                  if (event.pointerType === 'mouse') point(index);
                }}
                onPointerLeave={(event) => {
                  if (event.pointerType === 'mouse') point(null);
                }}
                onFocus={() => point(index)}
                onBlur={() => point(null)}
              >
                <div
                  className="frame"
                  data-reveal="open"
                  style={{ '--reveal-delay': `${index * 110}ms`, '--t-open': '850ms' } as CSSProperties}
                >
                  {/* Held slightly oversize and drifting with the scroll, the
                      same treatment the photographs get, so the fleet moves. */}
                  <div className="drift">
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
                </div>

                <div
                  className="mt-5 flex items-baseline justify-between gap-4"
                  data-reveal="rise"
                  style={{ '--reveal-delay': `${160 + index * 110}ms`, '--reveal-y': '14px' } as CSSProperties}
                >
                  <h3 className="text-body font-medium">{item.title}</h3>
                  <span className="text-muted tabular-nums">{item.year}</span>
                </div>
                <p
                  className="mt-1 text-muted"
                  data-reveal="rise"
                  style={{ '--reveal-delay': `${220 + index * 110}ms`, '--reveal-y': '14px' } as CSSProperties}
                >
                  {t(item.kind)}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
