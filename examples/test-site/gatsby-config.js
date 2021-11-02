const fs = require('fs');
const express = require('express');
const {
  createDefaultContentPlugins,
  getSampleDefaultContentConfig,
} = require('@bodiless/gatsby-theme-bodiless/dist/DefaultContent');
const { getDisabledPages } = require('@bodiless/components/lib/PageDisable/utils');
const {
  getConfig: getSiteDefaultContentConfig,
} = require('./src/components/Contentful');

const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `.env.${activeEnv}`,
});

const SITEURL = process.env.SITE_URL;

const disablePageList = getDisabledPages();
const disabledPages = Object.keys(disablePageList).filter(
  item => disablePageList[item].pageDisabled === true,
);

// Gatsby plugins list.
const plugins = [
  {
    resolve: 'gatsby-plugin-compile-es6-packages',
    options: {
      modules: ['@bodiless/gatsby-theme-bodiless'],
    },
  },
  {
    resolve: '@bodiless/gatsby-theme-bodiless',
    options: {
      gatsbyImage: {
        sharpArgs: {
          quality: 90,
        },
      },
    },
  },
  '@bodiless/gatsby-plugin-ssi',
  {
    resolve: 'gatsby-plugin-canonical-urls',
    options: {
      siteUrl: SITEURL,
    },
  },
  {
    resolve: 'gatsby-plugin-sitemap',
    options: { excludes: disabledPages },
  },
  ...createDefaultContentPlugins(
    ...getSampleDefaultContentConfig(),
    ...getSiteDefaultContentConfig(),
  ),
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

if (process.env.NODE_ENV === 'production' && disabledPages.length > 0) {
  plugins.push({
    resolve: 'gatsby-plugin-exclude',
    options: { paths: disabledPages },
  });
}

const robotsTxtPolicy = [
  {
    userAgent: '*',
    allow: '/',
  },
];
process.env.ROBOTSTXT_POLICY = JSON.stringify(robotsTxtPolicy);

module.exports = {
  developMiddleware: app => {
    app.use('/___docs', express.static('doc', { fallthrough: false }));
  },
  siteMetadata: {
    siteUrl: SITEURL,
  },
  flags: {
    DEV_SSR: false,
  },
  plugins,
};
