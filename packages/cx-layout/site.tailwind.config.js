module.exports = {
  purge: [
    './lib/**/!(*.d).{ts,js,jsx,tsx}',
  ],
  theme: {
    maxWidth: {
      48: '12rem',
      56: '14rem',
    }
  }
};
