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
import SearchTool, { SearchConfig } from '../SearchTool';
import dotenv from 'dotenv';
import type { TSearchConf } from '../types';

dotenv.config({
  path: '.env.development',
});

// @todo: combine search config and settings into one param object.
const config: TSearchConf = SearchConfig.getConfig();

const tool = new SearchTool(config);

// Create and save index to target path.
tool.generateIndex();
