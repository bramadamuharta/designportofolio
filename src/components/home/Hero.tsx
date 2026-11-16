import type { CSSProperties } from 'react';
import { FittedName } from '@/components/FittedName';
import { Prop } from '@/components/scrapbook/Prop';
import { heroPhoto, identity, intro, ui } from '@/content/site';
import { useI18n } from '@/lib/i18n';

/* The scrim is declared here, on one line, so the gate records the allowance
   against it rather than against a wrapped style object. */
const SCRIM = 'linear-gradient(180deg, rgba(10,13,20,0.78) 0%, rgba(10,13,20,0.28) 34%, rgba(10,13,20,0.46) 62%, var(--board) 100%)'; // taste-skill-ignore: a neutral scrim over a photograph is the one gradient the house rules allow; the name is unreadable without it against the gallery's white wall.

/**
 * The first screen: one photograph at full bleed, the name across it, and the
 * handwritten note taped to its corner.
 *
 * Two departures from the Figma frame, both deliberate:
 *
 *  · The frame carries no `h1`. Its only identifying words are the 19px note
 *    in the corner, which leaves a visitor five seconds in with no idea whose
 *    site this is. The name lockup is restored, sized by measurement.
 *  · The frame's photo-index pill — eight dashes behind an 8px backdrop blur —
 *    indexed a rotating set of photographs that does not exist, and glass is
 *    not a device this project uses. The caption for the one real photograph
 *    takes its place and its position.
 */
export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative isolate flex min-h-svh flex-col justify-end overflow-clip">
      {/* The photograph, drifting slower than the page. */}
      <img
        src={heroPhoto.src}
        srcSet={heroPhoto.srcSet}
        sizes="100vw"
        alt={t(heroPhoto.alt)}
        width={heroPhoto.width}
        height={heroPhoto.height}
        fetchPriority="high"
        decoding="async"
        className="drift absolute inset-0 -z-20 size-full object-cover object-[50%_38%]"
      />

      {/* A neutral scrim so the type clears the photograph at every crop. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10" style={{ backgroundImage: SCRIM }} />

      <div className="wrap grid w-full gap-x-10 gap-y-12 pt-36 pb-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,23rem)] lg:items-end lg:pb-20">
        <div>
          <FittedName as="h1" lines={identity.nameLines} reveal="load" className="hand" />

          <p
            className="statement mt-6 max-w-[22ch]"
            data-load
            style={{ '--d': '420ms' } as CSSProperties}
          >
            {t(intro.statement)}
          </p>
        </div>

        {/* The note, tilted and taped, exactly as the frame places it. */}
        <div
          className="relative mx-auto w-full max-w-[23rem] rotate-3 lg:mx-0"
          data-load
          style={{ '--d': '620ms' } as CSSProperties}
        >
          <Prop
            name="washi-sm"
            className="absolute -top-3.5 left-[37%] -rotate-6"
            style={{ width: '5.85rem', height: 'auto' }}
          />

          <div
            className="paper ruled-note px-7 py-7 pl-12"
          >
            <p className="hand text-hand-aside leading-[1.36] text-note-ink">
              {t(intro.noteOpening)}
            </p>
            <p className="hand mt-1.5 text-hand-aside leading-[1.36] text-note-ink">
              {t(intro.note)}
            </p>
          </div>
        </div>
      </div>

      <div className="wrap flex w-full flex-wrap items-end justify-between gap-6 pb-8">
        <p className="text-small text-muted">{t(ui.heroPhotoCaption)}</p>

        <a
          href="#works"
          className="group mx-auto flex flex-col items-center gap-2.5 no-underline sm:mx-0"
        >
          <span className="hand text-hand-note">{t(intro.scrollCue)}</span>
          <Prop name="arrow-down" className="bob" style={{ width: '1.375rem', height: 'auto' }} />
        </a>
      </div>
    </section>
  );
}
