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

import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import MD5 from 'crypto-js/md5';
import type { Files, File } from 'formidable';

const getStaticPath = () => (process.env.BODILESS_BACKEND_STATIC_PATH || '');

const copyFilePromise = (from: string, to: string) => new Promise((resolve, reject) => {
  fs.copyFile(from, to, copyErr => {
    if (copyErr) reject(copyErr);
    fs.unlinkSync(from);
    const backendStaticPath = getStaticPath();
    resolve(`/${path.relative(backendStaticPath, to)}`);
  });
});

const generateHash = (str: string) => MD5(str).toString();

const isImage = (fileType: string) => {
  const imageFileTypes = [
    'image/jpeg',
    'image/png',
    'image/svg+xml',
    'image/gif',
    'image/apng',
  ];
  return imageFileTypes.includes(fileType);
};

const copyAllFiles = (files: Files, baseResourcePath: string, nodePath: string) => {
  const allFiles: File[] = [];
  Object.keys(files).forEach(key => {
    if (Array.isArray(files[key])) {
      allFiles.push(...files[key] as File[]);
    } else {
      allFiles.push(files[key] as File);
    }
  });

  return Promise.all(allFiles.map((file: File) => {
    const baseDir = isImage(file.type || '') ? 'images' : 'files';
    const backendStaticPath = getStaticPath();
    const distFolderPath = path.join(
      backendStaticPath,
      baseDir,
      baseResourcePath,
      generateHash(nodePath),
    );

    if (!fs.existsSync(distFolderPath)) {
      fs.mkdirSync(distFolderPath, { recursive: true });
    }

    return copyFilePromise(file.path, path.join(distFolderPath, file.name || ''));
  }));
};

/**
 * Copy file from pathFrom to pathTo, create directories if not exist.
 *
 * Notes:
 * - this is different from copyFilePromise function, which does not copy folders.
 * - also copyFilePromise removes source file after copy complete.
 *
 * @param pathFrom string - source file path
 * @param pathTo string - destination file path
 */
const copyFile = (pathFrom: string, pathTo: string) => {
  try {
    fse.copySync(pathFrom, pathTo);
  } catch (err: any) {
    throw new Error(`Failed to copy file from ${pathFrom} to ${pathTo}: ${err.message}`);
  }
};

/**
 * Move file from location pathFrom to pathTo, create directories if not exist.
 *
 * @param pathFrom string - source file path
 * @param pathTo string - destination file path
 */
const moveFile = (pathFrom: string, pathTo: string) => {
  try {
    fse.moveSync(pathFrom, pathTo, { overwrite: true });
  } catch (err: any) {
    throw new Error(`Failed to move file from ${pathFrom} to ${pathTo}: ${err.message}`);
  }
};

export {
  copyAllFiles,
  moveFile,
  copyFile,
};
