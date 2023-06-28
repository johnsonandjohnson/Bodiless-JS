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

import React, { useContext, PropsWithChildren } from 'react';
import { ContentNode, DefaultContentNode } from './ContentNode';

export type NodeMap<D> = {
  activeCollection: string;
  collections: {
    [collection: string]: ContentNode<any>;
  };
};

export type NodeDataHandlers<D> = {
  setComponentData: (data: D) => void,
  componentData: D,
};

const NodeContext = React.createContext<NodeMap<any>>({
  activeCollection: '_default',
  collections: {
    _default: DefaultContentNode.dummy(),
  },
});
NodeContext.displayName = 'NodeContext';

/**
 * Hook to obtain the current node.
 *
 * @param collection
 * The node collection from which the node should be retrieved.  If omitted,
 * node will be retrieved from the current collection.
 *
 * @returns
 * An object with a single member, which is the current node.
 */
const useNode = <D extends object>(collection?: string) => {
  const map = React.useContext(NodeContext);
  // If no collection is specified, then return a node from the
  // collection which was set by the most recent NodeProvider.
  const key = collection || map.activeCollection || '_default';
  return {
    node: map.collections[key] as ContentNode<D>,
  };
};

// Gets data handlers from the current node,
const useNodeDataHandlers = <D extends object>(
  collection?: string,
  defaultValue: D = {} as D,
) => {
  const { node } = useNode<D>(collection);
  return {
    setComponentData: (data: D) => node.setData(data),
    componentData: { ...defaultValue, ...node.data },
  };
};

export type Props = {
  node: ContentNode<any>;
  collection?: string;
};

const NodeProvider: React.FC<PropsWithChildren<Props>> = ({ node, collection, children }) => {
  const currentValue = useContext(NodeContext);
  const { activeCollection: currentActiveCollection, collections} = currentValue;
  // If no collection specified, then create a new node in the active collection.
  const activeCollection = collection || currentActiveCollection || '_default';
  const newValue = {
    activeCollection,
    collections: { ...collections, [activeCollection]: node },
  };
  return <NodeContext.Provider value={newValue}>{children}</NodeContext.Provider>;
};

export default NodeProvider;
export { NodeContext, useNode, useNodeDataHandlers };
