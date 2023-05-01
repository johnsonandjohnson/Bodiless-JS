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
const fg = require('fast-glob');
const fs = require('fs');
const { getDisabledPages } = require('@bodiless/components/lib/cjs/NodeApi');
const { createDefaultContentPlugins } = require('./cjs/dist/DefaultContent');

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
    resolve: 'gatsby-plugin-env-variables',
    options: {
      allowList: ['BODILESS_GOOGLE_YOUTUBE_API_KEY']
    },
  },
  {
    resolve: 'gatsby-plugin-sharp',
  },
  'gatsby-transformer-sharp',
  // 'gatsby-plugin-offline',
  // 'gatsby-plugin-remove-serviceworker',
];

if (!process.env.BODILESS_GATSBY_PLUGIN_IMAGE_OMIT || process.env.NODE_ENV === 'development') {
  plugins.push('gatsby-plugin-image');
}
/**
 * Google Fonts plugin.
 */
if (process.env.NODE_ENV === 'development' || process.env.GOOGLE_FONTS_ENABLED === '1') {
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
  const disablePageList = getDisabledPages();
  const disabledPages = Object.keys(disablePageList).filter(
    item => disablePageList[item].pageDisabled === true || disablePageList[item].indexingDisabled,
  ) || [];
  const policyEnv = process.env.ROBOTSTXT_POLICY;
  const defaultPolicy = [
    {
      userAgent: '*',
      allow: '/',
    },
  ];
  const policy = policyEnv ? JSON.parse(policyEnv) : defaultPolicy;
  if (!policy[0].disallow) {
    policy[0].disallow = disabledPages;
  } else {
    const { disallow } = policy[0];
    if (typeof disallow === 'string') {
      policy[0].disallow = [disallow, ...disabledPages];
    } else {
      policy[0].disallow = [...disallow, ...disabledPages];
    }
  }

  plugins.push({
    resolve: 'gatsby-plugin-robots-txt',
    options: {
      host: process.env.ROBOTSTXT_HOST,
      sitemap: process.env.ROBOTSTXT_SITEMAP,
      policy,
    },
  });
}

/**
 * css compilation and purging.
*/
const getbuildCSSPlugins = require('./build-css');

plugins.push(...getbuildCSSPlugins());

/**
 * default content plugins
 */
const discoverDefaultContent = (depth = 1) => {
  let dir = path.resolve(process.cwd());
  let currentDepth = depth;
  let defaultContentPaths = [];
  while (currentDepth > 0 && dir !== path.resolve(dir, '..')) {
    const files = fg.sync([
      `${dir}/bodiless.content.json`,
      `${dir}/node_modules/**/bodiless.content.json`,
    ]);
    // eslint-disable-next-line no-loop-func
    files.forEach(file => {
      let fileContent = [];
      try {
        fileContent = JSON.parse(fs.readFileSync(file));
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(`@bodiless/gatsby-theme-bodiless: error on reading file: ${file}. Error: ${e}.`);
      }
      defaultContentPaths = [
        ...defaultContentPaths,
        ...fileContent.map(file$ => path.resolve(path.dirname(file), file$)),
      ];
    });
    currentDepth -= 1;
    dir = path.resolve(dir, '..');
  }
  return defaultContentPaths;
};

if (process.env.BODILESS_DEFAULT_CONTENT_AUTO_DISCOVERY === '1') {
  plugins.push(
    ...createDefaultContentPlugins(
      ...discoverDefaultContent(process.env.BODILESS_DEFAULT_CONTENT_AUTO_DISCOVERY_DEPTH || 1),
    ),
  );
}

plugins.push('gatsby-plugin-meta-redirect');

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
