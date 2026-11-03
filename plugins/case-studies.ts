import { readFile, readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { parse as parseYaml } from 'yaml';
import type { Plugin } from 'vite';

/**
 * Exposes case study *metadata* as a virtual module, read from the .mdx files
 * at build time.
 *
 * Why this exists rather than `import.meta.glob(..., { eager: true })`:
 * an eager glob is a static import. Pairing one with a lazy glob over the same
 * files makes the bundler give up on splitting them — it warns
 * INEFFECTIVE_DYNAMIC_IMPORT and folds every case study body into the entry
 * chunk, so the homepage ships the full text and imagery of every case study
 * nobody has opened yet. Reading the frontmatter here keeps the runtime glob
 * purely dynamic, so each case study becomes its own chunk.
 */

const VIRTUAL_ID = 'virtual:case-studies';
const RESOLVED_ID = '\0' + VIRTUAL_ID;

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---/;

type Entry = { slug: string; [key: string]: unknown };

async function readEntries(dir: string): Promise<Entry[]> {
  let files: string[];
  try {
    files = (await readdir(dir)).filter((name) => name.endsWith('.mdx'));
  } catch {
    return [];
  }

  return Promise.all(
    files.sort().map(async (name) => {
      const source = await readFile(join(dir, name), 'utf8');
      const match = FRONTMATTER.exec(source);
      const slug = name.replace(/\.mdx$/, '');

      if (!match?.[1]) {
        throw new Error(
          `${name} has no frontmatter block — a case study must open with a "---" fenced YAML block.`,
        );
      }

      let data: unknown;
      try {
        data = parseYaml(match[1]);
      } catch (cause) {
        throw new Error(`${name} has malformed YAML frontmatter: ${(cause as Error).message}`);
      }

      if (data === null || typeof data !== 'object' || Array.isArray(data)) {
        throw new Error(`${name} frontmatter must be a YAML mapping of keys to values.`);
      }

      return { slug, ...(data as Record<string, unknown>) };
    }),
  );
}

export function caseStudiesPlugin(contentDir = 'src/content/case-studies'): Plugin {
  let dir: string;

  return {
    name: 'portfolio:case-studies',

    configResolved(config) {
      dir = resolve(config.root, contentDir);
    },

    resolveId(id) {
      return id === VIRTUAL_ID ? RESOLVED_ID : null;
    },

    async load(id) {
      if (id !== RESOLVED_ID) return null;
      const entries = await readEntries(dir);
      // addWatchFile so editing frontmatter in dev re-runs this load.
      for (const entry of entries) this.addWatchFile(join(dir, `${entry.slug}.mdx`));
      this.addWatchFile(dir);
      return `export default ${JSON.stringify(entries)};`;
    },

    // A new or renamed .mdx changes the index, which this virtual module owns.
    async handleHotUpdate({ file, server, modules }) {
      if (!file.startsWith(dir) || !file.endsWith('.mdx')) return;
      const virtual = server.moduleGraph.getModuleById(RESOLVED_ID);
      if (virtual) {
        server.moduleGraph.invalidateModule(virtual);
        return [...modules, virtual];
      }
      return;
    },

    configureServer(server) {
      const invalidate = (file: string) => {
        if (!file.startsWith(dir) || !file.endsWith('.mdx')) return;
        const virtual = server.moduleGraph.getModuleById(RESOLVED_ID);
        if (!virtual) return;
        server.moduleGraph.invalidateModule(virtual);
        server.ws.send({ type: 'full-reload' });
      };
      server.watcher.on('add', invalidate);
      server.watcher.on('unlink', invalidate);
    },
  };
}
