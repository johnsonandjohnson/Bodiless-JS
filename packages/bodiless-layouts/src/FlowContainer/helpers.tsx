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

import * as React from 'react';
import { v1 } from 'uuid';
import {
  contextMenuForm,
  useEditContext, useNode,
  useActivateOnEffect,
} from '@bodiless/core';
import ComponentSelector from '../ComponentSelector';
import { ComponentSelectorUI } from '../ComponentSelector/types';
import {
  EditFlowContainerProps, FlowContainerItem, FlowContainerItemProps, FlowContainerData,
} from './types';

type InsertContentNode = (componentName: string, uuid?: string) => FlowContainerItem;
type SetFlowContainerItems = (items: FlowContainerItem[]) => void;
type UpdateFlowContainerItem = (flowContainerItem: FlowContainerItem) => void;
type OnFlowContainerItemResize = (
  uuid: string,
  props: FlowContainerItemProps,
) => void;
type DeleteFlowContainerItem = (uuid: string) => void;
export interface FlowContainerDataHandlers {
  insertFlowContainerItem: InsertContentNode;
  setFlowContainerItems: SetFlowContainerItems;
  updateFlowContainerItem: UpdateFlowContainerItem;
  onFlowContainerItemResize: OnFlowContainerItemResize;
  deleteFlowContainerItem: DeleteFlowContainerItem;
}

export function useItemHandlers() {
  const { node } = useNode<FlowContainerData>();
  const getItems = () => {
    const { items } = node.data;
    return items || [];
  };
  const setItems = (items: FlowContainerItem[]) => {
    node.setData({ items });
  };
  return { getItems, setItems };
}

function useFlowContainerDataHandlers(): FlowContainerDataHandlers {
  const { getItems, setItems } = useItemHandlers();
  return {
    insertFlowContainerItem: (componentName: string, uuid: string|undefined) => {
      const items = getItems();
      const newItem = {
        uuid: uuid || v1(),
        wrapperProps: {},
        type: componentName,
      };
      setItems(items.concat(newItem));
      return newItem;
    },
    setFlowContainerItems: setItems,
    updateFlowContainerItem: (flowContainerItem: FlowContainerItem) => {
      const items = getItems();
      const itemIndex = items.findIndex(
        (item: FlowContainerItem) => flowContainerItem.uuid === item.uuid,
      );
      if (itemIndex !== -1) {
        const newItems = [...items];
        newItems.splice(itemIndex, 1, flowContainerItem);
        setItems(newItems);
      }
    },
    onFlowContainerItemResize: (contentUuid, itemProps) => {
      const items = getItems();
      const itemIndex = items.findIndex(
        (item: FlowContainerItem) => contentUuid === item.uuid,
      );
      if (itemIndex !== -1) {
        const currentFlowContainerItem = items[itemIndex];
        const updatedFlowContainerItem: FlowContainerItem = {
          ...currentFlowContainerItem,
          wrapperProps: {
            ...(currentFlowContainerItem.wrapperProps || {}),
            ...itemProps,
          },
        };
        items.splice(itemIndex, 1, updatedFlowContainerItem);
        setItems(items);
      }
    },
    deleteFlowContainerItem: (uuid: string) => {
      const items = getItems();
      const itemIndex = items.findIndex(
        (flowContainerItem: FlowContainerItem) => uuid === flowContainerItem.uuid,
      );
      if (itemIndex !== -1) {
        const newItems = [...items];
        newItems.splice(itemIndex, 1);
        setItems(newItems);
      }
    },
  };
}

function useGetMenuOptions(props: EditFlowContainerProps) {
  const context = useEditContext();
  const { maxComponents } = props;
  const { getItems } = useItemHandlers();
  const { insertFlowContainerItem } = useFlowContainerDataHandlers();
  const { setId } = useActivateOnEffect();
  const addButton = {
    icon: 'add',
    name: 'add',
    global: true,
    isDisabled: () => !context.isEdit,
    handler: () => contextMenuForm({
      initialValues: { selection: '' },
      hasSubmit: false,
    })(
      ({ ui, closeForm }) => (
        <ComponentSelector
          {...props}
          ui={{ ...ui as ComponentSelectorUI, ...props.ui as ComponentSelectorUI }}
          closeForm={closeForm}
          onSelect={(event, componentName) => {
            const { uuid } = insertFlowContainerItem(componentName);
            // Set the new id so it will activate on creation.
            setId(uuid);
            closeForm();
          }}
          components={Object.values(props.components)}
        />
      ),
    ),
  };
  // If we have hit the max elements do not allow adding more items
  return () => {
    if (!context.isEdit) return [];
    const items = getItems();

    if (maxComponents && maxComponents <= items.length) {
      return [];
    }
    return [addButton];
  };
}

export { useGetMenuOptions, useFlowContainerDataHandlers };
