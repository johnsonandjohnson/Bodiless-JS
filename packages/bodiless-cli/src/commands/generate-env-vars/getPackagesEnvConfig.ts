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

/* eslint-disable max-len, global-require, import/no-dynamic-require */
import path from 'path';
import fs from 'fs';

import { Tree } from './type';

export const getPackageEnvConfig = (rootPath: string): string[] => {
  try {
    const paths: string[] = [];
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const pkgJson = require(path.join(rootPath, '/package.json'));
    const deps = Object.keys({
      ...pkgJson.dependencies,
      ...pkgJson.devDependencies,
    });

    try {
      const docsJsonPath = path.join(rootPath, 'bodiless.env.config.js');
      // eslint-disable-next-line global-require, import/no-dynamic-require
      require(docsJsonPath);
      paths.push(docsJsonPath);
    } catch (e) {
      // do nothing
    }

    deps.forEach(dep => {
      try {
        // eslint-disable-next-line global-require, import/no-dynamic-require
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

const getPackagesEnvConfig = async (defaultConfig:Tree, appEnv:string): Promise<Tree> => {
  const initPath = path.resolve();
  const bodilessEnvConfigPaths:string[] = getPackageEnvConfig(initPath);

  return bodilessEnvConfigPaths.reduce(async (agregatedEnvConfig:Promise<Tree>, envConfigPath:string) => {
    if (fs.existsSync(path.resolve(envConfigPath))) {
      return {
        ...await agregatedEnvConfig,
        ...await require(path.resolve(envConfigPath)).configure(agregatedEnvConfig, appEnv),
      };
    }

    return agregatedEnvConfig;
  }, Promise.resolve(defaultConfig));
};

export default getPackagesEnvConfig;
