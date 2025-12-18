export const typography = {
  fontFamily: {
    graphik: "'Graphik LC Web', sans-serif",
    inter: "'Inter', sans-serif",
  },
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '9px': '0.5625rem', // 9px (for labels)
    '13px': '0.8125rem', // 13px
  },
  lineHeight: {
    tight: '1.2',
    normal: '1.5',
    relaxed: '1.75',
    '17px': '1.0625rem',
    '24px': '1.5rem',
    '29px': '1.8125rem',
  },
  fontWeight: {
    normal: '400',
    semibold: '600',
    bold: '700',
  },
} as const;

