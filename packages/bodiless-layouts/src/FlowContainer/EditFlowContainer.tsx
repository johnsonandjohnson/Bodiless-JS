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
  withActivateOnEffect, withNode, withMenuOptions,
} from '@bodiless/core';
import { designable, stylable } from '@bodiless/fclasses';
import SortableChild from './SortableChild';
import SortableContainer, { SortableListProps } from './SortableContainer';
import { useItemHandlers, useFlowContainerDataHandlers } from './model';
import { useMenuOptions, useGetItemUseGetMenuOptions } from './useGetMenuOptions';
import {
  EditFlowContainerProps,
  FlowContainerItem,
  FlowContainerComponents,
  FlowContainerItemProps,
  SortableChildProps,
} from './types';
import { ComponentDisplayModeProvider, ComponentDisplayMode } from './ComponentDisplayMode';

const ChildNodeProvider = withNode<PropsWithChildren<{}>, any>(React.Fragment);

const EditFlowContainerComponents: FlowContainerComponents = {
  Wrapper: stylable<SortableListProps>(SortableContainer),
  ComponentWrapper: stylable<SortableChildProps>(SortableChild),
};

/**
 * An editable version of the FlowContainer container.
 */
const EditFlowContainer: FC<EditFlowContainerProps> = (props:EditFlowContainerProps) => {
  const {
    components, ui, snapData, getDefaultWidth,
  } = props;
  const items = useItemHandlers().getItems();
  const {
    onFlowContainerItemResize,
    setFlowContainerItems,
  } = useFlowContainerDataHandlers();
  const { Wrapper, ComponentWrapper } = components;
  const getItemUseGetMenuOptions = useGetItemUseGetMenuOptions(props);

  return (
    <ComponentDisplayModeProvider mode={ComponentDisplayMode.EditFlowContainer}>
      <Wrapper
        onSortEnd={(sort: SortEnd) => {
          const { oldIndex, newIndex } = sort;
          setFlowContainerItems(arrayMove(items, oldIndex, newIndex));
        }}
        ui={ui}
      >
        {items.map(
          (flowContainerItem: FlowContainerItem, index: number): React.ReactNode => {
            const ChildComponent = components[flowContainerItem.type];
            if (!ChildComponent) return null;
            return (
              <ChildNodeProvider nodeKey={flowContainerItem.uuid} key={`node-${flowContainerItem.uuid}`}>
                <ComponentWrapper
                  ui={ui}
                  index={index}
                  flowContainerItem={flowContainerItem}
                  snapData={snapData}
                  getDefaultWidth={getDefaultWidth}
                  useGetMenuOptions={getItemUseGetMenuOptions(flowContainerItem)}
                  onResizeStop={
                    // eslint-disable-next-line max-len
                    (flowContainerItemProps: FlowContainerItemProps) => onFlowContainerItemResize(flowContainerItem.uuid, flowContainerItemProps)
                  }
                >
                  <ChildComponent />
                </ComponentWrapper>
              </ChildNodeProvider>
            );
          },
        )}
      </Wrapper>
    </ComponentDisplayModeProvider>
  );
};

EditFlowContainer.displayName = 'EditFlowContainer';

EditFlowContainer.defaultProps = {
  components: {},
};

const asEditFlowContainer = flowRight(
  withActivateOnEffect,
  observer,
  designable(EditFlowContainerComponents, 'FlowContainer'),
  withMenuOptions({
    useMenuOptions,
    name: 'Flow Container',
  }),
  observer,
);

// Wrap the EditFlowContainer in a wthActivateContext so we can activate new items
export default asEditFlowContainer(EditFlowContainer);
