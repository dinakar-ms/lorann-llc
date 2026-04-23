import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50: "#E4EDFF",
          100: "#CDDCFE",
          200: "#A9C2FD",
          300: "#7FA2FB",
          400: "#4F7DF5",
          500: "#2F5DEC",
          600: "#1D45D9",
          700: "#1736B3",
          800: "#162D8C",
          900: "#13256E",
          950: "#0C1847",
        },
        cyan: {
          300: "#6FD3FF",
          400: "#22BFFF",
          500: "#00A7EF",
          600: "#008AC7",
        },
        navy: {
          900: "#080F24",
          950: "#03061A",
        },
        slate: {
          50: "#F0F5FF",
          100: "#E6EEFB",
          150: "#D6E2F5",
          200: "#C1D1EC",
          300: "#9BAED2",
          400: "#6B82AB",
          500: "#485F89",
          600: "#2E456B",
          700: "#1F3250",
          800: "#15253E",
          900: "#0B172B",
        },
        bg: {
          base: "#DCE8FF",
          deep: "#C6D8FD",
          accent: "#B8CCFC",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        sm: "10px",
        DEFAULT: "16px",
        lg: "22px",
        xl: "32px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(12, 24, 71, 0.06), 0 1px 3px rgba(12, 24, 71, 0.08)",
        md: "0 4px 8px rgba(12, 24, 71, 0.06), 0 10px 24px -6px rgba(12, 24, 71, 0.14)",
        lg: "0 18px 40px -10px rgba(29, 69, 217, 0.28), 0 4px 12px rgba(12, 24, 71, 0.1)",
        xl: "0 30px 60px -15px rgba(29, 69, 217, 0.35), 0 8px 20px rgba(12, 24, 71, 0.12)",
        brand: "0 14px 34px -8px rgba(29, 69, 217, 0.55)",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-dot": "pulse-dot 1.5s ease-in-out infinite",
        "pulse-expand": "pulse-expand 4s ease-out infinite",
        "grad-shift": "grad-shift 6s ease infinite",
        "scroll-x": "scroll-x 40s linear infinite",
        "fade-slide": "fade-slide 0.9s ease forwards",
        "line-reveal": "line-reveal 1.1s ease forwards",
        "announce-slide": "announce-slide 8s ease infinite",
        "orb-float-1": "orb-float-1 12s ease-in-out infinite",
        "orb-float-2": "orb-float-2 14s ease-in-out infinite",
        "orb-float-3": "orb-float-3 16s ease-in-out infinite",
        "pulse-glow": "pulse-glow 6s ease-in-out infinite",
        "hex-shift": "hex-shift 25s linear infinite",
        "scan-beam": "scan-beam 6s ease-in-out infinite",
        "grid-drift": "grid-drift 30s linear infinite",
        "particle-rise": "particle-rise 10s linear infinite",
        "sheen": "sheen 8s ease-in-out infinite",
        "line-pulse": "line-pulse 4s linear infinite",
        "packet-travel": "packet-travel 3s linear infinite",
        "bar-flicker": "bar-flicker 3s ease-in-out infinite",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        "pulse-expand": {
          "0%": { width: "30%", height: "30%", opacity: "0.8" },
          "100%": { width: "100%", height: "100%", opacity: "0" },
        },
        "grad-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "scroll-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "fade-slide": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "line-reveal": {
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "announce-slide": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "orb-float-1": {
          "0%, 100%": { transform: "translate(0, 0)", opacity: "0.5" },
          "50%": { transform: "translate(60px, 40px)", opacity: "0.8" },
        },
        "orb-float-2": {
          "0%, 100%": { transform: "translate(0, 0)", opacity: "0.4" },
          "50%": { transform: "translate(-50px, -30px)", opacity: "0.7" },
        },
        "orb-float-3": {
          "0%, 100%": { transform: "translate(-50%, -50%) scale(1)", opacity: "0.3" },
          "50%": { transform: "translate(-50%, -50%) scale(1.2)", opacity: "0.5" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.7", transform: "translate(-50%, -50%) scale(1)" },
          "50%": { opacity: "1", transform: "translate(-50%, -50%) scale(1.15)" },
        },
        "hex-shift": {
          from: { backgroundPosition: "0 0, 0 0" },
          to: { backgroundPosition: "120px 208px, -120px 208px" },
        },
        "scan-beam": {
          "0%, 100%": { top: "-50%", opacity: "0" },
          "50%": { top: "100%", opacity: "1" },
        },
        "grid-drift": {
          from: { backgroundPosition: "0 0, 0 0" },
          to: { backgroundPosition: "96px 96px, -96px 96px" },
        },
        "particle-rise": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(-100vh)", opacity: "0" },
        },
        "sheen": {
          "0%, 100%": { transform: "translateX(-100%)", opacity: "0" },
          "50%": { transform: "translateX(100%)", opacity: "1" },
        },
        "line-pulse": {
          "0%": { backgroundPosition: "-50% 0" },
          "100%": { backgroundPosition: "150% 0" },
        },
        "packet-travel": {
          "0%": { left: "10%", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { left: "90%", opacity: "0" },
        },
        "bar-flicker": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
