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

import React, { createContext, useContext, ComponentType } from 'react';
import { flowRight } from 'lodash';
import { NodeContext } from './NodeProvider';
import type { NodeMap } from './NodeProvider';

const SidecarNodeContext = createContext<NodeMap<any>[]>([]);

/**
 * `startSidecarNodes` is an HOC which records the current ContentNode so that
 * it can later be restored.
 *
 * @see `withSidecarNodes`
 *
 * @param Component Any component which uses the Bodiless ContentNode system.
 */
const startSidecarNodes = <P extends object>(Component: ComponentType<P>|string) => {
  const StartSidecarNodes = (props: P) => {
    const oldValue = useContext(SidecarNodeContext);
    const newValue = [...oldValue, useContext(NodeContext)];
    return (
      <SidecarNodeContext.Provider value={newValue}>
        <Component {...props} />
      </SidecarNodeContext.Provider>
    );
  };
  StartSidecarNodes.displayName = 'StartSidecarNodes';
  return StartSidecarNodes;
};

/**
 * `endSidecarNodes` is an HOC which restores the ContentNode preserved
 * by `startSidecarNodes`.
 *
 * @see `withSidecarNodes`
 *
 * @param Component Any component which uses the Bodiless ContentNode system.
 */
const endSidecarNodes = <P extends object>(Component: ComponentType<P>|string) => {
  const EndSidecarNodes = (props: P) => {
    const oldValue = useContext(SidecarNodeContext);
    if (oldValue.length === 0) return <Component {...props} />;
    const newNodeProviderValue = oldValue[oldValue.length - 1];
    const newValue = oldValue.slice(0, -1);
    return (
      <NodeContext.Provider value={newNodeProviderValue}>
        <SidecarNodeContext.Provider value={newValue}>
          <Component {...props} />
        </SidecarNodeContext.Provider>
      </NodeContext.Provider>
    );
  };
  EndSidecarNodes.displayName = 'EndSidecarNodes';
  return EndSidecarNodes;
};

type HOC = (Component: ComponentType<any>) => ComponentType<any>;

/**
 * `withSidecarNodes` allows you to establish a `ContentNode` sub-hierarchiy which should
 * be used by a series of one or more HOC's. Any nodes created by the HOC's enclosed in this
 * wrapper will not affect the hierarchy for subsequent HOC's *outside* the wrapper. For
 * example:
 * ```js
 * flowRight(
 *   ...
 *   withNodeKey('foo'), withNode,  // ...$foo
 *   withSidecarNodes(
 *     withNodeKey('bar'), withNode,  // ...$foo$bar
 *   ),
 *   withNodeKey('baz'); withNode, // ...$foo$baz (otherwise would be ...$foo$bar$baz)
 *   ...
 * )
 * ```
 * This is useful, for example, if you want to apply an enhancment HOC which uses its own
 * content node(s) without affecting the node paths of other children of the wrapped component.
 *
 * @param hocs A list of HOC's to be applied using the parallel node hierarchy.  These will
 *             be composed using lodash `flowRight`
 *
 * @return an HOC which can wrap any Component using the Bodiless `ContentNode` system.
 */
const withSidecarNodes = (...hocs: HOC[]) => flowRight(
  startSidecarNodes,
  ...hocs,
  endSidecarNodes,
);

export default withSidecarNodes;
export { startSidecarNodes, endSidecarNodes };
