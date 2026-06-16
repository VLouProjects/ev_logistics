import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0B1220",
        surface: "#111A2E",
        surface2: "#16213A",
        border: "#1F2A44",
        primary: "#00E5A8",
        secondary: "#3ABEFF",
        warning: "#FFB020",
        danger: "#FF4D4F"
      }
    }
  },
  plugins: []
};

export default config;