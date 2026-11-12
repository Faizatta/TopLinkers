/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0F2A44',
          dark: '#091c2f',
          light: '#173f67'
        },
        cyan: {
          DEFAULT: '#16B4E8',
          hover: '#119ecf',
          light: '#e8f7fd'
        },
        brandGreen: '#6CC24A',
        brandRed: '#E53935',
        sectionAlt: '#F6F8FA'
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Manrope', 'system-ui', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'sans-serif']
      },
      maxWidth: {
        container: '1280px',
      },
      animation: {
        marquee: 'marquee var(--duration, 40s) linear infinite',
        'marquee-reverse': 'marquee-reverse var(--duration, 40s) linear infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0%)' },
          to: { transform: 'translateX(-50%)' }
        },
        'marquee-reverse': {
          from: { transform: 'translateX(-50%)' },
          to: { transform: 'translateX(0%)' }
        }
      },
      borderRadius: {
        button: '4px',
        card: '6px',
      },
      boxShadow: {
        card: '0 4px 20px -2px rgba(15, 42, 68, 0.08)',
        hover: '0 12px 30px -4px rgba(15, 42, 68, 0.15)',
        popup: '0 10px 35px -5px rgba(0, 0, 0, 0.25)'
      }
    },
  },
  plugins: [],
}
