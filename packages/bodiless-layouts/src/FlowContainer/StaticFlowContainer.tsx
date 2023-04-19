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

import React from 'react';
import type { FC } from 'react';
import { withNode } from '@bodiless/data';
import { Div, withoutProps } from '@bodiless/fclasses';
import type { DesignableProps } from '@bodiless/fclasses';
import { useItemHandlers } from './model';
import type { FlowContainerItem, FlowContainerComponents } from './types';
import { SelectorComponents } from '../ComponentSelector/SelectorComponents';

const flowContainerComponentStart: FlowContainerComponents = {
  Wrapper: withoutProps('itemCount')(Div),
  ComponentWrapper: Div,
};

const NodeProvider = withNode(React.Fragment);

const StaticFlowContainer: FC<DesignableProps & { id?: string }> = ({ design, id }) => {
  const items = useItemHandlers().getItems();
  const { components } = new SelectorComponents({
    design,
    startComponents: flowContainerComponentStart,
    selectedComponents: [
      ...items.map(item => item.type),
      'ComponentWrapper',
      'Wrapper',
    ],
  });
  const { Wrapper, ComponentWrapper } = components;
  return (
    // When in a static mode we don't want to use `bl-*` prefixed classes.
    <Wrapper itemCount={items.length} id={id}>
      {items
        .map((flowContainerItem: FlowContainerItem) => {
          const ChildComponent = components[flowContainerItem.type];
          // TODO: Inhance this notification when the data is bad
          if (!ChildComponent) {
            throw new Error(`${flowContainerItem.type} is not an allowed content type`);
          }
          return (
            <NodeProvider nodeKey={flowContainerItem.uuid} key={`flex-${flowContainerItem.uuid}`}>
              <ComponentWrapper
                className={
                    (flowContainerItem.wrapperProps
                      && flowContainerItem.wrapperProps.className)
                    || ''
                  }
              >
                <ChildComponent />
              </ComponentWrapper>
            </NodeProvider>
          );
        })
        .filter(Boolean)}
    </Wrapper>
  );
};

StaticFlowContainer.displayName = 'FlowContainer';

export default StaticFlowContainer;
