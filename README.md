# designportofolio

Portfolio site. Static, animated, built from content files in this repository.

## Stack

| Concern | Choice | Why |
|---|---|---|
| Build | Vite 8 | Instant dev server, static output that drops straight onto GitHub Pages |
| UI | React 19 + TypeScript | Shared layout transitions between a card and its case study page |
| Styling | Tailwind 4 | Tokens declared once in `src/styles/index.css` under `@theme` |
| Animation | Motion 14 | Scroll reveals and layout animation, with `prefers-reduced-motion` honoured |
| Content | MDX | Case studies are files, with React components usable inside the prose |
| Images | vite-imagetools | WebP/AVIF, responsive `srcset`, generated at build time |
| Hosting | GitHub Pages | Deployed by Actions on every push to `main` |

## Commands

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run preview
```

## Adding a case study

Drop one file into `src/content/case-studies/`. The filename becomes the URL,
and the index page picks it up — no component needs editing.

```mdx
---
title: 'Redesign Aplikasi Mobile Banking'
summary: 'Satu baris yang menjelaskan posisi kerjanya.'
client: 'Bank Nusantara'
year: 2026
role: 'Lead Product Designer'
tags: ['UX Research', 'Design System']
featured: true
order: 1
---

import cover from './images/cover.webp';

<Figure src={cover} alt="..." width={1600} height={1000} priority />

## Masalahnya

Prosa biasa. Komponen React boleh diselipkan di tengahnya.

<Metric value="2.4x" label="Peningkatan konversi" />
```

`src/content/case-studies/contoh-studi-kasus.mdx` is a worked example covering
every field and component. Delete it once real content is in.

Frontmatter is validated at build time by `src/content/schema.ts`. A missing or
misspelled field fails the build and names the file, rather than rendering a
broken card.

Components available inside MDX without importing: `Figure`, `ImageCompare`,
`Metric` (see `src/components/mdx/`). Element overrides for headings, lists,
quotes and links live in the same folder.

### Images

Import images rather than writing their paths as strings, so Vite hashes them
and cache-busting works:

```jsx
import cover from './images/cover.webp';
<Figure src={cover} alt="..." width={1600} height={1000} />
```

For large photographs, let imagetools generate the responsive set:

```jsx
import srcset from './images/hero.jpg?w=640;1024;1600&format=webp&as=srcset';
```

Always pass `width` and `height`. An image without intrinsic dimensions shifts
the text under it while loading, which is the cheapest way to make a
well-designed page feel cheap.

## Why no CMS

Content lives in the repo as MDX: versioned, visible in diffs, reviewable in a
pull request, and with no service to call at build time. A portfolio gains a
handful of case studies a year, which does not repay a headless CMS's schema
maintenance and vendor lock-in.

If browser-based editing is ever wanted, a git-backed CMS (Decap, Tina) layers
on top of these same files and commits back to this repository — so nothing here
is thrown away. Going the other direction, from a hosted CMS back to files, is
the migration that hurts.

## Performance notes

The build is split so weight scales with what a visitor actually opens:

- Each case study body is its own chunk, loaded on navigation. The frontmatter
  that the index page needs is read at build time by `plugins/case-studies.ts`,
  which keeps the runtime glob purely dynamic — an eager glob over the same
  files defeats splitting and folds every case study into the entry bundle.
- Dependencies are grouped into `react`, `router` and `motion` chunks, so a copy
  change does not invalidate the framework in a returning visitor's cache.
- `chunkSizeWarningLimit` is set to 250 kB to surface accidental weight early.

Text is cheap; images are not. The thing to watch is the asset pipeline, not the
number of case studies.

## Deployment

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every
push to `main`. Enable it once under **Settings → Pages → Build and deployment
→ Source: GitHub Actions**.

`BASE_PATH` is derived from the repository name, because Pages serves the site
from `/<repo>/`. `plugins/spa-fallback.ts` writes `dist/404.html` as a copy of
`index.html`, which is what makes deep links such as `/case/<slug>` resolve on a
host with no rewrite rules.

## Design direction

Visual decisions are driven by the `design-taste-frontend` skill vendored at
`.claude/skills/design-taste-frontend/` (tasteskill by Leonxlnx, MIT — see
`VENDORED.md` there for provenance and how to update it). The tokens currently
in `src/styles/index.css` are deliberately plain placeholders, so nothing in
them is mistaken for a decision that has been made.
