import { experience } from '@/content/site';
import { useI18n } from '@/lib/i18n';

export function Experience() {
  const { t } = useI18n();

  return (
    <section aria-labelledby="experience-heading" className="wrap">
      <div className="grid gap-x-(--gutter) gap-y-10 md:grid-cols-12">
        <h2 id="experience-heading" className="heading md:col-span-3" data-reveal="rise">
          {t(experience.heading)}
        </h2>

        <ul className="grid gap-x-(--gutter) gap-y-8 md:col-span-9 md:grid-cols-4">
          {experience.items.map((item, index) => (
            <li
              key={`${item.from}-${item.place}`}
              data-reveal="rise"
              style={{ '--reveal-delay': `${index * 70}ms`, '--reveal-y': '18px' } as React.CSSProperties}
            >
              <p className="text-muted tabular-nums">
                {item.from} – {t(item.to)}
              </p>
              <p className="mt-3 font-medium">{item.role}</p>
              <p className="mt-1 text-muted">{item.place}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
