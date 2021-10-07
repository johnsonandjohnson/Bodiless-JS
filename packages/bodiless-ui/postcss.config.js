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
const fs = require('fs');
const path = require('path');

const findTwConfig = (root = '', tries = 0) => {
  const testPath = path.join(root, 'node_modules', '@bodiless', 'ui', 'bodiless.tailwind.config.js');
  if (fs.existsSync(testPath)) return testPath;
  if (tries > 10) return 'bodiless.tailwind.config.js';
  return findTwConfig(path.join('..', root), tries + 1);
};

module.exports = {
  plugins: [
    // eslint-disable-next-line
    require('tailwindcss')(findTwConfig()),
  ],
};
