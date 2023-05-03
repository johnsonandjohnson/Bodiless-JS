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

import merge from 'lodash/merge';
import flatten from 'lodash/flatten';
import path from 'path';
import type { Config as TailwindConfig } from 'tailwindcss';
import type { RawFile } from 'tailwindcss/types/config';

export type Package = {
  root: string,
  tailwindConfig: Partial<TailwindConfig>,
};

/**
 * @internal
 * @param packages
 */
const getTailwindConfigs = (packages: Package[]) => packages
  .map(({ root, tailwindConfig }) => ({
    ...tailwindConfig,
    ...(
      tailwindConfig.content !== undefined && Array.isArray(tailwindConfig.content)
        ? {
          content: tailwindConfig.content.map((rule: string | RawFile) => {
            const { raw = null } = rule as RawFile;
            return raw ? path.join(root, raw) : path.join(root, rule.toString());
          }),
        }
        : {}
    ),
  }))
  .filter(Boolean);

const mergeConfigs = (
  packages: Package[],
) => {
  const packageConfigs = getTailwindConfigs(packages);
  return {
    // content setting
    content: [
      // @todo: workaround for https://github.com/johnsonandjohnson/Bodiless-JS/issues/1584
      // './src/**/!(*.d).{ts,js,jsx,tsx}',
      ...flatten(merge(packageConfigs).map((config: TailwindConfig) => config.content)),
    ],
    // theme setting
    // dummy first argument because of https://github.com/microsoft/TypeScript/issues/28010#issuecomment-713484584
    theme: merge({}, ...packageConfigs).theme,
    // plugins setting
    plugins: [
      ...flatten(
        merge(packageConfigs).map((config: TailwindConfig) => config.plugins),
      ).filter(Boolean),
    ],
  };
};

export {
  mergeConfigs,
};
