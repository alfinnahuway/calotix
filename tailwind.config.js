/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "node_modules/slick-carousel/slick/slick.css",
    "node_modules/slick-carousel/slick/slick-theme.css",
  ],
  theme: {
    extend: {
      fontFamily: {
        jose: ["Josefin Sans", "sans-serif"],
      },
      colors: {
        heroblack: "#202020ab",
      },
      screens: {
        sm: "480px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 1024px) { ... }

        lg: "1024px",
        // => @media (min-width: 1280px) { ... }
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          md: "2rem",
          lg: "3rem",
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
