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
import path from 'path';
import walk from 'walkdir';

import { LocateFilesProps } from './type';
/**
 * locateFiles is a Promise, that walks a path finding files matching the filePattern,
 * then resolves with an array of file paths.
 * @param props
 */
const locateFiles = <T>(props:LocateFilesProps<T>):Promise<string[]> => new Promise(resolve => {
  const { startingRoot, filePattern } = props;
  const filePaths = [] as string[];

  const filter = (dirPath:string, files:string[]) => (
    files.filter((name:string) => {
      const fullPath = path.join(dirPath, name);

      return (
        fs.existsSync(fullPath)
        && fs.statSync(fullPath).isDirectory()
      ) || name.search(filePattern) !== -1;
    })
  );

  const walker = walk(startingRoot, { filter, follow_symlinks: true });

  walker.on('file', (filePath:string) => {
    filePaths.push(filePath);
  });

  walker.on('end', () => {
    resolve(filePaths);
  });
});

export default locateFiles;