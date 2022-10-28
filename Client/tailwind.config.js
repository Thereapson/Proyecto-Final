/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E90FF"
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
