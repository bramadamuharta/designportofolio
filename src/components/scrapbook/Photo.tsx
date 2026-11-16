import type { CSSProperties, ReactNode } from 'react';
import type { Picture } from '@/content/site';
import { useI18n } from '@/lib/i18n';

/**
 * A photo print: the cream stock with its picture window and a caption below.
 *
 * The window keeps its ratio whether or not a picture exists. Where one does
 * not, `fallback` draws a title card on the field instead: the project set in
 * type, the way an end frame or a poster carries a piece of work. That is
 * honest — it claims to be lettering, not a screenshot — and it keeps the band
 * of the page it occupies from reading as a hole.
 */
export function Photo({
  picture,
  field,
  ratio = '3 / 2',
  priority = false,
  sizes,
  fallback,
  children,
  className = '',
  style,
}: {
  picture: Picture | null;
  field: string;
  ratio?: string;
  /** True only for prints above the fold, which must not be lazy-loaded. */
  priority?: boolean;
  sizes?: string;
  /** Drawn into the field when `picture` is null. */
  fallback?: ReactNode;
  /** The caption, set by the caller so each section can size its own. */
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const { t } = useI18n();

  return (
    <div className={`paper-print p-[3%] ${className}`} style={style}>
      <div
        className="relative overflow-clip rounded-[2px]"
        style={{ aspectRatio: ratio, backgroundColor: field }}
      >
        {picture ? (
          <img
            src={picture.src}
            srcSet={picture.srcSet}
            sizes={sizes}
            alt={t(picture.alt)}
            width={picture.width}
            height={picture.height}
            loading={priority ? 'eager' : 'lazy'}
            // `priority` marks the one print that is visible on load; the
            // browser then fetches it ahead of the lazy ones below it.
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          fallback
        )}
      </div>

      {children}
    </div>
  );
}
