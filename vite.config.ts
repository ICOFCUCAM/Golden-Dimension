import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { writeFileSync } from "node:fs";
import { Resvg } from "@resvg/resvg-js";

const SITE_URL = "https://golden-dimension.vercel.app";
const FIRM_NAME = "Golden Dimensions Ltd";

const escapeXml = (s: string): string =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

/**
 * Vite plugin: generate dist/og-default.png at build time.
 * 1200x630 branded social-share image rendered from inline SVG via
 * @resvg/resvg-js. Referenced from index.html as the og:image and
 * twitter:image so every shared link gets a consistent branded card.
 */
function ogImagePlugin(): Plugin {
  return {
    name: "golden-dimensions:og-image",
    apply: "build",
    closeBundle() {
      try {
        // 1200x630 — standard social-share dimensions.
        // System-font fallback chain so resvg's default font handles render
        // without requiring custom font files in the build.
        const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <!-- Canvas -->
  <rect width="1200" height="630" fill="#F7F5F2"/>

  <!-- Top corner ticks (Palantir-coded) -->
  <g stroke="#B4532A" stroke-width="3" fill="none">
    <path d="M 60 60 L 60 100 M 60 60 L 100 60"/>
    <path d="M 1140 60 L 1140 100 M 1140 60 L 1100 60"/>
    <path d="M 60 570 L 60 530 M 60 570 L 100 570"/>
    <path d="M 1140 570 L 1140 530 M 1140 570 L 1100 570"/>
  </g>

  <!-- Top mono technical label -->
  <g font-family="monospace" font-size="20" letter-spacing="6" fill="#B4532A" font-weight="500">
    <text x="100" y="150">CAPABILITY BRIEF</text>
  </g>
  <g font-family="monospace" font-size="20" letter-spacing="6" fill="#74757B" font-weight="500">
    <text x="100" y="180">GOLDEN DIMENSIONS LTD &#xB7; EST. 2003</text>
  </g>

  <!-- Headline -->
  <g font-family="Georgia, serif" font-size="68" font-weight="500" fill="#1F1F1F" letter-spacing="-2">
    <text x="100" y="320">Integrated capability for</text>
    <text x="100" y="395" font-style="italic" fill="#B4532A">institutions, enterprises,</text>
    <text x="100" y="470">and governments worldwide.</text>
  </g>

  <!-- Bottom rule + url -->
  <line x1="100" y1="535" x2="1100" y2="535" stroke="#C8BFB0" stroke-width="1"/>
  <g font-family="monospace" font-size="20" letter-spacing="3" fill="#74757B" font-weight="500">
    <text x="100" y="585">GOLDEN-DIMENSION.VERCEL.APP</text>
  </g>

  <!-- GD monogram bottom-right -->
  <g transform="translate(1020,540)">
    <rect width="80" height="60" fill="#1F1F1F"/>
    <rect x="6" y="6" width="68" height="48" fill="none" stroke="#B4532A" stroke-width="2"/>
    <text x="40" y="42" font-family="Georgia, serif" font-size="28" font-weight="600" fill="#F7F5F2" text-anchor="middle">GD</text>
  </g>
</svg>`;

        const resvg = new Resvg(svg, {
          background: "#F7F5F2",
          fitTo: { mode: "width", value: 1200 },
        });
        const png = resvg.render().asPng();
        writeFileSync(path.resolve(__dirname, "dist", "og-default.png"), png);
        // eslint-disable-next-line no-console
        console.log(`✓ og-default.png generated (${png.length} bytes)`);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn("OG image generation failed:", err);
      }
    },
  };
}

/**
 * Vite plugin: generate /rss.xml at build time from src/data/news.ts.
 * Emitted into dist/rss.xml so feed readers can subscribe at the
 * canonical /rss.xml URL.
 */
function rssFeedPlugin(): Plugin {
  return {
    name: "golden-dimensions:rss-feed",
    apply: "build",
    async closeBundle() {
      try {
        const newsModule = await import("./src/data/news");
        const articles = newsModule.newsArticles;

        const items = articles
          .map((a: any) => {
            const link = `${SITE_URL}/news/${a.slug}`;
            const pubDate = new Date(a.date);
            return `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(a.excerpt)}</description>
      <category>${escapeXml(a.category)}</category>
      <pubDate>${(Number.isNaN(pubDate.getTime()) ? new Date() : pubDate).toUTCString()}</pubDate>${a.author ? `\n      <author>${escapeXml(a.author)}</author>` : ""}
    </item>`;
          })
          .join("\n");

        const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${FIRM_NAME} · Insights`)}</title>
    <link>${SITE_URL}/news</link>
    <description>Practitioner perspectives across engineering, finance, technology, and institutional development.</description>
    <language>en-GB</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

        writeFileSync(path.resolve(__dirname, "dist", "rss.xml"), rss, "utf-8");
        // eslint-disable-next-line no-console
        console.log(`✓ rss.xml generated (${articles.length} items)`);
      } catch (err) {
        // Non-fatal — site builds even if RSS generation fails.
        // eslint-disable-next-line no-console
        console.warn("RSS generation failed:", err);
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    rssFeedPlugin(),
    ogImagePlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        // Only split off heavy *leaf* dependencies that have no inbound
        // edges from other vendor code. Splitting React out of `vendor`
        // (or radix into its own chunk) introduces import cycles between
        // chunks at runtime — Rollup warns at build time and the browser
        // throws "Cannot read properties of undefined (reading
        // 'forwardRef')" because the chunks initialise in the wrong order.
        // Keep React, radix, router, recharts in the main vendor bundle.
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('react-simple-maps') || id.includes('d3-')) return 'vendor-map';
          if (id.includes('@supabase')) return 'vendor-supabase';
          if (id.includes('lucide-react')) return 'vendor-icons';
          return 'vendor';
        },
      },
    },
  },
}));
