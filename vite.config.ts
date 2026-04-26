import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { writeFileSync } from "node:fs";

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
        // Split the bundle into a few coherent chunks so first paint doesn't
        // pull in everything. Heavy third-party deps (react-simple-maps + d3,
        // recharts, supabase, lucide icons) get their own chunks; remaining
        // node_modules bundle into a generic vendor chunk.
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('react-simple-maps') || id.includes('d3-')) return 'vendor-map';
          if (id.includes('recharts')) return 'vendor-charts';
          if (id.includes('@supabase')) return 'vendor-supabase';
          if (id.includes('lucide-react')) return 'vendor-icons';
          if (id.includes('@radix-ui')) return 'vendor-radix';
          if (id.includes('react-router')) return 'vendor-router';
          if (id.includes('react-hook-form') || id.includes('@hookform')) return 'vendor-forms';
          return 'vendor';
        },
      },
    },
  },
}));
