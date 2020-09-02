// tailwind.config.js
module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: [
    // Use *.tsx if using TypeScript
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("@tailwindcss/typography")],
  // ...
};
