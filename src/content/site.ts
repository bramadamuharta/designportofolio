/*
 * Images are imported through vite-imagetools, which re-encodes and resizes
 * them at build time. Each one yields a `srcset` of three widths plus a plain
 * `src` fallback, so a phone downloads roughly a tenth of what the desktop
 * does instead of the full-resolution original.
 */
import kawahPutihSet from '@/assets/images/brama-kawah-putih.webp?w=640;1024;1600&format=webp&quality=78&as=srcset';
import kawahPutihSrc from '@/assets/images/brama-kawah-putih.webp?w=1024&format=webp&quality=78&url';
import siapBantuSet from '@/assets/images/siap-bantu.webp?w=640;1024;1600&format=webp&quality=78&as=srcset';
import siapBantuSrc from '@/assets/images/siap-bantu.webp?w=1024&format=webp&quality=78&url';
import bigbirdSet from '@/assets/images/work-bigbird.png?w=512;768;1024&format=webp&quality=82&as=srcset';
import bigbirdSrc from '@/assets/images/work-bigbird.png?w=768&format=webp&quality=82&url';
import goldenbirdSet from '@/assets/images/work-goldenbird.png?w=512;768;1024&format=webp&quality=82&as=srcset';
import goldenbirdSrc from '@/assets/images/work-goldenbird.png?w=768&format=webp&quality=82&url';

/**
 * Every string on the home page, in both languages.
 *
 * Content lives here rather than in components, so a wording change never
 * touches layout and the two languages can be diffed against each other.
 *
 * ── NEEDS REAL VALUES BEFORE LAUNCH ─────────────────────────────────────────
 * Every `href: '#'` below is a placeholder. They are left as '#' rather than
 * guessed, because a plausible-looking profile URL that belongs to someone else
 * is worse than a link that visibly goes nowhere.
 *   · playground.href        · work[].href (2)        · contact[].href (4)
 * ────────────────────────────────────────────────────────────────────────────
 */

export type Language = 'id' | 'en';

/** A string that exists in both languages. */
type Bilingual = Record<Language, string>;

export const languageNames: Record<Language, string> = {
  id: 'Bahasa Indonesia',
  en: 'English',
};

export const identity = {
  /** Personal studio name, used as the wordmark. */
  wordmark: 'Humblebee',
  /** Split so the phone layout can stack the name onto two lines. */
  nameLines: ['Brama', 'Damuharta'] as const,
  fullName: 'Brama Damuharta',
};

export const intro: {
  /** The one line that says what this is — the h1 is a name, so this carries the meaning. */
  statement: Bilingual;
  greeting: Bilingual;
  experience: Bilingual;
  specialism: Bilingual;
} = {
  statement: {
    en: 'Senior product designer in Jakarta, Indonesia.',
    id: 'Desainer produk senior di Jakarta, Indonesia.',
  },
  greeting: {
    en: "Hi, I'm Brama, a senior designer who loves to explore and join social activities.",
    id: 'Halo, saya Brama, desainer senior yang senang menjelajah dan terlibat di kegiatan sosial.',
  },
  experience: {
    en: 'With 6+ years of experience crafting impactful digital products for millions of users.',
    id: 'Lebih dari 6 tahun merancang produk digital yang berdampak bagi jutaan pengguna.',
  },
  specialism: {
    en: 'Product designer, specialising in crafting user-friendly products and brands, with expertise in concept design, visual design, prototyping and illustration.',
    id: 'Desainer produk yang berfokus pada produk dan brand yang mudah dipakai, dengan keahlian di concept design, visual design, prototyping, dan ilustrasi.',
  },
};

export const photographs = [
  {
    src: kawahPutihSrc,
    srcSet: kawahPutihSet,
    width: 1753,
    height: 2000,
    /** Taller than the group photo, so it takes the narrower column. */
    alt: {
      en: 'Brama standing among the bare trees of Kawah Putih, West Java, with the crater ridge behind him.',
      id: 'Brama berdiri di antara pohon-pohon gundul Kawah Putih, Jawa Barat, dengan punggungan kawah di belakangnya.',
    } satisfies Bilingual,
  },
  {
    src: siapBantuSrc,
    srcSet: siapBantuSet,
    width: 2000,
    height: 1265,
    alt: {
      en: 'Brama with the Siap Bantu volunteers and the children they hosted, gathered on the steps of a gallery.',
      id: 'Brama bersama relawan Siap Bantu dan anak-anak yang mereka dampingi, berkumpul di tangga sebuah galeri.',
    } satisfies Bilingual,
  },
] as const;

export const about: { heading: Bilingual } = {
  // Not in the reference, which leaves this block unlabelled. Added because a
  // section a visitor cannot name is the fault readers report most often.
  heading: { en: 'About', id: 'Tentang' },
};

export const playground: { question: Bilingual; label: Bilingual; href: string } = {
  question: {
    en: 'Want to see my UI exploration?',
    id: 'Mau lihat eksplorasi UI saya?',
  },
  label: {
    en: 'See Playground',
    id: 'Lihat Playground',
  },
  href: '#',
};

export const work: {
  heading: Bilingual;
  range: string;
  items: ReadonlyArray<{
    title: string;
    kind: Bilingual;
    year: number;
    href: string;
    cover: string;
    coverSet: string;
    width: number;
    height: number;
    alt: Bilingual;
  }>;
} = {
  heading: { en: 'Selected Works', id: 'Karya Pilihan' },
  range: '2022 – 2025',
  items: [
    {
      title: 'School Bus Tracker',
      kind: { en: 'Mobile App', id: 'Aplikasi Mobile' },
      year: 2024,
      href: '#',
      cover: bigbirdSrc,
      coverSet: bigbirdSet,
      width: 1024,
      height: 672,
      alt: {
        en: 'Bigbird brand artwork: a blue shuttle bus under the Bigbird logo on a blue-to-teal field.',
        id: 'Artwork brand Bigbird: bus antar-jemput biru di bawah logo Bigbird pada bidang biru ke tosca.',
      },
    },
    {
      title: 'Goldenbird Stock Management',
      kind: { en: 'Integrated Platform', id: 'Platform Terintegrasi' },
      year: 2024,
      href: '#',
      cover: goldenbirdSrc,
      coverSet: goldenbirdSet,
      width: 1024,
      height: 672,
      alt: {
        en: 'Goldenbird brand artwork: a gold executive van under the Goldenbird logo on a gold field.',
        id: 'Artwork brand Goldenbird: van eksekutif emas di bawah logo Goldenbird pada bidang emas.',
      },
    },
  ],
};

export const experience: {
  heading: Bilingual;
  items: ReadonlyArray<{ from: string; to: Bilingual; role: string; place: string }>;
} = {
  heading: { en: 'Experiences', id: 'Pengalaman' },
  // Job titles stay in English in both languages: that is how they are written
  // in the Indonesian design industry, and translating them would read as odd.
  items: [
    {
      from: '2019',
      to: { en: 'Present', id: 'Sekarang' },
      role: 'Freelance Designer',
      place: 'Humblebee',
    },
    { from: '2022', to: { en: '2024', id: '2024' }, role: 'Product Designer', place: 'Bluebird Group' },
    { from: '2024', to: { en: '2025', id: '2025' }, role: 'Lead Product Design', place: 'PT Transjakarta' },
    { from: '2025', to: { en: '2026', id: '2026' }, role: 'UI/UX Lead', place: 'Bali Love' },
  ],
};

export const contact: { heading: Bilingual; links: ReadonlyArray<{ label: string; href: string }> } = {
  heading: { en: "Let's get in touch", id: 'Mari terhubung' },
  links: [
    { label: 'CV', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Behance', href: '#' },
    { label: 'Instagram', href: '#' },
  ],
};

export const ui = {
  skipToContent: { en: 'Skip to content', id: 'Lompat ke konten' },
  switchToDark: { en: 'Switch to dark theme', id: 'Ganti ke tema gelap' },
  switchToLight: { en: 'Switch to light theme', id: 'Ganti ke tema terang' },
  languageLabel: { en: 'Language', id: 'Bahasa' },
  themeLabel: { en: 'Theme', id: 'Tema' },
} satisfies Record<string, Bilingual>;
