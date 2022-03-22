module.exports = {
  purge: [
    './lib/**/!(*.d).{ts,js,jsx,tsx}',
  ],
  theme: {
    maxWidth: {
      48: '12rem',
      56: '14rem',
    }
  },
  variants: {
    borderWidth: ['first', 'last', 'responsive'],
    margin: ['first', 'last', 'responsive'],
    overflow: ['focus', 'hover', 'responsive'],
    position: ['focus', 'hover', 'responsive'],
    padding: ['first', 'last', 'responsive'],
  },
};
