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
import locateFiles from '../generate-env-vars/locateFiles';

/**
 * reads package.json and returns content of key of the package
 * returns undefined if package.json does not exist or if there is a file parsing error
 * @param packageJsonPath path to package.json.
 */
const getVauleFromPackageJson = (
  packageJsonPath: string,
  key: string,
): any => {
  let content;
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    content = packageJson[key];
  } catch {
    console.log(`Error reading package.json from ${packageJsonPath}`);
  }
  return content;
};

const getDependenciesFromPackageJson = (
  packageJsonPath: string,
): string[] => getVauleFromPackageJson(packageJsonPath, 'dependencies');

const getPackageNameFromPackageJson = (
  packageJsonPath: string,
): string => getVauleFromPackageJson(packageJsonPath, 'name');

/**
 * Finds all tailwindcss configuration files.
 */
const findTailwindConfigPaths = async () => locateFiles({
  startingRoot: './',
  filePattern: new RegExp('^site.tailwind.config.js$'),
});

/**
 * Combination of all available tailwind configs.
 * @param deps Site level dependencies
 */
const getBodilessTailwindConfig = async (deps: string[]) => {
  const paths = await findTailwindConfigPaths();
  const paths$1 = paths.map(filePath => {
    const packagePath = path.resolve(filePath, '..');
    const packageNameFromPackageJson = getPackageNameFromPackageJson(
      path.resolve(packagePath, 'package.json'),
    );
    const packageName = packageNameFromPackageJson || path.basename(packagePath);
    return packageName;
  });

  return paths$1.filter(packageName => deps.indexOf(packageName) > -1);
};

export {
  getDependenciesFromPackageJson,
  getPackageNameFromPackageJson,
  getBodilessTailwindConfig,
};
