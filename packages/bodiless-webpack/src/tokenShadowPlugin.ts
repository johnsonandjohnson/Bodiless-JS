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

import webpack, { Configuration } from 'webpack';
import path from 'path';
import fs from 'fs';
import { createLogger, PluginOptions } from './util';

const TOKENS_REGEX = /\.\/tokens$/;

type Resolver = (args: { componentName: string, packageName?: string }) => string;

type TokenShadowPluginOptions = Omit<PluginOptions, 'exclude'> & {
  resolvers: Resolver[];
};

const findPackageName = (resourcePath: string): string|undefined => {
  if (resourcePath.length === 1) return undefined;
  const dir = path.dirname(resourcePath);
  try {
    const pjPath = path.join(dir, 'package.json');
    if (fs.existsSync(pjPath)) {
      const json = fs.readFileSync(pjPath);
      const pj = JSON.parse(json.toString());
      if (pj.name) return pj.name;
    }
  } catch (e) {
    return undefined;
  }
  return findPackageName(dir);
};

export const createTokenShadowPlugin = (
  { logging = true, resolvers = [] }: TokenShadowPluginOptions
) => {
  const log = createLogger(logging);
  return new webpack.NormalModuleReplacementPlugin(
    TOKENS_REGEX,
    resource => {
      const componentName = path.basename(resource.context);
      const packageName = findPackageName(resource.context);
      // console.log('componentName', componentName, packages, resource.request);
      // Loop through all packges until we fid one that exports a shadow...
      for (let i = 0; i < resolvers.length; i += 1) {
        const newRequest = resolvers[i]({ componentName, packageName });
        // console.log(componentName, newRequest);
        if (newRequest) {
          log(`[Shadow replacement] Replacing import in ${resource.contextInfo.issuer}`);
          log(` ↳ ${resource.request} → ${newRequest}\n`);
          // eslint-disable-next-line no-param-reassign
          resource.request = newRequest;
          break;
        }
      }
    }
  );
};

export const addTokenShadowPlugin = (
  config: Configuration,
  options: TokenShadowPluginOptions,
): Configuration => ({
  ...config,
  plugins: [
    ...(config.plugins || []),
    createTokenShadowPlugin(options),
  ],
});
