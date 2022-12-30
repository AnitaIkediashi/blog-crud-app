/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      Unbounded: ['Unbounded', 'cursive'],
      Josefin: ['Josefin Sans', 'sans-serif']
    },
    extend: {
      colors: {
        'color-gray-100': '#f1f6f6',
        'color-gray-200': '#dde4e5',
        'color-gray-300': '#a6ada4',
        'color-gray-400': '#34382c'
      },
      screens: {
        'sm': '480px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1200px'
      }
    },
  },
  plugins: [],
};
