import React, { useEffect, useRef, useState } from 'react';

/**
 * RevealOnScroll — wrap children to fade + lift them in once they enter
 * the viewport. Used for subtle editorial motion (hero, section headers).
 *
 * Respects prefers-reduced-motion: when set, children are visible
 * immediately with no transition.
 *
 * Cheap: uses one IntersectionObserver per element, disconnects on first
 * reveal so it doesn't churn during scroll.
 */
interface RevealProps {
  children: React.ReactNode;
  /** Pixels of vertical offset before reveal (default 16). */
  offset?: number;
  /** Tailwind duration class (default `duration-700`). */
  durationClass?: string;
  /** Delay in ms before transition starts (default 0). */
  delayMs?: number;
  /** Threshold percent of element visible before reveal (default 0.15). */
  threshold?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const RevealOnScroll: React.FC<RevealProps> = ({
  children,
  offset = 16,
  durationClass = 'duration-700',
  delayMs = 0,
  threshold = 0.15,
  className = '',
  as: Tag = 'div',
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced, threshold]);

  return React.createElement(
    Tag,
    {
      ref,
      className: `transition-[opacity,transform] ease-out ${durationClass} ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0'
      } ${className}`,
      style: {
        transform: visible ? undefined : `translateY(${offset}px)`,
        transitionDelay: visible ? `${delayMs}ms` : '0ms',
      },
    } as React.HTMLAttributes<HTMLElement> & { ref: typeof ref },
    children
  );
};

export default RevealOnScroll;
