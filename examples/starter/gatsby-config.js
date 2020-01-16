const express = require('express');

module.exports = {
  developMiddleware: app => {
    app.use('/___docs', express.static('doc'));
  },
  siteMetadata: {
    title: 'BodilessJS Starter',
    logo: '/images/bodiless_logo.png',
  },
  plugins: [
    '@bodiless/gatsby-theme-bodiless',
    {
      resolve: 'gatsby-plugin-compile-es6-packages',
      options: {
        modules: ['@bodiless/gatsby-theme-bodiless'],
      },
    },
  ],
};
