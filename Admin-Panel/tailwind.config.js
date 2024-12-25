/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'primary': "#5f6FFF",
      'white': "#FFF",
      ...colors,
        // or add them one by one and name whatever you want
        amber: colors.amber,
        emerald: colors.emerald,
    },
    gridTemplateColumns:{
      'auto': 'repeat(auto-fill, minmax(200px, 1fr))'
    }
  },
  plugins: [],
}