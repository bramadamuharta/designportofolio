import { Suspense, lazy, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCaseStudy, loadCaseStudyBody } from '@/content';
import { NotFound } from './NotFound';

export function CaseStudy() {
  const { slug = '' } = useParams();
  const entry = getCaseStudy(slug);

  // Lazy so a visitor downloads this case study's body and nothing else.
  const Body = useMemo(() => {
    const load = loadCaseStudyBody(slug);
    return load ? lazy(load) : null;
  }, [slug]);

  useEffect(() => {
    if (!entry) return;
    const previous = document.title;
    document.title = `${entry.title} — Portofolio`;
    return () => {
      document.title = previous;
    };
  }, [entry]);

  if (!entry || !Body) return <NotFound />;

  return (
    <main className="mx-auto max-w-2xl px-6 py-24 sm:px-8">
      <Link
        to="/"
        className="text-sm text-(--color-ink-muted) underline decoration-(--color-rule) underline-offset-4 hover:decoration-(--color-accent)"
      >
        ← Semua studi kasus
      </Link>

      <header className="mt-10 mb-16">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{entry.title}</h1>
        <p className="mt-5 text-xl/relaxed text-(--color-ink-muted)">{entry.summary}</p>

        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 bg-(--color-surface) p-6 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-(--color-ink-muted)">Klien</dt>
            <dd className="mt-1">{entry.client}</dd>
          </div>
          <div>
            <dt className="text-(--color-ink-muted)">Peran</dt>
            <dd className="mt-1">{entry.role}</dd>
          </div>
          <div>
            <dt className="text-(--color-ink-muted)">Tahun</dt>
            <dd className="mt-1 tabular-nums">{entry.year}</dd>
          </div>
          {entry.tags.length > 0 ? (
            <div className="col-span-2 sm:col-span-3">
              <dt className="text-(--color-ink-muted)">Lingkup</dt>
              <dd className="mt-1">{entry.tags.join(' · ')}</dd>
            </div>
          ) : null}
        </dl>
      </header>

      <article>
        <Suspense fallback={<p className="text-(--color-ink-muted)">Memuat…</p>}>
          <Body />
        </Suspense>
      </article>
    </main>
  );
}
