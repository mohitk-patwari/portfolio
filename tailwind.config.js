/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      screens: {
        '2xl': '72rem',
      },
    },
    extend: {
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        sapphire: '#0a1628',
        royal: '#0d2d52',
        glow: '#122a4a',
        lemon: '#e6d44a',
        tealcyber: '#3dd6c8',
        rust: '#c9593a',
        butter: '#f0e6c8',
        cyan: '#a8f0f0',
        borderline: '#1e4976',
        dimwhite: '#ffffff18',
      },
      animation: {
        flicker: 'flicker 4s infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        scanline: 'scanline 8s linear infinite',
      },
      keyframes: {
        flicker: {
          '0%, 95%, 100%': { opacity: '1' },
          '96%': { opacity: '0.4' },
          '97%': { opacity: '1' },
          '98%': { opacity: '0.2' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      backgroundImage: {
        'subtle-grid': 'radial-gradient(circle at 1px 1px, rgb(100 116 139 / 0.16) 1px, transparent 0)',
      },
      backgroundSize: {
        grid: '24px 24px',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'ease-in-out',
      },
    },
  },
  plugins: [],
};
