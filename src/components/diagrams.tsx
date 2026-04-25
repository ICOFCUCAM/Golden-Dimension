import React from 'react';

// =============================================================================
// Diagrammatic primitives — replace stock cards with structured visualisations
// that signal "infrastructure platform" rather than "marketing site".
// All diagrams are pure SVG/CSS, no runtime libraries.
// =============================================================================

// -----------------------------------------------------------------------------
// LayerStack — visualises six capability layers as a horizontal/vertical stack
// with lateral arrows showing how strategy informs engineering, technology,
// operations, sustainability, and human capital across an engagement.
// Used on the Services / Capabilities page.
// -----------------------------------------------------------------------------

export interface LayerStackEntry {
  index: string;
  name: string;
  description: string;
}

export const LayerStack: React.FC<{
  layers: LayerStackEntry[];
  className?: string;
}> = ({ layers, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-px bg-brand-hair-strong border border-brand-hair-strong ${className}`}>
      {layers.map((layer, idx) => {
        // Each layer occupies 2 columns on lg+ for 6 layers in a row of 12.
        // The flow arrow renders inside, except on the last layer.
        const isLast = idx === layers.length - 1;
        return (
          <div
            key={layer.index}
            className="relative bg-brand-paper p-6 md:p-7 lg:col-span-2"
          >
            <div className="label-technical text-brand-accent">{layer.index}</div>
            <h3 className="mt-4 text-[16px] md:text-[17px] font-semibold tracking-[-0.02em] text-brand-ink leading-tight">
              {layer.name}
            </h3>
            <p className="mt-3 text-[12.5px] leading-[1.55] text-brand-ink-2">
              {layer.description}
            </p>
            {!isLast && (
              <span
                className="hidden lg:flex absolute top-8 -right-3 w-6 h-6 items-center justify-center text-brand-accent z-10 bg-brand-paper"
                aria-hidden
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7H12M12 7L7 2M12 7L7 12" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

// -----------------------------------------------------------------------------
// CapabilityArchitecture — full systems diagram showing how capability layers
// flow into pillars, which apply across industries.
// -----------------------------------------------------------------------------

export const CapabilityArchitecture: React.FC<{
  layers: { index: string; name: string }[];
  pillars: { index: string; name: string }[];
  industries: { name: string }[];
  className?: string;
}> = ({ layers, pillars, industries, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Three-row diagrammatic stack */}

      {/* Row 1 — Capability layers */}
      <div className="border border-brand-hair-strong bg-brand-paper">
        <div className="px-5 py-3 border-b border-brand-hair-strong flex items-center justify-between">
          <span className="label-technical text-brand-mute">
            <span className="text-brand-accent">L1</span> · Capability Layers
          </span>
          <span className="label-technical text-brand-mute">06</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {layers.map((l, idx) => (
            <div
              key={l.name}
              className={`p-4 md:p-5 ${idx > 0 ? 'border-l border-brand-hair' : ''} ${
                idx >= 3 ? 'border-t lg:border-t-0 border-brand-hair' : ''
              }`}
            >
              <span className="label-technical text-brand-accent">{l.index}</span>
              <div className="mt-2 text-[13px] font-semibold tracking-[-0.015em] text-brand-ink leading-tight">
                {l.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Connector */}
      <div className="flex items-center justify-center py-4">
        <svg width="20" height="32" viewBox="0 0 20 32" fill="none" aria-hidden>
          <path d="M10 0V26M10 26L2 18M10 26L18 18" stroke="#C24914" strokeWidth="1.25" />
        </svg>
      </div>

      {/* Row 2 — Capability pillars */}
      <div className="border border-brand-hair-strong bg-brand-paper">
        <div className="px-5 py-3 border-b border-brand-hair-strong flex items-center justify-between">
          <span className="label-technical text-brand-mute">
            <span className="text-brand-accent">L2</span> · Capability Pillars
          </span>
          <span className="label-technical text-brand-mute">{String(pillars.length).padStart(2, '0')}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map((p, idx) => (
            <div
              key={p.name}
              className={`p-4 md:p-5 ${idx > 0 ? 'lg:border-l border-brand-hair' : ''} ${
                idx > 0 ? 'border-t lg:border-t-0 border-brand-hair' : ''
              }`}
            >
              <span className="label-technical text-brand-accent">{p.index}</span>
              <div className="mt-2 text-[13px] font-semibold tracking-[-0.015em] text-brand-ink leading-tight">
                {p.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Connector */}
      <div className="flex items-center justify-center py-4">
        <svg width="20" height="32" viewBox="0 0 20 32" fill="none" aria-hidden>
          <path d="M10 0V26M10 26L2 18M10 26L18 18" stroke="#C24914" strokeWidth="1.25" />
        </svg>
      </div>

      {/* Row 3 — Industries applied */}
      <div className="border border-brand-hair-strong bg-brand-paper">
        <div className="px-5 py-3 border-b border-brand-hair-strong flex items-center justify-between">
          <span className="label-technical text-brand-mute">
            <span className="text-brand-accent">L3</span> · Industry Applications
          </span>
          <span className="label-technical text-brand-mute">{String(industries.length).padStart(2, '0')}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {industries.map((it, idx) => (
            <div
              key={it.name}
              className={`p-4 md:p-5 ${idx > 0 ? 'border-l border-brand-hair' : ''} ${
                idx >= 3 ? 'border-t lg:border-t-0 border-brand-hair' : ''
              }`}
            >
              <span className="label-technical text-brand-accent">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <div className="mt-2 text-[12.5px] font-semibold tracking-[-0.015em] text-brand-ink leading-tight">
                {it.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// WorldMap — stylised dot-grid map with continents and region pins.
// Hand-tuned grid; intentionally schematic, not cartographic. Used on the
// homepage's Global Footprint section.
// -----------------------------------------------------------------------------

interface RegionPin {
  id: string;
  label: string;
  x: number; // percent (0-100)
  y: number; // percent (0-100)
}

const continents: { d: string }[] = [
  // North America
  { d: 'M120 110 L210 95 L260 110 L290 150 L300 200 L260 240 L200 230 L150 200 L130 165 Z' },
  // South America
  { d: 'M260 270 L300 270 L320 320 L300 380 L270 410 L250 380 L240 320 Z' },
  // Europe
  { d: 'M450 110 L530 100 L560 130 L555 170 L500 180 L460 170 Z' },
  // Africa
  { d: 'M460 200 L550 200 L580 260 L570 330 L530 380 L490 380 L460 320 L450 260 Z' },
  // Middle East
  { d: 'M555 180 L600 180 L620 215 L595 240 L560 230 Z' },
  // Asia
  { d: 'M580 110 L730 100 L800 140 L820 200 L780 240 L700 240 L630 220 L600 180 Z' },
  // South Asia
  { d: 'M650 230 L720 230 L730 275 L685 290 L660 270 Z' },
  // SE Asia / Australia (combined schematic)
  { d: 'M740 250 L800 260 L820 300 L780 320 L750 300 Z' },
  { d: 'M770 350 L830 350 L850 380 L800 405 L760 390 Z' },
];

const regionPins: RegionPin[] = [
  { id: 'na',    label: 'North America',         x: 23,   y: 36 },
  { id: 'eu',    label: 'European Union',        x: 53,   y: 32 },
  { id: 'uk',    label: 'United Kingdom',        x: 50,   y: 28 },
  { id: 'mena',  label: 'MENA',                  x: 60,   y: 47 },
  { id: 'ssa',   label: 'Sub-Saharan Africa',    x: 55,   y: 65 },
  { id: 'apac',  label: 'Asia Pacific',          x: 80,   y: 60 },
];

export const WorldMap: React.FC<{
  className?: string;
  tone?: 'light' | 'dark';
}> = ({ className = '', tone = 'dark' }) => {
  const isDark = tone === 'dark';
  const continentFill   = isDark ? '#1F1F23' : '#EFEDE7';
  const continentStroke = isDark ? '#2C2D33' : '#BCB8AB';
  const dotColor        = isDark ? 'rgba(166,167,172,0.18)' : 'rgba(116,117,123,0.20)';

  return (
    <div className={`relative w-full ${className}`}>
      <svg
        viewBox="0 0 900 450"
        xmlns="http://www.w3.org/2000/svg"
        className="block w-full h-auto"
        role="img"
        aria-label="Global delivery footprint map"
      >
        {/* Dot grid background */}
        <defs>
          <pattern id="map-dot-grid" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1.25" cy="1.25" r="1.25" fill={dotColor} />
          </pattern>
        </defs>
        <rect width="900" height="450" fill="url(#map-dot-grid)" />

        {/* Continent silhouettes */}
        <g>
          {continents.map((c, i) => (
            <path
              key={i}
              d={c.d}
              fill={continentFill}
              stroke={continentStroke}
              strokeWidth="1"
              strokeLinejoin="round"
            />
          ))}
        </g>

        {/* Region pins */}
        <g>
          {regionPins.map((pin) => {
            const cx = (pin.x / 100) * 900;
            const cy = (pin.y / 100) * 450;
            return (
              <g key={pin.id}>
                {/* Pulse ring */}
                <circle cx={cx} cy={cy} r="14" fill="none" stroke="#C24914" strokeWidth="0.75" opacity="0.45" />
                {/* Outer dot */}
                <circle cx={cx} cy={cy} r="5" fill="#C24914" />
                {/* Inner dot */}
                <circle cx={cx} cy={cy} r="2" fill="#FAFAF7" />
              </g>
            );
          })}
        </g>
      </svg>

      {/* Legend rendered as HTML below SVG so labels stay readable on small screens. */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-px bg-white/10 border border-white/10">
        {regionPins.map((pin, idx) => (
          <div key={pin.id} className="bg-brand-ink p-4 flex items-baseline gap-3">
            <span className="label-technical text-brand-accent-soft">
              {String(idx + 1).padStart(2, '0')}
            </span>
            <span className="text-[13px] tracking-tight text-brand-on-dark">
              {pin.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
