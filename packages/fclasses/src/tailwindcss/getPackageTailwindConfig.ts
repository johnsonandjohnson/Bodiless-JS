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
import type { Package } from './mergeConfigs';

const { join } = path;

type Config = Package & {
  name: string,
};

type ExtraOptions = {
  prefer?: string[],
  exclude?: string[],
};

type SortByPrecedence = (
  sourceArray: Config[],
  precedence: string[]
) => Config[];

type ApplyExtraOptions = (
  configs: Config[],
  options?: ExtraOptions,
) => Config[];

type GetPackageTailwindConfig = (
  rootPath: string,
  options?: ExtraOptions
) => Config[] | {};

const sortByPrecedence: SortByPrecedence = (
  sourceArray,
  precedence,
) => sourceArray
  .sort((el1, el2) => {
    if (precedence.includes(el1.name) && precedence.includes(el2.name)) {
      if (precedence.indexOf(el1.name) < precedence.indexOf(el2.name)) {
        return -1;
      }
      return 1;
    }
    if (precedence.includes(el1.name)) {
      return -1;
    }
    if (precedence.includes(el2.name)) {
      return 1;
    }
    return 0;
  })
  .reverse();

const applyExtraOptions: ApplyExtraOptions = (configs, options) => {
  let configs$ = configs;
  if (options?.prefer) {
    configs$ = sortByPrecedence(configs$, options.prefer);
  }
  if (options?.exclude) {
    configs$ = configs$.filter(
      config => options.exclude?.includes(config.name) === false
    );
  }
  return configs$;
};

export const getPackageTailwindConfig: GetPackageTailwindConfig = (rootPath, options) => {
  try {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const pkgJson = require(join(rootPath, '/package.json'));
    const pkgName = pkgJson.name;
    const deps = Object.keys({
      ...pkgJson.dependencies,
      ...pkgJson.devDependencies,
    });
    const startingConfig: Config[] = [{
      name: pkgName,
      root: rootPath,
      // eslint-disable-next-line global-require, import/no-dynamic-require
      tailwindConfig: require(join(rootPath, 'site.tailwind.config')),
    }];
    const configs = deps.reduce(
      (config, next) => {
        try {
          // eslint-disable-next-line global-require, import/no-dynamic-require
          const nextConfig = require(join(next, 'lib/getTailwindConfig')).getTailwindConfig();
          const addedPaths = config.map(item => item.root);
          const dedupedConfigs = nextConfig
            .filter((item: Config) => addedPaths.includes(item.root) === false);
          return config.concat(dedupedConfigs);
        } catch (e) {
          return config;
        }
      },
      startingConfig
    );
    return applyExtraOptions(configs, options);
  } catch (e) {
    return {};
  }
};
