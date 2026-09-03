/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          crimson: '#DD2A40',
          primary: '#DD2A40',
          royal: '#DD2A40',
          accent: '#FF3333',
          vibrant: '#FF3333',
          deep: '#BA1B30',
          steel: '#FF6666',
          ice: '#FEEAEA',
          frost: '#F8F9FA',
          light: '#FFFFFF',
          navy: '#111111',
          'navy-light': '#22252A',
          'navy-dark': '#000000',
          'accent-light': '#FF3333',
        },
        neutral: {
          pureblack: '#000000',
          charcoal: '#111111',
          darkslate: '#22252A',
          muted: '#667085',
          border: '#E4E7EC',
          canvas: '#F8F9FA',
          white: '#FFFFFF',
        },
        surface: {
          base: 'var(--color-surface-base)',
          raised: 'var(--color-surface-raised)',
          subtle: 'var(--color-surface-subtle)',
          border: 'var(--color-surface-border)',
        }
      },
      fontFamily: {
        serif: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        arabic: ['Amiri', 'Noto Sans Arabic', 'sans-serif']
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};
