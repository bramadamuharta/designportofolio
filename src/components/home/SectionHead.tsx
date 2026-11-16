import type { Bilingual } from '@/content/site';
import { useI18n } from '@/lib/i18n';

/**
 * The heading every board section opens with: two hand-set lines at one
 * margin, one action at the other.
 *
 * The Figma frame greyed the second line of each heading. A styled accent
 * inside a heading is not a device this project uses, so both lines are full
 * ink and the second line carries its weight by position instead.
 */
export function SectionHead({
  id,
  lines,
  cta,
  note,
}: {
  id: string;
  lines: readonly [Bilingual, Bilingual];
  cta?: { label: Bilingual; href: string };
  /** A short aside set at the far margin, used by the journey board. */
  note?: string;
}) {
  const { t } = useI18n();

  return (
    <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
      <h2 id={id} className="hand-display" data-reveal="rise">
        {t(lines[0])}
        <br />
        {t(lines[1])}
      </h2>

      {cta ? (
        <a
          href={cta.href}
          className="flex items-center gap-2.5 rounded-full bg-acid px-6 py-4 text-small leading-none font-bold text-board no-underline transition-transform duration-200 hover:-translate-y-0.5"
          data-reveal="rise"
        >
          {t(cta.label)}
          <span aria-hidden="true">↗</span>
        </a>
      ) : null}

      {note ? (
        <p className="text-small text-muted" data-reveal="rise">
          {note}
        </p>
      ) : null}
    </div>
  );
}
