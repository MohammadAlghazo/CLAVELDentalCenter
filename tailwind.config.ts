import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-green": "#1B4332",
        "brand-green-hover": "#2D6A4F",
        "brand-gold": "#C9A96E",
        "brand-beige": "#F5F0E8",
        "brand-gray": "#4A4A4A",
        "brand-card": "rgba(27,67,50,0.05)",
      },
      fontFamily: {
        cairo: ["Cairo", "sans-serif"],
      },
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-in-up": "fadeInUp 0.7s ease-out forwards",
        "fade-in-down": "fadeInDown 0.7s ease-out forwards",
        "counter": "counter 2s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        "card": "0 4px 20px rgba(27, 67, 50, 0.08)",
        "card-hover": "0 8px 40px rgba(27, 67, 50, 0.16)",
        "nav": "0 2px 20px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
