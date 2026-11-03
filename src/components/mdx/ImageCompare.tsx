import { useId, useRef, useState } from 'react';

type ImageCompareProps = {
  before: string;
  after: string;
  /** Alt text for each state. Both required: this is two images, not a widget. */
  beforeAlt: string;
  afterAlt: string;
  caption?: string;
};

/**
 * Before/after wipe. Driven by a range input rather than pointer maths, which
 * means it is keyboard-operable and screen-reader-announced for free, and the
 * handle is a real focusable control instead of a decorative div.
 */
export function ImageCompare({ before, after, beforeAlt, afterAlt, caption }: ImageCompareProps) {
  const [position, setPosition] = useState(50);
  const labelId = useId();
  const frame = useRef<HTMLDivElement>(null);

  return (
    <figure className="my-12">
      <div ref={frame} className="relative overflow-hidden rounded-lg bg-(--color-rule)">
        <img src={after} alt={afterAlt} className="block w-full" loading="lazy" decoding="async" />

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img src={before} alt={beforeAlt} className="block w-full" loading="lazy" decoding="async" />
        </div>

        <div
          aria-hidden="true"
          // A 4px bar is a graphic element and a visible grab target, not a hairline divider.
          className="pointer-events-none absolute inset-y-0 w-1 bg-white mix-blend-difference"
          style={{ left: `${position}%` }}
        />

        <label htmlFor={labelId} className="sr-only">
          Geser untuk membandingkan sebelum dan sesudah
        </label>
        <input
          id={labelId}
          type="range"
          min={0}
          max={100}
          step={0.5}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-valuetext={`${Math.round(position)}% tampilan sebelum`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>

      <figcaption className="mt-3 flex items-baseline justify-between text-sm text-(--color-ink-muted)">
        <span>{caption ?? 'Sebelum / sesudah'}</span>
        <span className="tabular-nums">{Math.round(position)}%</span>
      </figcaption>
    </figure>
  );
}
