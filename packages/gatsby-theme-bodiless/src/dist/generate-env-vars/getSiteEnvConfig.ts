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

import { existsSync, readFile } from 'fs';
import { promisify } from 'util';
import { resolve as resolvePath } from 'path';
import { Tree } from './type';

const dotenv = require('dotenv');

const readFilePromise = promisify(readFile);

const envToJson = async (filePath: string) => dotenv.parse(await readFilePromise(filePath, 'utf8'));

const getSiteEnvConfig = async (appEnv:string = 'production'): Promise<Tree> => {
  const siteEnvFile:Promise<Tree> = await envToJson(resolvePath('.env.site'));
  const siteEnvConfig = resolvePath('bodiless.env.config.js');

  if (existsSync(siteEnvConfig)) {
    return {
      ...siteEnvFile,
      ...await require(siteEnvConfig).configure(siteEnvFile, appEnv),
    };
  }

  return siteEnvFile;
};

export default getSiteEnvConfig;
