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

/* eslint-disable no-console */
import webpack from 'webpack';
import path from 'path';

const TOKENS_PATH = 'tokens';

export const createTokenShadowPlugin = (
  ...packages: string[]
) => new webpack.NormalModuleReplacementPlugin(
  new RegExp(`\\.\\${path.sep}${TOKENS_PATH}`),
  resource => {
    const componentName = path.basename(resource.context);
    for (let i = 0; i < packages.length; i += 1) {
      try {
        const exportName = `${packages[i]}/lib/shadow/${componentName}`;
        // eslint-disable-next-line no-param-reassign
        resource.request = require.resolve(exportName);
        console.log('found shadow', resource.request);
        break;
      // eslint-disable-next-line no-empty
      } catch (e) {}
    }
  }
);
