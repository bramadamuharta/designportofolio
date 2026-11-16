import { SectionHead } from '@/components/home/SectionHead';
import { playground } from '@/content/site';
import { useI18n } from '@/lib/i18n';

/**
 * The gallery: two rows of design shots drifting in opposite directions.
 *
 * Each track holds the list twice and travels exactly half its own width, so
 * the loop closes on itself with no jump. Hovering or tabbing into a row
 * pauses it; `prefers-reduced-motion` leaves both rows standing still.
 *
 * The reference faded both ends of the marquee behind a gradient. Gradients
 * are not a device this project uses, so the rows run to the margin and the
 * board's own darkness closes them instead.
 */
function Row({
  shots,
  direction,
}: {
  shots: typeof playground.shots;
  direction: 'left' | 'right';
}) {
  // Twice through: the second pass is what the first scrolls into.
  const doubled = [...shots, ...shots];

  return (
    <div className="marquee-track overflow-clip">
      <div className="marquee" data-direction={direction}>
        {doubled.map((shot, index) => (
          <div
            key={index}
            className="paper-shot w-[clamp(13rem,26vw,25rem)] shrink-0 p-2.5"
            style={{ rotate: `${shot.tilt}deg` }}
          >
            <img
              src={shot.picture.src}
              srcSet={shot.picture.srcSet}
              sizes="26vw"
              alt=""
              width={shot.picture.width}
              height={shot.picture.height}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full rounded-[1px] object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Playground() {
  const { t } = useI18n();

  const half = Math.ceil(playground.shots.length / 2);

  return (
    <section aria-labelledby="playground-heading" id="playground" className="scroll-mt-24 py-20">
      <div className="wrap">
        <SectionHead
          id="playground-heading"
          lines={playground.headingLines}
          cta={playground.cta}
        />
      </div>

      <div
        className="mt-12 flex flex-col gap-8"
        role="group"
        aria-label={t(playground.shotsLabel)}
      >
        <Row shots={playground.shots.slice(0, half)} direction="right" />
        <Row shots={playground.shots.slice(half)} direction="left" />
      </div>
    </section>
  );
}
