/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        blue: "#406aff",
        "deep-blue": "#010026",
        "dark-grey": "#757575",
        "gray-20": "#F8F4EB",
      },
      backgroundImage: (theme) => ({
        "gradient-rainbow":
          "linear-gradient(81.66deg, #00b5ee 7.21%, #ff45a4 45.0.5%, #ffba00 78.07%)",
        "gradient-rainblue":
          "linear-gradient(92.23deg, #406aff 21.43%, #3bace2 50.63%)",
        black: "#010026",
      }),
      fontFamily: {
        itim: ["Itim_400Regular", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      sm: "768px",
      md: "1060px",
    },
  },
  plugins: [],
};
