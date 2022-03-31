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

const path = require('path');
const fs = require('fs');

module.exports = () => {
  try {
    const sitePath = path.resolve();
    const aliasesPath = `${sitePath}/src/data/site/redirect-aliases.json`;
    const json = fs.readFileSync(aliasesPath);
    const data = JSON.parse(json.toString());
    return data || {};
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log("No redirect aliases found. The file doesn't exist:", error.path);
    } else {
      console.error(error);
    }
    return [];
  }
};
