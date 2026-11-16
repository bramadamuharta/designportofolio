import { Prop } from '@/components/scrapbook/Prop';
import { closingPhoto, letter } from '@/content/site';
import { useI18n } from '@/lib/i18n';

const SCRIM = 'linear-gradient(180deg, var(--board) 0%, rgba(10,13,20,0.62) 24%, rgba(10,13,20,0.62) 76%, var(--board) 100%)'; // taste-skill-ignore: a neutral scrim over a photograph, so the letter reads against the ridge and the section joins the board at both edges.

/**
 * The letter: a single sheet laid over the closing photograph, signed.
 *
 * The frame left this section unlabelled, which leaves a visitor with no name
 * for it in the navigation or on the page. It opens with a real heading here;
 * everything below it is the sheet the frame drew.
 */
export function AboutCta() {
  const { t } = useI18n();

  return (
    <section
      aria-labelledby="about-heading"
      id="about"
      className="relative isolate scroll-mt-24 overflow-clip py-24"
    >
      <img
        src={closingPhoto.src}
        srcSet={closingPhoto.srcSet}
        sizes="100vw"
        alt={t(closingPhoto.alt)}
        width={closingPhoto.width}
        height={closingPhoto.height}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-20 size-full object-cover object-[50%_28%]"
      />

      <div aria-hidden="true" className="absolute inset-0 -z-10" style={{ backgroundImage: SCRIM }} />

      <div className="wrap">
        <h2 id="about-heading" className="hand-display" data-reveal="rise">
          {t(letter.heading)}
        </h2>

        <div className="mt-14 flex justify-center">
          <div
            className="relative w-full max-w-[47.5rem] rotate-[1.5deg]"
            data-reveal="rise"
          >
            <Prop
              name="washi-lg"
              className="absolute -top-5 left-[38%] h-auto w-[10.9rem] rotate-4"
            />

            <div
              className="paper ruled-letter px-8 py-12 sm:px-14 sm:pl-24"
            >
              <p className="hand text-hand-note text-note-ink/70">{t(letter.greeting)}</p>

              {letter.body.map((line, index) => (
                <p
                  key={index}
                  className={`hand mt-3 text-hand-note leading-[1.38] ${
                    index === 0 ? 'text-note-ink' : 'text-note-ink/60'
                  }`}
                >
                  {t(line)}
                </p>
              ))}

              <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
                {/* The brush stroke is the button's fill; the label sits on it. */}
                <a
                  href={letter.cta.href}
                  className="relative inline-grid place-items-center rotate-2 px-14 py-7 no-underline transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <Prop
                    name="brush-stroke"
                    className="absolute inset-0 -z-10 size-full"
                    style={{ width: '100%', height: '100%' }}
                  />
                  <span className="hand text-hand-note leading-none text-board">
                    {t(letter.cta.label)} →
                  </span>
                </a>

                <p className="hand rotate-4 text-hand-note text-note-ink">{letter.signature}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
