/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          bg: "#0a0a0c",
          panel: "#141419",
          panel2: "#1b1b22",
          border: "#2a2a33",
          muted: "#9a9aa5",
        },
        accent: {
          DEFAULT: "#ccff00",
          dark: "#a6d600",
        },
      },
      fontFamily: {
        display: ["Oswald", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      borderRadius: {
        card: "10px",
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [],
};
