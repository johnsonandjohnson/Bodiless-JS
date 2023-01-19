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
const robotsTxt = require('generate-robotstxt');
const path = require('path');
const fs = require('fs');
const getDisabledPages = require('@bodiless/components/node-api/getDisabledPages');

const generateRobotsTxt = (options) => {
  if (!process.env.ROBOTSTXT_ENABLED) return;
  const publicPath = './public';

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
  const defaultOptions = {
    output: '/robots.txt',
    policy,
    host: process.env.ROBOTSTXT_HOST,
    sitemap: process.env.ROBOTSTXT_SITEMAP,
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options || {}
  };

  robotsTxt(mergedOptions)
    .then((content) => {
      const filename = path.join(publicPath, mergedOptions.output);
      return fs.writeFileSync(path.resolve(filename), content);
    })
    .catch((error) => {
      throw error;
    });
};

module.exports = generateRobotsTxt;
