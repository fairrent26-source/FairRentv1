import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-main": "#F9F9F9",
        "bg-card": "#FFFFFF",
        "landing-band": "#D4EBE3",
        "text-primary": "#1A1A1A",
        "text-muted": "#6B7280",
        "brand-teal": "#00D2D3",
        "accent-lime": "#C6FF00",
        "alert-watermelon": "#FF5252",
        "ui-tags": "#E5E7EB",
        obsidian: "#0D0D12",
        champagne: {
          DEFAULT: "#C9A84C",
          soft: "#D8BE73",
          deep: "#A88B3A",
        },
        ivory: "#FAF8F5",
        slate: {
          luxe: "#2A2A35",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: "hsl(var(--secondary))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: "hsl(var(--accent))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        positive: "hsl(var(--positive))",
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
        verified: {
          DEFAULT: "hsl(var(--verified))",
          foreground: "hsl(var(--verified-foreground))",
          solid: "hsl(var(--verified-solid-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "sans-serif"],
        accent: ["var(--font-accent)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        eyebrow: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.2em" }],
        "display-xl": [
          "clamp(2.75rem, 6vw, 4.5rem)",
          { lineHeight: "1.02", letterSpacing: "-0.03em" },
        ],
        display: [
          "clamp(2.25rem, 4.5vw, 3.5rem)",
          { lineHeight: "1.05", letterSpacing: "-0.028em" },
        ],
        h1: [
          "clamp(1.75rem, 3vw, 2.5rem)",
          { lineHeight: "1.1", letterSpacing: "-0.022em" },
        ],
        h2: [
          "clamp(1.375rem, 2.2vw, 1.875rem)",
          { lineHeight: "1.16", letterSpacing: "-0.02em" },
        ],
        h3: [
          "clamp(1.125rem, 1.6vw, 1.375rem)",
          { lineHeight: "1.25", letterSpacing: "-0.015em" },
        ],
      },
      letterSpacing: {
        tighter: "-0.03em",
        tight: "-0.02em",
        display: "0.14em",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        luxe: "2rem",
        "luxe-lg": "3rem",
      },
      boxShadow: {
        soft: "0 1px 2px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.06)",
        card: "0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.06)",
        "card-hover": "0 4px 12px -2px rgb(0 0 0 / 0.12), 0 2px 6px -2px rgb(0 0 0 / 0.08)",
        "elevated-hero": "0 0 60px -12px rgb(0 0 0 / 0.5), 0 0 24px -8px rgb(0 0 0 / 0.25)",
        "elevated-card": "0 0 20px -6px rgb(0 0 0 / 0.35)",
        "elevated-metric": "0 0 16px -4px rgb(0 0 0 / 0.2)",
      },
      animation: {
        "border-beam": "border-beam 4s linear infinite",
        "progress-shimmer": "progress-shimmer 2.2s ease-in-out infinite",
        "skeleton-pulse": "skeleton-pulse 1.6s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
        "savings-tape": "savings-tape 0.4s ease-out both",
      },
      keyframes: {
        "savings-tape": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "border-beam": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "progress-shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "60%, 100%": { transform: "translateX(200%)" },
        },
        "skeleton-pulse": {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "0.85" },
        },
      },
      backgroundImage: {
        "gradient-radial-champagne": "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(201, 168, 76, 0.05) 0%, transparent 70%)",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      transitionTimingFunction: {
        magnetic: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
    },
  },
  plugins: [],
};
export default config;
