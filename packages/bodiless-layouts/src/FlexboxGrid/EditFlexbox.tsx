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
import { arrayMove, SortEnd } from 'react-sortable-hoc';
import { observer } from 'mobx-react-lite';
import { flowRight } from 'lodash';
import {
  useContextActivator, withActivateOnEffect, withNode, withMenuOptions,
} from '@bodiless/core';
import { DesignableComponents } from '@bodiless/fclasses';
import SortableChild from './SortableChild';
import SortableContainer from './SortableContainer';
import {
  useItemHandlers,
  useFlexboxDataHandlers,
  useGetMenuOptions,
} from './helpers';
import { EditFlexboxProps, FlexboxItem } from './types';

const ChildNodeProvider = withNode<PropsWithChildren<{}>, any>(React.Fragment);

function isAllowedComponent(
  components: DesignableComponents,
  type: string,
): boolean {
  return Boolean(components[type]);
}

const FlexboxActivator: React.FC = ({ children }) => (
  <div {...useContextActivator('onClick')}>
    {children}
  </div>
);

const EditFlexbox: FC<EditFlexboxProps> = (props:EditFlexboxProps) => {
  const { components, ui, snapData } = props;
  const items = useItemHandlers().getItems();
  const {
    onFlexboxItemResize,
    setFlexboxItems,
  } = useFlexboxDataHandlers();

  return (
    <FlexboxActivator>
      <SortableContainer
        onSortEnd={(sort: SortEnd) => {
          const { oldIndex, newIndex } = sort;
          setFlexboxItems(arrayMove(items, oldIndex, newIndex));
        }}
      >
        {items.map(
          (flexboxItem: FlexboxItem, index: number): React.ReactNode => {
            if (!isAllowedComponent(components, flexboxItem.type)) {
              return null;
            }
            const ChildComponent = components[flexboxItem.type];
            return (
              <SortableChild
                ui={ui}
                key={`node-${flexboxItem.uuid}`}
                index={index}
                flexboxItem={flexboxItem}
                snapData={snapData}
                getMenuOptions={useGetMenuOptions(props, flexboxItem)}
                onResizeStop={
                    flexboxItemProps => onFlexboxItemResize(flexboxItem.uuid, flexboxItemProps)
                  }
              >
                <ChildNodeProvider nodeKey={flexboxItem.uuid}>
                  <ChildComponent />
                </ChildNodeProvider>
              </SortableChild>
            );
          },
        )}
      </SortableContainer>
    </FlexboxActivator>
  );
};

EditFlexbox.displayName = 'EditFlexbox';

EditFlexbox.defaultProps = {
  components: {},
};

const asEditFlexbox = flowRight(
  withActivateOnEffect,
  observer,
  withMenuOptions({
    useGetMenuOptions: (props: EditFlexboxProps) => useGetMenuOptions(props),
    name: 'Flexbox',
  }),
  observer,
);

// Wrap the EditFlexbox in a wthActivateContext so we can activate new items
export default asEditFlexbox(EditFlexbox);
