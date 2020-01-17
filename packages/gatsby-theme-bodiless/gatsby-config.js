/**
 * Copyright © 2019 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const path = require('path');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

// Gatsby plugins list.
const plugins = [
  'gatsby-plugin-react-helmet',
  {
    resolve: 'gatsby-plugin-typescript',
    options: {
      isTSX: true, // defaults to false
      allExtensions: true, // defaults to false
    },
  },
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      name: 'BodilessJS',
      short_name: 'Bodiless',
      start_url: '/',
      background_color: '#663399',
      theme_color: '#663399',
      display: 'minimal-ui',
      icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
    },
  },
  {
    resolve: 'gatsby-transformer-code',
    options: {
      name: 'data',
      extensions: ['json'],
    },
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'data',
      path: path.resolve('./src/data/'),
    },
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'templates',
      path: path.resolve('./src/templates/'),
    },
  },
  // 'gatsby-plugin-offline',
  // 'gatsby-plugin-remove-serviceworker',
];

/**
 * Google Tag Manager plugin.
*/
if ((process.env.GOOGLE_TAGMANAGER_ENABLED || '0') === '1') {
  plugins.push({
    resolve: 'gatsby-plugin-google-tagmanager',
    options: {
      id: process.env.GOOGLE_TAGMANAGER_ID || 'GTM-XXXXXXX',

      // Include GTM in development.
      // Defaults to false meaning GTM will only be loaded in production.
      includeInDevelopment: false,

      // datalayer to be set before GTM is loaded
      // should be an object or a function that is executed in the browser
      // Defaults to null
      defaultDataLayer: { platform: 'gatsby' },

      // Specify optional GTM environment details.
      // gtmAuth: 'YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING',
      // gtmPreview: 'YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME',
      dataLayerName: 'globalDataLayer',
    },
  });
}

/**
 * Google Fonts plugin.
*/
if (process.env.GOOGLE_FONTS_ENABLED !== '0') {
  plugins.push({
    resolve: 'gatsby-plugin-google-fonts',
    options: {
      fonts: ['material icons', 'roboto:300,400,500,700'],
    },
  });
}

/**
 * Robots.txt plugin.
*/
if (process.env.ROBOTSTXT_ENABLED !== '0') {
  const policy = process.env.ROBOTSTXT_POLICY;
  const defaultPolicy = [
    {
      userAgent: '*',
      allow: '/',
    },
  ];
  plugins.push({
    resolve: 'gatsby-plugin-robots-txt',
    options: {
      host: process.env.ROBOTSTXT_HOST,
      sitemap: process.env.ROBOTSTXT_SITEMAP,
      policy: policy ? JSON.parse(policy) : defaultPolicy,
    },
  });
}

module.exports = {
  siteMetadata: {
    title: 'Bodiless-JS',
  },
  plugins,
  proxy: {
    prefix: process.env.GATSBY_BACKEND_PREFIX || '/___backend',
    url: `http://localhost:${process.env.BODILESS_BACKEND_PORT || 8001}`,
  },
};
