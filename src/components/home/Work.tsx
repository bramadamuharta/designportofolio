import type { CSSProperties } from 'react';
import { Photo } from '@/components/scrapbook/Photo';
import { FASTENER_PROP, Prop } from '@/components/scrapbook/Prop';
import { SectionHead } from '@/components/home/SectionHead';
import type { WorkItem } from '@/content/site';
import { work } from '@/content/site';
import { useI18n } from '@/lib/i18n';

/** Where on the print's top edge each kind of fastener sits. */
const FASTENER_POSITION: Record<WorkItem['fastener'], string> = {
  'paper-clip': 'left-[8%] -top-5 w-[1.8rem] rotate-6',
  'push-pin': 'left-1/2 -top-4 w-[2.7rem] -translate-x-1/2',
  'push-pin-2': 'right-[12%] -top-4 w-[2.7rem]',
  'binder-clip': 'left-1/2 -top-7 w-[3.5rem] -translate-x-1/2',
  nail: 'left-1/2 -top-3 w-[1.4rem] -translate-x-1/2',
  washi: 'left-[30%] -top-5 w-[9.6rem] -rotate-3',
};

/**
 * The board of project prints: six, two to a row, each tilted and fastened.
 *
 * The reference numbered them "No. 01" through "No. 06" in the corner of every
 * print. Index numbering is not a device this project uses — the order is
 * carried by position, which is what the grid already does — so the numbers
 * are gone and the caption keeps the facts instead.
 */
export function Work() {
  const { t } = useI18n();

  return (
    <section aria-labelledby="works-heading" id="works" className="wrap scroll-mt-24 py-28">
      <SectionHead id="works-heading" lines={work.headingLines} cta={work.cta} />

      <ol className="mt-16 grid list-none grid-cols-1 gap-x-16 gap-y-22 p-0 lg:grid-cols-2">
        {work.items.map((item, index) => (
          <li
            key={item.title}
            className="relative"
            data-reveal="rise"
            style={{ '--reveal-delay': `${(index % 2) * 90}ms` } as CSSProperties}
          >
            <div className="relative" style={{ rotate: `${item.tilt}deg` }}>
              <Photo
                picture={item.coverImage}
                field={item.field}
                sizes="(min-width: 1024px) 44vw, 92vw"
                fallback={
                  // No photograph of this project exists yet, so the field
                  // carries the work the way an end frame does: its title set
                  // in type. Lettering claims to be lettering; a grey mock-up
                  // of an interface would claim to be a screenshot.
                  //
                  // It is the print's heading as well, so the title is not set
                  // twice on the same card.
                  <h3
                    className={`flex size-full flex-col justify-center p-[7%] text-[clamp(2rem,5.4vw,3.25rem)] leading-[1.02] font-bold tracking-[-0.03em] ${
                      item.coverInk === 'light' ? 'text-paper-bright' : 'text-paper-ink'
                    }`}
                  >
                    {item.title}
                  </h3>
                }
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-1 pt-5 pb-2">
                  {item.coverImage ? (
                    <h3 className="text-card-title leading-[1.05] font-bold tracking-[-0.02em]">
                      {item.title}
                    </h3>
                  ) : null}
                  <p className="text-small text-paper-ink/60">
                    {t(item.kind)} · {item.client} · {item.year}
                  </p>
                </div>
              </Photo>

              <Prop
                name={FASTENER_PROP[item.fastener]}
                className={`absolute h-auto ${FASTENER_POSITION[item.fastener]}`}
              />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
