import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        // ------------------------------------------------------------
        // Editorial Consulting palette (v4).
        // Warm white canvas, graphite ink, muted copper accent.
        // Token *names* preserved (ivory/paper/stone/ink/...) so
        // secondary pages keep working; values updated.
        // ------------------------------------------------------------
        brand: {
          ivory:         '#F7F5F2',  // warm white canvas
          paper:         '#FFFFFF',  // raised paper (editorial moments)
          stone:         '#ECE7E0',  // recessed alt surface
          ink:           '#1F1F1F',  // graphite ink + emphasis band
          'ink-soft':    '#2A2A2A',  // soft variant of ink
          'ink-2':       '#4A4A4A',  // body text
          mute:          '#7A7A7A',  // tertiary text + technical labels
          hair:          '#E7E1DA',  // hairline rules
          'hair-strong': '#C8BFB0',  // emphasised rules
          'on-dark':     '#F7F5F2',  // text on ink band
          'on-dark-2':   '#A8A6A2',  // secondary text on ink

          // Single signal accent — muted copper.
          accent:        '#B4532A',
          'accent-hover':'#963F1F',
          'accent-soft': '#D4815C',  // brighter — for ink band
          'accent-tint': '#F4E4D9',  // pale wash — used sparingly
        },
      },
      fontFamily: {
        // IBM Plex Serif drives editorial display (h1/h2/h3 + italic
        // accents). Inter is the body / UI workhorse. JetBrains Mono
        // carries technical labels and tabular numerals.
        display:   ['"IBM Plex Serif"', 'Georgia', 'serif'],
        editorial: ['"IBM Plex Serif"', 'Georgia', 'serif'],
        serif:     ['"IBM Plex Serif"', 'Georgia', 'serif'],
        sans:      ['Inter', 'system-ui', 'sans-serif'],
        mono:      ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        lg: 'calc(var(--radius) + 2px)',
        md: 'var(--radius)',
        sm: 'calc(var(--radius) - 2px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-in': {
          from: { transform: 'translateY(10px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
          },
        },
      },
    }
  },
  plugins: [
    animate,
    typography,
  ],
} satisfies Config;
