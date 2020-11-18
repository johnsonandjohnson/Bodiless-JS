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

import React, { FC, PropsWithChildren } from 'react';
import { flow } from 'lodash';
import { withNode } from '@bodiless/core';
import {
  designable,
  Div,
} from '@bodiless/fclasses';
import { observer } from 'mobx-react-lite';
import { useItemHandlers } from './model';
import { StaticFlowContainerProps, FlowContainerItem, FlowContainerComponents } from './types';

const flowContainerComponentStart: FlowContainerComponents = {
  Wrapper: Div,
  ComponentWrapper: Div,
};

const NodeProvider = withNode<PropsWithChildren<{}>, any>(React.Fragment);

const StaticFlowContainer: FC<StaticFlowContainerProps> = ({ components }) => {
  const items = useItemHandlers().getItems();
  const { Wrapper, ComponentWrapper } = components;
  return (
    // When in a static mode we don't want to use `bl-*` prefixed classes.
    <Wrapper>
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

const asStaticFlowContainer = flow(
  observer,
  designable(flowContainerComponentStart, 'FlowContainer'),
);

export default asStaticFlowContainer(StaticFlowContainer);
