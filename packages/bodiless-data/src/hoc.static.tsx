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
import React from 'react';
import pick from 'lodash/pick';
import flowRight from 'lodash/flowRight';
import { Injector } from '@bodiless/fclasses';
import { useNodeDataHandlers, NodeDataHandlers } from './NodeProvider';
import withNode from './withNode';

// @TODO: Combine withNode and withNodeDataHandlers and fix types
/**
 * Creates an HOC which reads data from the current content node and injects two
 * props to the target component:
 * - `componentData`: The `data` property from the node.
 * - `setComponentData`: A function which calls the `setData` method
 *    on the node,
 *
 * @param defaultData
 * A default value for `componentData` when the node's `data` property is empty.
 *
 * @returns
 * A component which passes data handlers to the base component.
 */
export const withNodeDataHandlers = <D extends object>(
  defaultData?: D,
): Injector<NodeDataHandlers<D>> => Component => (props: any) => {
    const enhancedDefaultData = {
      ...defaultData,
      ...(defaultData ? pick(props, Object.keys(defaultData)) : {}),
    };
    return (<Component {...props} {...useNodeDataHandlers(undefined, enhancedDefaultData)} />);
  };

export const withNodeAndHandlers = (defaultData?: any) => flowRight(
  // @ts-ignore
  withNode,
  withNodeDataHandlers(defaultData),
);
