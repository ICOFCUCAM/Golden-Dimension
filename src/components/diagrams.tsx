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
// WorldMap — schematic dot-density world map.
// Each landmass is rendered as a grid of small dots; ocean stays as a fainter
// dot grid. This reads as a recognisable world map on first glance without
// shipping kilobytes of cartographic SVG paths.
// -----------------------------------------------------------------------------

interface RegionPin {
  id: string;
  label: string;
  x: number; // percent (0-100) — horizontal position in viewBox
  y: number; // percent (0-100) — vertical position in viewBox
}

// World viewBox: 200 x 100 grid (rows x cols). Each "1" is a land cell that
// will be rendered as a small filled dot. Built by hand to look roughly like
// continents at low resolution. 0 = ocean, 1 = land, 2 = sparse-land/coast.
const WORLD_GRID: string[] = [
  // 100 cols wide, 50 rows tall
  // Cols index           0         1         2         3         4         5         6         7         8         9
  // Cols index           0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789
  /*  0 */               '          11                                                                                        ',
  /*  1 */               '         1111  1                                                                                    ',
  /*  2 */               '       11111111  111         11                                                                     ',
  /*  3 */               '    1111111111111111111      111111                                       11                        ',
  /*  4 */               '   11111111111111111111111  1111111   1111                       1111  1111111  111111              ',
  /*  5 */               '   11111111111111111111111  111111   1111111111      11   111111111111111111111111111111            ',
  /*  6 */               '    111111111111111111111   11111  1111111111111   11111111111111111111111111111111111111           ',
  /*  7 */               '    1111111111111111111     1111  111111111111111111111111111111111111111111111111111111111  1      ',
  /*  8 */               '     1111111111111111      11111  1111  1111111111111111111111111111111111111111111111111111111     ',
  /*  9 */               '      11111111111111      11111   11    111111111111111111111111111111111111111111111111111111      ',
  /* 10 */               '       11111111111        11111         1111111111111111111111111111111111111111111111111111        ',
  /* 11 */               '        111111111         11111          111111111111111111111111111111111111111111111111111        ',
  /* 12 */               '         11111111          111            111111111111111111111111111111111111111111111111          ',
  /* 13 */               '          1111111          11             1111111111111111111111111111111111111111111  111          ',
  /* 14 */               '           111111           1             1111  111111111111111111111111111111  111      11         ',
  /* 15 */               '           111111                          11   111111111111111111111111111111   1                  ',
  /* 16 */               '            11111                                111111111111111  11111111111                       ',
  /* 17 */               '             111      11                          1111111111111    1111111111                       ',
  /* 18 */               '             111      111                         111111111111      11111111                        ',
  /* 19 */               '             111     1111                         11111111111        11111111                       ',
  /* 20 */               '            1111    1111                          1111111111         1111111                        ',
  /* 21 */               '            1111   1111                            11111111          1111111   111                  ',
  /* 22 */               '            1111  1111                              111111            11111111111                   ',
  /* 23 */               '            1111  1111                              111111             111111111                    ',
  /* 24 */               '            111111111                                111111            11111111                     ',
  /* 25 */               '            11111111                                  111111            1111111                     ',
  /* 26 */               '            1111111                                   1111111            11111                      ',
  /* 27 */               '             111111                                    11111111            11           1111        ',
  /* 28 */               '             11111                                      111111111                      1111111      ',
  /* 29 */               '             11111                                       1111111                       111111111    ',
  /* 30 */               '             1111                                         1111111                      11111111111  ',
  /* 31 */               '              111                                          111111                       1111111111  ',
  /* 32 */               '              111                                           11111                        111111111  ',
  /* 33 */               '              111                                            1111                          1111     ',
  /* 34 */               '               11                                             111                                   ',
  /* 35 */               '               11                                              11                                   ',
  /* 36 */               '               1                                                                                    ',
  /* 37 */               '                                                                                                    ',
  /* 38 */               '                                                                                                    ',
  /* 39 */               '                                                                                                    ',
];

// Translate the grid to <circle> coordinates.
const COLS = 100;
const ROWS = WORLD_GRID.length;
const CELL_W = 10;
const CELL_H = 10;
const VIEW_W = COLS * CELL_W;  // 1000
const VIEW_H = ROWS * CELL_H;  // 400

const landDots: { cx: number; cy: number }[] = [];
WORLD_GRID.forEach((row, r) => {
  for (let c = 0; c < row.length; c++) {
    if (row[c] === '1') {
      landDots.push({
        cx: c * CELL_W + CELL_W / 2,
        cy: r * CELL_H + CELL_H / 2,
      });
    }
  }
});

const regionPins: RegionPin[] = [
  // Tuned to land-dot positions in the grid above.
  { id: 'na',    label: 'North America',      x: 18, y: 30 },  // E. USA
  { id: 'uk',    label: 'United Kingdom',     x: 47, y: 24 },  // British Isles
  { id: 'eu',    label: 'European Union',     x: 50, y: 27 },  // Central Europe
  { id: 'mena',  label: 'MENA',               x: 56, y: 38 },  // Egypt / Levant
  { id: 'ssa',   label: 'Sub-Saharan Africa', x: 53, y: 56 },  // Central Africa
  { id: 'apac',  label: 'Asia Pacific',       x: 78, y: 50 },  // Southeast Asia
];

export const WorldMap: React.FC<{
  className?: string;
  tone?: 'light' | 'dark';
}> = ({ className = '', tone = 'dark' }) => {
  const isDark = tone === 'dark';
  const landDotColor  = isDark ? '#7B7C82' : '#3F4047';   // continents
  const oceanDotColor = isDark ? 'rgba(166,167,172,0.16)' : 'rgba(116,117,123,0.18)';
  const oceanCellSize = 22;

  return (
    <div className={`relative w-full ${className}`}>
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        xmlns="http://www.w3.org/2000/svg"
        className="block w-full h-auto"
        role="img"
        aria-label="Global delivery footprint map"
      >
        {/* Ocean dot grid background */}
        <defs>
          <pattern
            id="map-ocean-grid"
            x="0"
            y="0"
            width={oceanCellSize}
            height={oceanCellSize}
            patternUnits="userSpaceOnUse"
          >
            <circle cx={oceanCellSize / 2} cy={oceanCellSize / 2} r="1" fill={oceanDotColor} />
          </pattern>
        </defs>
        <rect width={VIEW_W} height={VIEW_H} fill="url(#map-ocean-grid)" />

        {/* Land dots — one per "1" in WORLD_GRID. */}
        <g>
          {landDots.map((d, i) => (
            <circle key={i} cx={d.cx} cy={d.cy} r="2.4" fill={landDotColor} />
          ))}
        </g>

        {/* Region pins */}
        <g>
          {regionPins.map((pin) => {
            const cx = (pin.x / 100) * VIEW_W;
            const cy = (pin.y / 100) * VIEW_H;
            return (
              <g key={pin.id}>
                {/* Pulse ring */}
                <circle cx={cx} cy={cy} r="14" fill="none" stroke="#C24914" strokeWidth="1" opacity="0.5" />
                {/* Outer dot */}
                <circle cx={cx} cy={cy} r="5.5" fill="#C24914" />
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
