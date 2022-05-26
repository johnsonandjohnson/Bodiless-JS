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
import path from 'path';
import dotenv from 'dotenv';
import SearchTool, { SearchConfig } from '../SearchTool';

dotenv.config({
  path: '.env.development',
});

const configFileName = !process.env.BODILESS_SEARCH_CONFIG ? 'search.config.json' : process.env.BODILESS_SEARCH_CONFIG;
const configPath = path.resolve(process.cwd(), configFileName);
const config = SearchConfig.getConfig(configPath);

if (config) {
  const tool = new SearchTool(config);

  tool.generateIndex();
} else {
  // eslint-disable-next-line no-console
  console.warn(`"${configFileName}" file not found, skipping search index build.`);
}
