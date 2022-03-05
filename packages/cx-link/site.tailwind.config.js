const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: [
    './lib/**/!(*.d).{ts,js,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        linkicons: ['linkicons'],
      },
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        '@font-face': {
          fontFamily: 'linkicons',
          fontWeight: 400,
          fontStyle: 'normal',
          src: 'url(\'@bodiless/cx-link/assets/font/linkicons.woff2\')',
        },
      });
    }),
    plugin(({ addUtilities }) => {
      addUtilities(
        {
          '.cx-download-link::after': {
            content: '"\\e800"',
            'font-family': '"linkicons"',
            'text-decoration': 'none',
            'line-height': '1rem',
            'vertical-align': 'text-top',
            'margin-left': '.25rem',
            display: 'inline-block',
          },
          '.cx-external-link::after': {
            content: '"\\e801"',
            'font-family': '"linkicons"',
            'font-style': 'normal',
            'line-height': '1rem',
            'text-decoration': 'none',
            'text-transform': 'none',
            'vertical-align': 'text-top',
            'margin-left': '.25rem',
            display: 'inline-block',
          },
        }
      );
    }),
  ],
};
