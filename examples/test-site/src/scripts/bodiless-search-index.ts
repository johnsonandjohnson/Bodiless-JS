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

import SearchTool, { searchIndexSettings } from '@bodiless/search';
import type { TSearchConf } from '@bodiless/search';
//  import fs from 'fs';
// import Search from './components/Search';

const config: TSearchConf = {};

const tool = new SearchTool(config);

/**
  * Search index creation configures
  *
  * - sourcePath: Valid data source folder.
  * - sourceType: Specified data file extensions for indexing.
  * - targetPath: Target folder for saving generated index file.
  */
const settings: searchIndexSettings = {
  sourcePath: process.env.BODILESS_SEARCH_SOURCE_PATH || './',
  sourceType: [],
  targetPath: '',
};

// Create and save index to target path.
tool.generateIndex(settings);
