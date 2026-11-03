import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { caseStudies } from '@/content';

/**
 * Index of case studies. Layout and type here are placeholders — the art
 * direction comes from the taste-skill run, not from this file.
 */
export function Home() {
  const reduceMotion = useReducedMotion();

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-10%' },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <main className="mx-auto max-w-5xl px-6 py-24 sm:px-8">
      <header className="mb-24">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          Portofolio
        </h1>
        <p className="mt-6 max-w-xl text-lg/relaxed text-(--color-ink-muted)">
          Placeholder. Isi dan arah visualnya ditentukan belakangan — struktur
          dan pipeline kontennya yang dibangun lebih dulu.
        </p>
      </header>

      {caseStudies.length === 0 ? (
        <p className="text-(--color-ink-muted)">
          Belum ada studi kasus. Tambahkan satu file <code>.mdx</code> di{' '}
          <code>src/content/case-studies/</code>.
        </p>
      ) : (
        <ul className="space-y-px">
          {caseStudies.map((entry) => (
            <motion.li key={entry.slug} {...reveal}>
              <Link
                to={`/case/${entry.slug}`}
                className="group block border-t border-(--color-rule) py-10 transition-colors hover:bg-black/[0.02]"
              >
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">
                    {entry.title}
                  </h2>
                  <span className="text-sm tabular-nums text-(--color-ink-muted)">
                    {entry.year}
                  </span>
                </div>
                <p className="mt-3 max-w-2xl text-(--color-ink-muted)">{entry.summary}</p>
                <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs tracking-wide text-(--color-ink-muted) uppercase">
                  <span>{entry.client}</span>
                  <span aria-hidden="true">·</span>
                  <span>{entry.role}</span>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      )}
    </main>
  );
}
