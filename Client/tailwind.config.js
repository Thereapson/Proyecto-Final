/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#b93eed",
        secondary: "#f9f9f9",
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
