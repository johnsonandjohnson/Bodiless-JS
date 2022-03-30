module.exports = {
  purge: [
    './lib/**/!(*.d).{ts,js,jsx,tsx}',
  ],
  theme: {
    screens: {
      md: '768px',
      lg: '1025px',
      xl: '1921px',
    },
    // Colors are used in styleguide.
    colors: {
      red: '#FF0000',
      green: '#00FF00',
      blue: '#0000FF',
      orange: '#FFA500',
    },
    maxWidth: {
      20: '5rem',
      28: '7rem',
      48: '12rem',
      56: '14rem',
      64: '16rem',
      screen: '100vw',
    },
    extend: {
      margin: {
        'negative-half-screen': '-50vw',
        'site-percent': '5%',
        'md-site-percent': '8%',
        'lg-site-percent': '8%',
      },
    },
  },
  variants: {
    backgroundColor: ['first', 'last', 'responsive'],
    margin: ['first', 'last', 'responsive'],
    padding: ['first', 'last', 'responsive'],
    width: ['first', 'last', 'responsive'],
  },
};
