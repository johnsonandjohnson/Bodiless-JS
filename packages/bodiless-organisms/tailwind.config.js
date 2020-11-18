module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
    './src/**/!(*.d).{ts,js,jsx,tsx}',
  ],
  theme: {
    aspectRatio: { // defaults to {}
      none: 0,
      square: [1, 1],
      '16/9': [16, 9],
      '4/3': [4, 3],
      '21/9': [21, 9],
    },

    extend: {
      width: {
        content: 'max-content',
      },
      minWidth: {
        full: '100%',
      },
    },
  },
  variants: {
    overflow: ['responsive', 'hover', 'focus'],
    position: ['responsive', 'hover', 'focus'],
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    // eslint-disable-next-line
    require('tailwindcss-aspect-ratio'),
  ],
};
