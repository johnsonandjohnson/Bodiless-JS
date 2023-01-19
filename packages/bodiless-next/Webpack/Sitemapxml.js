/**
 * Copyright © 2023 Johnson & Johnson
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
const { minimatch } = require('minimatch');
const { simpleSitemapAndIndex } = require('sitemap');
const getPages = require('@bodiless/components/node-api/getPages');
const getDisabledPages = require('@bodiless/components/node-api/getDisabledPages');

/**
 *
 * @param {string} path
 * @returns {string}
 */
const withoutTrailingSlash = path => (path === '/' ? path : path.replace(/\/$/, ''));

/**
 * @name serialize
 *
 * This function is executed by allPages.map(page => thisFunc(page, siteUrl, tools))
 * allpages is the result of the filter process
 *
 * @param {object[]} page - results of the resolvePages function
 *
 */
const serialize = (page) => ({
  url: page,
  changefreq: 'daily',
  priority: 0.7
});

const generateSitemapXml = async (options) => {
  const siteUrl = process.env.SITE_URL || false;
  const pages = await getPages();

  const disablePageList = getDisabledPages();
  const disabledPages = Object.keys(disablePageList).filter(
    item => disablePageList[item].pageDisabled === true || disablePageList[item].indexingDisabled,
  ) || [];

  const {
    output = '', prefix = '', excludes = disabledPages, ...rest
  } = options || {};
  const sitemapPublicPath = path.posix.join(prefix, output);
  const sitemapWritePath = path.join('public', output);

  const filteredPages = pages.filter(page => !excludes.some(exclude => minimatch(
    withoutTrailingSlash(page),
    withoutTrailingSlash(exclude)
  )));

  const serializedPages = filteredPages.map(page => serialize(
    new URL(path.posix.join(siteUrl, prefix, page)).pathname
  ));

  const defaultOptions = {
    hostname: siteUrl,
    destinationDir: sitemapWritePath,
    publicBasePath: sitemapPublicPath,
    limit: 45000,
    sourceData: serializedPages,
    gzip: false
  };

  const mergedOptions = {
    ...defaultOptions,
    ...rest || {},
    destinationDir: defaultOptions.destinationDir,
  };

  if (!mergedOptions.hostname) return;
  simpleSitemapAndIndex(mergedOptions);
};

module.exports = generateSitemapXml;
