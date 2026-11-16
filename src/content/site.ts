/*
 * Images are imported through vite-imagetools, which re-encodes and resizes
 * them at build time. Each one yields a `srcset` of several widths plus a plain
 * `src` fallback, so a phone downloads roughly a tenth of what the desktop
 * does instead of the full-resolution original.
 */
import kawahPutihSet from '@/assets/images/brama-kawah-putih.webp?w=640;1024;1600&format=webp&quality=78&as=srcset';
import kawahPutihSrc from '@/assets/images/brama-kawah-putih.webp?w=1024&format=webp&quality=78&url';
import siapBantuSet from '@/assets/images/siap-bantu-full.jpg?w=960;1440;1920;2560&format=webp&quality=74&as=srcset';
import siapBantuSrc from '@/assets/images/siap-bantu-full.jpg?w=1440&format=webp&quality=74&url';
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
 *   · nav.playground.href    · work.cta.href      · work items 3–6 href
 *   · playground.cta.href    · footer gates (4)
 *
 * Four of the six project cards and all fourteen gallery shots are SAMPLE
 * entries: the Figma frame leaves those slots as "Project title" placeholders,
 * and they are filled here with plausible work drawn from the real employers so
 * the page can be seen at full density. Each one is marked `sample: true`.
 * Swap them for real projects — title, kind, year and a cover image — before
 * launch. `coverImage: null` means the card falls back to a flat paper field in
 * the colour Figma specified.
 * ────────────────────────────────────────────────────────────────────────────
 */

export type Language = 'id' | 'en';

/** A string that exists in both languages. */
export type Bilingual = Record<Language, string>;

/** A responsive picture: a srcset, a fallback, its intrinsic box and its alt. */
export type Picture = {
  src: string;
  srcSet: string;
  width: number;
  height: number;
  alt: Bilingual;
};

/* ── The four real pictures this repository holds ──────────────────────────
   Named once here and referenced by every section, so the page never carries
   two copies of the same file and a replacement lands everywhere at once. */

export const siapBantuPicture: Picture = {
  src: siapBantuSrc,
  srcSet: siapBantuSet,
  width: 3900,
  height: 2600,
  alt: {
    en: 'Brama with the Siap Bantu volunteers and the children they hosted, gathered on the steps of a gallery.',
    id: 'Brama bersama relawan Siap Bantu dan anak-anak yang mereka dampingi, berkumpul di tangga sebuah galeri.',
  },
};

export const kawahPutihPicture: Picture = {
  src: kawahPutihSrc,
  srcSet: kawahPutihSet,
  width: 1753,
  height: 2000,
  alt: {
    en: 'Brama standing among the bare trees of Kawah Putih, West Java, with the crater ridge behind him.',
    id: 'Brama berdiri di antara pohon-pohon gundul Kawah Putih, Jawa Barat, dengan punggungan kawah di belakangnya.',
  },
};

export const bigbirdPicture: Picture = {
  src: bigbirdSrc,
  srcSet: bigbirdSet,
  width: 1024,
  height: 672,
  alt: {
    en: 'Bigbird brand artwork: a blue shuttle bus under the Bigbird logo on a blue-to-teal field.',
    id: 'Artwork brand Bigbird: bus antar-jemput biru di bawah logo Bigbird pada bidang biru ke tosca.',
  },
};

export const goldenbirdPicture: Picture = {
  src: goldenbirdSrc,
  srcSet: goldenbirdSet,
  width: 1024,
  height: 672,
  alt: {
    en: 'Goldenbird brand artwork: a gold executive van under the Goldenbird logo on a gold field.',
    id: 'Artwork brand Goldenbird: van eksekutif emas di bawah logo Goldenbird pada bidang emas.',
  },
};

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
  /** The handwritten note taped to the hero photograph. */
  note: Bilingual;
  noteOpening: Bilingual;
  scrollCue: Bilingual;
} = {
  statement: {
    en: 'Senior product designer in Jakarta, Indonesia.',
    id: 'Desainer produk senior di Jakarta, Indonesia.',
  },
  // The reference set this in a script face at 19px as the only words on the
  // first screen. It keeps the hand, and the page now carries a real title too.
  noteOpening: {
    en: "Hi, I'm Brama, a designer with 6+ years behind him.",
    id: 'Halo, saya Brama, desainer dengan pengalaman 6+ tahun.',
  },
  note: {
    en: 'I believe in making a positive impact not only through my work, but also through kindness and meaningful contributions to others.',
    id: 'Saya percaya pada dampak positif, bukan hanya lewat pekerjaan, tapi juga lewat kebaikan dan kontribusi yang berarti bagi orang lain.',
  },
  scrollCue: {
    en: 'scroll to see how I work',
    id: 'gulir untuk melihat cara saya bekerja',
  },
};

/** The header's four section links, in the reference's order. */
export const nav: ReadonlyArray<{ label: Bilingual; href: string }> = [
  { label: { en: 'Works', id: 'Karya' }, href: '#works' },
  { label: { en: 'Playground', id: 'Playground' }, href: '#playground' },
  { label: { en: 'Experience', id: 'Pengalaman' }, href: '#journey' },
  { label: { en: 'About Me', id: 'Tentang Saya' }, href: '#about' },
];

export const headerActions: ReadonlyArray<{
  label: Bilingual;
  href: string;
  /** The acid-green fill is reserved for the one primary action. */
  primary: boolean;
}> = [
  { label: { en: 'LinkedIn', id: 'LinkedIn' }, href: '#', primary: false },
  { label: { en: 'Download CV', id: 'Unduh CV' }, href: '#', primary: true },
];

/**
 * The hero photograph. Full-bleed behind a neutral scrim, drifting slower than
 * the page as it scrolls.
 */
export const heroPhoto = {
  src: siapBantuSrc,
  srcSet: siapBantuSet,
  width: 3900,
  height: 2600,
  alt: {
    en: 'Brama with the Siap Bantu volunteers and the children they hosted, gathered on the steps of a gallery.',
    id: 'Brama bersama relawan Siap Bantu dan anak-anak yang mereka dampingi, berkumpul di tangga sebuah galeri.',
  } satisfies Bilingual,
};

/**
 * The closing photograph, behind the letter. The frame asked for "a candid,
 * moody shot — workspace, sketches, you at work"; this is the nearest real one
 * the repository holds, and it is a picture of the designer rather than a
 * stand-in for a workspace that was never photographed.
 */
export const closingPhoto = {
  src: kawahPutihSrc,
  srcSet: kawahPutihSet,
  width: 1753,
  height: 2000,
  alt: {
    en: 'Brama standing among the bare trees of Kawah Putih, West Java, with the crater ridge behind him.',
    id: 'Brama berdiri di antara pohon-pohon gundul Kawah Putih, Jawa Barat, dengan punggungan kawah di belakangnya.',
  } satisfies Bilingual,
};

/** Which scrapbook prop fastens a given piece of paper to the board. */
export type Fastener = 'paper-clip' | 'push-pin' | 'push-pin-2' | 'binder-clip' | 'nail' | 'washi';

export type WorkItem = {
  title: string;
  kind: Bilingual;
  client: string;
  year: number;
  href: string;
  /** Null until a real cover exists; the card then shows a drawn title card. */
  coverImage: Picture | null;
  /** The flat colour Figma gave this card, used as the field behind the cover. */
  field: string;
  /**
   * Which ink the drawn title card uses on that field. Measured against the
   * field, not guessed: light on #5d7fb8 is 4.0:1, on #5f8c7d 3.8:1, on
   * #7071b5 4.4:1 — all clear of 3:1 for type set this large — and the khaki
   * #c8b980 takes the dark ink at 9.0:1.
   */
  coverInk: 'light' | 'dark';
  fastener: Fastener;
  /** Degrees of tilt on the board, straight from the reference. */
  tilt: number;
  /** True while the entry is sample content awaiting a real project. */
  sample: boolean;
};

export const work: {
  headingLines: readonly [Bilingual, Bilingual];
  cta: { label: Bilingual; href: string };
  items: ReadonlyArray<WorkItem>;
} = {
  // Two lines, one colour. The reference greyed the second line; the house
  // rules do not allow a styled accent inside a heading, so both lines are ink.
  headingLines: [
    { en: 'A few projects', id: 'Beberapa karya' },
    { en: "I'm proud of", id: 'yang saya banggakan' },
  ],
  cta: { label: { en: 'View all works', id: 'Lihat semua karya' }, href: '#' },
  items: [
    {
      title: 'School Bus Tracker',
      kind: { en: 'Mobile app', id: 'Aplikasi mobile' },
      client: 'Bluebird Group',
      year: 2024,
      href: '#',
      coverImage: bigbirdPicture,
      field: '#9db8e3',
      coverInk: 'dark',
      fastener: 'paper-clip',
      tilt: 1.4,
      sample: false,
    },
    {
      title: 'Goldenbird Stock Management',
      kind: { en: 'Integrated platform', id: 'Platform terintegrasi' },
      client: 'Bluebird Group',
      year: 2024,
      href: '#',
      coverImage: goldenbirdPicture,
      field: '#7fa6b5',
      coverInk: 'dark',
      fastener: 'push-pin',
      tilt: -1.1,
      sample: false,
    },
    {
      title: 'Transjakarta Passenger App',
      kind: { en: 'Mobile app', id: 'Aplikasi mobile' },
      client: 'PT Transjakarta',
      year: 2025,
      href: '#',
      coverImage: null,
      field: '#5d7fb8',
      coverInk: 'light',
      fastener: 'washi',
      tilt: 1.2,
      sample: true,
    },
    {
      title: 'Bali Love Booking Flow',
      kind: { en: 'Web platform', id: 'Platform web' },
      client: 'Bali Love',
      year: 2026,
      href: '#',
      coverImage: null,
      field: '#5f8c7d',
      coverInk: 'light',
      fastener: 'washi',
      tilt: -0.9,
      sample: true,
    },
    {
      title: 'Humblebee Brand System',
      kind: { en: 'Design system', id: 'Design system' },
      client: 'Humblebee',
      year: 2023,
      href: '#',
      coverImage: null,
      field: '#7071b5',
      coverInk: 'light',
      fastener: 'binder-clip',
      tilt: 1.1,
      sample: true,
    },
    {
      title: 'Bluebird Driver Companion',
      kind: { en: 'Mobile app', id: 'Aplikasi mobile' },
      client: 'Bluebird Group',
      year: 2023,
      href: '#',
      coverImage: null,
      field: '#c8b980',
      coverInk: 'dark',
      fastener: 'push-pin-2',
      tilt: -1.3,
      sample: true,
    },
  ],
};

/**
 * The gallery marquee. Every shot is a sample: the reference leaves all
 * fourteen as flat colour, and no real exploration files exist in the repo yet.
 * Each entry keeps Figma's colour so the rhythm of the two rows survives.
 */
export const playground: {
  headingLines: readonly [Bilingual, Bilingual];
  cta: { label: Bilingual; href: string };
  /**
   * Names the marquee for assistive technology. Deliberately neutral: a page
   * never explains what its pictures are not, so "awaiting real shots" belongs
   * in this comment and in the handover notes, not on screen.
   */
  shotsLabel: Bilingual;
  shots: ReadonlyArray<{ picture: Picture; tilt: number }>;
} = {
  headingLines: [
    { en: 'Design', id: 'Galeri' },
    { en: 'Gallery', id: 'desain' },
  ],
  cta: { label: { en: 'Go to Playground', id: 'Ke Playground' }, href: '#' },
  shotsLabel: {
    en: 'Interface explorations',
    id: 'Eksplorasi antarmuka',
  },
  // Four real pictures, cycled. A marquee repeats by nature, so this reads as
  // a wall of work rather than as padding — and nothing on it is invented.
  // Replace with the real exploration shots when they exist.
  shots: [
    { picture: bigbirdPicture, tilt: 1.6 },
    { picture: siapBantuPicture, tilt: -1.2 },
    { picture: goldenbirdPicture, tilt: 0.8 },
    { picture: kawahPutihPicture, tilt: -1.5 },
    { picture: goldenbirdPicture, tilt: 1.1 },
    { picture: kawahPutihPicture, tilt: -0.7 },
    { picture: bigbirdPicture, tilt: 1.4 },
    { picture: siapBantuPicture, tilt: -1.1 },
  ],
};

export type JourneyStop = {
  role: string;
  place: string;
  from: string;
  to: Bilingual;
  /** Which side of the board the caption sits on. */
  side: 'left' | 'right';
  photo: Picture | null;
  field: string;
  fastener: Fastener;
  tilt: number;
};

export const journey: {
  headingLines: readonly [Bilingual, Bilingual];
  startNote: Bilingual;
  nextNote: Bilingual;
  stops: ReadonlyArray<JourneyStop>;
} = {
  headingLines: [
    { en: 'Career', id: 'Perjalanan' },
    { en: 'Journey', id: 'karier' },
  ],
  startNote: { en: 'it all started here', id: 'semua bermula di sini' },
  nextNote: { en: 'next stop: your team?', id: 'perhentian berikutnya: tim kamu?' },
  // Job titles stay in English in both languages: that is how they are written
  // in the Indonesian design industry, and translating them would read as odd.
  stops: [
    {
      role: 'Freelance Designer',
      place: 'Humblebee',
      from: '2019',
      to: { en: 'Present', id: 'Sekarang' },
      side: 'left',
      photo: null,
      field: '#9db8e3',
      fastener: 'push-pin',
      tilt: -2,
    },
    {
      role: 'Product Designer',
      place: 'Bluebird Group',
      from: '2022',
      to: { en: '2024', id: '2024' },
      side: 'right',
      photo: null,
      field: '#7fa6b5',
      fastener: 'push-pin-2',
      tilt: 1.6,
    },
    {
      role: 'Lead Product Design',
      place: 'PT Transjakarta',
      from: '2024',
      to: { en: '2025', id: '2025' },
      side: 'left',
      photo: null,
      field: '#e8b4a6',
      fastener: 'nail',
      tilt: -1.4,
    },
    {
      role: 'UI/UX Lead',
      place: 'Bali Love',
      from: '2025',
      to: { en: '2026', id: '2026' },
      side: 'right',
      photo: null,
      field: '#a3b59b',
      fastener: 'washi',
      tilt: 1.8,
    },
  ],
};

/** The letter pinned over the closing photograph. */
export const letter: {
  heading: Bilingual;
  greeting: Bilingual;
  body: readonly [Bilingual, Bilingual];
  signature: string;
  cta: { label: Bilingual; href: string };
} = {
  // The reference leaves this section unlabelled. A section a visitor cannot
  // name is the fault readers report most often, so it gets a real heading.
  heading: { en: 'About me', id: 'Tentang saya' },
  greeting: { en: 'hey you,', id: 'hai kamu,' },
  body: [
    {
      en: 'Every design here started from below zero — no map, no shortcuts, just stubborn curiosity and a lot of late nights.',
      id: 'Setiap desain di sini dimulai dari nol — tanpa peta, tanpa jalan pintas, hanya rasa penasaran yang keras kepala dan banyak begadang.',
    },
    {
      en: "Six years and a few stops later, I'm still sketching my way forward.",
      id: 'Enam tahun dan beberapa perhentian kemudian, saya masih menggambar jalan saya ke depan.',
    },
  ],
  signature: '— Brama',
  cta: { label: { en: 'Read about me', id: 'Baca tentang saya' }, href: '#' },
};

export const footer: {
  headingLines: readonly [Bilingual, Bilingual];
  gates: ReadonlyArray<{ label: Bilingual; href: string; tilt: number }>;
  copyright: string;
  backToTop: Bilingual;
} = {
  headingLines: [
    { en: "Let's create", id: 'Mari ciptakan' },
    { en: 'magic together', id: 'keajaiban bersama' },
  ],
  // Sentence case at a readable size: the reference set these as tracked
  // capitals, which the house rules do not allow.
  gates: [
    { label: { en: 'Download CV', id: 'Unduh CV' }, href: '#', tilt: 1.2 },
    { label: { en: 'LinkedIn', id: 'LinkedIn' }, href: '#', tilt: -1 },
    { label: { en: 'Dribbble', id: 'Dribbble' }, href: '#', tilt: -0.8 },
    { label: { en: 'Instagram', id: 'Instagram' }, href: '#', tilt: 1.4 },
  ],
  copyright: '© 2026 Brama Damuharta',
  backToTop: { en: 'Back to top', id: 'Kembali ke atas' },
};

export const ui = {
  skipToContent: { en: 'Skip to content', id: 'Lompat ke konten' },
  languageLabel: { en: 'Language', id: 'Bahasa' },
  primaryNavLabel: { en: 'Sections', id: 'Bagian' },
  heroPhotoCaption: {
    en: 'Siap Bantu volunteers, Jakarta, 2025.',
    id: 'Relawan Siap Bantu, Jakarta, 2025.',
  },
  sampleWork: { en: 'Sample project', id: 'Contoh proyek' },
} satisfies Record<string, Bilingual>;
