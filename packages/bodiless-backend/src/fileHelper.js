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

const backendStaticPath = process.env.BODILESS_BACKEND_STATIC_PATH || '';

const copyFilePromise = (from, to) => new Promise((resolve, reject) => {
  fs.copyFile(from, to, copyErr => {
    if (copyErr) reject(copyErr);
    fs.unlinkSync(from);
    resolve(`/${path.relative(backendStaticPath, to)}`);
  });
});

const generateHash = (str) => {
  // eslint-disable-next-line one-var, one-var-declaration-per-line
  let hash = 0, i, chr;
  // eslint-disable-next-line no-plusplus
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    // eslint-disable-next-line no-bitwise
    hash = ((hash << 5) - hash) + chr;
    // eslint-disable-next-line no-bitwise
    hash |= 0; // Convert to 32bit integer
  }
  return String(-hash);
};

const copyAllFiles = (files, pagePath, nodePath) => {
  const allFiles = [];
  Object.keys(files).forEach(key => allFiles.push(files[key]));

  return Promise.all(allFiles.map(file => {
    const distFolderPath = path.join(backendStaticPath, 'images', pagePath, generateHash(nodePath));

    if (!fs.existsSync(distFolderPath)) {
      fs.mkdirSync(distFolderPath, { recursive: true });
    }

    return copyFilePromise(file.path, path.join(distFolderPath, file.name));
  }));
};

module.exports = {
  copyAllFiles,
};
