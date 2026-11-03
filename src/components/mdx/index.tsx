import type { MDXComponents } from 'mdx/types';
import { Figure } from './Figure';
import { ImageCompare } from './ImageCompare';
import { Metric } from './Metric';

/**
 * Components available inside every .mdx file without an import, plus the
 * element overrides that give Markdown output the same typography as the rest
 * of the site.
 */
export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="mt-16 mb-4 text-2xl font-semibold tracking-tight sm:text-3xl" {...props} />,
  h3: (props) => <h3 className="mt-10 mb-3 text-xl font-semibold tracking-tight" {...props} />,
  p: (props) => <p className="my-5 text-lg/relaxed text-(--color-ink)" {...props} />,
  ul: (props) => <ul className="my-5 list-disc space-y-2 pl-6 text-lg/relaxed" {...props} />,
  ol: (props) => <ol className="my-5 list-decimal space-y-2 pl-6 text-lg/relaxed" {...props} />,
  blockquote: (props) => (
    <blockquote className="my-8 border-l-2 border-(--color-accent) pl-5 text-xl/relaxed italic" {...props} />
  ),
  hr: () => <hr className="my-14 border-(--color-rule)" />,
  a: (props) => (
    <a className="underline decoration-(--color-rule) underline-offset-4 hover:decoration-(--color-accent)" {...props} />
  ),
  // Raw Markdown images still get lazy loading rather than blocking render.
  img: (props) => <img loading="lazy" decoding="async" className="my-8 w-full rounded-lg" {...props} />,

  Figure,
  ImageCompare,
  Metric,
};
