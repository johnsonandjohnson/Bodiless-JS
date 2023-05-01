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

const bodilessNextConfig = require('../../bodiless.next.config');

let bodilessNextConfigSite = {
  manifest: {},
  robotstxt: {},
  sitemapxml: {}
};
type icon = {
  src: string,
  sizes: string,
  type: string
};

export type ManifestConfig = {
  name: string,
  short_name: string,
  start_url: string,
  background_color: string,
  theme_color: string,
  display: string,
  icon?: icon | string,
  icon_sizes: number[],
  icons?: icon[],
  legacy?: boolean,
  include_favicon?: boolean,
  theme_color_in_head?: boolean,
  crossOrigin?: 'anonymous' | 'use-credentials'
};

export type RobotstxtConfig = {
  output: string,
  policy: object,
  host: string,
  sitemap: string,
};

export type SitemapxmlConfig = {
  hostname: string,
  limit: number,
  gzip: boolean,
  excludes: [],
  outputDir?: string
};

export type BodilessNextConfig = {
  manifest?: ManifestConfig,
  robotstxt?: RobotstxtConfig,
  sitemapxml?: SitemapxmlConfig,
  staticReplacement?: any
};

try {
  // eslint-disable-next-line import/no-dynamic-require, global-require
  bodilessNextConfigSite = require(join(process.cwd(), 'bodiless.next.config.js'));
} catch (error) {
  //
}

export default ({
  ...bodilessNextConfig,
  ...bodilessNextConfigSite,
  manifest: {
    ...bodilessNextConfig.manifest,
    ...bodilessNextConfigSite.manifest || {},
  },
  robotstxt: {
    ...bodilessNextConfig.robotstxt,
    ...bodilessNextConfigSite.robotstxt || {},
  },
  sitemapxml: {
    ...bodilessNextConfig.sitemapxml,
    ...bodilessNextConfigSite.sitemapxml || {},
  }
}) as Required<BodilessNextConfig>;
