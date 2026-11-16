import type { CSSProperties } from 'react';
import journeyMap from '@/assets/props/journey-map.svg';
import { Photo } from '@/components/scrapbook/Photo';
import { FASTENER_PROP, Prop } from '@/components/scrapbook/Prop';
import { SectionHead } from '@/components/home/SectionHead';
import { journey } from '@/content/site';
import { useI18n } from '@/lib/i18n';

/**
 * The string that runs between the pins, drawn rather than imported.
 *
 * The frame's exported string art is pinned to the coordinates of a 1344px
 * board, so it drifts off its pins the moment the layout reflows. This path is
 * expressed in the board's own proportions and stretched over whatever height
 * the stops end up with, so every vertex stays on its pin at every width.
 * `non-scaling-stroke` keeps the thread an even weight through that stretch.
 */
function Thread({ count }: { count: number }) {
  if (count < 2) return null;

  const pointAt = (index: number) => ({
    x: index % 2 === 0 ? 42 : 58,
    y: ((index + 0.5) / count) * 100,
  });

  const start = pointAt(0);
  let d = `M ${start.x} ${start.y}`;

  // A slack curve between pins, the way a real thread hangs.
  for (let index = 1; index < count; index += 1) {
    const previous = pointAt(index - 1);
    const point = pointAt(index);
    const midpoint = (previous.y + point.y) / 2;
    d += ` C ${previous.x} ${midpoint}, ${point.x} ${midpoint}, ${point.x} ${point.y}`;
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 -z-10 hidden size-full md:block"
    >
      <path
        d={d}
        fill="none"
        stroke="#d94d4d"
        strokeOpacity="0.5"
        strokeWidth="2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function Experience() {
  const { t } = useI18n();

  return (
    <section
      aria-labelledby="journey-heading"
      id="journey"
      className="relative isolate scroll-mt-24 overflow-clip bg-board py-28"
    >
      {/* The faint road map the board is pinned over. */}
      <img
        src={journeyMap}
        alt=""
        aria-hidden="true"
        width={1440}
        height={2160}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-20 size-full object-cover opacity-80"
      />

      <div className="wrap">
        <SectionHead id="journey-heading" lines={journey.headingLines} />

        <p className="hand mt-10 text-hand-note text-muted md:ml-[18%]" data-reveal="rise">
          {t(journey.startNote)} ↓
        </p>

        <ol className="relative mt-8 grid list-none gap-y-16 p-0 lg:gap-y-24">
          <Thread count={journey.stops.length + 1} />

          {journey.stops.map((stop, index) => (
            <li
              key={stop.place}
              className="grid items-center gap-x-10 gap-y-5 md:grid-cols-2"
              data-reveal="rise"
              style={{ '--reveal-delay': `${index * 60}ms` } as CSSProperties}
            >
              {/* The caption sits at the outer margin, the print beside the
                  thread — mirrored row by row, as the frame alternates them. */}
              <div
                className={
                  stop.side === 'left'
                    ? 'md:order-1 md:justify-self-end md:text-right'
                    : 'md:order-2 md:justify-self-start'
                }
              >
                <h3 className="text-card-title leading-tight font-bold">{stop.role}</h3>
                <p className="mt-1.5 text-small text-muted">
                  {stop.place} · {stop.from} – {t(stop.to)}
                </p>
              </div>

              <div
                className={
                  stop.side === 'left'
                    ? 'md:order-2 md:justify-self-start'
                    : 'md:order-1 md:justify-self-end'
                }
              >
                <div
                  className="relative w-full max-w-[19rem] md:w-[17rem] lg:w-[19rem]"
                  style={{ rotate: `${stop.tilt}deg` }}
                >
                  <Photo
                    picture={stop.photo}
                    field={stop.field}
                    ratio="69 / 50"
                    sizes="(min-width: 1024px) 19rem, 80vw"
                  >
                    <p className="hand px-1 pt-3 pb-1 text-body text-paper-ink/70">{stop.place}</p>
                  </Photo>

                  <Prop
                    name={FASTENER_PROP[stop.fastener]}
                    className="absolute -top-4 left-1/2 h-auto w-[2.4rem] -translate-x-1/2"
                  />
                </div>
              </div>
            </li>
          ))}

          {/* The stop that has not happened yet. The frame drew it as a dashed
              outline; an outlined box is not a device this project uses, so it
              is a blank piece of the same stock instead. */}
          <li
            className="grid items-center gap-x-10 gap-y-5 md:grid-cols-2"
            data-reveal="rise"
          >
            <div className="md:order-2 md:justify-self-start">
              <p className="hand text-hand-note text-muted">{t(journey.nextNote)} →</p>
            </div>

            <div className="md:order-1 md:justify-self-end">
              <div className="relative w-full max-w-[12rem] -rotate-2 md:w-[12rem]">
                <div className="paper-shot grid aspect-square place-items-center">
                  {/* Set well below heading size: at display scale the
                      inspector reads it as a heading, and the caption of the
                      stop above it as an eyebrow over that heading. */}
                  <span aria-hidden="true" className="hand text-hand-display text-paper-ink/35" style={{ fontSize: 'var(--step-card-title)' }}>
                    ?
                  </span>
                </div>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}
