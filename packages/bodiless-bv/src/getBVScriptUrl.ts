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

import { defaultBVConfig, BVConfig } from './BVConfig';

const getBVScriptUrlFromConfig = (conf: BVConfig) => {
  if (process.env.BV_API_VERSION === '1') {
    const bvHost = process.env.BV_HOST || 'https://display.ugc.bazaarvoice.com';
    return `${bvHost}/${conf.environment}/static/${conf.client_name}/${conf.site_ID}/${conf.locale}/bvapi.js`;
  }
  const bvHost = process.env.BV_HOST || 'https://apps.bazaarvoice.com';
  return `${bvHost}/deployments/${conf.client_name}/${conf.site_ID}/${conf.environment}/${conf.locale}/bv.js`;
};

const isBVConfigValid = (conf: BVConfig): boolean => {
  if (!conf.client_name || !RegExp(/^[a-z0-9_-]+$/i).test(conf.client_name)) {
    return false;
  }
  if (!conf.environment || !RegExp(/^[a-z0-9_-]+$/i).test(conf.environment)) {
    return false;
  }
  if (!conf.locale || !RegExp(/^[a-z0-9_-]+$/i).test(conf.locale)) {
    return false;
  }
  if (!conf.site_ID || !RegExp(/^[a-z0-9_-]+$/i).test(conf.site_ID)) {
    return false;
  }
  return true;
};

const getBVScriptUrl = () => {
  if (process.env.BV_SCRIPT) {
    return process.env.BV_SCRIPT;
  }
  if (process.env.BV_CLIENT_NAME) {
    const bvConfig = {
      client_name: process.env.BV_CLIENT_NAME || defaultBVConfig.client_name,
      site_ID: process.env.BV_SITE_ID || defaultBVConfig.site_ID,
      environment: process.env.BV_ENVIRONMENT || defaultBVConfig.environment,
      locale: process.env.BV_LOCALE || defaultBVConfig.locale,
    };
    if (!isBVConfigValid(bvConfig)) {
      return '';
    }
    return getBVScriptUrlFromConfig(bvConfig);
  }
  // @ts-ignore
  if (typeof window.$BV_SCRIPT !== 'undefined') {
    // @ts-ignore
    return window.$BV_SCRIPT;
  }
  return '';
};

export default getBVScriptUrl;
