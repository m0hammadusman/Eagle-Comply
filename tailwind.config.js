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
          deep: '#091F5C',
          royal: '#334DAF',
          steel: '#7096D1',
          ice: '#D0E4FE',
          frost: '#E8F2FE',
          light: '#F9FBFF',
          navy: '#091F5C',
          'navy-light': '#122D7A',
          'navy-dark': '#040E29',
          accent: '#334DAF',
          'accent-light': '#7096D1',
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
