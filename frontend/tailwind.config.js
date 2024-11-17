/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Make sure bg-green-500 is available in your theme
        green500: '#B2D2A4', // This is the same value as bg-green-500
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      addUtilities({
        '.text-shadow-green': {
          textShadow: `1px 1px 3px ${theme('colors.green500')}`, // Using the green color from the theme
        },
      });
    },
  ],
}

