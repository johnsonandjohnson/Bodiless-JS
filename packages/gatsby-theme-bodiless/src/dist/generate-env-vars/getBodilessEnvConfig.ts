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
import { existsSync } from 'fs';
import { promisify } from 'util';
import { resolve } from 'path';
import { Tree } from './type';

const asyncGlob = promisify(require('glob'));

const getBodilessEnvConfig = async (defaultConfig:Tree, appEnv:string) => {
  const bodilessEnvConfigPaths:string[] = await asyncGlob('node_modules/@bodiless/*/bodiless.env.config.{js,ts}');

  return bodilessEnvConfigPaths.reduce(async (agregatedEnvConfig:Promise<Tree>, envConfigPath:string) => {
    if (existsSync(resolve(envConfigPath))) {
      return {
        ...await agregatedEnvConfig,
        ...await require(resolve(envConfigPath)).configure(agregatedEnvConfig, appEnv),
      };
    }

    return agregatedEnvConfig;
  }, Promise.resolve(defaultConfig));
};

export default getBodilessEnvConfig;
