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
const replace = require('replace-in-file');
const Logger = require('./logger');

const logger = new Logger('BACKEND');

const backendFilePath = process.env.BODILESS_BACKEND_DATA_FILE_PATH || '';
const backendStaticPath = process.env.BODILESS_BACKEND_STATIC_PATH || '';

const getDirectories = dir =>
  fs
    .readdirSync(dir)
    .filter(file => fs.statSync(`${dir}/${file}`).isDirectory());
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
    const files = this.supportedExtensions.map(extension =>
      path.join(this.getBasePath(), `${this.path}.${extension}`),
    );
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

  static dirHasSubObjects(dirPath, objType) {
    return new Promise(resove => {
      try {
        fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
          if (err) {
            return resove([]);
          }

          const filteredObjects = files.filter(item => {
            if (objType === 'file') {
              return item.isFile();
            }
            if (objType === 'directory') {
              return item.isDirectory();
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
      dels.push(
        new Promise(resove => {
          fse.remove(`${destinationPath}/${dir.name}`, err => {
            if (err) return console.error(err);
            return resove();
          });
        }),
      );
    });
    return Promise.resolve(Promise.all(dels));
  }

  static jsFilesPathResolve(originPath, destinationPath, files) {
    const actions = [];
    const reg = /from ('|")(\..*)('|")/g;

    const readF = file =>
      new Promise((resove, reject) => {
        const filePath = `${destinationPath}/${file.name}`;
        fs.readFile(filePath, 'utf8', (err, content) => {
          if (err) return reject();
          const matchs = content.match(reg);
          if (!matchs.length) return reject();
          let newContent = content;
          matchs.forEach(item => {
            const delimiter = item[item.search(/'|"/)];
            const oldPath = item.split(' ')[1].replace(/'|"/g, '');
            const from = path.dirname(filePath);
            const to = path.normalize(`${originPath}/${oldPath}`);
            const newPath = path.relative(from, to);

            newContent = newContent.replace(
              `${delimiter}${oldPath}${delimiter}`,
              `${delimiter}${newPath}${delimiter}`,
            );
          });
          fs.writeFile(filePath, newContent, writeErr => {
            if (writeErr) return reject();
            return resove();
          });
          return true;
        });
      });

    files.forEach(file => {
      actions.push(readF(file));
    });

    return Promise.resolve(Promise.all(actions));
  }

  async copyDirectory(origin, destination) {
    const bp = this.basePath;
    const originPath = `${bp}${origin}`.replace(/\/$/, '');
    const destinationPath = `${bp}${destination}`.replace(/\/$/, '');

    const isDestinationPathExists = await Page.dirHasFiles(destinationPath);
    if (isDestinationPathExists.length) {
      return Promise.reject(new Error(`page ${destination} already exists`));
    }

    const isOriginPathExists = await Page.dirHasFiles(originPath);
    if (!isOriginPathExists.length) {
      return Promise.reject(new Error(`page ${origin} is not exists`));
    }

    // Make sure the destination tree exist
    fs.mkdirSync(destinationPath, { recursive: true });

    // Clone page
    await Promise.all(
      isOriginPathExists.map(file => {
        const from = `${originPath}/${file.name}`;
        const to = `${destinationPath}/${file.name}`;
        return new Promise((resove, reject) => {
          fse.copy(from, to, err => {
            if (err) return reject(err);
            return resove();
          });
        });
      }),
    );

    // If the sub directories have been copied, delete them
    const resultHasDir = await Page.dirHasDirectories(destinationPath);
    if (resultHasDir.length) {
      await Page.rmDirectories(destinationPath, resultHasDir);
    }

    // Update require paths for js files
    const jsFiles = isOriginPathExists.filter(file => {
      const exts = ['.tsx', '.jsx', '.js', '.ts'];
      const fileExtname = path.extname(file.name);

      return exts.indexOf(fileExtname) > -1;
    });
    if (jsFiles.length) {
      await Page.jsFilesPathResolve(originPath, destinationPath, jsFiles);
    }
    // Clone images for page & update page data
    await Page.clonedPageImages(origin, destination);

    return 'success';
  }

  static clonedPageImages(origin, destination) {
    Page.clonePageAssets(origin, destination, '/images/pages');
  }

  static async clonePageAssets(origin, destination, target) {
    // Backend Page data and static file path formating
    const bp = this.basePath;
    const bsp = backendStaticPath;

    const originStaticPath = `${bsp}${target}${origin}`.replace(/\/$/, '');
    const destinationStaticPath = `${bsp}${target}${destination}`.replace(
      /\/$/,
      '',
    );
    const originPath = `${bp}${origin}`.replace(/\/$/, '');
    const destinationPath = `${bp}${destination}`.replace(/\/$/, '');

    try {
      // Check if any directory exist at origin file path and it has any files.
      const isStaticDirsExistAtOrigin = fs.existsSync(originStaticPath);
      if (isStaticDirsExistAtOrigin) {
        // Check for all files & Dirs at origin static directory to get list of dirs and files
        // available apart from list from above origin page data directory

        // Scan origin directory (page being cloned) to get existing directories name
        const subDirsAtOrigin = await Page.dirHasDirectories(originPath);

        // Get list dirs & files at static origin
        const subDirsAtStaticOrigin = await Page.dirHasSubObjects(
          originStaticPath,
        );

        // Prepare the list which needs to be copied
        const assetsToBeCopied = subDirsAtStaticOrigin.filter(
          asset => !subDirsAtOrigin.includes(asset),
        );
        if (assetsToBeCopied.length) {
          const copyAssets = await Page.copyAssetsPromise(
            originStaticPath,
            destinationStaticPath,
            subDirsAtOrigin,
          );
          if (copyAssets === 'success') {
            // Update cloned page files with newly copied assets destination path
            const clonedPageFilesAtDestination = await Page.dirHasFiles(
              destinationPath,
            ).then(results => results.map(dirent => dirent.name));

            if (clonedPageFilesAtDestination.length) {
              const pathFrom = origin.replace(/\/$/, '');
              const pathTo = destination.replace(/\/$/, '');

              clonedPageFilesAtDestination.map(async file => {
                const fileToBeUpdated = path.join(destinationPath, file);
                const options = {
                  files: fileToBeUpdated,
                  from: new RegExp(pathFrom, 'g'),
                  to: pathTo,
                };

                await Page.updateFileContent(options);
              });
            }
          }
        }
      }
    } catch (err) {
      if (err) logger.log(err);
    }
  }

  static copyAssetsPromise(origin, destination, excludedDirs = []) {
    return new Promise((resolve, reject) => {
      fse.copy(
        origin,
        destination,
        {
          filter: src => {
            if (excludedDirs.length) {
              if (excludedDirs.indexOf(src.split('\\').pop()) !== -1) {
                return false;
              } else return true;
            }
            return true;
          },
        },
        err => {
          if (err) return reject(err);
          return resolve('success');
        },
      );
    });
  }

  static updateFileContent(options) {
    return new Promise(resolve => {
      try {
        replace(options, (error, results) => {
          if (error) {
            return resolve([]);
          }
          return resolve(results);
        });
      } catch (error) {
        resolve([]);
      }
    });
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
    const readPromise = new Promise(resolve => {
      const subdirs = getDirectories(this.directory);
      if (subdirs.length !== 0) {
        resolve(
          'The page cannot be deleted it has child pages. To delete this page, first delete or move all child pages, and retry.',
        );
      } else {
        resolve('Success');
      }
    });
    return readPromise;
  }
}

module.exports = Page;
