import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0B0C',
        surface: '#121214',
        'surface-raised': '#16181B',
        border: '#202124',
        'text-primary': '#F5F5F7',
        'text-secondary': '#9A9CA3',
        'text-tertiary': '#6B6D74',
        'accent-emerald': '#34D399',
        'accent-crimson': '#F87171',
        'accent-blue': '#5E9EFF',
      },
      fontFamily: {
        sans: ['var(--font-geist)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      borderRadius: {
        'sm': '12px',
        'md': '16px',
        'lg': '20px',
        'xl': '24px',
      },
      boxShadow: {
        'card': '0 8px 30px rgba(0,0,0,0.35)',
        'card-hover': '0 16px 40px rgba(0,0,0,0.45)',
        'glass': '0 4px 24px rgba(0,0,0,0.25)',
      },
      animation: {
        'shimmer': 'shimmer 1.5s infinite',
        'gradient': 'gradient 20s ease infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
export default config
