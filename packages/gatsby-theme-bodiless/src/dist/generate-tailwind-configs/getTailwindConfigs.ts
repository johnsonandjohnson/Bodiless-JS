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

/**
 * reads package.json and returns name of the package
 * returns undefined if package.json does not exist or if there is a file parsing error
 * @param packageJsonPath path to package.json.
 */
export const getDependencies = (packageJsonPath: string): string[] => {
  let dependencies;
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    dependencies = packageJson.dependencies;
  } catch {
    console.log(`Error reading package.json from ${packageJsonPath}`);
  }
  return Object.keys(dependencies);
};

export const getPackageNameFromPackageJson = (packageJsonPath: string): string | undefined => {
  let packageName;
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageName = packageJson.name;
  } catch {
    console.log(`Error reading package.json from ${packageJsonPath}`);
  }
  return packageName;
};

/**
 * Finds all tailwindcss configuration files.
 */
export const findTailwindConfigPaths = async () => locateFiles({
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

/**
 * Combination of all available tailwind configs.
 * @param deps Site level dependencies
 */
export const getBodilessTailwindConfig = async (deps: string[]) => {
  const paths = await findTailwindConfigPaths();
  const paths$1 = paths.reduce((prevVal, curVal) => ({ ...prevVal, ...curVal }), {});
  return Object.keys(paths$1)
    .filter(packageName => deps.indexOf(packageName) > -1)
    .map(packageName => ({
      package: packageName,
      root: paths$1[packageName],
    }));
};
