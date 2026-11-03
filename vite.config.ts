import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkGfm from 'remark-gfm';
import { imagetools } from 'vite-imagetools';
import { caseStudiesPlugin } from './plugins/case-studies.ts';
import { spaFallbackPlugin } from './plugins/spa-fallback.ts';

// On GitHub Pages the site is served from /<repo>/, so assets need that prefix.
// Locally and on hosts that serve from the domain root, BASE_PATH stays "/".
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  base,
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  plugins: [
    // MDX must compile before the React plugin sees the file.
    { enforce: 'pre', ...mdx({
      providerImportSource: '@mdx-js/react',
      remarkPlugins: [
        remarkGfm,
        remarkFrontmatter,
        [remarkMdxFrontmatter, { name: 'frontmatter' }],
      ],
    }) },
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
    tailwindcss(),
    imagetools(),
    caseStudiesPlugin(),
    spaFallbackPlugin(),
  ],
  build: {
    target: 'es2022',
    // Surface accidental weight early: warn well below the point where a
    // portfolio starts to feel slow on mobile.
    chunkSizeWarningLimit: 250,
    rolldownOptions: {
      output: {
        // Dependencies change far less often than the site does. Splitting them
        // out means a copy tweak ships a few kB instead of invalidating the
        // whole framework bundle in every returning visitor's cache.
        codeSplitting: {
          groups: [
            { name: 'react', test: /node_modules\/(react|react-dom|scheduler)\//, priority: 30 },
            { name: 'router', test: /node_modules\/(react-router|react-router-dom)\//, priority: 20 },
            { name: 'motion', test: /node_modules\/(motion|framer-motion|motion-dom|motion-utils)\//, priority: 10 },
          ],
        },
      },
    },
  },
});
