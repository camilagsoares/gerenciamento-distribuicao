/** @type {import('tailwindcss').Config} */
module.exports = {
  ccontent: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#0DE64A",
        "light-white": "rgba(255,255,255,0.17)",
      },
    },
  },
  plugins: [],
}

