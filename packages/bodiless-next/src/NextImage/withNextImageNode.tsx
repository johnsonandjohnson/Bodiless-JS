/**
 * Copyright © 2023 Johnson & Johnson
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

import React, { FC } from 'react';
import {
  NodeProvider,
  useNode,
  WithNodeProps,
} from '@bodiless/data';
import { HOC } from '@bodiless/fclasses';
import NextImagePresets from './NextImagePresets';

/**
 * `withNextImageNode` is a HOF that adds a Next Image BodilessJS node,
 * which enriches image node data with image preset provided as an input.
 */
const withNextImageNode = (
  preset: NextImagePresets,
): HOC => Component => {
  const WithNextImageNode: FC<any> = props => {
    const { nodeKey, nodeCollection, ...rest } = props as WithNodeProps;
    if (!nodeKey) return <Component {...rest as any} />;
    const { node } = useNode(nodeCollection);
    const childNode = node.child(nodeKey);
    const nextImgNode = childNode.proxy({
      // Setter which saves the preset, making it available to the Next node API.
      setData: (data: any) => ({
        ...data,
        preset
      }),
      // Getter which attaches the preset as defined in code, so that
      // the logger can flag any discrepancies.
      getData: (data: any) => ({
        ...data,
        canonicalPreset: preset,
      }),
    });
    return (
      <NodeProvider node={nextImgNode} collection={nodeCollection}>
        <Component {...rest as any} />
      </NodeProvider>
    );
  };
  return WithNextImageNode;
};

export default withNextImageNode;
