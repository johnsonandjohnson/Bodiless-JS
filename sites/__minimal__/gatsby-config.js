const fs = require('fs');
const express = require('express');
const { execSync } = require('child_process');
// const {
//   createDefaultContentPlugins,
//   getSampleDefaultContentConfig,
// } = require('@bodiless/gatsby-theme-bodiless/dist/DefaultContent');
const { getDisabledPages } = require('@bodiless/components/node-api');
// const getSSIEntities = require('@bodiless/gatsby-plugin-ssi/read-ssi-entities');
// const {
//   getConfig: getSiteDefaultContentConfig,
// } = require('./src/components/Contentful');

const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development';

// @todo This should be an api, not an npm command
execSync('npm run build:env-vars');
require('dotenv').config({
  path: `.env.${activeEnv}`,
});

const SITEURL = process.env.SITE_URL;

// const disablePageList = getDisabledPages();
// const disabledPages = Object.keys(disablePageList).filter(
//   item => disablePageList[item].pageDisabled === true || disablePageList[item].indexingDisabled,
// );

// Gatsby plugins list.
const plugins = [
  {
    resolve: '@bodiless/gatsby-theme-bodiless',
    options: {
      gatsbyImage: {
        sharpArgs: {
          quality: 90,
        },
      },
      // Static replacement options, see docs for more info.
      static: {
        // Pass false to disable static replacement. Defaults to true.
        enabled: true,
        // Static replacement works by searching for files ending in ".bl-edit" and replacing them
        // with a file with the same name, but ending in ".static" instead. However, all files are
        // skipped by default for compatibility reasons.
        //
        // You can pass a boolean to include or exclude all files easily. True means include all
        // ".bl-edit" files, enabling static replacement on all packages. False disables static
        // replacement, which is the same as passing `enabled: false` in the options object.
        //
        // You can also pass a RegExp which will be matched against the **absolute** path
        // of every .bl-edit file being imported. If it matches and a sibling .static file
        // is found, the file will be replaced. For instance, if you want to include all
        // `vital-editors` and `vital-link` files, you may pass `/vital-editors|vital-link/`
        // to this option.
        //
        // Defaults to false.
        // include: true,
        // Pass false to disable logging all resolving operations. Defaults to true.
        // logging: true,
      }
    },
  },
  // {
  //   resolve: '@bodiless/gatsby-plugin-ssi',
  //   options: {
  //     ssiEntities: getSSIEntities('ssi/ssi_conf.json'),
  //   }
  // },
  // {
  //   resolve: 'gatsby-plugin-canonical-urls',
  //   options: {
  //     siteUrl: SITEURL,
  //   },
  // },
  // {
  //   resolve: 'gatsby-plugin-sitemap',
  //   options: { excludes: disabledPages },
  // },
  // ...createDefaultContentPlugins(
  //   ...getSampleDefaultContentConfig(),
  //   ...getSiteDefaultContentConfig(),
  // ),
];

// const robotsTxtPolicy = [
//   {
//     userAgent: '*',
//     allow: '/',
//   },
// ];
// process.env.ROBOTSTXT_POLICY = JSON.stringify(robotsTxtPolicy);

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
