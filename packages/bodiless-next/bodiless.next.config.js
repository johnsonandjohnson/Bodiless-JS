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
const disabledPages = [];
/*
  const getDisabledPages = require('@bodiless/components/lib/cjs/NodeApi/getDisabledPages').default;

  const disablePageList = getDisabledPages();
  disabledPages = Object.keys(disablePageList).filter(
    item => disablePageList[item].pageDisabled === true || disablePageList[item].indexingDisabled,
  ) || [];
*/

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

const siteUrl = process.env.SITE_URL || '';

module.exports = {
  manifest: {
    name: 'BodilessJS',
    short_name: 'Bodiless',
    start_url: '/',
    background_color: '#663399',
    theme_color: '#663399',
    display: 'minimal-ui',
    icon: 'src/images/next-icon.png', // This path is relative to the root of the site.
    icon_sizes: [48, 72, 96, 144, 192, 256, 384, 512]
  },
  robotstxt: {
    output: '/robots.txt',
    policy,
    host: process.env.ROBOTSTXT_HOST,
    sitemap: process.env.ROBOTSTXT_SITEMAP,
  },
  sitemapxml: {
    hostname: siteUrl,
    limit: 45000,
    gzip: false,
    excludes: disabledPages
  },
  staticReplacement: {
    enabled: true,
    include: true,
    logging: true,
    exclude: false,
  }
};
