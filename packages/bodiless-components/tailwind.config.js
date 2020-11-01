module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
    './src/**/!(*.d).{ts,js,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
