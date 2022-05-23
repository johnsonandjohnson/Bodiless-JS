/* eslint-disable import/no-dynamic-require, global-require */
/**
 * Copyright © 2022 Johnson & Johnson
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
import { mergeConfigs } from './mergeConfigs';
import { getPackageTailwindConfig } from './getPackageTailwindConfig';

import type { GetTwConfigProps } from './getPackageTailwindConfig';

/**
 * Use this at site level to aggregate the tailwind configuration exported
 * from all dependent packages.  This will ensure that any utilities defined
 * at package level are included in your site tailwind configuration, and that
 * any classes used at pacakge level are not purged.
 *
 * > Note: Modules are exported from `@bodiless/fclasses` using ES module syntax,
 * > but must be required by tailwind config using CommonJS. You can use a library
 * > like [esm](https://www.npmjs.com/package/esm) to import this utility.
 *
 * @param props
 * Options to use when creating the tailwind config.
 *
 * @example ** Site level tailwind.config.js **
 *
 * ```js
 * const requireEsm = require('esm')(module);
 *
 * const { buildTailwindConfig } = requireEsm('@bodiless/fclasses');
 *
 * const twConfig = {
 *  // ...include your own tailwind configuration here.
 *  // (be sure to add a `content` section to prevent purging of any classes used in your site).
 * };
 *
 * module.exports = buildTailwindConfig({
 *   twConfig,
 *   resolver: (pkgName) => require.resolve(pkgName),
 *   // Ensure that site-level config takes precedence over packages.
 *   prefer: ['@sites/--minimal--'],
 * });
 * ```
 *
 * @category Tailwind Utility
 */
export const buildTailwindConfig = (
  props: GetTwConfigProps
) => mergeConfigs(getPackageTailwindConfig(props));
