import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react()
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
