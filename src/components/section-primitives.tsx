import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

// =============================================================================
// Section primitives — shared across every consulting-grade page so the site
// reads with one rhythm: 0.24em-tracked uppercase eyebrows, tight display
// headings, and a small set of CTA shapes.
// =============================================================================

export const Eyebrow: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <span
    className={`block text-[#C8A44D] text-xs font-semibold uppercase tracking-[0.24em] mb-5 ${className}`}
  >
    {children}
  </span>
);

interface SectionHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: 'left' | 'center';
  maxWidth?: 'narrow' | 'wide';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  intro,
  align = 'left',
  maxWidth = 'narrow',
  className = '',
}) => (
  <div
    className={`${maxWidth === 'narrow' ? 'max-w-3xl' : 'max-w-5xl'} ${
      align === 'center' ? 'mx-auto text-center' : ''
    } mb-14 md:mb-20 ${className}`}
  >
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight">
      {title}
    </h2>
    {intro && (
      <p className="mt-5 text-white/55 text-lg leading-relaxed">{intro}</p>
    )}
  </div>
);

// -----------------------------------------------------------------------------
// CTA primitives
// -----------------------------------------------------------------------------

interface CtaProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

const baseClasses =
  'inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md font-medium transition-all whitespace-nowrap';

export const PrimaryCta: React.FC<CtaProps> = ({ to, children, className = '' }) => (
  <Link
    to={to}
    className={`${baseClasses} bg-gradient-to-r from-[#C8A44D] to-[#E8C96D] text-[#0B1F3A] font-semibold hover:shadow-xl hover:shadow-[#C8A44D]/20 ${className}`}
  >
    {children} <ArrowRight size={16} />
  </Link>
);

export const SecondaryCta: React.FC<CtaProps> = ({ to, children, className = '' }) => {
  const isAnchor = to.startsWith('#');
  const cls = `${baseClasses} border border-white/15 text-white/85 hover:border-[#C8A44D]/50 hover:text-white ${className}`;
  return isAnchor ? (
    <a href={to} className={cls}>
      {children}
    </a>
  ) : (
    <Link to={to} className={cls}>
      {children}
    </Link>
  );
};

export const TertiaryCta: React.FC<CtaProps> = ({ to, children, className = '' }) => {
  const isAnchor = to.startsWith('#');
  const cls = `inline-flex items-center gap-1.5 text-white/60 hover:text-[#C8A44D] text-sm font-medium transition-colors ${className}`;
  return isAnchor ? (
    <a href={to} className={cls}>
      {children} <ArrowUpRight size={14} />
    </a>
  ) : (
    <Link to={to} className={cls}>
      {children} <ArrowUpRight size={14} />
    </Link>
  );
};

// Convenience: standard CTA cluster used at hero + page-bottom across the site.
export const CtaCluster: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex flex-col sm:flex-row sm:items-center gap-4 ${className}`}>
    <PrimaryCta to="/contact">Request Consultation</PrimaryCta>
    <SecondaryCta to="/services">Explore Capabilities</SecondaryCta>
    <TertiaryCta to="/industries">View Industries Served</TertiaryCta>
  </div>
);
