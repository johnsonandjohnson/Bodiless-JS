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

const fs = require('fs');

const defaultSSIConfPath = 'ssi/ssi_conf.json';

// @todo: replace unsafe fs
// https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v2-to-v3/#using-fs-in-ssr
const getSSIEntities = ssiConfPath => {
  const confPath = ssiConfPath || defaultSSIConfPath;
  try {
    return JSON.parse(fs.readFileSync(confPath));
  } catch (error) {
    // we need to log the error
    return {};
  }
};

module.exports = getSSIEntities;
