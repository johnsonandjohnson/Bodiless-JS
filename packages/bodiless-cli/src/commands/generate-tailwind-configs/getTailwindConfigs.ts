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
import { exec } from 'child_process';
import path from 'path';
import locateFiles from '../generate-env-vars/locateFiles';

const {
  mergeConfigs,
  getPackageRoot,
// eslint-disable-next-line import/no-extraneous-dependencies
} = require('@bodiless/gatsby-theme-bodiless/dist/tailwindcss');

const NPM_ROOT = path.resolve(process.env.BODILESS_NPM_ROOT || '.');

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
  startingRoot: NPM_ROOT,
  filePattern: new RegExp('^site.tailwind.config.js$'),
});

/**
 * Combination of all available tailwind configs.
 * @param siteName Site package name
 * @param siteDeps Site level dependencies
 */
const getBodilessTailwindConfigOld = async (siteName: string, siteDeps: string[]) => {
  // 1. walking the node_modules to find the packages which has the site.tailwind.config.js file
  const paths = await findTailwindConfigPaths();
  const pkgsHaveTailwindConfig = paths.map(filePath => {
    const packagePath = path.resolve(filePath, '..');
    const packageNameFromPackageJson = getPackageNameFromPackageJson(
      path.resolve(packagePath, 'package.json'),
    );
    const packageName = packageNameFromPackageJson || path.basename(packagePath);
    return { packageName, packagePath };
  }).filter(item => item.packageName !== siteName);

  const pkgs: string[] = [];
  const pkgFilters: Promise<boolean>[] = [];
  // 2. make sure the packages have been used in the site package,
  //    even the packages are not listing in site directly.
  pkgsHaveTailwindConfig.forEach(item => {
    pkgFilters.push(new Promise((resolve) => {
      exec(`npm ls --json ${item.packageName}`, { cwd: NPM_ROOT }, (err, stdout) => {
        if (stdout.indexOf(item.packageName) === -1) {
          return resolve(false);
        }
        // If the site is not listed, then this is not a dep of the site
        if (stdout.indexOf(siteName) === -1) {
          return resolve(false);
        }

        if (siteDeps.indexOf(item.packageName) > -1) {
          pkgs.push(item.packageName);
        } else {
          // if the package is not listed in site package, use absolute path
          pkgs.push(item.packagePath);
        }

        resolve(true);
        return true;
      });
    }));
  });

  await Promise.all(pkgFilters);

  return pkgs;
};

/**
 * Checks if the given package contains site.tailwind.config file and returs its exported value.
 * @param pkg name of the namespace/package, e.g. '@bodiless/core'.
 * @returns tailwind config object.
 */
export const getPackageTailwindConfig = (pkg: string): object => {
  try {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const twConfig = require(`${pkg}/site.tailwind.config`);
    return twConfig;
  } catch (error) {
    return {};
  }
};

const getBodilessTailwindConfig = () => {
  const pkg = path.resolve('package.json');
  const pkgName = getPackageNameFromPackageJson(pkg);
  const siteDeps = Object.keys(getDependenciesFromPackageJson(pkg));
  const depsTwConfigs: any[] = siteDeps.reduce((accum: any[], currDep) => {
    const pkgTwConfig = getPackageTailwindConfig(currDep);
    if (Object.keys(pkgTwConfig).length) {
      accum.push({
        root: getPackageRoot(require.resolve(currDep)),
        tailwindConfig: pkgTwConfig,
      });
    }
    return accum;
  }, []);
  const siteTwConfig = getPackageTailwindConfig(pkgName);
  const mergedConfigs = mergeConfigs(siteTwConfig, depsTwConfigs);

  return mergedConfigs;
};

export {
  getDependenciesFromPackageJson,
  getPackageNameFromPackageJson,
  getBodilessTailwindConfig,
  getBodilessTailwindConfigOld,
};
