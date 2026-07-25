/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: "#14161B",
        surface: "#1C1F26",
        surfaceRaised: "#232730",
        border: "#2A2E37",
        textPrimary: "#EDEEF0",
        textMuted: "#9AA0AC",
        teal: { DEFAULT: "#35B0A7" },
        amber: { DEFAULT: "#E3A008" },
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};