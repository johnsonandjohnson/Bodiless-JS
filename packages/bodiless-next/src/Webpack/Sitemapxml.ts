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
import { join } from 'path';
import minimatch from 'minimatch';
import { simpleSitemapAndIndex, SitemapItemLoose } from 'sitemap';
import { getPages } from '@bodiless/page/lib/cjs/NodeApi';

import bodilessNextConfigPath, { SitemapxmlConfig } from '../NextConfig/bodilessNextConfigLoader';

/**
 *
 * @param {string} path
 * @returns {string}
 */
const withoutTrailingSlash = (path : string) => (path === '/' ? path : path.replace(/\/$/, ''));

/**
 * @name serialize
 *
 * This function is executed by allPages.map(page => thisFunc(page, siteUrl, tools))
 * allpages is the result of the filter process
 *
 * @param {object[]} page - results of the resolvePages function
 *
 */
const serialize = (page: string) => ({
  url: page,
  changefreq: 'daily',
  priority: 0.7
});

const generateSitemapXml = async (options: Partial<SitemapxmlConfig> | undefined) => {
  const siteUrl = process.env.SITE_URL || '';
  if (!siteUrl) return;

  const pages = await getPages();

  const mergedOptions = {
    ...bodilessNextConfigPath.sitemapxml,
    ...options || {},
  };

  const {
    outputDir = '', excludes, ...rest
  } = mergedOptions;
  const sitemapPublicPath = outputDir;
  const sitemapWritePath = join('public', outputDir);

  const filteredPages = excludes ? pages.filter((page: string) => !excludes.some(
    (exclude :string) => minimatch(
      withoutTrailingSlash(page),
      withoutTrailingSlash(exclude)
    )
  )) : pages;

  const serializedPages = filteredPages.map((page: string) => serialize(
    new URL(page, siteUrl).pathname
  ));

  const sitemapxmlOptions = {
    ...{
      publicBasePath: sitemapPublicPath,
      sourceData: serializedPages as SitemapItemLoose[],
    },
    ...rest,
    destinationDir: sitemapWritePath,
  };

  if (!mergedOptions.hostname) return;
  simpleSitemapAndIndex(sitemapxmlOptions);
};

export default generateSitemapXml;
