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

import React, { ComponentType as CT } from 'react';
import {
  DefaultContentNode,
  NodeProvider,
  useNode,
} from '@bodiless/core';
import type { WithNodeProps } from '@bodiless/core';
import GatsbyImageNode from './GatsbyImageNode';

const withGatsbyImageNode = (preset: string) => <P extends object>(Component: CT<P>) => {
  const WithGatsbyImageNode = ({
    nodeKey,
    nodeCollection,
    ...rest
  }: P & WithNodeProps) => {
    if (!nodeKey) return <Component {...rest as P} />;
    const { node } = useNode(nodeCollection);
    // eslint-disable-next-line max-len
    const gatsbyImgNode = GatsbyImageNode.create((node as DefaultContentNode<object>), nodeKey, preset);
    return (
      <NodeProvider node={gatsbyImgNode} collection={nodeCollection}>
        <Component {...rest as P} />
      </NodeProvider>
    );
  };
  return WithGatsbyImageNode;
};

export default withGatsbyImageNode;
