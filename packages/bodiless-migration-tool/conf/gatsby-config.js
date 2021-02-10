module.exports = {
  siteMetadata: {
    title: 'Canvas-X',
  },
  flags: {
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
    PRESERVE_WEBPACK_CACHE: true,
    FAST_DEV: true,
    FAST_REFRESH: true,
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
