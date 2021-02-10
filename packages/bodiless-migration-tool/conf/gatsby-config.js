module.exports = {
  siteMetadata: {
    title: 'Canvas-X',
  },
  flags: {
    PRESERVE_FILE_DOWNLOAD_CACHE: false,
    PRESERVE_WEBPACK_CACHE: false,
    FAST_DEV: false,
    FAST_REFRESH: false,
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
