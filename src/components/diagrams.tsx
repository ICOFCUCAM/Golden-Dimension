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

// 3-column cascade: capability layers feed pillars feed industries.
// Editorial style — left-to-right reading order, no boxed grids,
// hairline column separators, and a thin midline arrow between
// columns. Each column is a labelled list with mono indices.

export const CapabilityArchitecture: React.FC<{
  layers: { index: string; name: string }[];
  pillars: { index: string; name: string }[];
  industries: { name: string }[];
  className?: string;
}> = ({ layers, pillars, industries, className = '' }) => {
  const cols: {
    code: string;
    title: string;
    items: { index: string; name: string }[];
  }[] = [
    {
      code: 'L1',
      title: 'Capability Layers',
      items: layers,
    },
    {
      code: 'L2',
      title: 'Consulting Pillars',
      items: pillars,
    },
    {
      code: 'L3',
      title: 'Industries Applied',
      items: industries.map((i, idx) => ({
        index: String(idx + 1).padStart(2, '0'),
        name: i.name,
      })),
    },
  ];

  const FlowArrow = () => (
    <div className="hidden lg:flex flex-col items-center justify-center px-1 self-stretch" aria-hidden>
      <span className="block w-px flex-1 bg-brand-hair" />
      <span className="block w-7 h-7 rounded-full border border-brand-accent text-brand-accent flex items-center justify-center my-3 bg-brand-paper">
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
          <path d="M2 7H12M12 7L7 2M12 7L7 12" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </span>
      <span className="block w-px flex-1 bg-brand-hair" />
    </div>
  );

  return (
    <div className={`relative ${className}`}>
      <div className="border border-brand-hair-strong bg-brand-paper">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {cols.map((col, ci) => (
            <React.Fragment key={col.code}>
              <div className={`p-7 md:p-8 ${ci > 0 ? 'border-t lg:border-t-0 border-brand-hair' : ''}`}>
                {/* Column header */}
                <div className="flex items-baseline justify-between pb-4 mb-5 border-b border-brand-hair-strong">
                  <span className="label-technical">
                    <span className="text-brand-accent">{col.code}</span>
                    <span className="text-brand-mute"> · {col.title}</span>
                  </span>
                  <span className="label-technical text-brand-mute font-mono-tab">
                    {String(col.items.length).padStart(2, '0')}
                  </span>
                </div>

                {/* Column list */}
                <ul className="space-y-3.5">
                  {col.items.map((it) => (
                    <li
                      key={it.name}
                      className="grid grid-cols-[auto_1fr] gap-3 items-baseline"
                    >
                      <span className="label-technical text-brand-accent shrink-0 pt-0.5 font-mono-tab">
                        {it.index}
                      </span>
                      <span className="font-display text-[15px] md:text-[16px] font-medium tracking-[-0.005em] text-brand-ink leading-snug">
                        {it.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Inter-column flow arrow (desktop only) */}
              {ci < cols.length - 1 && <FlowArrow />}
            </React.Fragment>
          ))}
        </div>

        {/* Footer caption strip */}
        <div className="border-t border-brand-hair-strong px-6 md:px-8 py-3 flex items-center justify-between">
          <span className="label-technical text-brand-mute">
            <span className="text-brand-accent">Read</span> · Layers feed pillars · Pillars apply across industries
          </span>
          <span className="label-technical text-brand-mute font-mono-tab">
            ARCH / 03 · v.{new Date().getFullYear() % 100}.01
          </span>
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

export interface MapPin {
  id: string;
  label: string;
  coords: [number, number]; // [lng, lat]
}

export const defaultRegionPins: MapPin[] = [
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
  pins?: MapPin[];
  scale?: number;
  maxWidthClass?: string;
}> = ({ className = '', tone = 'dark', pins = defaultRegionPins, scale = 175, maxWidthClass = 'max-w-4xl' }) => {
  const isDark = tone === 'dark';
  const landFill   = isDark ? '#26262B' : '#E7E1DA';
  const landStroke = isDark ? '#5A5A62' : '#7A7A7A';

  return (
    <div className={`relative w-full ${maxWidthClass} mx-auto ${className}`}>
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale }}
        width={1000}
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
                strokeWidth={0.9}
                style={{
                  default: { outline: 'none' },
                  hover:   { outline: 'none', fill: landFill },
                  pressed: { outline: 'none', fill: landFill },
                }}
              />
            ))
          }
        </Geographies>

        {pins.map((pin) => (
          <Marker key={pin.id} coordinates={pin.coords}>
            {/* Outer pulse ring */}
            <circle r={14} fill="none" stroke="#B4532A" strokeWidth={1} opacity={0.4} />
            {/* Outer dot */}
            <circle r={5} fill="#B4532A" />
            {/* Inner dot */}
            <circle r={2} fill="#F7F5F2" />
          </Marker>
        ))}
      </ComposableMap>

      {/* Legend rendered as HTML below SVG so labels stay readable on small screens. */}
      <div className={`mt-8 grid grid-cols-2 sm:grid-cols-3 gap-px ${isDark ? 'bg-white/10 border border-white/10' : 'bg-brand-hair border border-brand-hair'}`}>
        {pins.map((pin, idx) => (
          <div key={pin.id} className={`${isDark ? 'bg-brand-ink' : 'bg-brand-paper'} p-4 flex items-baseline gap-3`}>
            <span className={`label-technical font-mono-tab ${isDark ? 'text-brand-accent-soft' : 'text-brand-accent'}`}>
              {String(idx + 1).padStart(2, '0')}
            </span>
            <span className={`text-[13px] tracking-tight ${isDark ? 'text-brand-on-dark' : 'text-brand-ink'}`}>
              {pin.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
