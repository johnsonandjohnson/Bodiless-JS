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

import React, { ComponentType as CT, FC } from 'react';
import { pickBy } from 'lodash';
import NodeProvider, { useNode } from './NodeProvider';
import { WithNodeProps } from './Types/NodeTypes';

const withNode = <P extends object, D extends object>(Component: CT<P>) => {
  const WithNode = ({
    nodeKey,
    nodeCollection,
    ...rest
  }: P & WithNodeProps) => {
    if (!nodeKey) return <Component {...rest as P} />;
    const node = useNode<D>(nodeCollection).node.child(nodeKey);
    return (
      <NodeProvider node={node} collection={nodeCollection}>
        <Component {...rest as P} />
      </NodeProvider>
    );
  };
  return WithNode;
};
type NodeKeyFunc<A> = (props:A) => string|Partial<WithNodeProps>;
const withNodeKey = <P extends object>(
  nodeKeys: string|Partial<WithNodeProps>|NodeKeyFunc<P> = {},
) => (Component: CT<P> | string) => {
    const WithNodeKey: FC<P & Partial<WithNodeProps>> = props => {
      const nodeKeysPrime = typeof nodeKeys === 'function' ? nodeKeys(props) : nodeKeys;
      const nodeKeyProps = typeof nodeKeysPrime === 'string' ? { nodeKey: nodeKeysPrime } : nodeKeysPrime;
      return (
        <Component {...nodeKeyProps} {...props} />
      );
    };
    return WithNodeKey;
  };
export default withNode;
export { withNodeKey };
