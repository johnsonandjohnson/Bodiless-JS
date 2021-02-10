module.exports = {
  siteMetadata: {
    title: 'Canvas-X',
  },
  flags: {
    DEV_SSR: false,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-compile-es6-packages',
      options: {
        modules: ['gatsby-theme-bodiless'],
      },
    },
    'gatsby-plugin-root-import',
  ],
  __experimentalThemes: ['gatsby-theme-bodiless'],
};
