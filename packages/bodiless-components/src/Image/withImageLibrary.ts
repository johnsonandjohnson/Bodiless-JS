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

import {
  useNode,
  withNode,
  withNodeKey,
} from '@bodiless/core';
import type { ContentNode } from '@bodiless/core';
import { asToken } from '@bodiless/fclasses';
import type { HOC } from '@bodiless/fclasses/lib/Tokens';
import { withContentLibrary } from '@bodiless/layouts';
import { ComponentSelector } from '@bodiless/layouts-ui';
import path from 'path';
import type { AsBodilessImage, AsImageToken } from './Image';

// Adds image library to an asEditableImage hoc.
const withImageLibrary = (
  asEditableImage: AsBodilessImage,
) => (libraryNodeKey: string): AsBodilessImage => (
  nodeKeys,
  placeholder,
  useOverrides,
) => {
  const useImageLibraryNode = () => {
    const { node } = useNode();
    return { node: node.peer(libraryNodeKey) };
  };

  const useImageMeta = (node: ContentNode<any>) => {
    const { data } = node;
    if (!data.src) return null;
    return {
      title: path.basename(data.src),
      description: data.alt || '',
    };
  };

  const asImageHoc = asEditableImage(undefined, placeholder, useOverrides) as AsImageToken;
  return asToken(
    asImageHoc.meta,
    asImageHoc,
    withContentLibrary({
      Selector: ComponentSelector,
      useLibraryNode: useImageLibraryNode,
      useMeta: useImageMeta,
    }),
    withNode as HOC,
    withNodeKey(nodeKeys),
  );
};

export default withImageLibrary;
