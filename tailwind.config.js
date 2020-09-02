// tailwind.config.js
module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: [
    // Use *.tsx if using TypeScript
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("@tailwindcss/typography")],
  // ...
};
