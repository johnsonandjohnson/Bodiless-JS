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

import React, { FC } from 'react';
import { pickBy } from 'lodash';
import { HOC, Injector } from '@bodiless/fclasses';
import NodeProvider, { useNode } from './NodeProvider';
import { WithNodeProps } from './Types/NodeTypes';

/**
 * HOC which gives a component a content node.  The enhanced component accepts an optional
 * a `nodeKey` prop.  When specified, the component will be given a new node which is
 * a child of the current node.
 *
 * @param Component
 */
const withNode:HOC<{}, WithNodeProps> = Component => {
  const WithNode = ({
    nodeKey,
    nodeCollection,
    ...rest
  }: WithNodeProps) => {
    if (!nodeKey) return <Component {...rest as any} />;
    const node = useNode(nodeCollection).node.child(nodeKey);
    return (
      <NodeProvider node={node} collection={nodeCollection}>
        <Component {...rest as any} />
      </NodeProvider>
    );
  };
  return WithNode;
};

/**
 * HOC which gives a component a node key. The enhanced component must first
 * have been wrapped by `withNode`.  This HOC simply adds a nodeKey prop.
 *
 * @param Component
 */
const withNodeKey = (
  nodeKeys: string|Partial<WithNodeProps> = {},
): Injector<WithNodeProps> => Component => {
  const nodeKeyProps = pickBy(
    typeof nodeKeys === 'string' ? { nodeKey: nodeKeys } : nodeKeys,
  );
  const WithNodeKey: FC<any> = props => (
    <Component {...nodeKeyProps} {...props} />
  );
  return WithNodeKey;
};

export default withNode;
export { withNodeKey };
