import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

type MetricProps = {
  /** The figure itself, e.g. "2.4x" or "61%". Rendered verbatim. */
  value: string;
  /** What the figure measures. */
  label: string;
};

/**
 * A single number pulled out of the prose. Counts up on first view when the
 * value has a leading number and the visitor has not asked for reduced motion;
 * otherwise it simply appears, which is the whole point of the guard.
 */
export function Metric({ value, label }: MetricProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const reduceMotion = useReducedMotion();

  const match = /^(\d+(?:\.\d+)?)(.*)$/.exec(value);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] ?? '' : '';
  const decimals = match?.[1]?.includes('.') ? 1 : 0;

  const animatable = target !== null && !reduceMotion;
  const [shown, setShown] = useState(animatable ? 0 : target);

  useEffect(() => {
    if (!animatable || !inView || target === null) return;

    const duration = 900;
    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutCubic: fast out of the gate, settles rather than stops dead.
      setShown(target * (1 - Math.pow(1 - t, 3)));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [animatable, inView, target]);

  return (
    <div ref={ref} className="my-10">
      <div className="text-5xl font-semibold tabular-nums tracking-tight sm:text-6xl">
        {target === null || shown === null ? value : shown.toFixed(decimals) + suffix}
      </div>
      <div className="mt-2 text-sm text-(--color-ink-muted)">{label}</div>
    </div>
  );
}
