/**
 * Frontmatter contract for a case study.
 *
 * Frontmatter is hand-written YAML, so it is the one place in this project
 * where a typo survives TypeScript. `parseCaseStudy` validates every field at
 * module-load time and throws with the offending file named, which surfaces the
 * mistake in the dev overlay and fails `npm run build` rather than shipping a
 * half-rendered card.
 */

export type CaseStudyFrontmatter = {
  /** Shown as the page's h1 and on the index card. */
  title: string;
  /** One line of positioning. Also used as the meta description. */
  summary: string;
  /** Who it was for. Use "Personal project" when there was no client. */
  client: string;
  /** Year the work shipped, or was last worked on. */
  year: number;
  /** What you actually did, e.g. "Lead Product Designer". */
  role: string;
  /** Short labels for filtering and for the card's footer. */
  tags: string[];
  /** Cover image, relative to the .mdx file. Omit while drafting. */
  cover?: string;
  /** Alt text for the cover. Required whenever `cover` is set. */
  coverAlt?: string;
  /** Pulled to the top of the index, in `order` sequence. */
  featured?: boolean;
  /** Lower sorts first among featured entries. */
  order?: number;
  /** Hidden from the index and from the sitemap, still reachable by URL. */
  draft?: boolean;
};

export type CaseStudy = CaseStudyFrontmatter & {
  /** URL segment, taken from the filename. */
  slug: string;
};

function fail(file: string, message: string): never {
  throw new Error(`Invalid frontmatter in ${file}: ${message}`);
}

function requireString(file: string, raw: Record<string, unknown>, key: string): string {
  const value = raw[key];
  if (typeof value !== 'string' || value.trim() === '') {
    fail(file, `"${key}" must be a non-empty string, got ${JSON.stringify(value)}`);
  }
  return value.trim();
}

export function parseCaseStudy(file: string, slug: string, raw: unknown): CaseStudy {
  if (raw === null || typeof raw !== 'object') {
    fail(file, 'no frontmatter block found — the file must open with a "---" fenced YAML block');
  }
  const data = raw as Record<string, unknown>;

  const year = data.year;
  if (typeof year !== 'number' || !Number.isInteger(year) || year < 1990 || year > 2100) {
    fail(file, `"year" must be a four-digit integer, got ${JSON.stringify(year)}`);
  }

  const tags = data.tags;
  if (!Array.isArray(tags) || tags.some((t) => typeof t !== 'string')) {
    fail(file, `"tags" must be a list of strings, got ${JSON.stringify(tags)}`);
  }

  const cover = data.cover;
  if (cover !== undefined && typeof cover !== 'string') {
    fail(file, `"cover" must be a string path, got ${JSON.stringify(cover)}`);
  }
  const coverAlt = data.coverAlt;
  if (cover !== undefined && (typeof coverAlt !== 'string' || coverAlt.trim() === '')) {
    fail(file, '"coverAlt" is required whenever "cover" is set — a cover with no alt text is inaccessible');
  }

  return {
    slug,
    title: requireString(file, data, 'title'),
    summary: requireString(file, data, 'summary'),
    client: requireString(file, data, 'client'),
    role: requireString(file, data, 'role'),
    year,
    tags: tags as string[],
    ...(cover !== undefined ? { cover, coverAlt: (coverAlt as string).trim() } : {}),
    featured: data.featured === true,
    order: typeof data.order === 'number' ? data.order : Number.MAX_SAFE_INTEGER,
    draft: data.draft === true,
  };
}
