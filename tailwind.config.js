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
        'cn-serif': ['"Noto Serif SC"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        lime: {
          fizz: '#D1FF4D',
          glow: '#E8FF85',
          pale: '#F4FFB8',
          mist: '#FAFFD6',
          deep: '#A8E600',
        },
        lemon: {
          light: '#FFF9C4',
          cream: '#FFFDE7',
          warm: '#FFF176',
          gold: '#FFD600',
        },
        forest: {
          DEFAULT: '#064E3B',
          light: '#047857',
          muted: '#0A7A5C',
          deep: '#022C22',
          ink: '#0D3B2E',
        },
        ink: {
          DEFAULT: '#1A1C1E',
          light: '#3A3C3E',
          muted: '#6B6D70',
        },
        brand: {
          DEFAULT: '#b9f56b',
        },
        sage: {
          50: '#F6FAF7',
          100: '#E8F0EA',
          200: '#D1E2D4',
          300: '#A3C4A9',
          400: '#6B9B74',
        },
      },
      fontSize: {
        'hero': ['4rem', { lineHeight: '0.92', letterSpacing: '-0.05em', fontWeight: '900' }],
        'hero-sm': ['2.75rem', { lineHeight: '0.95', letterSpacing: '-0.04em', fontWeight: '900' }],
        'title-lg': ['1.75rem', { lineHeight: '1.1', letterSpacing: '-0.035em', fontWeight: '800' }],
        'editorial-lg': ['1.125rem', { lineHeight: '1.65', letterSpacing: '0.005em', fontWeight: '400' }],
        'editorial-sm': ['0.8125rem', { lineHeight: '1.7', letterSpacing: '0.01em', fontWeight: '400' }],
        'micro': ['0.5625rem', { lineHeight: '1.4', letterSpacing: '0.08em', fontWeight: '500' }],
      },
      letterSpacing: {
        tightest: '-0.06em',
        display: '-0.04em',
        editorial: '0.005em',
        spread: '0.15em',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0, 0, 0, 0.06)',
        'glass-lg': '0 16px 48px rgba(0, 0, 0, 0.08)',
        'glass-xl': '0 24px 64px rgba(0, 0, 0, 0.10)',
        'glass-2xl': '0 32px 80px rgba(0, 0, 0, 0.12)',
        ambient: '0 4px 24px rgba(209, 255, 77, 0.15)',
        'ambient-lg': '0 8px 40px rgba(209, 255, 77, 0.20)',
        'ambient-xl': '0 16px 56px rgba(209, 255, 77, 0.25)',
        'inner-glow': 'inset 0 1px 2px rgba(255, 255, 255, 0.6)',
        'card-hover': '0 20px 60px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.04)',
        'editorial': '0 2px 40px rgba(6, 78, 59, 0.06)',
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
        'bubble-7': 'bubble-rise 13s ease-in 6s infinite',
        'bubble-8': 'bubble-rise 7s ease-in 0.5s infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-gentle': 'float-gentle 10s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 4s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
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
        'float-gentle': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-4px) rotate(1deg)' },
          '66%': { transform: 'translateY(-6px) rotate(-1deg)' },
        },
        'shimmer': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(209, 255, 77, 0.15)' },
          '50%': { boxShadow: '0 0 40px rgba(209, 255, 77, 0.3)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')]
}
