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

import walk from 'walkdir';
import fs from 'fs';
/**
 * cleanSymlinks returns a Promise that will remove all symlinks (excluding those mention in
 * excludes) from a directory tree, it resolve void when done.
 * @param startRoot
 * @param excludes
 */
const cleanSymlinks = (startRoot:string, excludes:string[]) => new Promise<void>(resolve => {
  const filter = (dirPath:string, files:string[]) => (
    files.filter((name:string) => (
      !excludes.includes(name)
    )));
  const options = {
    filter,
  };
  const walker = walk(startRoot, options);
  walker.on('link', (filePath:string) => {
    fs.unlinkSync(filePath);
  });
  walker.on('end', () => {
    resolve();
  });
});
export default cleanSymlinks;
