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

import { v1 } from 'uuid';
import { useNode } from '@bodiless/core';
import { FlexboxItem, FlexboxItemProps, FlexboxData } from './types';

type InsertContentNode = (componentName: string, afterItem?: FlexboxItem) => FlexboxItem;
type SetFlexboxItems = (items: FlexboxItem[]) => void;
type UpdateFlexboxItem = (flexboxItem: FlexboxItem) => void;
type OnFlexboxItemResize = (
  uuid: string,
  props: FlexboxItemProps,
) => void;
type DeleteFlexboxItem = (uuid: string) => FlexboxItem | undefined;
type FlexboxDataHandlers = {
  insertFlexboxItem: InsertContentNode,
  setFlexboxItems: SetFlexboxItems,
  updateFlexboxItem: UpdateFlexboxItem,
  onFlexboxItemResize: OnFlexboxItemResize,
  deleteFlexboxItem: DeleteFlexboxItem,
};

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

export function useFlexboxDataHandlers(): FlexboxDataHandlers {
  const { getItems, setItems } = useItemHandlers();
  const findItem = (startItem?: Pick<FlexboxItem, 'uuid'>) => {
    const items = getItems();
    if (!startItem) return items.length;
    const index = items.findIndex(
      (item: FlexboxItem) => startItem!.uuid === item.uuid,
    );
    return index === -1 ? items.length : index;
  };
  const spliceItem = (start: number, deleteCount: number, newItem?: FlexboxItem) => {
    const newItems = [...getItems()];
    if (newItem) newItems.splice(start, deleteCount, newItem);
    else newItems.splice(start, deleteCount);
    setItems(newItems);
  };
  return {
    insertFlexboxItem: (componentName: string, afterItem?: FlexboxItem) => {
      const newItem = {
        uuid: v1(),
        wrapperProps: {},
        type: componentName,
      };
      const index = findItem(afterItem);
      spliceItem(index + 1, 0, newItem);
      return newItem;
    },
    setFlexboxItems: setItems,
    updateFlexboxItem: (flexboxItem: FlexboxItem) => {
      const index = findItem(flexboxItem);
      if (index < getItems().length) {
        spliceItem(index, 1, flexboxItem);
      }
    },
    onFlexboxItemResize: (uuid, itemProps) => {
      const items = getItems();
      const itemIndex = findItem({ uuid });
      if (itemIndex < items.length) {
        const currentFlexboxItem = items[itemIndex];
        const updatedFlexboxItem: FlexboxItem = {
          ...currentFlexboxItem,
          wrapperProps: {
            ...(currentFlexboxItem.wrapperProps || {}),
            ...itemProps,
          },
        };
        spliceItem(itemIndex, 1, updatedFlexboxItem);
      }
    },
    deleteFlexboxItem: (uuid: string) => {
      const index = findItem({ uuid });
      if (index >= getItems().length) return undefined;
      spliceItem(index, 1);
      const items = getItems();
      return items[index] || items[items.length - 1];
    },
  };
}
