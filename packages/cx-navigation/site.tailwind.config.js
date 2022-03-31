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
    padding: ['first', 'last', 'responsive'],
  },
};
