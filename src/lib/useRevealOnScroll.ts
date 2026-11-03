import { useEffect } from 'react';

/**
 * Marks every `[data-reveal]` element as revealed the first time it is
 * reached, so the CSS above can run its entrance once.
 *
 * Two safety nets, because a reveal that never fires leaves a blank band —
 * the failure mode the motion guidance warns about hardest:
 *   · no IntersectionObserver → everything is revealed immediately;
 *   · a timer reveals anything still waiting, whatever went wrong.
 */
export function useRevealOnScroll(dependency?: unknown) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const pending = nodes.filter((node) => !node.hasAttribute('data-revealed'));
    if (pending.length === 0) return;

    const reveal = (node: Element) => node.setAttribute('data-revealed', '');

    if (typeof IntersectionObserver === 'undefined') {
      pending.forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      },
      // Fires as the element's top passes ~88% of the way down the viewport.
      { rootMargin: '0px 0px -12% 0px', threshold: 0.01 },
    );

    pending.forEach((node) => observer.observe(node));

    const failsafe = window.setTimeout(() => {
      document
        .querySelectorAll('[data-reveal]:not([data-revealed])')
        .forEach(reveal);
    }, 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [dependency]);
}
