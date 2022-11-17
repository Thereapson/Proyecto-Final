/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: "#EE6C4D",
        secondary: "#98c1d9",
        darkMode: "#293241",
        lightMode: "#e0fbfc",
        tertiary: "#3d5a80",
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
