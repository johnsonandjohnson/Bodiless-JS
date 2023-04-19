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
} from '@bodiless/data';
import type { ContentNode } from '@bodiless/data';
import { flowHoc, HOCWithMeta } from '@bodiless/fclasses';
import { withContentLibrary, ComponentSelector } from '@bodiless/layouts';
import path from 'path';
import type { AsBodilessImage } from './Image';

// Adds image library to an asEditableImage hoc.
const withImageLibrary = (
  asEditableImage: AsBodilessImage,
  Selector = ComponentSelector,
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

  const asImageHoc: HOCWithMeta = asEditableImage(undefined, placeholder, useOverrides);
  return flowHoc(
    asImageHoc.meta,
    asImageHoc,
    withContentLibrary({
      Selector,
      useLibraryNode: useImageLibraryNode,
      useMeta: useImageMeta,
    }),
    withNode,
    withNodeKey(nodeKeys),
  );
};

export default withImageLibrary;
