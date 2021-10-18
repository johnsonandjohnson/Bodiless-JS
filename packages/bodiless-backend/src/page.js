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

const getDirectories = (dir) => (
  fs.readdirSync(dir).filter((file) => fs.statSync(
    `${dir}/${file}`,
  ).isDirectory())
);
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

  get directory() {
    return `${this.getBasePath()}/${this.path}`;
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

  deleteDirectory() {
    const readPromise = new Promise((resolve, reject) => {
      /**
       * DANGER: fs.rmdir() can delete anything in the code (and it is recursive).
       *         So make sure the directory to delete is inside a region of pages,
       *         and it is not the whole pages directory.
       */
      const [, pageRelativeDir] = this.directory.split('/data/pages/');
      if (!pageRelativeDir) {
        resolve('The page cannot be deleted.');
        return;
      }

      fs.rmdir(this.directory, { recursive: true }, err => {
        if (err) {
          reject(err);
        }
        resolve(this);
      });
    });
    return readPromise;
  }

  hasChildDirectory() {
    const readPromise = new Promise((resolve) => {
      const subdirs = getDirectories(this.directory);
      if (subdirs.length !== 0) {
        resolve('The page cannot be deleted it has child pages. To delete this page, first delete or move all child pages, and retry.');
      } else {
        resolve('Success');
      }
    });
    return readPromise;
  }
}

module.exports = Page;
