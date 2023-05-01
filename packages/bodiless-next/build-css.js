/* eslint-disable no-console */
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
const fs = require('fs');
const path = require('path');

const getTailwindConfig = () => {
  const processDirFile = path.resolve(process.cwd(), 'tailwind.config.js');
  if (fs.existsSync(processDirFile)) {
    return processDirFile;
  }
  const siteDirFile = path.resolve(__dirname, 'tailwind.config.js');
  if (fs.existsSync(siteDirFile)) {
    return siteDirFile;
  }
  return false;
};

const postCssPlugins = {};
const tailwindThemeEnabled = (process.env.BODILESS_TAILWIND_THEME_ENABLED || '1') === '1';

if (!tailwindThemeEnabled) {
  console.warn('Tailwind Theme Compilation Is Disabled');
} else {
  const tailWindConfigFile = getTailwindConfig();
  if (tailwindThemeEnabled && tailWindConfigFile) {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    postCssPlugins.tailwindcss = require(tailWindConfigFile);
    postCssPlugins['postcss-url'] = [
      {
        filter: /\.(woff(2)?|ttf|eot|svg|otf)/,
        multi: true,
        url: (asset) => {
          try {
            const paths = require.resolve.paths(asset.url);
            const filePath = require.resolve(asset.url, {paths: [...paths, process.cwd()]});
            const from = asset.absolutePath.replace(asset.relativePath, '');
            console.log(path.relative(from, filePath));
            return path.relative(from, filePath);
          } catch (error) {
            return asset.url;
          }
        }
      }
    ];
    postCssPlugins.autoprefixer = {};
  }
}

const getBuildCSSPlugins = () => postCssPlugins;

module.exports = getBuildCSSPlugins;
