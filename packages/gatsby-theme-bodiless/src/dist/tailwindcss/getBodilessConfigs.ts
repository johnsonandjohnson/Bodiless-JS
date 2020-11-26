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

/* eslint-disable global-require, import/no-dynamic-require */

import path from 'path';

const whitelistedModules = [
  '@bodiless/layouts',
  '@bodiless/organisms',
];

type TailwindConfigs = {
  purge?: string[],
  theme?: object,
  plugins?: string[],
  variants?: object,
};

const getTailwindConfigs = (modules: string[]) => modules
  .map(module => {
    try {
      const moduleIndexFile = require.resolve(module);
      // when moduleIndexFile is /path/to/module/lib/index.js
      // moduleRoot should be /path/to/module
      const moduleRoot = path.dirname(path.dirname(moduleIndexFile));
      const configs: TailwindConfigs = require(`${module}/tailwind.config.js`);
      return {
        ...configs,
        ...(
          configs.purge !== undefined && Array.isArray(configs.purge)
            ? {
              purge: configs.purge.map((rule: string) => path.join(moduleRoot, rule)),
            }
            : {}
        ),
      };
    } catch (e) {
      return null;
    }
  })
  .filter(Boolean) as TailwindConfigs[];

const getBodilessConfigs = () => getTailwindConfigs(whitelistedModules);

export {
  getTailwindConfigs,
  getBodilessConfigs,
};
export type { TailwindConfigs };
