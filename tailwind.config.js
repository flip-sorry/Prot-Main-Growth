import { colors, typography, shadows } from './src/tokens/index';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Text sizes
    'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl',
    'text-[9px]', 'text-[13px]',
    // Responsive text sizes
    'md:text-2xl',
    // Line heights
    'leading-tight', 'leading-normal', 'leading-relaxed',
    'leading-[17px]', 'leading-[24px]', 'leading-[29px]',
    // Responsive line heights
    'md:leading-[29px]',
    // Font weights
    'font-normal', 'font-semibold', 'font-bold',
  ],
  theme: {
    extend: {
      colors: {
        background: colors.background.base,
        'text-dark': colors.text.dark,
        'text-light': colors.text.light,
        'text-lighter': colors.text.lighter,
        'status-orange': colors.status.orange,
        'workspace-accent': colors.workspace.accent,
        'border-light': colors.border.light,
        primary: colors.primary,
        text: colors.text,
        status: colors.status,
        workspace: colors.workspace,
        border: colors.border,
        interactive: colors.interactive,
        avatar: colors.avatar,
      },
      fontFamily: {
        'graphik': typography.fontFamily.graphik.split(',').map(f => f.trim().replace(/'/g, '')),
        'inter': typography.fontFamily.inter.split(',').map(f => f.trim().replace(/'/g, '')),
      },
      boxShadow: {
        'nav': shadows.nav,
      },
    },
  },
  plugins: [],
}

