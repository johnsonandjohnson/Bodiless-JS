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

import React, { FC } from 'react';
import MD5 from 'crypto-js/md5';
import { arrayMove, SortEnd } from 'react-sortable-hoc';
import { observer } from 'mobx-react';
import flowRight from 'lodash/flowRight';

import {
  withMenuOptions, withResizeDetector, withActivateOnEffect,
} from '@bodiless/core';
import { withNode } from '@bodiless/data';
import {
  stylable, ComponentOrTag,
} from '@bodiless/fclasses';
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
import { useSelectorComponents } from '../ComponentSelector/SelectorComponents';

const ChildNodeProvider = withNode(React.Fragment);

export const EditFlowContainerComponents: FlowContainerComponents = {
  Wrapper: stylable<SortableListProps>(SortableContainer),
  ComponentWrapper: stylable<SortableChildProps>(SortableChild),
};

/**
 * @private
 *
 * Forces wrapped component to re-mount when its design keys changed.
 *
 * @param Component The component to re-mount
 */
const withKeyFromDesign = (Component: ComponentOrTag<any>) => {
  const WithKeyFromDesign = (props: any) => {
    const { design } = props;
    if (!design) {
      return <Component {...props} />;
    }
    const json = JSON.stringify(Object.keys(design).sort());
    const key = MD5(json).toString();
    return <Component {...props} key={key} />;
  };
  return WithKeyFromDesign;
};

/**
 * An editable version of the FlowContainer container.
 */
const EditFlowContainer: FC<EditFlowContainerProps> = (props: EditFlowContainerProps) => {
  const {
    design, ui, snapData, getDefaultWidth, itemButtonGroupLabel, id
  } = props;
  const items = useItemHandlers().getItems();
  const { components } = useSelectorComponents({
    design,
    startComponents: EditFlowContainerComponents,
    selectedComponents: [
      ...items.map(item => item.type),
      'ComponentWrapper',
      'Wrapper',
    ],
  });
  const {
    onFlowContainerItemResize,
    setFlowContainerItems,
  } = useFlowContainerDataHandlers();
  const { Wrapper, ComponentWrapper } = components;
  const getItemUseGetMenuOptions = useGetItemUseGetMenuOptions(props);
  const handlers = { ...useFlowContainerDataHandlers(), ...useItemHandlers() };

  return (
    <ComponentDisplayModeProvider mode={ComponentDisplayMode.EditFlowContainer}>
      <Wrapper
        itemCount={items.length}
        onSortEnd={(sort: SortEnd) => {
          const { oldIndex, newIndex } = sort;
          setFlowContainerItems(arrayMove(items, oldIndex, newIndex));
        }}
        ui={ui}
        id={id}
      >
        {items.map(
          (flowContainerItem: FlowContainerItem, index: number): React.ReactNode => {
            const ChildComponent = components[flowContainerItem.type];
            if (!ChildComponent) return null;
            return (
              <ChildNodeProvider nodeKey={flowContainerItem.uuid} key={`node-${flowContainerItem.uuid}`}>
                <ComponentWrapper
                  buttonGroupLabel={itemButtonGroupLabel}
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
                  handlers={handlers}
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

const asEditFlowContainer = flowRight(
  // with ActivateOnEffectProvider should be applied after withKeyFromDesign in
  // order to keep state after re-mount.
  withActivateOnEffect,
  withKeyFromDesign,
  withResizeDetector,
  observer,
  withMenuOptions(
    (p: EditFlowContainerProps) => ({
      useMenuOptions,
      name: typeof p.buttonGroupLabel === 'function'
        ? p.buttonGroupLabel(p) : (p.buttonGroupLabel || 'Flow Container'),
    }),
  ),
  observer,
);

// Wrap the EditFlowContainer in a withActivateContext so we can activate new items
export default asEditFlowContainer(EditFlowContainer);
