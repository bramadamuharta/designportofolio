# CLAUDE.md

Portfolio site: static, animated, content-as-files. See `README.md` for the
stack table and the authoring guide; this file covers only what an agent needs
that the README does not say.

## Design direction comes from the skill, not from defaults

`.claude/skills/design-taste-frontend/` holds a vendored copy of **tasteskill**.
Invoke it before building, restyling or reviewing any public-facing page, hero
or section. Do not invent an art direction — the skill deals researched
directions and you choose among them.

The tokens in `src/styles/index.css` under `@theme`, and the layout in
`src/routes/`, are placeholders pending that run. Treat them as scaffolding, not
as decisions to preserve.

The skill's scripts need a Chrome binary. In this cloud environment:

```bash
export CHROME_PATH=/opt/pw-browsers/chromium
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
