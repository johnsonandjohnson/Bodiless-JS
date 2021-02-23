const express = require('express');

const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `.env.${activeEnv}`,
});

const SITEURL = process.env.SITE_URL;

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
    resolve: 'gatsby-plugin-manifest',
    options: {
      icon: 'src/images/favicon.png',
    },
  },
  {
    resolve: 'gatsby-plugin-canonical-urls',
    options: {
      siteUrl: SITEURL,
    },
  },
  {
    resolve: 'gatsby-plugin-sitemap',
  },
];

const tagManagerEnabled = (process.env.GOOGLE_TAGMANAGER_ENABLED || '1') === '1';
if (tagManagerEnabled) {
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

      // Specify optional GTM environment details.
      // gtmAuth: 'YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING',
      // gtmPreview: 'YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME',
      dataLayerName: 'globalDataLayer',
    },
  });
}

module.exports = {
  developMiddleware: app => {
    app.use('/___docs', express.static('doc'));
  },
  siteMetadata: {
    siteUrl: SITEURL,
  },
  flags: {
    DEV_SSR: false,
  },
  plugins,
};
