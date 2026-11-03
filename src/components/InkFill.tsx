import type { CSSProperties } from 'react';

/**
 * A statement that fills from grey to full ink, word by word, paced by the
 * scroll rather than by a timer — so the sentence is read at the speed it is
 * scrolled.
 *
 * Each word carries its own slice of the paragraph's view timeline, computed
 * here from its index, because `animation-range` takes no stagger of its own.
 * Outside `@supports (animation-timeline: view())` and under reduced motion the
 * words are simply full ink: the sentence never arrives half-grey.
 */
export function InkFill({ text, className = '' }: { text: string; className?: string }) {
  const words = text.split(/\s+/).filter(Boolean);
  const last = Math.max(1, words.length - 1);

  // Spread the fill across the middle of the paragraph's pass through the
  // viewport, where it is actually being read.
  const FROM = 22;
  const TO = 52;
  const DWELL = 9;

  return (
    <span className={`ink-fill ${className}`}>
      {words.map((word, index) => {
        const start = FROM + (index / last) * (TO - FROM);
        return (
          <span
            key={`${index}-${word}`}
            style={{ animationRange: `cover ${start.toFixed(2)}% cover ${(start + DWELL).toFixed(2)}%` } as CSSProperties}
          >
            {word}
            {index < words.length - 1 ? ' ' : ''}
          </span>
        );
      })}
    </span>
  );
}
