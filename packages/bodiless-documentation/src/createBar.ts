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
import { Tree } from './type';

const niceName = (s: string) => s
  .replace(/[a-z0-9]([A-Z])/g, m => `${m[0]}_${m[1]}`)
  .replace(/_/g, ' ')
  .split(' ')
  .map(word => `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`)
  .join(' ');

/**
 * createBar works to generate markdown used in _sidebar and _navbar from
 * a tree (paths param).  It used parents and depth to allow recursion.
 *
 * @param paths what is the tree we should transform
 * @param parent what are the current parent folders we are in
 * @param depth how many more times to recurse in the tree
 */
const createBar = (
  paths:Tree, parent:string[],
  depth:number,
  writeHeader: boolean = true,
  indent: number = 1,
) => {
  const pathPrefix = `/${parent.map((item:string) => `${item}/`).join('')}`;
  const linePrefix = ' '.repeat(indent * 2);
  const header = writeHeader && parent.length > 0 && parent.slice(-1)[0];
  let navbar = header ? `- ${niceName(header.replace(/.md$/, ''))}\n` : '';
  Object.keys(paths).forEach((key:string) => {
    let line = '';
    const link = key.replace(/.md$/, '');
    const name = niceName(link);
    if (typeof paths[key] === 'object') {
      const branch = paths[key] as Tree;
      const subLines = depth > 0 || !branch['README.md'] ? createBar(paths[key] as Tree, [...parent, key], depth - 1, false, indent + 1) : '';
      if (branch['README.md']) {
        line = `${linePrefix}- [${name}](${pathPrefix}${link}/)\n`;
        // If we have subLines but we have no README then do not add the tree item
      } else if (subLines) {
        line = `${linePrefix}- ${name}\n`;
      }
      line += subLines;
    } else if (key !== 'README.md' && path.extname(paths[key] as string) === '.md') {
      line = `${linePrefix}- [${name}](${pathPrefix}${link})\n`;
    }
    navbar += line;
  });
  return navbar;
};

/**
 * writeSideBar returns a promise to write a _sidebar file it resolves void
 * @param loc where to write the _sidebar.md
 * @param tree what tree to transform
 * @param parents what parents should be use in the paths of the items
 */
export const writeSideBar = (loc:string, tree:Tree, parents:string[]) => (
  /* Depth is unlimited as we want everyhing in main sidebar -- so set to 100 */
  fs.writeFile(path.join(loc, '_sidebar.md'), createBar(tree, parents, 100, true))
);

/**
 * writeSideBars retruns a promise to write a sidebar for each in the tree
 * it resolves to a void
 * @param loc
 * @param tree
 */
export const writeSideBars = (loc:string, tree:Tree) => (
  // Promise.all(writeSideBarsPromises(loc, tree, []))
  writeSideBar(loc, tree, [])
);
export default createBar;
