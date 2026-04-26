import React from 'react';

/**
 * Custom SVG illustrations — one per capability pillar.
 * All hand-built; monochromatic with optional rust accent stroke.
 * Sized to render cleanly at 80–160px. Stroke-based so they scale crisply.
 *
 * Conventions used by every illustration:
 *   - viewBox = "0 0 120 120"
 *   - default stroke = currentColor (so the parent text-* class controls hue)
 *   - rust accent strokes use stroke="#B4532A" directly
 *   - 1.25 px stroke baseline; 1.75 for emphasis
 *   - role="img" + aria-label so screen readers announce them
 */

interface IllustrationProps {
  className?: string;
  size?: number;
  ariaLabel?: string;
}

// 01 — Engineering & Infrastructure
// Axonometric building / bridge schematic.
export const PillarEngineeringIllustration: React.FC<IllustrationProps> = ({
  className = '',
  size = 96,
  ariaLabel = 'Engineering & Infrastructure illustration — axonometric structural schematic',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
    strokeLinecap="square"
    strokeLinejoin="miter"
    role="img"
    aria-label={ariaLabel}
    className={className}
  >
    {/* Ground line */}
    <line x1="10" y1="100" x2="110" y2="100" />
    {/* Two structural columns */}
    <line x1="32" y1="100" x2="32" y2="40" />
    <line x1="88" y1="100" x2="88" y2="40" />
    {/* Truss spans */}
    <line x1="32" y1="40" x2="88" y2="40" />
    <line x1="32" y1="40" x2="60" y2="22" />
    <line x1="60" y1="22" x2="88" y2="40" />
    <line x1="32" y1="40" x2="60" y2="40" stroke="#B4532A" strokeWidth="1.75" />
    {/* Cross bracing */}
    <line x1="32" y1="40" x2="88" y2="100" />
    <line x1="88" y1="40" x2="32" y2="100" />
    {/* Foundations */}
    <rect x="22" y="100" width="20" height="6" />
    <rect x="78" y="100" width="20" height="6" />
    {/* Dimension tick top */}
    <circle cx="60" cy="22" r="2" fill="#B4532A" stroke="none" />
  </svg>
);

// 02 — Financial & Legal Advisory
// Balance / scales motif with ledger lines.
export const PillarFinancialIllustration: React.FC<IllustrationProps> = ({
  className = '',
  size = 96,
  ariaLabel = 'Financial & Legal Advisory illustration — scales above ledger lines',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
    strokeLinecap="square"
    role="img"
    aria-label={ariaLabel}
    className={className}
  >
    {/* Beam */}
    <line x1="30" y1="32" x2="90" y2="32" />
    {/* Pivot */}
    <line x1="60" y1="32" x2="60" y2="78" />
    {/* Hangers */}
    <line x1="30" y1="32" x2="30" y2="50" />
    <line x1="90" y1="32" x2="90" y2="50" />
    {/* Pans */}
    <path d="M16 50 L44 50 L40 60 L20 60 Z" />
    <path d="M76 50 L104 50 L100 60 L80 60 Z" />
    {/* Pivot accent */}
    <circle cx="60" cy="32" r="2.5" fill="#B4532A" stroke="none" />
    {/* Base / ledger lines */}
    <line x1="20" y1="78" x2="100" y2="78" />
    <line x1="20" y1="86" x2="100" y2="86" stroke="#B4532A" strokeWidth="1.75" />
    <line x1="20" y1="94" x2="80" y2="94" />
    <line x1="20" y1="102" x2="100" y2="102" />
    <line x1="20" y1="110" x2="60" y2="110" />
  </svg>
);

// 03 — Digital Transformation & Technology
// Network / nodes graph.
export const PillarDigitalIllustration: React.FC<IllustrationProps> = ({
  className = '',
  size = 96,
  ariaLabel = 'Digital Transformation & Technology illustration — nodes connected by network edges',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
    strokeLinecap="round"
    role="img"
    aria-label={ariaLabel}
    className={className}
  >
    {/* Edges first so nodes overlay them */}
    <line x1="30" y1="30" x2="90" y2="30" />
    <line x1="30" y1="30" x2="60" y2="60" />
    <line x1="90" y1="30" x2="60" y2="60" />
    <line x1="60" y1="60" x2="30" y2="90" />
    <line x1="60" y1="60" x2="90" y2="90" />
    <line x1="30" y1="90" x2="90" y2="90" />
    {/* Accent edge */}
    <line x1="30" y1="30" x2="90" y2="90" stroke="#B4532A" strokeWidth="1.75" strokeDasharray="3 3" />
    {/* Nodes */}
    <circle cx="30" cy="30" r="6" fill="white" />
    <circle cx="30" cy="30" r="6" />
    <circle cx="90" cy="30" r="6" fill="white" />
    <circle cx="90" cy="30" r="6" />
    <circle cx="60" cy="60" r="7" fill="#B4532A" stroke="none" />
    <circle cx="60" cy="60" r="3" fill="#FAFAF7" stroke="none" />
    <circle cx="30" cy="90" r="6" fill="white" />
    <circle cx="30" cy="90" r="6" />
    <circle cx="90" cy="90" r="6" fill="white" />
    <circle cx="90" cy="90" r="6" />
  </svg>
);

// 04 — Education & Institutional Development
// Classical column / institutional façade.
export const PillarEducationIllustration: React.FC<IllustrationProps> = ({
  className = '',
  size = 96,
  ariaLabel = 'Education & Institutional Development illustration — classical institutional façade with columns',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
    strokeLinecap="square"
    role="img"
    aria-label={ariaLabel}
    className={className}
  >
    {/* Roof */}
    <path d="M14 38 L60 18 L106 38 Z" />
    {/* Architrave */}
    <line x1="18" y1="42" x2="102" y2="42" />
    <line x1="18" y1="48" x2="102" y2="48" stroke="#B4532A" strokeWidth="1.75" />
    {/* Three columns */}
    {[28, 60, 92].map((x) => (
      <g key={x}>
        <line x1={x} y1={50} x2={x} y2={92} />
        <line x1={x - 6} y1={50} x2={x + 6} y2={50} />
        <line x1={x - 7} y1={92} x2={x + 7} y2={92} />
      </g>
    ))}
    {/* Stylobate / steps */}
    <line x1="14" y1="96" x2="106" y2="96" />
    <line x1="10" y1="100" x2="110" y2="100" />
    <line x1="6"  y1="104" x2="114" y2="104" />
    {/* Cap accent */}
    <circle cx="60" cy="18" r="2.5" fill="#B4532A" stroke="none" />
  </svg>
);

// 05 — Enterprise Strategy & Support Services
// Flow diagram / matrix.
export const PillarEnterpriseIllustration: React.FC<IllustrationProps> = ({
  className = '',
  size = 96,
  ariaLabel = 'Enterprise Strategy & Support Services illustration — process flow with input, transform, output stages',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
    strokeLinecap="square"
    role="img"
    aria-label={ariaLabel}
    className={className}
  >
    {/* Top flow */}
    <rect x="14" y="22" width="24" height="18" />
    <rect x="48" y="22" width="24" height="18" />
    <rect x="82" y="22" width="24" height="18" />
    <line x1="38" y1="31" x2="48" y2="31" />
    <line x1="72" y1="31" x2="82" y2="31" />
    {/* Vertical flow into hub */}
    <line x1="60" y1="40" x2="60" y2="58" stroke="#B4532A" strokeWidth="1.75" />
    {/* Hub */}
    <rect x="44" y="58" width="32" height="20" stroke="#B4532A" strokeWidth="1.75" />
    {/* Out arrows */}
    <line x1="60" y1="78" x2="60" y2="92" />
    <line x1="44" y1="78" x2="30" y2="92" />
    <line x1="76" y1="78" x2="90" y2="92" />
    {/* Output bins */}
    <rect x="14" y="92" width="24" height="14" />
    <rect x="48" y="92" width="24" height="14" />
    <rect x="82" y="92" width="24" height="14" />
  </svg>
);

// Map pillar id → illustration component.
export const PillarIllustration: React.FC<{ pillarId: string } & IllustrationProps> = ({
  pillarId,
  ...rest
}) => {
  switch (pillarId) {
    case 'engineering-infrastructure': return <PillarEngineeringIllustration {...rest} />;
    case 'financial-legal':            return <PillarFinancialIllustration {...rest} />;
    case 'digital-technology':         return <PillarDigitalIllustration {...rest} />;
    case 'education-institutional':    return <PillarEducationIllustration {...rest} />;
    case 'enterprise-strategy':        return <PillarEnterpriseIllustration {...rest} />;
    default:                            return null;
  }
};
