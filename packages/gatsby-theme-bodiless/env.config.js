/**
 * Copyright © 2019 Johnson & Johnson
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

const gitCurrentBranch = require('git-branch');

/* eslint-disable no-param-reassign */
module.exports = {
  configure: async (defaultConfig, nodeEnv) => {
    const config = {
      production: {
        BODILESS_BACKEND_COMMIT_ENABLED: '0',
        BODILESS_BACKEND_SAVE_ENABLED: '0',
      },
      changeset: {
        BODILESS_BACKEND_COMMIT_ENABLED: '1',
        BODILESS_BACKEND_SAVE_ENABLED: '1',
      },
      default: {
        BODILESS_BACKEND_COMMIT_ENABLED: '0',
        BODILESS_BACKEND_SAVE_ENABLED: '1',
      },
    };

    const validNodeEnv = val => Object.keys(config).includes(val);
    const isChangeset = branchName => branchName.startsWith('test/') || branchName.startsWith('changeset/');

    const branch = await gitCurrentBranch();

    if (nodeEnv !== 'production' && isChangeset(branch)) {
      nodeEnv = 'changeset';
    }

    return {
      ...defaultConfig,
      ...validNodeEnv(nodeEnv)
        ? config[nodeEnv]
        : config.default,
    };
  },
};
