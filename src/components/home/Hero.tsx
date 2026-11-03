import { FittedName } from '@/components/FittedName';
import { identity, intro, photographs } from '@/content/site';
import { useI18n } from '@/lib/i18n';
import { useMediaQuery } from '@/lib/useMediaQuery';

/**
 * The name as a monument, fitted to the full width, with the line that says
 * what this is directly under it. On a phone the name stacks onto two lines,
 * which makes it larger rather than smaller.
 *
 * The capitals come from CSS, not from the string: a screen reader given
 * "BRAMA" is liable to spell it out, while "Brama" set in `text-transform`
 * looks identical and still reads as a name.
 *
 * Load sequence: the name's lines rise from 80ms, the statement arrives at
 * 420ms, the pictures open from 150ms and settle by 1.2s.
 */
export function Hero() {
  const { t } = useI18n();
  const oneLine = useMediaQuery('(min-width: 48rem)');

  const lines = oneLine ? [identity.fullName] : [...identity.nameLines];

  return (
    <section aria-labelledby="hero-name" className="wrap pt-14 sm:pt-20">
      <FittedName as="h1" id="hero-name" reveal="load" lines={lines} className="uppercase" />

      <p className="statement mt-8 max-w-[46ch] sm:mt-10" data-load style={{ '--d': '420ms' } as React.CSSProperties}>
        {t(intro.statement)}
      </p>

      {/* Both pictures share one height so the row has no hole under a short
          one; the widths are uneven, which is where the asymmetry lives. */}
      <div className="mt-12 grid gap-(--gutter) sm:mt-16 md:grid-cols-12">
        {photographs.map((photo, index) => (
          <figure
            key={photo.src}
            className={`frame bg-surface ${index === 0 ? 'md:col-span-5' : 'md:col-span-7'}`}
            data-open
            style={{ '--d': `${150 + index * 120}ms` } as React.CSSProperties}
          >
            {/* Separate element so the scroll-linked drift and the load-settle
                do not fight over one transform. */}
            <div className="drift h-full">
              <img
                src={photo.src}
                srcSet={photo.srcSet}
                sizes={index === 0 ? '(min-width: 48rem) 42vw, 100vw' : '(min-width: 48rem) 58vw, 100vw'}
                alt={t(photo.alt)}
                width={photo.width}
                height={photo.height}
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                decoding="async"
                data-settle
                className={[
                  'w-full object-cover md:h-[min(42vw,34rem)]',
                  index === 0 ? 'aspect-4/5 md:aspect-auto' : 'aspect-3/2 md:aspect-auto',
                ].join(' ')}
              />
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
