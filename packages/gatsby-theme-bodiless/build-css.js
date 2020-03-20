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

const buildCSSPlugins = [];
const tailwindThemeEnabled = (process.env.BODILESS_TAILWIND_THEME_ENABLED || '1') === '1';
if (!tailwindThemeEnabled) {
  console.warn('Tailwind Theme Compilation Is Disabled');
} else {
  const tailWindConfigFile = getTailwindConfig();
  if (tailwindThemeEnabled && tailWindConfigFile) {
    buildCSSPlugins.push({
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [
          // eslint-disable-next-line global-require
          require('tailwindcss')(tailWindConfigFile),
        ],
      },
    });
  }
  if (process.env.BODILESS_PURGE_CSS_ENABLED !== '0') {
    console.warn('CSS Purging Is Disabled');
  } else {
    const purgeWhileInGatsbyDevelop = false;
    const siteTailwindCSS = process.env.BODILESS_TAILWIND_SITE_CSS || [
      'src/css/style.css',
    ];
    const srcFilesGlobPattern = '**/!(*.d).{ts,js,jsx,tsx}';
    // list of bodiless packages that have site level styles
    // and that should be accounted during purging
    const bodilessPackagesPaths = [
      './node_modules/@bodiless/layouts',
      './node_modules/@bodiless/organisms',
    ];
    const bodilessFilesPaths = bodilessPackagesPaths
      .map(pkg => path.resolve(pkg, srcFilesGlobPattern));
    buildCSSPlugins.push({
      resolve: 'gatsby-plugin-purgecss',
      options: {
        tailwind: true,
        develop: purgeWhileInGatsbyDevelop,
        purgeOnly: [
          ...siteTailwindCSS,
        ],
        content: [
          path.join(process.cwd(), 'src', srcFilesGlobPattern),
          ...bodilessFilesPaths,
        ],
      },
    });
  }
}

const getBuildCSSPlugins = () => buildCSSPlugins;

module.exports = getBuildCSSPlugins;
