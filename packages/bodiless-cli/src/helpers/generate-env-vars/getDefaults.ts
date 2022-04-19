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

/* eslint-disable no-param-reassign */
import { Tree } from './type';
import { getCurrentGitBranch } from './utils';

const defaultEnvValues: Tree = {
  BODILESS_TAILWIND_THEME_ENABLED: '1',
  BODILESS_BACKEND_DATA_FILE_PATH: 'src/data',
  BODILESS_BACKEND_STATIC_PATH: 'static',
  BODILESS_BACKEND_COMMIT_ENABLED: '0',
  BODILESS_BACKEND_SAVE_ENABLED: '1',
  BODILESS_ALERT_ON_PAGE_LOAD_ENABLED: '0',
  BODILESS_BACKEND_PORT: '8006',
  APP_GIT_PATH: '.',
  BODILESS_DOCS_URL: '/___docs',
};

const defaultEnvConfig: Tree = {
  production: { ...defaultEnvValues, BODILESS_BACKEND_SAVE_ENABLED: '0' },
  changeset: { ...defaultEnvValues, BODILESS_BACKEND_COMMIT_ENABLED: '1' },
  default: { ...defaultEnvValues },
};

const validNodeEnv = (val:string):boolean => Object.keys(defaultEnvConfig).includes(val);

const isChangeset = (branchName:string):boolean => branchName.startsWith('test/') || branchName.startsWith('changeset/');

const getDefaults = async (appEnv:string = 'production'): Promise<Tree> => {
  const branch = await getCurrentGitBranch();

  if (appEnv !== 'production' && isChangeset(branch)) {
    appEnv = 'changeset';
  }

  const defaultEnv = validNodeEnv(appEnv) ? defaultEnvConfig[appEnv] : defaultEnvConfig.default;

  return defaultEnv as Tree;
};

export default getDefaults;
