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
import { withNode } from '@bodiless/core';
import { useItemHandlers } from './helpers';
import { StaticFlexboxProps, FlexboxItem } from './types';

const NodeProvider = withNode<PropsWithChildren<{}>, any>(React.Fragment);

const StaticFlexbox: FC<StaticFlexboxProps> = ({ components }) => {
  const items = useItemHandlers().getItems();
  return (
    // When in a static mode we don't want to use `bl-*` prefixed classes.
    <div className="flex flex-wrap">
      {items
        .map((flexboxItem: FlexboxItem) => {
          const ChildComponent = components[flexboxItem.type];
          // TODO: Inhance this notification when the data is bad
          if (!ChildComponent) {
            throw new Error(`${flexboxItem.type} is not an allowed content type`);
          }
          return (
            <div
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
            </div>
          );
        })
        .filter(Boolean)}
    </div>
  );
};

StaticFlexbox.displayName = 'Flexbox';

export default StaticFlexbox;
