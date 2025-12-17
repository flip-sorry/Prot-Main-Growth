/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f7f4f2',
        'text-dark': '#181818',
        'text-light': '#474747',
        'text-lighter': '#767676',
        'status-orange': '#ff9045',
        'workspace-accent': '#fddcbd',
        'border-light': 'rgba(118, 118, 118, 0.16)',
      },
      fontFamily: {
        'graphik': ['Graphik LC Web', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'nav': '0px 0px 1px 0px rgba(47,47,47,0.04), 0px 1px 4px 0px rgba(47,47,47,0.12)',
      },
    },
  },
  plugins: [],
}

