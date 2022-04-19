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
import * as path from 'path';
import * as fs from 'fs';
import { getPackageEnvConfig } from '../getPackageEnvConfig';
import { Tree } from './type';

const getPackagesEnvConfig = async (defaultConfig:Tree, appEnv:string): Promise<Tree> => {
  const initPath = process.cwd();
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
