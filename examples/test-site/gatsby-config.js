const express = require('express');

const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `.env.${activeEnv}`,
});

// Gatsby plugins list.
const plugins = [
  {
    resolve: 'gatsby-plugin-compile-es6-packages',
    options: {
      modules: ['@bodiless/gatsby-theme-bodiless'],
    },
  },
  '@bodiless/gatsby-theme-bodiless',
  '@bodiless/gatsby-plugin-ssi',
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

const robotsTxtPolicy = [
  {
    userAgent: '*',
    allow: '/',
  },
];
process.env.ROBOTSTXT_POLICY = JSON.stringify(robotsTxtPolicy);

module.exports = {
  developMiddleware: app => {
    app.use('/___docs', express.static('doc'));
  },
  siteMetadata: {
    siteUrl: 'https://www.example.com',
    title: 'BodilessJS',
    logo: '/images/bodiless_logo.png',
  },

  plugins,
};
