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
// WorldMap — real-geometry world map.
// Uses `react-simple-maps` (~30KB) to render proper country outlines from the
// standard world-atlas TopoJSON dataset (fetched from jsDelivr at runtime).
// Region pins are placed by [longitude, latitude] so they sit on the actual
// cities rather than on a hand-tuned grid.
// -----------------------------------------------------------------------------

// `react-simple-maps` ships without bundled type declarations on v3; declared
// inline below so TypeScript builds cleanly.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

interface RegionPin {
  id: string;
  label: string;
  coords: [number, number]; // [lng, lat]
}

const regionPins: RegionPin[] = [
  { id: 'na',   label: 'North America',         coords: [-77.0, 38.9] },  // Washington DC
  { id: 'uk',   label: 'United Kingdom',        coords: [-0.13, 51.51] }, // London
  { id: 'eu',   label: 'European Union',        coords: [4.35, 50.85] },  // Brussels
  { id: 'mena', label: 'MENA',                  coords: [31.23, 30.04] }, // Cairo
  { id: 'ssa',  label: 'Sub-Saharan Africa',    coords: [36.82, -1.29] }, // Nairobi
  { id: 'apac', label: 'Asia Pacific',          coords: [103.8, 1.35] },  // Singapore
];

export const WorldMap: React.FC<{
  className?: string;
  tone?: 'light' | 'dark';
}> = ({ className = '', tone = 'dark' }) => {
  const isDark = tone === 'dark';
  const landFill   = isDark ? '#1F1F23' : '#EFEDE7';
  const landStroke = isDark ? '#3A3A40' : '#BCB8AB';

  return (
    <div className={`relative w-full ${className}`}>
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 165 }}
        width={900}
        height={460}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }: { geographies: any[] }) =>
            geographies.map((geo: any) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={landFill}
                stroke={landStroke}
                strokeWidth={0.5}
                style={{
                  default: { outline: 'none' },
                  hover:   { outline: 'none', fill: landFill },
                  pressed: { outline: 'none', fill: landFill },
                }}
              />
            ))
          }
        </Geographies>

        {regionPins.map((pin) => (
          <Marker key={pin.id} coordinates={pin.coords}>
            {/* Pulse ring */}
            <circle r={11} fill="none" stroke="#C24914" strokeWidth={1} opacity={0.5} />
            {/* Outer dot */}
            <circle r={5} fill="#C24914" />
            {/* Inner dot */}
            <circle r={1.8} fill="#FAFAF7" />
          </Marker>
        ))}
      </ComposableMap>

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
