import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

const BASE_PX = 200;

/**
 * Sets the name's font size by measuring it, so the lockup spans its column
 * exactly at every width.
 *
 * A size guessed with `clamp()` is tuned for one typeface at one character
 * count: change the face, the weight or the name and the line either wraps or
 * stops short of the margin, which reads as a mistake at this scale.
 *
 * The probe is built, measured and removed inside one callback rather than
 * rendered. A persistent hidden copy — even at `opacity: 0` — is still real
 * text in the document: it doubles the heading for anything reading the DOM,
 * and it reports as the largest type on the page.
 *
 * The size lands on the element itself, not on the lines, so the heading's own
 * computed size is the display size.
 */
export function FittedName({
  lines,
  as: Tag = 'div',
  reveal,
  className = '',
  id,
}: {
  lines: readonly string[];
  /** The element the lockup renders as — `h1` on the first screen. */
  as?: 'h1' | 'div' | 'p';
  /** `load` animates immediately; `scroll` waits until the lockup is reached. */
  reveal: 'load' | 'scroll';
  className?: string;
  id?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sampleRef = useRef<HTMLSpanElement>(null);
  const [size, setSize] = useState<number | null>(null);

  const longest = lines.reduce((a, b) => (b.length > a.length ? b : a), '');

  const fit = useCallback(() => {
    const container = containerRef.current;
    const sample = sampleRef.current;
    if (!container || !sample) return;

    const available = container.clientWidth;
    if (available <= 0) return;

    const styles = getComputedStyle(sample);
    const probe = document.createElement('span');
    probe.textContent = longest;
    probe.setAttribute('aria-hidden', 'true');
    Object.assign(probe.style, {
      position: 'fixed',
      left: '-99999px',
      top: '0',
      visibility: 'hidden',
      whiteSpace: 'nowrap',
      fontFamily: styles.fontFamily,
      fontWeight: styles.fontWeight,
      fontStyle: styles.fontStyle,
      fontStretch: styles.fontStretch,
      textTransform: styles.textTransform,
      fontSize: `${BASE_PX}px`,
    } satisfies Partial<CSSStyleDeclaration>);

    // Computed letter-spacing is px at the sample's size; re-express it in em
    // so it scales with the probe's much larger size.
    const tracking = Number.parseFloat(styles.letterSpacing);
    const sampleSize = Number.parseFloat(styles.fontSize);
    probe.style.letterSpacing =
      Number.isFinite(tracking) && sampleSize > 0 ? `${tracking / sampleSize}em` : '0';

    document.body.append(probe);
    const natural = probe.getBoundingClientRect().width;
    probe.remove();

    if (natural <= 0) return;
    setSize((available / natural) * BASE_PX);
  }, [longest]);

  useLayoutEffect(fit, [fit]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(fit);
    observer.observe(container);

    // The first measurement runs against the fallback face; redo it once the
    // real one is in, or the line lands short by the difference in width.
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) fit();
    });

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [fit]);

  return (
    <Tag
      ref={containerRef}
      id={id}
      className={className}
      style={size === null ? { fontSize: 'min(8vw, 6rem)' } : { fontSize: `${size}px` }}
    >
      {lines.map((line, index) => (
        <span key={line} className="line-mask">
          <span
            ref={index === 0 ? sampleRef : undefined}
            className="display block"
            {...(reveal === 'load' ? { 'data-line': '' } : { 'data-reveal': 'line' })}
            style={{ '--i': index, '--reveal-delay': `${index * 90}ms` } as CSSProperties}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
