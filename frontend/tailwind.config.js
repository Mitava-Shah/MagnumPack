/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        accent1: 'var(--accent1-color)',
        accent2: 'var(--accent2-color)',
      },
      fontFamily: {
        openSans: ['Outfit', 'sans-serif'],
        cursive: ['Shadows Into Light Two', 'cursive'],
      },
      animation: {
        spinner: 'spinner 20s linear infinite',
        slideUpFadeIn: 'slideUpFadeIn 1s ease-out',
      },
      keyframes: {
        spinner: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        slideUpFadeIn: {
          '0%': {
            transform: 'translateY(40px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
      },
    },
  },
  plugins: [], // Ensure this is correctly placed outside the theme object
}
