/**
 * Copyright © 2020 Johnson & Johnson
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
} from '@bodiless/core';
import { Token } from '@bodiless/fclasses';
import GatsbyImagePresets from './GatsbyImagePresets';

const withGatsbyImageNode = (
  preset: GatsbyImagePresets,
): Token => Component => {
  const WithGatsbyImageNode: FC<any> = props => {
    const { nodeKey, nodeCollection, ...rest } = props as WithNodeProps;
    if (!nodeKey) return <Component {...rest as any} />;
    const { node } = useNode(nodeCollection);
    const childNode = node.child(nodeKey);
    const gatsbyImgNode = childNode.proxy({
      setData: (data: any) => ({
        ...data,
        preset,
        gatsbyImg: undefined,
      }),
    });
    return (
      <NodeProvider node={gatsbyImgNode} collection={nodeCollection}>
        <Component {...rest as any} />
      </NodeProvider>
    );
  };
  return WithGatsbyImageNode;
};

export default withGatsbyImageNode;
