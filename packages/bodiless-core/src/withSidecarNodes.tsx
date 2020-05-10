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
import NodeProvider, { useNode } from './NodeProvider';
import { ContentNode, DefaultContentNode } from './ContentNode';
import withNode from './withNode';

const SidecarNodeContext = createContext<ContentNode<any>>(DefaultContentNode.dummy());

const startSidecarNodes = <P extends object>(Component: ComponentType<P>) => (props: P) => (
  <SidecarNodeContext.Provider value={useNode().node}>
    <Component {...props} />
  </SidecarNodeContext.Provider>
);

const endSidecarNodes = <P extends object>(Component: ComponentType<P>) => (props: P) => (
  <NodeProvider node={useContext(SidecarNodeContext)}>
    <Component {...props} />
  </NodeProvider>
);

type HOC = (Component: ComponentType<any>) => ComponentType<any>;

const withSidecarNodes = (...hocs: HOC[]) => flowRight(
  withNode,
  startSidecarNodes,
  ...hocs,
  endSidecarNodes,
);

export default withSidecarNodes;
