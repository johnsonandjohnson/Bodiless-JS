/* eslint-disable import/no-dynamic-require, global-require */
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
import type { Config as TailwindConfig } from 'tailwindcss';
import type { Package } from './mergeConfigs';

const { join } = path;

type Config = Package & {
  name: string,
};

type SortByPrecedence = (
  sourceArray: Config[],
  precedence: string[]
) => Config[];

type ApplyExtraOptions = (
  configs: Config[],
  options?: ExtraOptions,
) => Config[];

/**
 * Options defining how tailwind configuration exported by dependencies
 * should be assembled.
 *
 * @category Tailwind Utility
 */
export type GetTwConfigProps = {
  /**
   *
   */
  pkgPath: string,
  /**
   * The tailwind configuration with which those of dependencies will be merged.
   */
  twConfig: TailwindConfig,
  /**
   * A function which returns the absolute path to a module as resolved from
   * the context of the current module.
   * @example
   * ```
   * const resolver = module => require.resolve(module);
   * ```
   */
  resolver: (pkg: string) => string,
  /**
   * Array of package names used to control the order of precedence when merging
   * tailwind configs.  Configs exported by packages earlier in the list will
   * receive precedence.
   */
  prefer?: string[],
  /**
   * Array of package names to exculde when merging tailwind configs. Named packages
   * will not be included, even if they have an exported `taiwind.config.js`.
   */
  exclude?: string[],
};

type ExtraOptions = Pick<GetTwConfigProps, 'prefer'|'exclude'>;

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

/**
 * Builds a tailwind config by merging those exported from any dependent packages.
 *
 * If any dependencies of your package export a tailwind configuration which will be
 * needed at site level, you must be sure it is exported from your package as well,
 * in case the target site does not know about or include your transitive dependency.
 * This utility makes this easier. Simply export a `tailwind.config.js` from
 * you package like the following:
 *
 * @param props
 * Options to use when creating the tailwind config.
 *
 * @example ** Package level tailwind config **
 * ```
 * import { getPackageTailwindConfig } from '@bodiless/fclasses';
 *
 * const resolver = (pkgName) => require.resolve(pkgName);
 *
 * const twConfig = {
 *  // ...include your own tailwind configuration here.
 *  // (be sure to add a `content` section to prevent purging of any classes used in your package)
 * };
 *
 * module.exports = getPackageTailwindConfig({
 *   twConfig,
 *   resolver,
 * });
 * ```
 *
 * > Note: Be sure to list your package `taiwind.config.js` in the `files` section
 * > of your `package.json`.
 *
 * @category Tailwind Utility
 */
export const getPackageTailwindConfig = (props: GetTwConfigProps): Config[] => {
  const {
    twConfig, resolver, ...extraOptions
  } = props;
  try {
    const pkgPath = join(resolver('./package.json'), '..');
    const pkgJson = require(join(pkgPath, 'package.json'));
    const deps = Object.keys(pkgJson.dependencies);
    const startingConfig: Config[] = twConfig === undefined ? [] : [{
      name: pkgJson.name,
      root: pkgPath,
      tailwindConfig: twConfig,
    }];
    const configs = deps.reduce(
      (config, next) => {
        try {
          const nextExport = require(resolver(join(next, 'tailwind.config')));
          const nextConfig = Array.isArray(nextExport) ? nextExport : [{
            name: next,
            root: join(resolver(join(next, 'package.json')), '..'),
            tailwindConfig: nextExport,
          }];
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
    return applyExtraOptions(configs, extraOptions);
  } catch (e) {
    return [];
  }
};
