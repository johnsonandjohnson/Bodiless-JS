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
  {
    resolve: 'gatsby-plugin-sharp',
  },
  // 'gatsby-plugin-offline',
  // 'gatsby-plugin-remove-serviceworker',
];

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

/**
 * css compilation and purging.
*/
const getbuildCSSPlugins = require('./build-css');

plugins.push(...getbuildCSSPlugins());

module.exports = {
  siteMetadata: {
    title: 'Bodiless-JS',
  },
  flags: {
    DEV_SSR: false,
  },
  plugins,
  proxy: {
    prefix: process.env.GATSBY_BACKEND_PREFIX || '/___backend',
    url: `http://localhost:${process.env.BODILESS_BACKEND_PORT || 8001}`,
  },
};
