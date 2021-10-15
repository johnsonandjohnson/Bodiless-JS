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
const fse = require('fs-extra');
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
  supportedExtensions = ['json', 'tsx', 'jsx', 'js'];

  constructor(pagePath) {
    this.path = pagePath;
  }

  getBasePath() {
    return this.basePath || backendFilePath;
  }

  setBasePath(basePath) {
    this.basePath = basePath;
  }

  get supportedExtensions() {
    return this.supportedExtensions;
  }

  get exists() {
    const files = this.supportedExtensions.map(extension => path.join(this.getBasePath(), `${this.path}.${extension}`));
    return files.some(file => fs.existsSync(file));
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

  static dirHasFiles(dirPath) {
    return new Promise((resove) => {
      try {
        fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
          if (err) {
            return resove(false);
          }

          const filteredFiles = files
            .filter(dirent => dirent.isFile())
            .map(dirent => dirent.name);

          if (!filteredFiles.length) {
            return resove(false);
          }
          return resove(true);
        });
      } catch (error) {
        resove(false);
      }
    });
  }

  async copyDirectory(origin, destination) {
    const bp = this.basePath;
    const originPath = (`${bp}${origin}`).replace(/\/$/, '');
    const destinationPath = (`${bp}${destination}`).replace(/\/$/, '');
    // console.log(`originPath: ${originPath}`);
    // console.log(`destinationPath: ${destinationPath}`);

    const exists = await Page.dirHasFiles(destinationPath);
    if (exists) {
      return Promise.reject(
        new Error(`page ${destination} already exists`),
      );
    }
    fs.mkdirSync(destinationPath, { recursive: true });
    const result = await fse.copy(originPath, destinationPath);
    return result;
  }
}

module.exports = Page;
