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
import defaultToc from './defaultToc';
import { Tree } from './type';

type Settings = {
  resourceDir: string;
  toc: Tree;
};

const getDefaultSettings = () => ({
  resourceDir: path.dirname(require.resolve(path.join('..', 'resources', 'index.html'))),
  toc: defaultToc(),
});

/**
 * Reads local settings. Falls back to default settings when local settings do not exist.
 */
const readSettings = (): Settings => {
  let localSettings = {};
  try {
    const localSettingsPath = path.resolve('./bodiless.docs.settings.js');
    // eslint-disable-next-line global-require, import/no-dynamic-require
    localSettings = require(localSettingsPath).default();
  } catch (e) {
    console.warn('No local settings found.');
  }
  const defaultSettings = getDefaultSettings();
  return {
    ...defaultSettings,
    ...localSettings,
  };
};

export default readSettings;
