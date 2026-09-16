/** @type {import('tailwindcss').Config} */
// tailwind.config.js
const { join } = require("path");
const defaultTheme = require("tailwindcss/defaultTheme");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

module.exports = {
  content: [
    join(__dirname, "./pages/**/*.{js,ts,jsx,tsx}"),
    join(__dirname, "./Components/**/*.{js,ts,jsx,tsx}"),
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FAF9F4",
        ink: "#1B1A17",
        soft: "#57544C",
        muted: "#8B877C",
        line: "#E4E1D7",
        accent: "#3E5C49",
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "PingFang TC",
          "PingFang SC",
          "Noto Sans TC",
          ...defaultTheme.fontFamily.sans,
        ],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
        display: [
          "var(--font-display)",
          "var(--font-sans)",
          ...defaultTheme.fontFamily.sans,
        ],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
      gridTemplateColumns: {
        // auto-fit columns
        "autofit-20": "repeat(auto-fit, minmax(20rem, 1fr))",
      },
      screens: {
        print: { raw: "print" },
      },
    },
  },
  plugins: [addVariablesForColors],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
