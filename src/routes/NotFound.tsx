import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center px-6 sm:px-8">
      <h1 className="text-3xl font-semibold tracking-tight">Halaman tidak ditemukan</h1>
      <p className="mt-4 text-(--color-ink-muted)">
        Tautannya mungkin salah, atau studi kasusnya belum terbit.
      </p>
      <Link
        to="/"
        className="mt-8 self-start underline decoration-(--color-rule) underline-offset-4 hover:decoration-(--color-accent)"
      >
        Kembali ke beranda
      </Link>
    </main>
  );
}
