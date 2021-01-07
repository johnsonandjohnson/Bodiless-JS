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
import walkdir from 'walkdir';
import { flow } from 'lodash';
import { Tree, TreeHO } from './type';
import { treeHOPromiseFlow } from './promiseUtils';

// A function for setting a value deep in a Tree
/**
 * withDeepValue returns a TreeHO that will change a value deep in the tree that it accepts
 * @param key An array of keys to walk in the Tree.
 * @param value The value to set when you have walk all keys.
 */
export const withDeepValue = (key:string|string[], value:string) => (tree:Tree):Tree => {
  const keys = typeof key === 'string' ? [key] : key;
  if (keys.length === 1) {
    return { ...tree, [keys[0]]: value } as Tree;
  }
  const [first, ...rest] = keys;
  if (Object.keys(tree).includes(first)) {
    const subTree = tree[first] as Tree;
    return {
      ...tree,
      [first]: withDeepValue(rest, value)(subTree),
    } as Tree;
  }
  return {
    ...tree,
    [first]: withDeepValue(rest, value)({}),
  } as Tree;
};
type Resolve = (a:TreeHO) => void;
/**
 * getTreeFromDir returns a promise that will walk a directory and resolve to
 * an TreeHO that describes that directory
 * @param startDir
 */
export const getTreeFromDir = (startDir:string) => (
  new Promise((resolve:Resolve) => {
    const updates = [] as TreeHO[];
    const walker = walkdir(startDir, { follow_symlinks: true });
    walker.on('file', (filePath:string) => {
      const keys = path.relative(startDir, filePath).split(path.sep);
      updates.push(withDeepValue(keys, filePath));
    });
    walker.on('end', () => {
      resolve(flow(...updates));
    });
  })
);

/**
 * PrePendPath take a path and returns a treeHO that will walk though a passed in Tree
 * and prepend the path to every docuement in the tree.
 * @param prePend
 */
export const prependPath = (prePend:string) => (tree:Tree):Tree => (
  Object.keys(tree).reduce(
    (acc:Tree, key:string) => {
      if (typeof tree[key] === 'string') {
        return { [key]: path.join(prePend, tree[key] as string), ...acc } as Tree;
      }
      const subTree = prependPath(prePend)(tree[key] as Tree);
      return { [key]: subTree, ...acc } as Tree;
    },
    {} as Tree,
  )
);

/**
 * withTree returns a TreeHO that will merge the tree pass to withTree with the Tree
 * passed in to the TreeHO.  The main value is to resolve issue around directory vs files
 * @param newTree
 */
export const withTree = (newTree:Tree) => (tree:Tree):Tree => (
  Object.keys(newTree).reduce(
    (acc:Tree, key:string) => {
      // Add a obj if we do not have a current location that matches the key.
      // If we are adding on object but currently we have a string then we need to move the current
      // item to README.md.
      if (typeof newTree[key] === 'object' && typeof tree[key] === 'string') {
        const indexPath = tree[key];
        return { ...acc, [key]: withTree(newTree[key] as Tree)({ 'README.md': indexPath }) };
      }
      if (typeof newTree[key] === 'object' && typeof tree[key] === 'object') {
        return { ...acc, [key]: withTree(newTree[key] as Tree)(tree[key] as Tree) };
      }
      if (typeof newTree[key] === 'object' && typeof tree[key] === 'undefined') {
        return { ...acc, [key]: newTree[key] };
      }
      if (typeof newTree[key] === 'string' && typeof tree[key] === 'object') {
        return { ...acc, [key]: withTree({ 'README.md': newTree[key] })(tree[key] as Tree) };
      }
      return { ...acc, [key]: newTree[key] };
    },
    tree as Tree,
  )
);
/**
 * WithTreeFromFile returns a Promise, that will Read and parse a json file, and resolve to a
 * TreeHO that was described by the Json file.
 * @param filePath
 */
export const withTreeFromFile = (filePath:string):Promise<TreeHO> => {
  const dirPath = path.dirname(filePath);
  return fs.readJson(filePath)
    .then((fileJSON:Tree) => {
      const { _dir, ...rawTree } = fileJSON;
      const updateTree = withTree(prependPath(dirPath)(rawTree));
      if (_dir) {
        const docPath = path.join(dirPath, _dir as string);
        const promises = [
          Promise.resolve(updateTree),
          getTreeFromDir(docPath),
        ];
        return treeHOPromiseFlow(...promises);
      }
      return updateTree;
    });
};

/**
 * getSipmlePaths returns a simple list of paths gathered from a nested tree.
 * @param tree
 */
export const getSimplePaths = (tree: Tree): string[] => {
  const simplePathsList: string[] = [];
  const walkTree = (tree1: Tree) => {
    Object.keys(tree1).forEach(key => {
      const branch = tree1[key];
      if (typeof branch === 'object') {
        walkTree(branch);
      } else {
        simplePathsList.push(branch);
      }
    });
  };
  walkTree(tree);
  return simplePathsList;
};

/**
 * validatePaths checks whether the passed paths are equal to their native
 * counterparts in the file system.
 * This check is needed when we want to be sure to get the same build results
 * on MacOS (case-insensitive) and Linux (case-sensitive).
 * https://stackoverflow.com/questions/13617863/can-i-force-node-js-require-to-be-case-sensitive
 * @param pathsToDocs
 */
export const validatePaths = (pathsToDocs: string[]) => {
  pathsToDocs.forEach(pathToDoc => {
    const defaultPath = path.resolve(pathToDoc);
    //
    let nativePath;
    try {
      nativePath = fs.realpathSync.native(defaultPath);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('Error validating paths.', err);
    }
    if (defaultPath !== nativePath) {
      const errorMessage = `
        The file path specified in docs.json is not equal to the real file path.
        ${defaultPath}
        !==
        ${nativePath}
        Make sure the path is case-sensitively correct.
      `;
      // eslint-disable-next-line no-console
      console.warn(errorMessage);
    }
  });
};
