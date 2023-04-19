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

import { extname } from 'path';
import { AxiosResponse } from 'axios';
import { ContentNode } from '@bodiless/data';
import BackendClient from './BackendClient';

const imageExtensions = [
  'webp', 'png', 'svg', 'apng', 'jpg', 'jpeg', 'gif',
];

/**
 * Check if the node is an asset with image info.
 * @todo: check 'src' property presents?
 *
 * @param node ContentNode
 * @returns boolean - true if it is an image node.
 */
export const isImageNode = (node: ContentNode<any>): boolean => {
  const { data: { src = '' } } = node;
  const ext = extname(src).toLowerCase().replace('.', '');
  return !!(src && (imageExtensions.indexOf(ext) !== -1));
};

export enum AssetImagePathConvertType {
  Site = 1,
  Page = 2,
}

/**
 * Convert a given asset image path between site and page
 * location using provided baseResourcePath parameter.
 *
 * for example, image node with baseResourcePath 'pages/flow-container',
 * the image src page level path is:
 *   /images/pages/flow-container/3fd47b03572bc5a70c2e6b34bed296c5/photo.jpg
 *
 * and converted site level path is:
 *   /images/site/3fd47b03572bc5a70c2e6b34bed296c5/photo.jpg
 *
 * This conversion is used for content library asset to be shared across site.
 *
 * @param src string - original image src value.
 * @param basePath string - base resource path value, from node prop 'baseResourcePath'.
 * @param type AssetImagePathConvertType - convert to site or page path.
 *
 * @return string - converted image path.
 */
export const convertAssetImagePath = (
  src: string,
  basePath: string,
  type: AssetImagePathConvertType,
): string => {
  let convertedSrc = '';
  const posixSrc = src.replace(/\\+/g, '/');
  switch (type) {
    case AssetImagePathConvertType.Page:
      convertedSrc = posixSrc.replace('site/', basePath);
      break;
    case AssetImagePathConvertType.Site:
    default:
      convertedSrc = posixSrc.replace(basePath, 'site/');
  }
  return convertedSrc;
};

/**
 * Move the node to a new location. If node or child node has image asset data,
 * copy or move it to site directory.
 *
 * @param source ContentNode - source node to be moved.
 * @param dest ContentNode - node destination to be moved to.
 * @param isCopy boolean
 *        - True if copy node data and asset.
 *        - False if move node data and asset.
 */
export const updateLibData = (
  source: ContentNode<any>,
  dest: ContentNode<any>,
  isCopy: boolean,
): void => {
  // iterate through node and all children node, generate tasks to delay node data
  // update until all file operation finished. Processes are kept in following 2
  // arrays.
  const assetProcesses: Promise<AxiosResponse>[] = [];
  const nodeDataProcesses: (() => void)[] = [];

  const processLibData = (
    source: ContentNode<any>,
    dest: ContentNode<any>,
    isCopy: boolean,
  ) => {
    try {
      if (isImageNode(source)) {
        const backend = new BackendClient();
        const { data: { src } } = source;
        if (isCopy) {
          const destDataSrc = convertAssetImagePath(
            src, dest.baseResourcePath, AssetImagePathConvertType.Page
          );
          assetProcesses.push(backend.copyAsset(src, destDataSrc));
          nodeDataProcesses.push(() => dest.setData({ ...source.data, src: destDataSrc }));
        } else {
          const destDataSrc = convertAssetImagePath(
            src, source.baseResourcePath, AssetImagePathConvertType.Site
          );
          assetProcesses.push(backend.moveAsset(src, destDataSrc));
          nodeDataProcesses.push(() => dest.setData({ ...source.data, src: destDataSrc }));
        }
      } else {
        nodeDataProcesses.push(() => (dest.setData(source.data)));
      }
      const keys = childKeys(source);
      for (let index = 0; index < keys.length; index += 1) {
        const key = keys[index];
        processLibData(source.child(key), dest.child(key), isCopy);
      }
      if (!isCopy) {
        nodeDataProcesses.push(() => (source.delete()));
      }
    } catch (error: any) {
      console.error(`Asset moving failed: ${error.message}`);
    }
  };
  processLibData(source, dest, isCopy);

  Promise.all([...assetProcesses]).then(() => {
    nodeDataProcesses.forEach(cb => cb());
  }).catch(error => {
    console.error(`Failed to update content library data: ${error.message}`);
  });
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
