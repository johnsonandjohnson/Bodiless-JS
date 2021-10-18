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

  static dirHasSubObjects(dirPath, objType) {
    return new Promise((resove) => {
      try {
        fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
          if (err) {
            return resove([]);
          }

          const filteredObjects = files
            .filter(dirent => {
              if (objType === 'file') {
                return dirent.isFile();
              }
              if (objType === 'directory') {
                return dirent.isDirectory();
              }
              return true;
            });

          if (!filteredObjects.length) {
            return resove([]);
          }
          return resove(filteredObjects);
        });
      } catch (error) {
        resove([]);
      }
    });
  }

  static dirHasFiles(dirPath) {
    return Page.dirHasSubObjects(dirPath, 'file');
  }

  static dirHasDirectories(dirPath) {
    return Page.dirHasSubObjects(dirPath, 'directory');
  }

  static rmDirectories(destinationPath, dirPaths) {
    const dels = [];
    dirPaths.forEach(dir => {
      dels.push(new Promise((resove) => {
        fse.remove(`${destinationPath}/${dir.name}`, err => {
          if (err) return console.error(err);
          return resove();
        });
      }));
    });
    return Promise.resolve(Promise.all(dels));
  }

  async copyDirectory(origin, destination) {
    const bp = this.basePath;
    const originPath = (`${bp}${origin}`).replace(/\/$/, '');
    const destinationPath = (`${bp}${destination}`).replace(/\/$/, '');

    const isDestinationPathExists = await Page.dirHasFiles(destinationPath);
    if (isDestinationPathExists.length) {
      return Promise.reject(
        new Error(`page ${destination} already exists`),
      );
    }

    const isOriginPathExists = await Page.dirHasFiles(originPath);
    if (!isOriginPathExists.length) {
      return Promise.reject(
        new Error(`page ${origin} is not exists`),
      );
    }

    // Make sure the destination tree exist
    fs.mkdirSync(destinationPath, { recursive: true });

    // Clone page
    const result = await fse.copy(originPath, destinationPath);

    // If the sub directories have been copied, delete them
    const resultHasDir = await Page.dirHasDirectories(destinationPath);
    if (resultHasDir.length) {
      await Page.rmDirectories(destinationPath, resultHasDir);
    }

    return result;
  }
}

module.exports = Page;
