/** @type {import('tailwindcss').Config} */


module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        softBlue: "#6FA3EF", // buttons, headers
        gentleGreen: "#A2D9B1", // Secondary buttons, success indicators, highlights
        softGreen: "#84C7A3", // Darker green for hover
        softWhite: "#F7F8FA", // Background color, main content areas
        darkGray: "#2C2C2C", // text
        lightGray: "#D1D3D8", // Input fields, borders, secondary UI elements
        warmAmber: "#FFB03B", // Alerts, warnings, notification messages
        softLavender: "#B9AEDC", // Accents, icons, secondary highlights
      },
    },
  },
  plugins: [],
};
