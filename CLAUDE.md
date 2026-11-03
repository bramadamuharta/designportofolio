# CLAUDE.md

Portfolio site: static, animated, content-as-files. See `README.md` for the
stack table and the authoring guide; this file covers only what an agent needs
that the README does not say.

## Design direction comes from the skill, not from defaults

`.claude/skills/design-taste-frontend/` holds a vendored copy of **tasteskill**.
Invoke it before building, restyling or reviewing any public-facing page, hero
or section. Do not invent an art direction — the skill deals researched
directions and you choose among them.

The home page is a port of an existing Framer portfolio, so its art direction
was given rather than dealt. Where that reference used a device the house rules
ban (a live clock, tiny tracked capitals, hairline-outlined pills, blank bands
of 250px and more), the house rule won. Keep it that way.

The skill's scripts need a Chrome binary. In this cloud environment Chromium
refuses to start as root without a flag, so point `CHROME_PATH` at a wrapper
rather than at the binary:

```bash
printf '#!/usr/bin/env bash\nexec /opt/pw-browsers/chromium --no-sandbox --disable-dev-shm-usage "$@"\n' > /tmp/chrome.sh && chmod +x /tmp/chrome.sh && export CHROME_PATH=/tmp/chrome.sh
```

Run the gate on the production build, never the dev server:

```bash
npm run build && npx vite preview --port 4173 & node .claude/skills/design-taste-frontend/scripts/lint.mjs src index.html && node .claude/skills/design-taste-frontend/scripts/inspect.mjs http://127.0.0.1:4173
```

## Rules

1. **Content never goes in components.** A case study is one `.mdx` file in
   `src/content/case-studies/`. If a change would hardcode copy, a project name
   or a metric into a `.tsx` file, it belongs in frontmatter or prose instead.
2. **Frontmatter changes go through `src/content/schema.ts`.** Adding a field
   means adding it to `CaseStudyFrontmatter` and validating it in
   `parseCaseStudy`, so a typo fails the build with the file named.
3. **Never pair an eager glob with a lazy glob over the same files.** That is
   what `plugins/case-studies.ts` exists to avoid; it defeats code splitting and
   folds every case study body into the entry chunk. If you need more metadata
   on the index page, extend the virtual module, not the runtime glob.
4. **Every image gets `width` and `height`**, and `loading="lazy"` unless it is
   above the fold. Import images; never write their paths as strings.
5. **Every animation respects `prefers-reduced-motion`** — `useReducedMotion()`
   for JS-driven motion. The CSS fallback in `src/styles/index.css` is a safety
   net, not a licence to skip the hook.
6. **Interactive controls must be real controls.** `ImageCompare` is driven by a
   `range` input rather than pointer maths so it is keyboard-operable and
   announced by screen readers. Hold new components to that bar.
7. **Verify in a browser, not just in the build log.** `npm run build` passing
   is not evidence the page renders. Serve `dist` and look at it.
8. **Never screenshot this page with `fullPage: true`.** That resizes the
   viewport at capture time, which restarts the CSS entrance animations and
   photographs the name lockup mid-rise, so it comes out blank. Size the
   viewport to the page height first, then capture. The page itself is fine;
   only the screenshot lies.
9. **The name lockup is sized by measurement**, not by `clamp()`
   (`src/components/FittedName.tsx`). Do not replace it with a guessed size:
   the line is meant to land exactly on the margin at every width.

## Before saying a change works

```bash
npm run typecheck && npm run build
```

The build must finish with no Rolldown warnings. `INEFFECTIVE_DYNAMIC_IMPORT`
or a chunk-size warning means rule 3 was broken, not that the limit needs
raising.

## Deployment

Pushes to `main` deploy via `.github/workflows/deploy.yml`. `BASE_PATH` is
derived from the repository name — do not hardcode it, and do not remove
`plugins/spa-fallback.ts`, which is what makes deep links work on GitHub Pages.
