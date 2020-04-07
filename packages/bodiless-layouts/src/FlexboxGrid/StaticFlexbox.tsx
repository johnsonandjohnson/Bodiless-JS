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
import { useItemHandlers } from './model';
import { StaticFlexboxProps, FlexboxItem, FlexboxComponents } from './types';

const flexboxComponentStart: FlexboxComponents = {
  Wrapper: Div,
  ComponentWrapper: Div,
};

const NodeProvider = withNode<PropsWithChildren<{}>, any>(React.Fragment);

const StaticFlexbox: FC<StaticFlexboxProps> = ({ components }) => {
  const items = useItemHandlers().getItems();
  const { Wrapper, ComponentWrapper } = components;
  return (
    // When in a static mode we don't want to use `bl-*` prefixed classes.
    <Wrapper>
      {items
        .map((flexboxItem: FlexboxItem) => {
          const ChildComponent = components[flexboxItem.type];
          // TODO: Inhance this notification when the data is bad
          if (!ChildComponent) {
            throw new Error(`${flexboxItem.type} is not an allowed content type`);
          }
          return (
            <ComponentWrapper
              key={`flex-${flexboxItem.uuid}`}
              className={
                  (flexboxItem.wrapperProps
                    && flexboxItem.wrapperProps.className)
                  || ''
                }
            >
              <NodeProvider nodeKey={flexboxItem.uuid}>
                <ChildComponent />
              </NodeProvider>
            </ComponentWrapper>
          );
        })
        .filter(Boolean)}
    </Wrapper>
  );
};

StaticFlexbox.displayName = 'Flexbox';

const asStaticFlexbox = flow(
  designable(flexboxComponentStart),
);

export default asStaticFlexbox(StaticFlexbox);
