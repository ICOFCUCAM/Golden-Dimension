import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Container,
  Section,
  TechnicalLabel,
  PrimaryCta,
  SecondaryCta,
} from '@/components/section-primitives';
import { Seo } from '@/components/Seo';

const suggestions = [
  { label: 'Capabilities',         path: '/services',          desc: 'Five consulting pillars under one delivery framework.' },
  { label: 'Industries',           path: '/industries',        desc: 'Sector authority across six regulated industries.' },
  { label: 'Delivery Methodology', path: '/methodology',       desc: 'A six-phase transformation lifecycle.' },
  { label: 'Engagement Models',    path: '/engagement-models', desc: 'Four shapes for institutional engagements.' },
  { label: 'Leadership Doctrine',  path: '/leadership',        desc: "The firm's operating choices and doctrine." },
  { label: 'About the Firm',       path: '/about',             desc: 'Multidisciplinary by design, since 2003.' },
];

const NotFound: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.error('404 — non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <div className="bg-brand-ivory min-h-screen flex flex-col">
      <Seo
        title="Page not found"
        description="The page you're looking for doesn't exist or has been moved."
        path={location.pathname}
      />
      <Navbar />

      <main className="flex-1">
        <Section tone="ivory">
          <Container size="wide">
            {/* Paper masthead */}
            <div className="flex items-baseline justify-between pb-4 mb-12 border-b border-brand-hair-strong pt-[120px] md:pt-[140px]">
              <span className="label-technical text-brand-mute">
                <span className="text-brand-accent">§ ERROR</span> · 404 · Not Found
              </span>
              <span className="hidden sm:inline label-technical text-brand-mute font-mono-tab">
                {location.pathname}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-5">
                <TechnicalLabel index="404">Page Not Found</TechnicalLabel>
                <div className="mt-8 font-display font-medium text-[120px] sm:text-[180px] md:text-[220px] leading-[0.85] tracking-[-0.04em] text-brand-ink font-mono-tab">
                  404
                </div>
              </div>

              <div className="lg:col-span-7 lg:pt-8">
                <h1 className="font-display text-[28px] md:text-[36px] lg:text-[44px] font-medium leading-[1.05] tracking-[-0.015em] text-brand-ink">
                  The page you're looking for{' '}
                  <span className="font-editorial italic text-brand-accent">
                    doesn't exist
                  </span>{' '}
                  — or has been moved.
                </h1>
                <p className="mt-7 max-w-xl text-[16px] leading-[1.65] text-brand-ink-2">
                  Try one of the routes below, or head back to the homepage. If
                  you arrived here from a link on another site, please let us
                  know which one — we'll have it corrected.
                </p>

                <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-3">
                  <PrimaryCta to="/">Back to Home</PrimaryCta>
                  <SecondaryCta to="/contact">Report a Broken Link</SecondaryCta>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Suggested routes */}
        <Section tone="paper" divided>
          <Container>
            <div className="mb-10">
              <TechnicalLabel index="GO">Suggested Destinations</TechnicalLabel>
              <h2 className="mt-7 font-display text-[24px] md:text-[28px] font-medium tracking-[-0.015em] text-brand-ink leading-tight">
                Continue from one of these:
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-brand-hair">
              {suggestions.map((s, i) => (
                <Link
                  key={s.path}
                  to={s.path}
                  className="group border-r border-b border-brand-hair p-6 bg-brand-paper hover:bg-brand-stone transition-colors"
                >
                  <span className="label-technical text-brand-accent font-mono-tab">
                    R.{String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 font-display text-[18px] font-medium tracking-[-0.015em] text-brand-ink group-hover:text-brand-accent transition-colors">
                    {s.label}
                  </h3>
                  <p className="mt-2 text-[13px] leading-[1.6] text-brand-ink-2">{s.desc}</p>
                  <ArrowRight size={14} className="mt-4 text-brand-mute group-hover:text-brand-accent group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>

            <div className="mt-10">
              <Link
                to="/"
                className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-tight text-brand-ink-2 hover:text-brand-accent transition-colors"
              >
                <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
                Or return to the homepage
              </Link>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
