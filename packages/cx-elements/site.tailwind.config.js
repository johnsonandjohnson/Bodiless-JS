const tailwindcssDir = require('tailwindcss-dir')();

module.exports = {
  purge: [
    './lib/**/!(*.d).{ts,js,jsx,tsx}',
  ],
  theme: {
    fontSize: {
      xs: ['0.75rem', '1.125rem'],
      sm: ['0.875rem', '1.25rem'],
      base: ['1rem', '1.375rem'],
      lg: ['1.75rem', '1.875rem'],
      xl: ['1.625rem', '2rem'],
      '2xl': ['2rem', '2.25rem'],
      '3xl': ['2.563rem', '2.813rem'],
      'm-xs': ['0.688rem', '0.938rem'],
      'm-sm': ['0.75rem', '1rem'],
      'm-base': ['0.875rem', '1.125rem'],
      'm-lg': ['1.125rem', '1.375rem'],
      'm-xl': ['1.438rem', '1.625rem'],
      'm-2xl': ['1.813rem', '2.125rem'],
      'm-3xl': ['2.25rem', '2.5rem'],
    },
    colors: {
      'cx-primary': {
        brand: '#CA081B',
        'card-bg': '#ffffff',
        'page-bg': '#F4F4F4',
        interactive: '#000099',
        'interactive-active': '#000341',
        divider: '#D8D8D8',
        'body-copy': '#63666A',
        'header-copy': '#212121',
        'footer-copy': '#FFFFFF',
      },
      'cx-secondary': {
        eyebrow: '#CC0099',
        'footer-bg': '#2B2B33',
      },
    },
    extend: {
      fontFamily: {
        DMSans: ['DM Sans', 'sans-serif'],
      },
      margin: {
        4.5: '1.125rem',
        5.75: '1.438rem',
        'site-percent': '5%',
        'md-site-percent': '8%',
      },
      padding: {
        'site-percent': '5%',
        'md-site-percent': '8%',
      },
    },
  },
  variants: {
    extend: {
      textColor: ['active'],
    }
  },
  plugins: [
    tailwindcssDir,
  ],
};
