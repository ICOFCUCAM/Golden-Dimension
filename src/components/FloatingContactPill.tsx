import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, X, ArrowRight } from 'lucide-react';

/**
 * Floating "Talk to us" CTA pill.
 *
 * - Appears in the bottom-right after a small scroll threshold.
 * - Hidden on /contact (would be redundant) and on /admin (internal).
 * - Dismissible — preference persists in localStorage.
 * - Collapses to a small icon on scroll-down, expands on scroll-up.
 * - Respects prefers-reduced-motion via base CSS transitions.
 */

const STORAGE_KEY = 'gd-floating-pill-dismissed';
const THRESHOLD = 600; // px scrolled before showing

const FloatingContactPill: React.FC = () => {
  const location = useLocation();
  const [show,    setShow]    = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Restore dismissed state and listen for scroll.
  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === '1') setDismissed(true);
    } catch {
      /* private mode */
    }

    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setShow(y > THRESHOLD);
      setCollapsed(y > lastY && y > THRESHOLD * 2);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const dismiss = () => {
    setDismissed(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* private mode */
    }
  };

  // Hide on Contact (CTA already prominent) and Admin (internal).
  const hidden =
    dismissed ||
    !show ||
    location.pathname === '/contact' ||
    location.pathname.startsWith('/admin');

  if (hidden) return null;

  return (
    <div
      className="fixed bottom-5 right-5 z-[80] animate-fade-in"
      aria-live="polite"
    >
      <div className="flex items-center gap-2">
        <Link
          to="/contact"
          className={`group inline-flex items-center gap-2.5 ${
            collapsed ? 'px-3 py-3' : 'px-4 py-3'
          } bg-brand-ink text-brand-ivory shadow-xl shadow-black/20 hover:bg-brand-accent transition-all border border-brand-ink`}
          aria-label="Talk to us — open the contact intake"
        >
          <MessageSquare size={15} />
          <span
            className={`text-[13px] font-medium tracking-[-0.01em] whitespace-nowrap overflow-hidden transition-[max-width,opacity] duration-200 ${
              collapsed ? 'max-w-0 opacity-0' : 'max-w-[12rem] opacity-100'
            }`}
          >
            Talk to us
            <ArrowRight size={13} className="inline-block ml-1.5 -mt-px group-hover:translate-x-0.5 transition-transform" />
          </span>
        </Link>

        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss the floating contact prompt"
          className="w-8 h-8 bg-brand-paper border border-brand-hair-strong text-brand-mute hover:text-brand-ink hover:border-brand-ink shadow-sm transition-colors flex items-center justify-center"
        >
          <X size={12} />
        </button>
      </div>
    </div>
  );
};

export default FloatingContactPill;
