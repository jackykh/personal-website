/** @type {import('tailwindcss').Config} */
// tailwind.config.js
const { join } = require("path");
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
    },
  },
  plugins: [],
};
