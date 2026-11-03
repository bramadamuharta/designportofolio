import { FittedName } from '@/components/FittedName';
import { contact, identity } from '@/content/site';
import { useI18n } from '@/lib/i18n';
import { useMediaQuery } from '@/lib/useMediaQuery';

/**
 * A designed close rather than a column of links: the invitation at heading
 * size, the four destinations as filled chips, and the name returning at full
 * width to bracket the page against the hero.
 */
export function Contact() {
  const { t } = useI18n();
  const oneLine = useMediaQuery('(min-width: 48rem)');

  return (
    <footer aria-labelledby="contact-heading" className="wrap pb-10 sm:pb-14">
      <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-8">
        <h2 id="contact-heading" className="heading" data-reveal="rise">
          {t(contact.heading)}
        </h2>

        <ul className="flex flex-wrap gap-2">
          {contact.links.map((link, index) => (
            <li
              key={link.label}
              data-reveal="rise"
              style={{ '--reveal-delay': `${120 + index * 70}ms`, '--reveal-y': '14px' } as React.CSSProperties}
            >
              <a
                href={link.href}
                className="inline-block rounded-full bg-surface px-5 py-2.5 no-underline transition-[background-color,color,transform] duration-[180ms] ease-[cubic-bezier(.22,1,.36,1)] hover:bg-ink hover:text-ground active:scale-[0.97]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <FittedName
        reveal="scroll"
        lines={oneLine ? [identity.fullName] : [...identity.nameLines]}
        className="mt-20 uppercase sm:mt-28"
      />
    </footer>
  );
}
