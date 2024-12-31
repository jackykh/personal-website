/** @type {import('tailwindcss').Config} */
// tailwind.config.js
const { join } = require("path");
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
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
      gridTemplateColumns: {
        // auto-fit columns
        "autofit-20": "repeat(auto-fit, minmax(20rem, 1fr))",
      },
      screens: {
        print: { raw: "print" }
      },
    },
  },
  plugins: [
    addVariablesForColors
  ],
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