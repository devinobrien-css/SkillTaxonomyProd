const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  // important: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        signature: "#0C4B5F",
        signature_light: "#0D5F79",
        black_rgba: 'rgba(0, 0, 0, 0.54)',
        bg_lightgray: '#f1f1f1',
        sky: colors.sky,
        teal: colors.teal,
        rose: colors.rose,
		'bg-dark': '#1F2938',
		'bg-med': '#E5E7EB',
		'bg-light': '#F1F1F1',
		'font-light': '#B4B9BF',
		'font-dark': '#4B5563',
		'borders': '#D1D5DB',
      },
      screens: {
        'xs': '520px',
        '3xl': '1800px',
        '4xl': '2400px',
        '5xl': '3000px',
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        '16': 'repeat(16, minmax(0, 1fr))',
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
    },
  ]
  // ...
}