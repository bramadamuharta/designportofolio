import type { ComponentType } from 'react';
import rawEntries from 'virtual:case-studies';
import { parseCaseStudy, type CaseStudy } from './schema';

/**
 * Case studies are plain .mdx files on disk — adding one means dropping a file
 * into ./case-studies, never editing a component.
 *
 * Metadata comes from `virtual:case-studies`, which reads the frontmatter at
 * build time (see plugins/case-studies.ts). The bodies are loaded through a
 * dynamic glob and nothing else, so each case study is emitted as its own chunk
 * and a visitor downloads only the one they opened.
 */
const bodyModules = import.meta.glob<{ default: ComponentType }>('./case-studies/*.mdx');

const slugOf = (path: string): string => path.split('/').pop()!.replace(/\.mdx$/, '');

const bySlug = new Map<string, CaseStudy>();
for (const raw of rawEntries) {
  const entry = parseCaseStudy(`${raw.slug}.mdx`, raw.slug, raw);
  if (bySlug.has(entry.slug)) {
    throw new Error(`Duplicate case study slug "${entry.slug}" — two files resolve to the same URL.`);
  }
  bySlug.set(entry.slug, entry);
}

const bodyBySlug = new Map<string, () => Promise<{ default: ComponentType }>>(
  Object.entries(bodyModules).map(([path, load]) => [slugOf(path), load]),
);

// A body with no frontmatter entry (or the reverse) means the two sources have
// drifted apart; better to fail the build than to render a dead link.
for (const slug of bodyBySlug.keys()) {
  if (!bySlug.has(slug)) throw new Error(`Case study "${slug}.mdx" has a body but no parsed metadata.`);
}
for (const slug of bySlug.keys()) {
  if (!bodyBySlug.has(slug)) throw new Error(`Case study "${slug}" has metadata but no .mdx body was found.`);
}

/** Newest first, featured entries pulled to the top in `order` sequence. */
export const caseStudies: CaseStudy[] = [...bySlug.values()]
  .filter((entry) => !entry.draft)
  .sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    if (a.featured && a.order !== b.order) return a.order! - b.order!;
    if (a.year !== b.year) return b.year - a.year;
    return a.title.localeCompare(b.title, 'id');
  });

/** Every distinct tag across published case studies, alphabetical. */
export const allTags: string[] = [
  ...new Set(caseStudies.flatMap((entry) => entry.tags)),
].sort((a, b) => a.localeCompare(b, 'id'));

/** Metadata for one case study. Drafts resolve too, so a direct URL still works. */
export function getCaseStudy(slug: string): CaseStudy | undefined {
  return bySlug.get(slug);
}

/** Lazily import one case study's compiled MDX body. */
export function loadCaseStudyBody(slug: string) {
  return bodyBySlug.get(slug);
}

export type { CaseStudy, CaseStudyFrontmatter } from './schema';
