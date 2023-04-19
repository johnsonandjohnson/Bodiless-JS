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
import withNode, { withNodeKey } from './withNode';
import withSidecarNodes, { startSidecarNodes, endSidecarNodes } from './withSidecarNodes';
import withData from './withData';
import {
  withNodeAndHandlers,
  withNodeDataHandlers,
} from './hoc.bl-edit';
import { withBodilessData } from './withBodilessData';
import NodeProvider, { useNode, useNodeDataHandlers } from './NodeProvider';
import type { NodeDataHandlers } from './NodeProvider';
import { DefaultContentNode } from './ContentNode';
import type { ContentNode, ContentNodePath } from './ContentNode';
import { WithNodeProps, WithNodeKeyProps } from './NodeTypes';

export * from './Contentful';

export {
  withNode,
  withNodeKey,
  withSidecarNodes,
  startSidecarNodes,
  endSidecarNodes,
  withData,
  withNodeAndHandlers,
  withNodeDataHandlers,
  withBodilessData,
  NodeProvider,
  useNode,
  useNodeDataHandlers,
  DefaultContentNode,
};

export type {
  NodeDataHandlers,
  ContentNode,
  ContentNodePath,
  WithNodeProps,
  WithNodeKeyProps
};
