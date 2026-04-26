import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Cookie, Check } from 'lucide-react';

/**
 * Cookie consent banner + preferences modal.
 *
 * Stores the user's choice in localStorage under "gd-cookie-consent".
 * Three categories:
 *   - essential   (always on)
 *   - analytics   (off by default)
 *   - marketing   (off by default)
 *
 * Components downstream (Google Analytics, marketing pixels, etc.) can
 * read `getConsent()` to decide whether to load. Currently the site uses
 * none of those so consent is purely a legal-compliance signal — but
 * the wiring is in place for future analytics.
 */

const STORAGE_KEY = 'gd-cookie-consent';

interface ConsentState {
  decided: boolean;
  essential: true; // always on
  analytics: boolean;
  marketing: boolean;
  decidedAt?: string;
}

const defaultConsent: ConsentState = {
  decided: false,
  essential: true,
  analytics: false,
  marketing: false,
};

export const getConsent = (): ConsentState => {
  if (typeof window === 'undefined') return defaultConsent;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultConsent;
    const parsed = JSON.parse(raw);
    return { ...defaultConsent, ...parsed, essential: true };
  } catch {
    return defaultConsent;
  }
};

const writeConsent = (consent: ConsentState) => {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...consent, decidedAt: new Date().toISOString() })
    );
  } catch {
    /* ignore storage errors (e.g. private mode) */
  }
};

const CookieConsent: React.FC = () => {
  const [consent, setConsent]     = useState<ConsentState>(defaultConsent);
  const [showPrefs, setShowPrefs] = useState(false);
  const [mounted, setMounted]     = useState(false);

  useEffect(() => {
    setMounted(true);
    setConsent(getConsent());
  }, []);

  if (!mounted) return null;
  if (consent.decided && !showPrefs) return null;

  const acceptAll = () => {
    const next: ConsentState = {
      decided:   true,
      essential: true,
      analytics: true,
      marketing: true,
    };
    setConsent(next);
    writeConsent(next);
    setShowPrefs(false);
  };

  const acceptEssential = () => {
    const next: ConsentState = {
      decided:   true,
      essential: true,
      analytics: false,
      marketing: false,
    };
    setConsent(next);
    writeConsent(next);
    setShowPrefs(false);
  };

  const savePrefs = () => {
    const next: ConsentState = {
      ...consent,
      decided: true,
    };
    setConsent(next);
    writeConsent(next);
    setShowPrefs(false);
  };

  // Banner
  if (!showPrefs) {
    return (
      <div
        role="dialog"
        aria-label="Cookie preferences"
        aria-modal="false"
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md z-[90] bg-brand-paper border border-brand-hair-strong shadow-2xl animate-fade-in"
      >
        <div className="p-5">
          <div className="flex items-baseline gap-3 mb-3">
            <Cookie size={14} className="text-brand-accent" />
            <span className="label-technical text-brand-mute">
              <span className="text-brand-accent">§ COOKIE</span> · Privacy preferences
            </span>
          </div>
          <h3 className="font-display text-[16px] font-medium tracking-[-0.015em] text-brand-ink leading-snug">
            We use cookies to keep the site working and, with your consent, to understand how it's used.
          </h3>
          <p className="mt-2 text-[12.5px] text-brand-ink-2 leading-[1.55]">
            Essential cookies are required for the site to function. Analytics
            and marketing cookies are off until you turn them on. See our{' '}
            <Link to="/legal" className="underline text-brand-ink hover:text-brand-accent">
              privacy policy
            </Link>{' '}
            for detail.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={acceptAll}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-brand-ink text-brand-ivory text-[12px] font-medium tracking-tight hover:bg-brand-accent transition-colors"
            >
              <Check size={12} /> Accept all
            </button>
            <button
              type="button"
              onClick={acceptEssential}
              className="inline-flex items-center px-3.5 py-2 border border-brand-ink text-brand-ink text-[12px] font-medium tracking-tight hover:bg-brand-ink hover:text-brand-ivory transition-colors"
            >
              Essential only
            </button>
            <button
              type="button"
              onClick={() => setShowPrefs(true)}
              className="inline-flex items-center px-3.5 py-2 text-brand-ink-2 text-[12px] font-medium tracking-tight border-b border-transparent hover:border-brand-ink hover:text-brand-ink transition-colors"
            >
              Manage preferences
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Preferences modal
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cookie preferences"
      className="fixed inset-0 z-[100] bg-brand-ink/40 backdrop-blur-[1px] flex items-end sm:items-center justify-center p-4 animate-fade-in"
      onClick={() => setShowPrefs(false)}
    >
      <div
        className="w-full max-w-lg bg-brand-paper border border-brand-hair-strong shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-baseline justify-between p-5 border-b border-brand-hair-strong">
          <span className="label-technical text-brand-mute">
            <span className="text-brand-accent">§ COOKIE</span> · Manage Preferences
          </span>
          <button
            type="button"
            onClick={() => setShowPrefs(false)}
            aria-label="Close preferences"
            className="text-brand-mute hover:text-brand-ink transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-5 space-y-5">
          <p className="text-[13px] leading-[1.6] text-brand-ink-2">
            Choose which cookies the site is allowed to use. Essential cookies
            are required for navigation and form submission and cannot be
            disabled.
          </p>

          {[
            {
              key: 'essential' as const,
              title: 'Essential',
              desc: 'Site navigation, form submission, session security. Always on.',
              locked: true,
            },
            {
              key: 'analytics' as const,
              title: 'Analytics',
              desc: 'Anonymised usage metrics that help us improve the site. No personal identifiers.',
              locked: false,
            },
            {
              key: 'marketing' as const,
              title: 'Marketing',
              desc: 'Used only if we run targeted communication. Currently inactive.',
              locked: false,
            },
          ].map((cat) => {
            const checked = cat.locked ? true : (consent[cat.key] as boolean);
            return (
              <label
                key={cat.key}
                className={`flex items-start gap-4 p-4 border ${
                  checked ? 'border-brand-ink bg-brand-stone' : 'border-brand-hair-strong bg-brand-paper'
                } ${cat.locked ? 'opacity-80' : 'cursor-pointer hover:border-brand-ink'} transition-colors`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={cat.locked}
                  onChange={(e) =>
                    setConsent((prev) => ({ ...prev, [cat.key]: e.target.checked, decided: prev.decided }))
                  }
                  className="mt-1 w-3.5 h-3.5 accent-brand-accent shrink-0"
                  aria-describedby={`cat-${cat.key}-desc`}
                />
                <div className="flex-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[14px] font-medium tracking-tight text-brand-ink">{cat.title}</span>
                    {cat.locked && (
                      <span className="label-technical text-brand-mute">Always on</span>
                    )}
                  </div>
                  <p id={`cat-${cat.key}-desc`} className="mt-1 text-[12px] leading-[1.5] text-brand-ink-2">
                    {cat.desc}
                  </p>
                </div>
              </label>
            );
          })}
        </div>

        <div className="border-t border-brand-hair-strong p-5 flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/legal"
            onClick={() => setShowPrefs(false)}
            className="text-[12.5px] text-brand-ink-2 hover:text-brand-accent border-b border-transparent hover:border-brand-accent transition-colors"
          >
            Read the privacy policy
          </Link>
          <button
            type="button"
            onClick={savePrefs}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-ink text-brand-ivory text-[12.5px] font-medium tracking-tight hover:bg-brand-accent transition-colors"
          >
            <Check size={12} /> Save preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
