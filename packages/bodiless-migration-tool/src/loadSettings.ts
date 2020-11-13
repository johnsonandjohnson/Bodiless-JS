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

/* eslint no-console: 0 */
import path from 'path';
import fs from 'fs';
import type {
  PageCreatorParams,
  Transformer,
  Exports,
} from './site-flattener';
import type { PluginType } from './pluginManager';
import { TrailingSlash } from './site-flattener';
import { Page404Params } from './page404-handler';

const JS_SETTINGS_FILE_NAME = 'migration-settings.js';
const JSON_SETTINGS_FILE_NAME = 'migration-settings.json';

type CrawlerSettings = {
  maxDepth: number,
  ignoreRobotsTxt: boolean,
};

type Settings = {
  url: string,
  pageCreator?: PageCreatorParams,
  crawler?: CrawlerSettings,
  trailingSlash?: TrailingSlash,
  transformers?: Transformer[],
  exports?: Exports,
  disableTailwind?: boolean,
  allowFallbackHtml?: boolean,
  plugins?: PluginType[],
} & Page404Params;

type SettingsLoader = () => Settings | undefined;

const getSettingsBaseDirs = () => [
  process.cwd(),
  path.resolve(__dirname, '..'),
];

const findSettingsFile = (settingsFileName: string) => getSettingsBaseDirs()
  .map(path$ => path.resolve(path$, settingsFileName))
  .find(path$ => fs.existsSync(path$));

const loadJsSettings: SettingsLoader = () => {
  const settingsPath = findSettingsFile(JS_SETTINGS_FILE_NAME);
  if (!settingsPath) return undefined;
  // eslint-disable-next-line import/no-dynamic-require, global-require
  return require(settingsPath);
};

const loadJsonSettings: SettingsLoader = () => {
  const settingsPath = findSettingsFile(JSON_SETTINGS_FILE_NAME);
  if (!settingsPath) return undefined;
  console.log(`Applying migration settings from ${settingsPath}`);
  return JSON.parse(fs.readFileSync(settingsPath).toString());
};

const loadSettings = () => {
  const settings = loadJsSettings() || loadJsonSettings();
  if (settings === undefined) {
    console.error(`Configuration file is not found. Ensure your working directory contains ${JS_SETTINGS_FILE_NAME}`);
  }
  return settings;
};

export default loadSettings;
export type { Settings };
