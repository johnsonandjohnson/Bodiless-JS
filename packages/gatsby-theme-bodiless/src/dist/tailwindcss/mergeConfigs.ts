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

import { merge, flatten } from 'lodash';
import { getBodilessConfigs } from './getBodilessConfigs';
import type { TailwindConfigs } from './getBodilessConfigs';

const mergeConfigs = (
  siteConfig: TailwindConfigs,
  packageConfigs: Array<TailwindConfigs>,
) => ({
  ...siteConfig,
  // purge setting
  purge: [
    ...flatten(merge(packageConfigs).map((config: TailwindConfigs) => config.purge)),
    ...(siteConfig.purge ? siteConfig.purge : []),
  ],
  // theme setting
  // dummy first argument because of https://github.com/microsoft/TypeScript/issues/28010#issuecomment-713484584
  theme: merge({}, ...packageConfigs, siteConfig).theme,
  // variants setting
  variants: merge({}, ...packageConfigs, siteConfig).variants,
  // plugins setting
  plugins: [
    ...flatten(merge(packageConfigs).map((config: TailwindConfigs) => config.plugins)),
    ...(siteConfig.plugins ? siteConfig.plugins : []),
  ],
});

const bodilessConfigs = getBodilessConfigs();
const mergeWithBodilessConfigs = (config: TailwindConfigs) => mergeConfigs(config, bodilessConfigs);

export {
  mergeConfigs,
  mergeWithBodilessConfigs,
};
