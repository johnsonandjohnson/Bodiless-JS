#!/usr/bin/env node
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

// @todo: use oclif/command
import SearchTool from '../SearchTool';
import type { TSearchConf, TSearchIndexSettings } from '../types';

require('dotenv').config({
  path: '.env.development',
});

const config: TSearchConf = {};

const tool = new SearchTool(config);

/**
  * Search index creation configures
  *
  * - sourcePath: Valid data source folder.
  * - sourceType: Specified data file extensions for indexing.
  * - targetPath: Target folder for saving generated index file.
  * - indexConfig: Document index configuration.
  */
const settings: TSearchIndexSettings = {
  sourcePath: process.env.BODILESS_SEARCH_SOURCE_PATH || './public',
  sourceTypes: process.env.BODILESS_SEARCH_SOURCE_TYPE ? process.env.BODILESS_SEARCH_SOURCE_TYPE.split('|') : ['html', 'htm'],
  targetPath: process.env.BODILESS_SEARCH_INDEX_PATH ? process.env.BODILESS_SEARCH_INDEX_PATH : './public/default.idx',
  indexConfig: {
    ref: 'id',
    fields: [
      { name: 'title', attributes: { boost: 2 } },
      { name: 'body' },
    ],
  },
};

// Create and save index to target path.
tool.generateIndex(settings);
