import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

// =============================================================================
// Infrastructure Platform Consulting — section primitives (v3).
// Sans-only display, mono technical labels, sharp corners, ink-on-ivory.
// =============================================================================

type Tone = 'light' | 'dark';

const toneInk: Record<Tone, { eyebrow: string; heading: string; body: string }> = {
  light: { eyebrow: 'text-brand-mute',     heading: 'text-brand-ink',     body: 'text-brand-ink-2' },
  dark:  { eyebrow: 'text-brand-on-dark-2', heading: 'text-brand-on-dark', body: 'text-brand-on-dark-2' },
};

// -----------------------------------------------------------------------------
// TechnicalLabel — Palantir-style §-numbered section marker.
// Renders "§ 01 / CAPABILITIES" or just "§ 01" with mono spacing.
// -----------------------------------------------------------------------------
export const TechnicalLabel: React.FC<{
  index?: string;
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}> = ({ index, children, tone = 'light', className = '' }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <span className="block h-px w-8 bg-brand-accent" aria-hidden />
    {index && (
      <span className={`label-technical text-brand-accent`}>
        § {index}
      </span>
    )}
    <span className={`label-technical ${toneInk[tone].eyebrow}`}>
      {children}
    </span>
  </div>
);

// Backwards-compat alias kept so existing imports of `Eyebrow` keep working.
export const Eyebrow: React.FC<{
  children: React.ReactNode;
  index?: string;
  tone?: Tone;
  className?: string;
}> = (props) => <TechnicalLabel {...props} />;

// -----------------------------------------------------------------------------
// SectionHeader — sans display heading. Italic Plex Serif accent
// available via `<span className="font-editorial italic text-brand-accent">`
// inside the title node.
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
    } mb-12 md:mb-16 ${className}`}
  >
    <TechnicalLabel index={index} tone={tone}>{eyebrow}</TechnicalLabel>
    <h2
      className={`mt-7 font-display text-[28px] sm:text-[34px] md:text-[42px] lg:text-[48px] font-semibold leading-[1.05] tracking-[-0.025em] ${toneInk[tone].heading}`}
    >
      {title}
    </h2>
    {intro && (
      <p className={`mt-6 text-[16px] md:text-[17px] leading-[1.6] ${toneInk[tone].body} max-w-2xl`}>
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
  'group inline-flex items-center gap-2.5 px-5 py-3 text-[13px] font-medium tracking-tight transition-colors whitespace-nowrap';

const isAnchor = (to: string) => to.startsWith('#');
const renderLink = (to: string, className: string, children: React.ReactNode) =>
  isAnchor(to) ? (
    <a href={to} className={className}>{children}</a>
  ) : (
    <Link to={to} className={className}>{children}</Link>
  );

// Primary — solid ink rectangle with corner-tick visual signature.
export const PrimaryCta: React.FC<CtaProps> = ({ to, children, className = '', tone = 'light' }) => {
  const cls =
    tone === 'dark'
      ? `${baseBtn} bg-brand-on-dark text-brand-ink hover:bg-brand-accent-soft hover:text-brand-ink ${className}`
      : `${baseBtn} bg-brand-ink text-brand-ivory hover:bg-brand-accent ${className}`;
  return renderLink(
    to,
    cls,
    <>
      {children}
      <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
    </>,
  );
};

// Secondary — bordered ghost.
export const SecondaryCta: React.FC<CtaProps> = ({ to, children, className = '', tone = 'light' }) => {
  const cls =
    tone === 'dark'
      ? `${baseBtn} border border-white/25 text-brand-on-dark hover:border-brand-accent-soft hover:text-brand-accent-soft ${className}`
      : `${baseBtn} border border-brand-ink text-brand-ink hover:bg-brand-ink hover:text-brand-ivory ${className}`;
  return renderLink(to, cls, children);
};

// Tertiary — text link with mono indicator + arrow.
export const TertiaryCta: React.FC<CtaProps> = ({ to, children, className = '', tone = 'light' }) => {
  const cls =
    tone === 'dark'
      ? `group inline-flex items-center gap-1.5 text-[13px] font-medium border-b border-transparent hover:border-brand-accent-soft text-brand-on-dark-2 hover:text-brand-accent-soft transition-colors ${className}`
      : `group inline-flex items-center gap-1.5 text-[13px] font-medium border-b border-transparent hover:border-brand-accent text-brand-ink-2 hover:text-brand-accent transition-colors ${className}`;
  return renderLink(
    to,
    cls,
    <>
      {children}
      <ArrowUpRight size={13} />
    </>,
  );
};

export const CtaCluster: React.FC<{ tone?: Tone; className?: string }> = ({
  tone = 'light',
  className = '',
}) => (
  <div className={`flex flex-col sm:flex-row sm:items-center gap-3 ${className}`}>
    <PrimaryCta to="/contact" tone={tone}>Request Consultation</PrimaryCta>
    <SecondaryCta to="/services" tone={tone}>Explore Capabilities</SecondaryCta>
    <TertiaryCta to="/industries" tone={tone}>View Industries Served</TertiaryCta>
  </div>
);

// =============================================================================
// Container & Section
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

export const Section: React.FC<{
  children: React.ReactNode;
  tone?: 'ivory' | 'paper' | 'stone' | 'ink';
  id?: string;
  className?: string;
  divided?: boolean;
}> = ({ children, tone = 'ivory', id, className = '', divided = false }) => {
  const toneCls = {
    ivory: 'bg-brand-ivory text-brand-ink',
    paper: 'bg-brand-paper text-brand-ink',
    stone: 'bg-brand-stone text-brand-ink',
    ink:   'bg-brand-ink text-brand-on-dark',
  }[tone];
  return (
    <section
      id={id}
      className={`${toneCls} ${divided ? 'border-t border-brand-hair' : ''} ${className}`}
    >
      <div className="py-20 md:py-24 lg:py-32">{children}</div>
    </section>
  );
};

// =============================================================================
// DiagramFrame — bordered scaffolding wrapper used for diagrammatic blocks.
// Emits a single hairline frame with corner tick marks (Palantir-coded).
// =============================================================================
export const DiagramFrame: React.FC<{
  children: React.ReactNode;
  label?: string;
  index?: string;
  tone?: Tone;
  className?: string;
}> = ({ children, label, index, tone = 'light', className = '' }) => {
  const borderCls = tone === 'dark' ? 'border-white/15' : 'border-brand-hair-strong';
  const tickCls = tone === 'dark' ? 'border-brand-accent-soft' : 'border-brand-accent';
  const labelCls = tone === 'dark' ? 'text-brand-on-dark-2 bg-brand-ink' : 'text-brand-mute bg-brand-ivory';
  return (
    <div className={`relative border ${borderCls} ${className}`}>
      {/* Corner tick marks */}
      <span className={`absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 ${tickCls}`} aria-hidden />
      <span className={`absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 ${tickCls}`} aria-hidden />
      <span className={`absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 ${tickCls}`} aria-hidden />
      <span className={`absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 ${tickCls}`} aria-hidden />
      {label && (
        <div className={`absolute -top-2.5 left-6 ${labelCls} px-2`}>
          <span className="label-technical">
            {index && <span className="text-brand-accent mr-2">§ {index}</span>}
            {label}
          </span>
        </div>
      )}
      {children}
    </div>
  );
};

// =============================================================================
// Metric — large numeral + mono label, used in stat bands and footprint.
// =============================================================================
export const Metric: React.FC<{
  value: string;
  label: string;
  tone?: Tone;
  size?: 'md' | 'lg';
}> = ({ value, label, tone = 'light', size = 'md' }) => {
  const numeric = value.replace(/[^0-9.]/g, '');
  const suffix  = value.replace(numeric, '');
  const big = size === 'lg' ? 'text-[56px] md:text-[72px]' : 'text-[40px] md:text-[52px]';
  return (
    <div>
      <div className={`font-display ${big} font-semibold leading-none tracking-[-0.03em] ${
        tone === 'dark' ? 'text-brand-on-dark' : 'text-brand-ink'
      }`}>
        {numeric}
        <span className={tone === 'dark' ? 'text-brand-accent-soft' : 'text-brand-accent'}>
          {suffix || ''}
        </span>
      </div>
      <div className={`mt-3 label-technical ${tone === 'dark' ? 'text-brand-on-dark-2' : 'text-brand-mute'}`}>
        {label}
      </div>
    </div>
  );
};

// =============================================================================
// PageHeader — standard banner used at the top of every secondary page
// (Transport, Contact, News, Legal, Service Detail, NotFound, ...).
// Renders a paper-style masthead row, eyebrow + index, large serif headline,
// and an optional subtitle + CTA cluster. Adds the right top padding to
// clear the navbar.
// =============================================================================

export const PageHeader: React.FC<{
  eyebrow: string;
  index?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
  tone?: 'ivory' | 'paper' | 'stone';
  className?: string;
}> = ({ eyebrow, index, title, subtitle, children, tone = 'ivory', className = '' }) => {
  const toneCls = {
    ivory: 'bg-brand-ivory',
    paper: 'bg-brand-paper',
    stone: 'bg-brand-stone',
  }[tone];

  return (
    <section className={`relative ${toneCls} pt-[120px] md:pt-[140px] pb-16 md:pb-20 border-b border-brand-hair ${className}`}>
      <Container size="wide">
        {/* Paper masthead row */}
        <div className="flex items-baseline justify-between pb-4 mb-12 border-b border-brand-hair-strong">
          <span className="label-technical text-brand-mute">
            <span className="text-brand-accent">Capability Brief</span> · Golden Dimensions Ltd
          </span>
          <span className="hidden sm:inline label-technical text-brand-mute font-mono-tab">
            {new Date().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }).toUpperCase()}
          </span>
        </div>

        <div className="max-w-5xl">
          <TechnicalLabel index={index}>{eyebrow}</TechnicalLabel>
          <h1 className="mt-8 font-display text-[36px] sm:text-[44px] md:text-[56px] lg:text-[64px] font-medium leading-[1.05] tracking-[-0.015em] text-brand-ink">
            {title}
          </h1>
          {subtitle && (
            <div className="mt-7 max-w-3xl text-[16px] md:text-[18px] leading-[1.6] text-brand-ink-2">
              {subtitle}
            </div>
          )}
          {children && <div className="mt-9">{children}</div>}
        </div>
      </Container>
    </section>
  );
};

// =============================================================================
// HairRule
// =============================================================================
export const HairRule: React.FC<{ tone?: Tone; className?: string }> = ({
  tone = 'light',
  className = '',
}) => (
  <div
    className={`h-px ${tone === 'dark' ? 'bg-white/10' : 'bg-brand-hair'} ${className}`}
    aria-hidden
  />
);
