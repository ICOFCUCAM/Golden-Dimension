import React, { useEffect, useState } from 'react';

/**
 * Reading-progress bar — fixed thin bar at the top of the viewport that
 * fills as the user scrolls through the article. The progress is computed
 * against the total scrollable height of the page, not just the article
 * element, so it tracks well even when there's other content below.
 */
const ReadingProgress: React.FC = () => {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const max = Math.max(scrollHeight - clientHeight, 1);
      setPct(Math.min(100, Math.max(0, (scrollTop / max) * 100)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent pointer-events-none"
    >
      <div
        className="h-full bg-brand-accent transition-[width] duration-100 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
};

export default ReadingProgress;
