const express = require('express');
// Gatsby plugins list.
const plugins = [
  'gatsby-plugin-root-import',
  '@bodiless/gatsby-theme-bodiless',
  {
    resolve: 'gatsby-plugin-compile-es6-packages',
    options: {
      modules: ['@bodiless/gatsby-theme-bodiless'],
    },
  },
  {
    resolve: 'gatsby-plugin-canonical-urls',
    options: {
      // Set the siteUrl to the absolute production url i.e. https://example.com
      siteUrl: '/',
    },
  },
  {
    resolve: 'gatsby-plugin-sitemap',
  },
];

module.exports = {
  developMiddleware: app => {
    app.use('/___docs', express.static('doc'));
  },
  siteMetadata: {
    title: 'BodilessJS Starter',
    logo: '/images/bodiless_logo.png',
    siteUrl: 'https://example.com',
  },
  plugins,
};
