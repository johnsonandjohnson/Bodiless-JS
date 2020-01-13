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

/* eslint-disable no-console */

import path from 'path';
import fs from 'fs-extra';
import { Tree } from './type';

type Props = {
  paths: Tree,
  loc: string,
};
const writeSymlinksFromTree = (props: Props) => {
  const { paths, loc } = props;
  const promises = [] as Promise<any>[];
  Object.keys(paths).forEach((key:string) => {
    try {
      const branch = {
        paths: paths[key],
        loc: path.join(loc, key),
      };
      if (typeof paths[key] === 'object') {
        try {
          fs.ensureDirSync(branch.loc);
          promises.push(writeSymlinksFromTree(branch as Props));
        } catch (error) {
          console.log(error, key);
        }
      } else {
        const filePath = path.join(loc, key);
        try {
          if (process.env.BODILESS_DOCS_COPYFILES === '1') {
            const relPath = path.relative(process.cwd(), branch.paths as string);
            fs.copyFileSync(relPath, filePath);
          } else {
            const relPath = path.relative(loc, branch.paths as string);
            fs.ensureSymlinkSync(relPath, filePath);
          }
        } catch (error) {
          console.log(error, key);
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  });
  return Promise.all(promises);
};
export default writeSymlinksFromTree;
