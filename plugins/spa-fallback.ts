import { copyFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { Plugin } from 'vite';

/**
 * GitHub Pages serves static files with no rewrite rule, so a client-routed URL
 * like /case/<slug> has no file behind it and returns the 404 page. Pages does
 * serve a custom 404.html, and because this is a single-page app, shipping a
 * copy of index.html under that name makes deep links and refreshes resolve:
 * Pages answers with the app, and the router then reads the real path.
 *
 * Harmless on hosts that do have rewrites — the file is simply never requested.
 */
export function spaFallbackPlugin(): Plugin {
  let outDir: string;

  return {
    name: 'portfolio:spa-fallback',
    apply: 'build',

    configResolved(config) {
      outDir = config.build.outDir;
    },

    async closeBundle() {
      try {
        await copyFile(join(outDir, 'index.html'), join(outDir, '404.html'));
      } catch (cause) {
        this.warn(`could not write 404.html SPA fallback: ${(cause as Error).message}`);
      }
    },
  };
}
