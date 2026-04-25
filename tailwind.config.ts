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
        // Infrastructure Platform Consulting palette (v3).
        // Single signal accent (rust orange) on near-black ink over an
        // off-white canvas. Token *names* preserved (ivory/paper/stone/
        // ink/...) so secondary pages keep working; values updated.
        // ------------------------------------------------------------
        brand: {
          ivory:         '#FAFAF7',  // canvas (primary surface)
          paper:         '#FFFFFF',  // raised paper (editorial moments)
          stone:         '#EFEDE7',  // recessed alt surface
          ink:           '#0A0A0B',  // primary ink + emphasis band
          'ink-soft':    '#15151A',  // soft variant of ink
          'ink-2':       '#3F4047',  // body text
          mute:          '#74757B',  // tertiary text + technical labels
          hair:          '#E2E0DA',  // hairline rules
          'hair-strong': '#BCB8AB',  // emphasised rules
          'on-dark':     '#FAFAF7',  // text on ink band
          'on-dark-2':   '#A6A7AC',  // secondary text on ink

          // Single signal accent — engineering rust.
          accent:        '#C24914',
          'accent-hover':'#A33D0F',
          'accent-soft': '#E4754B',  // brighter — for ink band
          'accent-tint': '#F8E7DD',  // pale wash — used sparingly
        },
      },
      fontFamily: {
        // Plus Jakarta Sans is the workhorse — display + UI + body.
        // IBM Plex Serif is opt-in via .font-editorial for editorial moments.
        // JetBrains Mono is used for technical labels & numerals.
        display:   ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans:      ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        editorial: ['"IBM Plex Serif"', 'Georgia', 'serif'],
        serif:     ['"IBM Plex Serif"', 'Georgia', 'serif'],
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
