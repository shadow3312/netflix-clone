/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'netflix-black': '#01060C',
        'netflix-red': '#D81F26',
      },
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
}
