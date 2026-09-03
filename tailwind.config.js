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
          red: '#E31F1F',
          primary: '#E31F1F',
          crimson: '#E31F1F',
          royal: '#E31F1F',
          accent: '#FF3333',
          vibrant: '#FF3333',
          bordeaux: '#560101',
          deep: '#560101',
          pink: '#FFBEBE',
          ice: '#FCE8E8',
          frost: '#F5F3F2',
          light: '#FFFFFF',
          sokinBlack: '#131313',
          navy: '#131313',
          'navy-light': '#262626',
          'navy-dark': '#030303',
          'accent-light': '#FF3333',
        },
        neutral: {
          pureblack: '#000000',
          sokinBlack: '#131313',
          charcoal: '#1E1E1E',
          darkslate: '#262626',
          muted: '#7D797A',
          border: '#E4E4E4',
          canvas: '#F5F3F2',
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
      borderRadius: {
        'sokin': '2rem',
        'sokin-pill': '99999px',
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
