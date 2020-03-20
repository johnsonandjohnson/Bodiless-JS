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
const path = require('path');
const Logger = require('./logger');

const logger = new Logger('BACKEND');

const backendFilePath = process.env.BODILESS_BACKEND_DATA_FILE_PATH || '';

// once we on node > 10.12.0
// we can leverage fs.mkdir since it supports { recursive: true }
function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

class Page {
  constructor(pagePath) {
    this.path = pagePath;
  }

  getBasePath() {
    return this.basePath || backendFilePath;
  }

  setBasePath(basePath) {
    this.basePath = basePath;
  }

  get file() {
    return `${this.getBasePath()}/${this.path}.json`;
  }

  read() {
    const readPromise = new Promise(resolve => {
      fs.readFile(this.file, (err, data) => {
        if (err) logger.log(err);
        resolve(data || {});
      });
    });
    return readPromise;
  }

  write(data) {
    const readPromise = new Promise((resolve, reject) => {
      ensureDirectoryExistence(this.file);
      fs.writeFile(this.file, JSON.stringify(data, null, 2), err => {
        if (err) {
          reject(err);
        }
        resolve(this);
      });
    });
    return readPromise;
  }

  delete() {
    const readPromise = new Promise((resolve, reject) => {
      ensureDirectoryExistence(this.file);
      fs.unlink(this.file, err => {
        if (err) {
          reject(err);
        }
        resolve(this);
      });
    });
    return readPromise;
  }
}

module.exports = Page;
