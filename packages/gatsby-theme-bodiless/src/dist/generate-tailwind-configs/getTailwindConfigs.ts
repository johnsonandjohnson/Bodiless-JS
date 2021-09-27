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
 * reads package.json and returns name of the package
 * returns undefined if package.json does not exist or if there is a file parsing error
 * @param packageJsonPath path to package.json.
 */
const getDependencies = (packageJsonPath: string): string[] => {
  let dependencies;
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    dependencies = packageJson.dependencies;
  } catch {
    console.log(`Error reading package.json from ${packageJsonPath}`);
  }
  return Object.keys(dependencies);
};

const getPackageNameFromPackageJson = (packageJsonPath: string): string | undefined => {
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
const findTailwindConfigPaths = async () => locateFiles({
  startingRoot: './',
  filePattern: new RegExp('^tailwind.config.js$'),
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
  getDependencies,
  getPackageNameFromPackageJson,
  getBodilessTailwindConfig,
};
