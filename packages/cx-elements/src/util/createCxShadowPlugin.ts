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

import { NormalModuleReplacementPlugin } from 'webpack';
import path from 'path';
import fs from 'fs';

const DEFAULT_MATCH = new RegExp(`\\${path.sep}tokens\\${path.sep}`);

export const cxShadowWebpackPlugin = (
  ...packages: string[]
) => new NormalModuleReplacementPlugin(
  DEFAULT_MATCH,
  (resource) => {
    const moduleName = path.basename(resource.request).split('.')[0];
    const foundPaths = packages
      .map(packageName => require.resolve(`${packageName}/${moduleName}`))
      .map(file => fs.existsSync(file))
      .filter(Boolean);
    if (foundPaths.length > 0) {
      const [foundPath] = foundPaths;
      // eslint-disable-next-line no-param-reassign
      resource.request = foundPath;
    }
  }
);
