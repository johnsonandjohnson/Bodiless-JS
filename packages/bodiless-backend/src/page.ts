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

import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import os from 'os';
import replace from 'replace-in-file';
import type { Dirent, PathLike } from 'fs';
import type { ReplaceInFileConfig, ReplaceResult } from 'replace-in-file';
import Logger from './logger';

const logger = new Logger('BACKEND');

const getDirectories = (dir: string) => fs
  .readdirSync(dir)
  .filter((file) => fs.statSync(`${dir}/${file}`).isDirectory());
// @todo: update to fs.mkdir - once we on node > 10.12.0
// we can leverage fs.mkdir since it supports { recursive: true }
function ensureDirectoryExistence(filePath: string): void {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

class Page {
  path: string = '';

  basePath: string = '';

  backendFilePath: string;

  backendStaticPath: string = process.env.BODILESS_BACKEND_STATIC_PATH || '';

  static imgAssetsPath: string = `/images${path.sep}pages`;

  extensions = ['json', 'tsx', 'jsx', 'js'];

  constructor(pagePath: string) {
    this.path = pagePath;
    this.backendFilePath = process.env.BODILESS_BACKEND_DATA_FILE_PATH || '';
    this.backendStaticPath = process.env.BODILESS_BACKEND_STATIC_PATH || '';
  }

  getBasePath() {
    return this.basePath || this.backendFilePath;
  }

  setBasePath(basePath: string) {
    this.basePath = basePath;
  }

  get supportedExtensions() {
    return this.extensions;
  }

  get exists() {
    const files = this.supportedExtensions.map((extension) => path.join(
      this.getBasePath(), `${this.path}.${extension}`
    ));
    return files.some((file) => fs.existsSync(file));
  }

  get file() {
    return `${this.getBasePath()}/${this.path}.json`;
  }

  get directory() {
    return `${this.getBasePath()}/${this.path}`;
  }

  read() {
    return new Promise<string>((resolve) => {
      fs.readFile(
        this.file,
        'utf8',
        (err: NodeJS.ErrnoException | null, data: string) => {
          if (err) logger.log(err.message);
          resolve(data);
        }
      );
    });
  }

  write(data: any) {
    return new Promise<string>((resolve, reject) => {
      ensureDirectoryExistence(this.file);
      fs.writeFile(this.file, JSON.stringify(data, null, 2), (err) => {
        if (err) {
          reject(err);
        }
        resolve('ok');
      });
    });
  }

  delete() {
    return new Promise<string>((resolve, reject) => {
      ensureDirectoryExistence(this.file);
      fs.unlink(this.file, (err) => {
        if (err) {
          reject(err);
        }
        resolve('ok');
      });
    });
  }

  static dirHasSubObjects(dirPath: string, objType?: string) {
    // @todo: add reject
    return new Promise<Dirent[]>((resolve) => {
      try {
        fs.readdir(
          dirPath,
          { withFileTypes: true },
          (err: NodeJS.ErrnoException | null, files: Dirent[]) => {
            if (err) {
              return resolve([]);
            }

            const filteredObjects = files.filter((item) => {
              if (objType === 'file') {
                return item.isFile();
              }
              if (objType === 'directory') {
                return item.isDirectory();
              }
              return true;
            });

            if (!filteredObjects.length) {
              return resolve([]);
            }
            return resolve(filteredObjects);
          }
        );
      } catch (error) {
        resolve([]);
      }
    });
  }

  static dirHasFiles(dirPath: string): Promise<Dirent[]> {
    return Page.dirHasSubObjects(dirPath, 'file');
  }

  static dirHasDirectories(dirPath: string) {
    return Page.dirHasSubObjects(dirPath, 'directory');
  }

  static rmDirectories(destinationPath: string, dirPaths: Dirent[]) {
    const dels: Promise<string>[] = [];
    dirPaths.forEach((dir) => {
      dels.push(
        new Promise((resolve, reject) => {
          fse.remove(`${destinationPath}/${dir.name}`, (err: any) => {
            if (err) {
              return reject(err);
            }
            return resolve('ok');
          });
        }),
      );
    });
    return Promise.resolve(Promise.all(dels));
  }

  static jsFilesPathResolve(
    originPath: string,
    destinationPath: string,
    files: Dirent[]
  ) {
    const actions: Promise<string>[] = [];
    const reg = /from ('|")(\.\..*)('|")/g;

    const readF = (file: Dirent) => new Promise<string>((resolve, reject) => {
      const filePath = `${destinationPath}/${file.name}`;
      fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) return reject();
        const matches = content.match(reg);
        if (!matches?.length) return reject();
        let newContent = content;
        matches.forEach((item) => {
          const delimiter = item[item.search(/'|"/)];
          const oldPath = item.split(' ')[1].replace(/'|"/g, '');
          const from = path.dirname(filePath);
          const to = path.normalize(`${originPath}/${oldPath}`);
          const newPath = path.relative(from, to).replace(/\\/g, '/');

          newContent = newContent.replace(
            `${delimiter}${oldPath}${delimiter}`,
            `${delimiter}${newPath}${delimiter}`,
          );
        });
        fs.writeFile(filePath, newContent, (writeErr) => {
          if (writeErr) return reject();
          return resolve('ok');
        });
        return true;
      });
    });

    files.forEach((file) => {
      actions.push(readF(file));
    });

    return Promise.resolve(Promise.all(actions));
  }

  async copyDirectory(origin: string, destination: string): Promise<object> {
    const {basePath} = this;
    const originPath = path.resolve(basePath, origin).replace(/\/$/, '');
    const destinationPath = path.resolve(basePath, destination).replace(/\/$/, '');
    const isDestinationPathExists = await Page.dirHasFiles(destinationPath);

    if (isDestinationPathExists.length) {
      return Promise.reject(new Error(`page ${destinationPath} already exists`));
    }

    const isOriginPathExists = await Page.dirHasFiles(originPath);
    if (!isOriginPathExists.length) {
      return Promise.reject(new Error(`page ${originPath} does not exist`));
    }

    // Make sure the destination tree exist
    fs.mkdirSync(destinationPath, { recursive: true });

    // Clone page
    await Promise.all(
      isOriginPathExists.map((file) => {
        const from = `${originPath}/${file.name}`;
        const to = `${destinationPath}/${file.name}`;
        return new Promise((resolve, reject) => {
          fse.copy(from, to, (err) => {
            if (err) return reject(err);
            return resolve('ok');
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
    const jsFiles = isOriginPathExists.filter((file) => {
      const exts = ['.tsx', '.jsx', '.js', '.ts'];
      const fileExtname = path.extname(file.name);

      return exts.indexOf(fileExtname) > -1;
    });
    if (jsFiles.length) {
      await Page.jsFilesPathResolve(originPath, destinationPath, jsFiles);
    }

    // Clone Image assets
    this.clonePageImgAssets(origin, destination, this.basePath);

    return {status: 'ok'};
  }

  clonePageImgAssets(
    origin: string,
    destination: string,
    basePath: string
  ) {
    this.clonePageAssets(origin, destination, basePath, Page.imgAssetsPath);
  }

  async clonePageAssets(
    origin: string,
    destination: string,
    basePath: string,
    target: string
  ) {
    const originPath = origin.replace(/\/$/, '');
    const originPathCrossPlatform = os.platform() === 'win32'
      ? originPath.replace('/', '\\\\')
      : originPath;
    const destinationPath = destination.replace(/\/$/, '');
    const destinationPathCrossPlatform = os.platform() === 'win32'
      ? destinationPath.replace('/', '\\')
      : destinationPath;

    const originStaticPath = path.join(this.backendStaticPath, target, originPath);
    const destinationStaticPath = path.join(
      this.backendStaticPath,
      target,
      destinationPath,
    );

    const originPagePath = path.join(basePath, originPath);
    const destinationPagePath = path.join(basePath, destinationPath);

    try {
      // Check if any directory exist at origin file path and it has any files.
      if (fs.existsSync(originStaticPath)) {
        // Scan origin directory (page being cloned) to get list of existing directories name
        const subDirsAtOrigin = await Page.dirHasDirectories(
          originPagePath,
        ).then((dirent) => dirent.map((dirent) => dirent.name));

        // Get list dirs & files at origin static location
        const subDirsAtStaticOrigin = await Page.dirHasSubObjects(
          originStaticPath,
        ).then((dirent) => dirent.map((dirent) => dirent.name));

        // Prepare the list which needs to be copied
        const assetsToBeCopied = subDirsAtStaticOrigin.filter(
          (asset) => !subDirsAtOrigin.includes(asset),
        );

        if (assetsToBeCopied.length) {
          // Clone Assets
          await Promise.all(
            assetsToBeCopied.map((item) => {
              const fromPath = path.join(originStaticPath, item);
              const toPath = path.join(destinationStaticPath, item);
              return new Promise((resolve, reject) => {
                fse.copy(fromPath, toPath, (err) => {
                  if (err) return reject(err);
                  return resolve('ok');
                });
              });
            }),
          );

          // Update cloned page files with newly copied assets destination path
          const clonedPageFilesAtDestination = await Page.dirHasFiles(
            destinationPagePath,
          ).then((results) => results.map((dirent) => dirent.name));

          if (clonedPageFilesAtDestination.length) {
            await Promise.all(
              clonedPageFilesAtDestination.map(async (item) => {
                const fileToBeUpdated = path.join(destinationPagePath, item);
                // Make sure to not replace '/images/pages' part of the path
                // .e.g if the source page path is '/images';
                const imgAssetsPath = Page.imgAssetsPath.replace('\\', '\\\\\\\\');
                // If homepage, originPathCrossPlatform will be empty, so this
                // template string handles both cases:
                // - '/images/pages' for homepage (/)
                // - '/images/pages/example for others (/example)
                const fromPath = `${imgAssetsPath}${originPathCrossPlatform}`;
                // New path based on base path:
                // - '/images/pages/example2'
                const toPath = `${imgAssetsPath}${destinationPathCrossPlatform}`;

                const options: ReplaceInFileConfig = {
                  files: fileToBeUpdated,
                  from: fromPath,
                  to: (match) => match.replace(fromPath, toPath),
                };
                return Page.updateFileContent(options);
              }),
            );
          }
        }
      }
    } catch (err: any) {
      if (err) logger.log(err);
    }
    return 'success';
  }

  static updateFileContent(options: ReplaceInFileConfig) {
    return new Promise((resolve, reject) => {
      try {
        replace.replaceInFile(options, (error: Error, results: ReplaceResult[]) => {
          if (error) {
            reject(error);
          }
          resolve(results);
        });
      } catch (error) {
        resolve([]);
      }
    });
  }

  directoryExists(newDirectory: PathLike) {
    const readPromise = new Promise((resolve) => {
      fs.access(newDirectory, err => {
        if (!err) {
          resolve('The page cannot be moved. Directory exists');
        }
        resolve(this);
      });
    });
    return readPromise;
  }

  removeFile(origin: string) {
    const readPromise = new Promise((resolve, reject) => {
      fs.unlink(origin, err => {
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
      const { sep, normalize } = path;
      const dirPath = normalize(this.directory);
      const [, pageRelativeDir] = dirPath.split(`${sep}data${sep}pages${sep}`);
      if (!pageRelativeDir) {
        resolve('The page cannot be deleted.');
        return;
      }

      fs.rmdir(this.directory, { recursive: true }, (err) => {
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
      const subDirs = getDirectories(this.directory);
      if (subDirs.length !== 0) {
        resolve(
          'The page cannot be deleted it has child pages. To delete this page, first delete or move all child pages, and retry.',
        );
      } else {
        resolve('Success');
      }
    });
    return readPromise;
  }

  // eslint-disable-next-line class-methods-use-this
  removePageAssets(path: string) {
    return new Promise<string>((resolve, reject) => {
      fse.remove(path, err => {
        if (err) {
          reject(err);
        }
        resolve('ok');
      });
    });
  }
}

export default Page;
