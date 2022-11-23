/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
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
