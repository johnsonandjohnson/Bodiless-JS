const express = require('express');

const tailwindThemeEnabled = (process.env.BODILESS_TAILWIND_THEME_ENABLED || '1') === '1';

module.exports = {
  developMiddleware: app => {
    app.use('/___docs', express.static('doc'));
  },
  siteMetadata: {
    title: 'BodilessJS Starter',
    logo: '/images/bodiless_logo.png',
  },
  plugins: [
    'gatsby-plugin-root-import',
    '@bodiless/gatsby-theme-bodiless',
    {
      resolve: 'gatsby-plugin-compile-es6-packages',
      options: {
        modules: ['@bodiless/gatsby-theme-bodiless'],
      },
    },
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [
          // eslint-disable-next-line global-require
          ...(tailwindThemeEnabled ? [require('tailwindcss')('./tailwind.config.js')] : []),
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-purgecss',
      options: {
        tailwind: true,
        purgeOnly: ['src/css/style.css'],
      },
    },
  ],
};
