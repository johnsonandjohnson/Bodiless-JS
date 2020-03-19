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

/**
 * Google Tag Manager plugin.
 */
plugins.push({
  resolve: 'gatsby-plugin-google-tagmanager',
  options: {
    id: process.env.GOOGLE_TAGMANAGER_ID || 'GTM-XXXXXXX',
    // datalayer to be set before GTM is loaded
    // should be an object or a function that is executed in the browser
    // Defaults to null
    defaultDataLayer: { platform: 'gatsby' },

    // Specify optional GTM environment details.
    gtmAuth: 'YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING',
    gtmPreview: 'YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME',
    dataLayerName: 'globalDataLayer',
  },
});

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
