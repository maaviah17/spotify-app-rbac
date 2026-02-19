/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg:      '#080c0a',
        surface: '#0e1411',
        border:  '#1a2420',
        green:   '#2dd87a',
        'green-light': '#56e896',
        'green-dark':  '#1faa5e',
        lime:    '#a8f542',
        'lime-dim':    '#7ab82e',
        text:    '#ecf5f0',
        muted:   '#5e7a6a',
      },
      fontFamily: {
        head: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(28px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to:   { opacity: 1 },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        pulse2: {
          '0%,100%': { opacity: 1, transform: 'scale(1)' },
          '50%':     { opacity: 0.4, transform: 'scale(0.7)' },
        },
        wave: {
          from: { transform: 'scaleY(1)' },
          to:   { transform: 'scaleY(0.2)' },
        },
      },
      animation: {
        'fade-up':  'fadeUp 0.7s ease forwards',
        'fade-in':  'fadeIn 0.9s ease forwards',
        'marquee':  'marquee 28s linear infinite',
        'pulse2':   'pulse2 2s ease-in-out infinite',
        'wave':     'wave 1.2s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}
