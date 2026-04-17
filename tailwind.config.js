/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        lime: {
          fizz: '#D1FF4D',
          glow: '#E8FF85',
          pale: '#F4FFB8',
          mist: '#FAFFD6',
        },
        lemon: {
          light: '#FFF9C4',
          cream: '#FFFDE7',
          warm: '#FFF176',
        },
        forest: {
          DEFAULT: '#064E3B',
          light: '#047857',
          muted: '#0A7A5C',
        },
      },
      letterSpacing: {
        tightest: '-0.06em',
        display: '-0.04em',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0, 0, 0, 0.06)',
        'glass-lg': '0 16px 48px rgba(0, 0, 0, 0.08)',
        'glass-xl': '0 24px 64px rgba(0, 0, 0, 0.10)',
        ambient: '0 4px 24px rgba(209, 255, 77, 0.15)',
        'ambient-lg': '0 8px 40px rgba(209, 255, 77, 0.20)',
        'inner-glow': 'inset 0 1px 2px rgba(255, 255, 255, 0.6)',
      },
      backdropBlur: {
        xs: '4px',
        '2xl': '24px',
        '3xl': '40px',
      },
      animation: {
        'bubble-1': 'bubble-rise 8s ease-in infinite',
        'bubble-2': 'bubble-rise 12s ease-in 2s infinite',
        'bubble-3': 'bubble-rise 10s ease-in 4s infinite',
        'bubble-4': 'bubble-rise 14s ease-in 1s infinite',
        'bubble-5': 'bubble-rise 9s ease-in 3s infinite',
        'bubble-6': 'bubble-rise 11s ease-in 5s infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 4s ease-in-out infinite',
      },
      keyframes: {
        'bubble-rise': {
          '0%': { transform: 'translateY(100%) scale(0.4)', opacity: '0' },
          '10%': { opacity: '0.6' },
          '50%': { opacity: '0.3' },
          '100%': { transform: 'translateY(-120%) scale(1)', opacity: '0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'shimmer': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')]
}
