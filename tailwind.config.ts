import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        // Brand Signature Colors
        brand: {
          signature: "#0B5AA8",
          accent: "#00A8A8",
        },
        // Emotional Colors
        trust: "#0B5AA8",
        energy: "#00A8A8",
        success: "#10B981",
        warmth: "#FF8A65",
        warning: "#F59E0B",
        error: "#E53935",
        // Navy Scale
        navy: {
          50: "#E8F1FF",
          100: "#C2DBFF",
          200: "#8BB8FF",
          300: "#5494FF",
          400: "#2D7BFF",
          500: "#0B5AA8",
          600: "#094089",
          700: "#073270",
          800: "#052457",
          900: "#03163E",
          950: "#020D26",
        },
        // Turquoise Scale
        turquoise: {
          50: "#E0F7F7",
          100: "#B3EDED",
          200: "#80E3E3",
          300: "#4DD9D9",
          400: "#26D1D1",
          500: "#00A8A8",
          600: "#009393",
          700: "#007D7D",
          800: "#006767",
          900: "#004D4D",
        },
        // Sky Scale
        sky: {
          50: "#F0F8FF",
          100: "#E0F2FE",
          200: "#BAE6FD",
          300: "#7DD3FC",
          400: "#38BDF8",
          500: "#2D8CFF",
          600: "#0EA5E9",
          700: "#0284C7",
          800: "#0369A1",
          900: "#075985",
        },
        // Neutrals
        neutral: {
          50: "#F8FBFF",
          100: "#F0F5FA",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1C2A39",
          900: "#0F1A27",
        },
        // Legacy support
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#0B5AA8",
          foreground: "hsl(var(--primary-foreground))",
        },
      },
      borderRadius: {
        xs: "4px",
        sm: "8px",
        DEFAULT: "12px",
        md: "16px",
        lg: "20px",
        xl: "24px",
        "2xl": "32px",
        "3xl": "40px",
        full: "9999px",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
        34: "8.5rem",
        38: "9.5rem",
      },
      fontFamily: {
        sans: ["var(--font-alexandria)", "sans-serif"],
        alexandria: ["var(--font-alexandria)", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["clamp(3rem, 8vw, 5rem)", { lineHeight: "1.1", fontWeight: "800" }],
        "display-xl": ["clamp(2.5rem, 6vw, 4rem)", { lineHeight: "1.15", fontWeight: "800" }],
        "display-lg": ["clamp(2.25rem, 5vw, 3.5rem)", { lineHeight: "1.2", fontWeight: "700" }],
      },
      boxShadow: {
        xs: "0 1px 2px rgba(11, 90, 168, 0.04)",
        sm: "0 2px 4px rgba(11, 90, 168, 0.06)",
        DEFAULT: "0 4px 8px rgba(11, 90, 168, 0.08)",
        md: "0 8px 16px rgba(11, 90, 168, 0.10)",
        lg: "0 12px 24px rgba(11, 90, 168, 0.12)",
        xl: "0 16px 32px rgba(11, 90, 168, 0.14)",
        "2xl": "0 24px 48px rgba(11, 90, 168, 0.16)",
        brand: "0 8px 24px rgba(11, 90, 168, 0.20)",
        accent: "0 8px 24px rgba(0, 168, 168, 0.20)",
        warmth: "0 8px 24px rgba(255, 138, 101, 0.20)",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        spin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(-25%)", animationTimingFunction: "cubic-bezier(0.8,0,1,1)" },
          "50%": { transform: "translateY(0)", animationTimingFunction: "cubic-bezier(0,0,0.2,1)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-out",
        slideUp: "slideUp 0.8s ease-out",
        scaleIn: "scaleIn 0.6s ease-out",
        shimmer: "shimmer 2s infinite linear",
        float: "float 3s ease-in-out infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        spin: "spin 1s linear infinite",
        bounce: "bounce 1s infinite",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '900': '900ms',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
