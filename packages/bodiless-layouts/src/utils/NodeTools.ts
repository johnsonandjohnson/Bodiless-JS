/**
 * Copyright © 2022 Johnson & Johnson
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

import { ContentNode } from '@bodiless/core';
import BackendClient from './BackendClient';

/**
 * Check if the node is an asset with image info.
 * @todo: check 'src' property presents?
 *
 * @param node ContentNode
 * @returns boolean - true if it is an image node.
 */
const isImageNode = (node: ContentNode<any>): boolean => {
  const { path } = node;
  return (path[path.length - 1] === 'image');
};

/**
 * Move the node to a new location. If node or child node has image asset data,
 * copy it to site directory.
 *
 * @param source ContentNode - source node to be moved.
 * @param dest ContentNode - node destination to be moved to.
 * @param isCopy boolean
 *        - True if copy node data and asset.
 *        - False if move node data and asset.
 */
export const updateLibData = async (
  source: ContentNode<any>,
  dest: ContentNode<any>,
  isCopy: boolean,
) => {
  try {
    if (isImageNode(source)) {
      const backend = new BackendClient();
      const { data: { src }} = source;
      if (isCopy) {
        const destDataSrc = src.replace('site/', dest.baseResourcePath);
        await backend.copyAsset(src, destDataSrc);
        dest.setData({...source.data, src: destDataSrc});
      } else {
        const destDataSrc = src.replace(source.baseResourcePath, 'site/');
        await backend.moveAsset(src, destDataSrc);
        dest.setData({...source.data, src: destDataSrc});
      }
    } else {
      dest.setData(source.data);
    }
    const keys = childKeys(source);
    for (let index = 0; index < keys.length; index += 1) {
      const key = keys[index];
      // eslint-disable-next-line no-await-in-loop
      await updateLibData(source.child(key), dest.child(key), isCopy);
    }
    if (!isCopy) {
      source.delete();
    }
  } catch (error: any) {
    console.error(`Asset moving failed ${error.message}`);
  }
};

export const copyNode = (
  source: ContentNode<any>, dest: ContentNode<any>, copyChildren: boolean
) => {
  dest.setData(source.data);
  if (copyChildren) {
    childKeys(source).forEach(key => copyNode(source.child(key), dest.child(key), true));
  }
};

/**
 * Get child key of given node.
 *
 * Might refactor to @bodiless/core
 * https://github.com/johnsonandjohnson/Bodiless-JS/issues/1160
 *
 * @param node ContentNode
 * @returns keys string[]
 */
export const childKeys = (node: ContentNode<any>) => {
  const aParent = node.path;
  const aCandidates = node.keys.map(key => key.split('$'));
  return Object.keys(aCandidates.reduce(
    (acc, next) => {
      if (next.length <= aParent.length) return acc;
      for (let i = 0; i < aParent.length; i += 1) {
        if (aParent[i] !== next[i]) return acc;
      }
      return { ...acc, [next[aParent.length]]: true };
    },
    {},
  ));
};
