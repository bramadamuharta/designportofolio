/// <reference types="vite/client" />

/**
 * vite-imagetools ships no ambient types for its query-suffixed imports, so the
 * shapes this project actually uses are declared here. Without these, an import
 * like `cover.jpg?w=800;1600&format=webp&as=srcset` is an untyped `any`.
 */

/** `?as=srcset` — a ready-made srcset string. */
declare module '*&as=srcset' {
  const srcset: string;
  export default srcset;
}
declare module '*?as=srcset' {
  const srcset: string;
  export default srcset;
}

/** `?as=metadata` — dimensions and format, for layout-shift-free <img>. */
declare module '*&as=metadata' {
  const metadata: { src: string; width: number; height: number; format: string };
  export default metadata;
}
declare module '*?as=metadata' {
  const metadata: { src: string; width: number; height: number; format: string };
  export default metadata;
}

/** `?as=picture` — sources grouped by format, for a <picture> element. */
declare module '*&as=picture' {
  const picture: {
    sources: Record<string, string>;
    img: { src: string; w: number; h: number };
  };
  export default picture;
}
declare module '*?as=picture' {
  const picture: {
    sources: Record<string, string>;
    img: { src: string; w: number; h: number };
  };
  export default picture;
}

/**
 * Virtual module emitted by plugins/case-studies.ts: one entry per .mdx file,
 * carrying its slug and raw frontmatter. Values are unvalidated by design —
 * src/content/schema.ts is what turns them into a typed CaseStudy.
 */
declare module 'virtual:case-studies' {
  const entries: Array<{ slug: string } & Record<string, unknown>>;
  export default entries;
}
