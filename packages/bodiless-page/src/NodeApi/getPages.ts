/* eslint-disable no-console */
/**
 * Copyright © 2023 Johnson & Johnson
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

import { uniq } from 'lodash';
import { resolve } from 'path';
import {
  readdirSync,
  existsSync,
  readFileSync,
  Dirent
} from 'fs';

const getFiles = async (dir: string): Promise<Array<string>> => {
  const dirents = await readdirSync(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent: Dirent) => {
    const res = resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  }));
  return Array.prototype.concat(...files);
};

const parentDir = (path: string) => path.split('/').slice(0, -1).join('/');

const getPages = async () => {
  try {
    const sitePath = resolve();
    const pagesPath = `${sitePath}/src/data/pages`;
    const allowedFileNames = ['index.jsx', 'index.tsx', 'index.json'];
    const dirContent = await getFiles(pagesPath);
    const indexFiles = dirContent.filter(
      (filename) => allowedFileNames.some(end => filename.endsWith(end))
    );
    const pages = indexFiles.map(filename => {
      let cleanedFilename = filename;
      allowedFileNames.forEach(file => { cleanedFilename = cleanedFilename.replace(`/${file}`, ''); });
      return cleanedFilename.replace(pagesPath, '');
    }) || [];

    // Looks for path without index file which parent has subpage_template defined.
    const directories = dirContent.map((file) => parentDir(file));
    const subpages = uniq(directories).filter((path) => {
      if (
        !allowedFileNames.some(allowedFile => existsSync(`${path}/${allowedFile}`))
        && existsSync(`${parentDir(path)}/index.json`)) {
        const json = readFileSync(`${parentDir(path)}/index.json`);
        const data = JSON.parse(json.toString());
        if (data['#subpage_template']) {
          return true;
        }
      }
      return false;
    });

    return [...pages, ...subpages.map(filename => filename.replace(pagesPath, ''))];
  } catch (error: any) {
    if (error && error.code && error.code === 'ENOENT') {
      console.log("No pages available. The directory doesn't exist:", error.path || '');
    } else {
      console.error(error);
    }
    return [];
  }
};

export default getPages;
