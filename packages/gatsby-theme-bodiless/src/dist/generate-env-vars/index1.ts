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
 import getBodilessEnvConfig from './getBodilessEnvConfig';
 import getSiteEnvConfig from './getSiteEnvConfig';

 import { jsonToEnv } from './utils';

 const configureEnvFileFor = async (nodeEnv:string) => {
   const defaultEnvConfig = await getDefaults(nodeEnv);

   await jsonToEnv({
     ...await getBodilessEnvConfig(defaultEnvConfig, nodeEnv),
     ...await getSiteEnvConfig(nodeEnv),
   }, nodeEnv);
 };

 const init = async () => {
   await configureEnvFileFor('production');
   await configureEnvFileFor('development');
 };

 export default init;
