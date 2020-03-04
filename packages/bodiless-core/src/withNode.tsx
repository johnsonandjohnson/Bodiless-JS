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

import React, { ComponentType as CT } from 'react';
import NodeProvider, { useNode } from './NodeProvider';
import { WithNodeProps } from './Types/NodeTypes';

const withNode = <P extends object, D extends object>(Component: CT<P>) => {
  const WithNode = ({
    nodeKey,
    nodePath,
    nodeCollection,
    ...rest
  }: P & WithNodeProps) => {
    if (!nodeKey && !nodePath) return <Component {...rest as P} />;
    const { node } = useNode<D>(nodeCollection);
    const node$ = nodePath ? node.peer([...nodePath]) : node.child(nodeKey!);
    return (
      <NodeProvider node={node$} collection={nodeCollection}>
        <Component {...rest as P} />
      </NodeProvider>
    );
  };
  return WithNode;
};
const withNodeKey = <P extends object>(
  nodeKey?: string,
  nodeCollection?: string,
) => (Component: CT<P> | string) => {
    const WithNodeKey = (props: P) => (nodeKey ? (
      <Component nodeKey={nodeKey} nodeCollection={nodeCollection} {...props} />
    ) : (
      <Component {...props} />
    ));
    return WithNodeKey;
  };

const withNodePath = <P extends object>(
  nodePath: string[],
) => (Component: CT<P> | string) => {
    const WithNodePath = (props: P) => (
      <Component nodePath={nodePath} {...props} />
    );
    return WithNodePath;
  };

export default withNode;
export { withNodeKey, withNodePath };
