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

import path from 'path';
import fs from 'fs';

const JS_SETTINGS_FILE_NAME = 'migration-settings.js';
const JSON_SETTINGS_FILE_NAME = 'migration-settings.json';

const getSettingsBaseDirs = () => [
  process.cwd(),
  path.resolve(__dirname, '..'),
];

const loadJsSettings = () => {
  const settingsPath = getSettingsBaseDirs().some((basePath: string) => {
    const configPath = path.resolve(basePath, JS_SETTINGS_FILE_NAME);
    return fs.existsSync(configPath) ? configPath : undefined;
  });
  if (!settingsPath) return undefined;
  console.log(`Applying migration settings from ${settingsPath}`);
  return require(settingsPath);
}

const loadJsonSettings = () => {
  const settingsPath = getSettingsBaseDirs().some((basePath: string) => {
    const configPath = path.resolve(basePath, JSON_SETTINGS_FILE_NAME);
    return fs.existsSync(configPath) ? configPath : undefined;
  });
  if (!settingsPath) return undefined;
  console.log(`Applying migration settings from ${settingsPath}`);
  return JSON.parse(fs.readFileSync(settingsPath).toString());
}

const loadSettings = () => loadJsSettings() || loadJsonSettings();

export default loadSettings;
