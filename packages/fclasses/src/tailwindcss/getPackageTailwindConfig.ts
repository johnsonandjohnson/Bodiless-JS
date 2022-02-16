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

export const getPackageTailwindConfig = (rootPath: string) => {
  try {
    const startingConfig: Package[] = [{
      root: rootPath,
      // eslint-disable-next-line global-require, import/no-dynamic-require
      tailwindConfig: require(join(rootPath, 'site.tailwind.config')),
    }];
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const pkgJson = require(join(rootPath, '/package.json'));
    const deps = Object.keys({
      ...pkgJson.dependencies,
      ...pkgJson.devDependencies,
    });
    const configs = deps.reduce(
      (config, next) => {
        try {
          // eslint-disable-next-line global-require, import/no-dynamic-require
          const nextConfig = require(join(next, 'lib/getTailwindConfig')).getTailwindConfig();
          const addedPaths = config.map(item => item.root);
          const dedupedConfigs = nextConfig
            .filter((item: Package) => addedPaths.includes(item.root) === false);
          return config.concat(dedupedConfigs);
        } catch (e) {
          return config;
        }
      },
      startingConfig
    );
    return configs;
  } catch (e) {
    return {};
  }
};
