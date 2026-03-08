import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal:      "#2ABFBF",
          tealDark:  "#1F9999",
          tealLight: "#E6F9F9",
          navy:      "#0F2A3C",
          slate:     "#4A6070",
          light:     "#F0F7F7",
          white:     "#FFFFFF",
          gray:      "#F0F4F4",
          muted:     "#8A9BAA",
          border:    "#D8E4E4",
        },
      },
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        body:    ["'DM Sans'", "sans-serif"],
      },
      fontSize: {
        "2xs": "0.65rem",
      },
      boxShadow: {
        card:      "0 4px 24px rgba(42,191,191,0.08)",
        cardHover: "0 8px 40px rgba(42,191,191,0.16)",
        soft:      "0 2px 16px rgba(15,42,60,0.07)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease both",
        "fade-in": "fadeIn 0.4s ease both",
      },
    },
  },
  plugins: [],
};

export default config;
