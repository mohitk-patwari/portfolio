const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zinc: colors.zinc,
        slate: colors.slate,
        primary: '#3b82f6',
        background: 'rgb(var(--color-background) / <alpha-value>)',
        text: 'rgb(var(--color-foreground) / <alpha-value>)',
      },
      backgroundImage: {
        'grid-subtle':
          'linear-gradient(to right, rgb(113 113 122 / 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgb(113 113 122 / 0.12) 1px, transparent 1px)',
        'radial-fade':
          'radial-gradient(circle at top center, rgb(59 130 246 / 0.14), transparent 55%)',
      },
      backgroundSize: {
        grid: '28px 28px',
      },
    },
  },
  plugins: [],
};
