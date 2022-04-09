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

import * as path from 'path';
/* eslint-disable global-require, import/no-dynamic-require */

export const getPackageEnvConfig = (rootPath: string): string[] => {
  try {
    const paths: string[] = [];
    const pkgJson = require(path.join(rootPath, '/package.json'));
    const deps = Object.keys({
      ...pkgJson.dependencies,
    });

    try {
      const docsJsonPath = path.join(rootPath, 'bodiless.env.config.js');
      require(docsJsonPath);
      paths.push(docsJsonPath);
    } catch (e) {
      // do nothing
    }

    deps.forEach(dep => {
      try {
        const depDocsJsonPath = require(path.join(dep, 'lib/getBodilessEnvConfig'))
          .getBodilessEnvConfig();
        paths.push(depDocsJsonPath[0]);
      } catch (e) {
        // do nothing
      }
    });
    return paths;
  } catch (e) {
    return [];
  }
};

export default getPackageEnvConfig;
