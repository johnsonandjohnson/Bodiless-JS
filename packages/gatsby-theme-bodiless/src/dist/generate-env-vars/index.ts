#!/usr/bin/env node
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

import getDefaults from './getDefaults';
import getPackagesEnvConfig from './getPackagesEnvConfig';
import getSiteEnvConfig from './getSiteEnvConfig';

import { jsonToEnv } from './utils';

const configureEnvFileFor = async (appEnv:string):Promise<void> => {
  const defaultEnvConfig = await getDefaults(appEnv);

  await jsonToEnv({
    ...await getPackagesEnvConfig(defaultEnvConfig, appEnv),
    ...await getSiteEnvConfig(appEnv),
  }, appEnv);
};

const init = async () => {
  await configureEnvFileFor('production');
  await configureEnvFileFor('development');
};

export default init;
