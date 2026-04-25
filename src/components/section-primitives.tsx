import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

// =============================================================================
// Editorial engineering-consulting design system primitives.
// Convention: light surface by default; pass `tone="dark"` on dark ink bands.
// =============================================================================

type Tone = 'light' | 'dark';

const toneText: Record<Tone, { eyebrow: string; heading: string; body: string }> = {
  light: {
    eyebrow: 'text-brand-accent',
    heading: 'text-brand-ink',
    body: 'text-brand-ink-2',
  },
  dark: {
    eyebrow: 'text-brand-accent-soft',
    heading: 'text-brand-on-dark',
    body: 'text-brand-on-dark-2',
  },
};

// -----------------------------------------------------------------------------
// Eyebrow — small caps label preceding section headings.
// -----------------------------------------------------------------------------
export const Eyebrow: React.FC<{
  children: React.ReactNode;
  tone?: Tone;
  index?: string;
  className?: string;
}> = ({ children, tone = 'light', index, className = '' }) => (
  <span
    className={`inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] ${toneText[tone].eyebrow} ${className}`}
  >
    {index && (
      <span className="font-mono-tab text-[10px] tracking-widest opacity-70">
        {index}
      </span>
    )}
    <span className="inline-flex items-center gap-3">
      <span className="block h-px w-6 bg-current opacity-50" aria-hidden />
      {children}
    </span>
  </span>
);

// -----------------------------------------------------------------------------
// SectionHeader — eyebrow + serif display heading + optional intro.
// -----------------------------------------------------------------------------
interface SectionHeaderProps {
  eyebrow: string;
  index?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: 'left' | 'center';
  tone?: Tone;
  maxWidth?: 'narrow' | 'wide';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  index,
  title,
  intro,
  align = 'left',
  tone = 'light',
  maxWidth = 'narrow',
  className = '',
}) => (
  <div
    className={`${maxWidth === 'narrow' ? 'max-w-3xl' : 'max-w-5xl'} ${
      align === 'center' ? 'mx-auto text-center' : ''
    } mb-14 md:mb-20 ${className}`}
  >
    <div className="mb-6">
      <Eyebrow tone={tone} index={index}>
        {eyebrow}
      </Eyebrow>
    </div>
    <h2
      className={`font-display text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] font-medium leading-[1.08] ${toneText[tone].heading}`}
    >
      {title}
    </h2>
    {intro && (
      <p className={`mt-6 text-[17px] md:text-[19px] leading-[1.55] ${toneText[tone].body}`}>
        {intro}
      </p>
    )}
  </div>
);

// =============================================================================
// CTA primitives
// =============================================================================

interface CtaProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  tone?: Tone;
}

const baseBtn =
  'group inline-flex items-center gap-2.5 px-6 py-3.5 text-[14px] font-medium tracking-tight transition-colors whitespace-nowrap';

const isAnchor = (to: string) => to.startsWith('#');

const renderLink = (to: string, className: string, children: React.ReactNode) =>
  isAnchor(to) ? (
    <a href={to} className={className}>
      {children}
    </a>
  ) : (
    <Link to={to} className={className}>
      {children}
    </Link>
  );

// Primary — solid ink (or accent on dark) rectangle with arrow.
export const PrimaryCta: React.FC<CtaProps> = ({
  to,
  children,
  className = '',
  tone = 'light',
}) => {
  const cls =
    tone === 'dark'
      ? `${baseBtn} bg-brand-on-dark text-brand-ink hover:bg-white ${className}`
      : `${baseBtn} bg-brand-ink text-brand-ivory hover:bg-brand-accent ${className}`;
  return renderLink(
    to,
    cls,
    <>
      {children}
      <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
    </>,
  );
};

// Secondary — bordered ghost.
export const SecondaryCta: React.FC<CtaProps> = ({
  to,
  children,
  className = '',
  tone = 'light',
}) => {
  const cls =
    tone === 'dark'
      ? `${baseBtn} border border-white/25 text-brand-on-dark hover:border-brand-accent-soft hover:text-brand-accent-soft ${className}`
      : `${baseBtn} border border-brand-ink text-brand-ink hover:bg-brand-ink hover:text-brand-ivory ${className}`;
  return renderLink(to, cls, children);
};

// Tertiary — text link with underline-on-hover.
export const TertiaryCta: React.FC<CtaProps> = ({
  to,
  children,
  className = '',
  tone = 'light',
}) => {
  const cls =
    tone === 'dark'
      ? `group inline-flex items-center gap-1.5 text-[13px] font-medium border-b border-transparent hover:border-brand-accent-soft text-brand-on-dark-2 hover:text-brand-accent-soft transition-colors ${className}`
      : `group inline-flex items-center gap-1.5 text-[13px] font-medium border-b border-transparent hover:border-brand-ink text-brand-ink-2 hover:text-brand-ink transition-colors ${className}`;
  return renderLink(
    to,
    cls,
    <>
      {children}
      <ArrowUpRight size={13} />
    </>,
  );
};

// -----------------------------------------------------------------------------
// CtaCluster — primary / secondary / tertiary in standard order.
// -----------------------------------------------------------------------------
export const CtaCluster: React.FC<{ tone?: Tone; className?: string }> = ({
  tone = 'light',
  className = '',
}) => (
  <div className={`flex flex-col sm:flex-row sm:items-center gap-4 ${className}`}>
    <PrimaryCta to="/contact" tone={tone}>
      Request Consultation
    </PrimaryCta>
    <SecondaryCta to="/services" tone={tone}>
      Explore Capabilities
    </SecondaryCta>
    <TertiaryCta to="/industries" tone={tone}>
      View Industries Served
    </TertiaryCta>
  </div>
);

// =============================================================================
// Container — consistent max width + horizontal padding across the site.
// =============================================================================
export const Container: React.FC<{
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'wide' | 'narrow';
}> = ({ children, className = '', size = 'default' }) => {
  const max =
    size === 'wide' ? 'max-w-[88rem]' : size === 'narrow' ? 'max-w-4xl' : 'max-w-7xl';
  return <div className={`${max} mx-auto px-6 lg:px-10 ${className}`}>{children}</div>;
};

// =============================================================================
// Section — handles tone, padding, and the shared rhythm. The default
// vertical rhythm is py-24 / md:py-32 with hairline tops on light sections,
// and dark sections use bg-brand-ink with no top hairline.
// =============================================================================
export const Section: React.FC<{
  children: React.ReactNode;
  tone?: 'ivory' | 'paper' | 'stone' | 'ink';
  id?: string;
  className?: string;
  divided?: boolean; // hairline at top
}> = ({ children, tone = 'ivory', id, className = '', divided = false }) => {
  const toneCls = {
    ivory: 'bg-brand-ivory text-brand-ink',
    paper: 'bg-brand-paper text-brand-ink',
    stone: 'bg-brand-stone text-brand-ink',
    ink: 'bg-brand-ink text-brand-on-dark',
  }[tone];

  return (
    <section
      id={id}
      className={`${toneCls} ${divided ? 'border-t border-brand-hair' : ''} ${className}`}
    >
      <div className="py-20 md:py-28 lg:py-32">{children}</div>
    </section>
  );
};

// =============================================================================
// HairRule — horizontal hairline used to divide content blocks.
// =============================================================================
export const HairRule: React.FC<{ tone?: Tone; className?: string }> = ({
  tone = 'light',
  className = '',
}) => (
  <div
    className={`h-px ${
      tone === 'dark' ? 'bg-white/10' : 'bg-brand-hair'
    } ${className}`}
    aria-hidden
  />
);
