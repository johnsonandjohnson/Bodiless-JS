/**
 * Copyright © 2021 Johnson & Johnson
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

import fs from 'fs';
import path from 'path';
import locateFiles from './locateFiles';
import { TailwindConfig, mergeConfigs } from './mergeConfigs';
/**
 * reads package.json and returns name of the package
 * returns undefined if package.json does not exist or if there is a file parsing error
 * @param packageJsonPath path to package.json.
 */
const getPackageNameFromPackageJson = (packageJsonPath: string): string | undefined => {
  let packageName;
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageName = packageJson.name;
  } catch {
    // console.log(`Error reading package.json from ${packageJsonPath}`);
  }
  return packageName;
};

/**
 * Finds all tailwindcss configuration files.
 */
const findTailwindConfigPaths = async () => locateFiles({
  startingRoot: './',
  filePattern: new RegExp('/tailwind.config.js$'),
  action: filePath => {
    const packagePath = path.resolve(filePath, '..');
    const packageNameFromPackageJson = getPackageNameFromPackageJson(path.resolve(packagePath, 'package.json'));
    const packageName = packageNameFromPackageJson || path.basename(packagePath);
    return Promise.resolve({
      [packageName]: packagePath,
    });
  },
});

export const getBodilessTailwindConfig = async () => {
  const paths = await findTailwindConfigPaths();
  return Promise.resolve(paths);
};

export const mergeWithBodilessConfigs = (config: TailwindConfig) => mergeConfigs(
  config,
  [],
  // @TODO getBodilessTailwindConfig(),
);
