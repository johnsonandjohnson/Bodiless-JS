/**
 * Copyright © 2020 Johnson & Johnson
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

import { ScrapedPage } from './scraper';
import debug from './debug';

export interface Page404initialSettings {
  url: string,
  isPage404Disabled?: boolean,
  page404Url?: string,
}

export interface Page404Params {
  isPage404Disabled: boolean,
  page404Url: string,
}

export function isCurrentPage404(url: string, page404Url: string) {
  return url === page404Url;
}

export function getPage404DefaultUrl(url: string) {
  return `${new URL(url).origin}/404`;
}

function getParams(settings: Page404initialSettings): Page404Params {
  const defaultSettings = {
    isPage404Disabled: false,
    page404Url: getPage404DefaultUrl(settings.url),
  };
  const settingsWithDefaults = {
    ...defaultSettings,
    ...settings,
  };
  const { isPage404Disabled, page404Url } = settingsWithDefaults;
  return {
    isPage404Disabled,
    page404Url: isPage404Disabled ? '' : page404Url,
  };
}

function processScrapedPage(result: ScrapedPage, page404Params: Page404Params) {
  const { pageUrl, status } = result;
  const { page404Url, isPage404Disabled } = page404Params;
  const isCurrentPageDefault404 = isCurrentPage404(pageUrl, page404Url);
  if (isPage404Disabled) {
    return result;
  }
  if (isCurrentPageDefault404) {
    debug(`Using ${pageUrl} as a template for default "Page Not Found" page.`);
    return {
      ...result,
      pageUrl: getPage404DefaultUrl(pageUrl),
    };
  }
  if (status === 404) {
    throw new Error(`Page ${pageUrl} does not exist and will be redirected to default 404 page.`);
  }
  return result;
}

const page404Handler = {
  getParams,
  processScrapedPage,
};

export default page404Handler;
