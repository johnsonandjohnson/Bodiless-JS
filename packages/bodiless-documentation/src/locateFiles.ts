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

import path from 'path';
import fs from 'fs-extra';
import walk from 'walkdir';

type Action<T> = (x:string) => Promise<T>;
type Props<T> = {
  startingRoot: string,
  filePattern: RegExp,
  action: Action<T>,
};
/**
 * locatFiles is a Promise, that walks a path finding files matching the filePattern,
 * then pass the filePath to a promise (the action prop).  When all of these promise are resolved
 * then locateFiles is resolved with all of the promises results.
 * @param props
 */
const locateFiles = <T>(props:Props<T>):Promise<T[]> => new Promise(resolve => {
  const {
    startingRoot,
    filePattern,
    action,
  } = props;
  const promises = [] as Promise<T>[];
  const filter = (dirPath:string, files:string[]) => (
    files.filter((name:string) => {
      const fullPath = path.join(dirPath, name);
      return (
        fs.existsSync(fullPath)
        && fs.statSync(fullPath).isDirectory()
      ) || fullPath.search(filePattern) !== -1;
    })
  );
  const walker = walk(startingRoot, { filter, follow_symlinks: true });
  walker.on('file', (filePath:string) => {
    promises.push(action(filePath));
  });
  walker.on('end', () => {
    resolve(Promise.all(promises));
  });
});
export default locateFiles;
