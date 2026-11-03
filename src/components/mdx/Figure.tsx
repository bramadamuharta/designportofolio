type FigureProps = {
  src: string;
  alt: string;
  caption?: string;
  /** Intrinsic pixel dimensions. Supplying both prevents layout shift on load. */
  width?: number;
  height?: number;
  /** Set on the one image above the fold; everything else should stay lazy. */
  priority?: boolean;
};

/**
 * Every image in a case study goes through here, so width/height and lazy
 * loading are never forgotten — an image without intrinsic dimensions shifts
 * the text under it as it loads, which is the cheapest way to make a
 * well-designed page feel cheap.
 */
export function Figure({ src, alt, caption, width, height, priority = false }: FigureProps) {
  return (
    <figure className="my-12">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className="w-full rounded-lg bg-(--color-rule)"
      />
      {caption ? (
        <figcaption className="mt-3 text-sm text-(--color-ink-muted)">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
