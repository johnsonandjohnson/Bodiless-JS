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
  EditFlexboxProps, FlexboxItem, FlexboxItemProps, FlexboxData,
} from './types';

type InsertContentNode = (componentName: string, uuid?: string) => FlexboxItem;
type SetFlexboxItems = (items: FlexboxItem[]) => void;
type UpdateFlexboxItem = (flexboxItem: FlexboxItem) => void;
type OnFlexboxItemResize = (
  uuid: string,
  props: FlexboxItemProps,
) => void;
type DeleteFlexboxItem = (uuid: string) => void;
export interface FlexboxDataHandlers {
  insertFlexboxItem: InsertContentNode;
  setFlexboxItems: SetFlexboxItems;
  updateFlexboxItem: UpdateFlexboxItem;
  onFlexboxItemResize: OnFlexboxItemResize;
  deleteFlexboxItem: DeleteFlexboxItem;
}

export function useItemHandlers() {
  const { node } = useNode<FlexboxData>();
  const getItems = () => {
    const { items } = node.data;
    return items || [];
  };
  const setItems = (items: FlexboxItem[]) => {
    node.setData({ items });
  };
  return { getItems, setItems };
}

function useFlexboxDataHandlers(): FlexboxDataHandlers {
  const { getItems, setItems } = useItemHandlers();
  return {
    insertFlexboxItem: (componentName: string, uuid: string|undefined) => {
      const items = getItems();
      const newItem = {
        uuid: uuid || v1(),
        wrapperProps: {},
        type: componentName,
      };
      setItems(items.concat(newItem));
      return newItem;
    },
    setFlexboxItems: setItems,
    updateFlexboxItem: (flexboxItem: FlexboxItem) => {
      const items = getItems();
      const itemIndex = items.findIndex(
        (item: FlexboxItem) => flexboxItem.uuid === item.uuid,
      );
      if (itemIndex !== -1) {
        const newItems = [...items];
        newItems.splice(itemIndex, 1, flexboxItem);
        setItems(newItems);
      }
    },
    onFlexboxItemResize: (contentUuid, itemProps) => {
      const items = getItems();
      const itemIndex = items.findIndex(
        (item: FlexboxItem) => contentUuid === item.uuid,
      );
      if (itemIndex !== -1) {
        const currentFlexboxItem = items[itemIndex];
        const updatedFlexboxItem: FlexboxItem = {
          ...currentFlexboxItem,
          wrapperProps: {
            ...(currentFlexboxItem.wrapperProps || {}),
            ...itemProps,
          },
        };
        items.splice(itemIndex, 1, updatedFlexboxItem);
        setItems(items);
      }
    },
    deleteFlexboxItem: (uuid: string) => {
      const items = getItems();
      const itemIndex = items.findIndex(
        (flexboxItem: FlexboxItem) => uuid === flexboxItem.uuid,
      );
      if (itemIndex !== -1) {
        const newItems = [...items];
        newItems.splice(itemIndex, 1);
        setItems(newItems);
      }
    },
  };
}

function useGetMenuOptions(props: EditFlexboxProps) {
  const context = useEditContext();
  const { maxComponents } = props;
  const { getItems } = useItemHandlers();
  const { insertFlexboxItem } = useFlexboxDataHandlers();
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
            const { uuid } = insertFlexboxItem(componentName);
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

export { useGetMenuOptions, useFlexboxDataHandlers };
