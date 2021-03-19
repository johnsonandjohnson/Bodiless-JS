/**
 * Copyright © 2021 Johnson & Johnson
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

import { getContentFrom } from '@bodiless/core';
import type { ContentNode, ContentNodePath as Path, GetContentFrom } from '@bodiless/core';
import type { GatsbyImageData } from './asGatsbyImage';

export type GetImageContentFrom = GetContentFrom<GatsbyImageData>;

/**
 * helper to provide image data from a different content node
 * when node data is empty in store, then it returns default data
 * when node data is not empty in store, then it merges default content data with node store data
 * @param path - path to node read content from
 */
// eslint-disable-next-line max-len
const getImageContentFrom = (path: Path): GetImageContentFrom => (node: ContentNode<GatsbyImageData>) => {
  const defaultNodeData = getContentFrom<GatsbyImageData>(path)(node);
  const storeNodeData = node.data;
  if (Object.keys(storeNodeData).length === 0) return defaultNodeData;
  return {
    ...storeNodeData,
    ...(
      !storeNodeData.gatsbyImg
      && defaultNodeData.src === storeNodeData.src
      && defaultNodeData.preset !== undefined
        ? {
          gatsbyImg: defaultNodeData.gatsbyImg,
        }
        : {}
    ),
  };
};
export default getImageContentFrom;
