/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Corrected from 'content' to 'purge'
  theme: {
    container: {
      center: true,
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1440px",
      },
    },
    "border-2": {
      "border-width": "2px",
    },
    extend: {
      colors: {
        fgreen: "#C4EAD7",
      },
    },
  },
  plugins: [],
};
