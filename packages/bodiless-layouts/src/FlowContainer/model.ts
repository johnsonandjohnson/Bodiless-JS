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
import {
  FlowContainerItem, FlowContainerItemProps, FlowContainerData,
} from './types';

// eslint-disable-next-line max-len
type InsertContentNode = (
  componentName: string,
  afterItem?: FlowContainerItem,
  wrapperProps?: FlowContainerItemProps
) => FlowContainerItem;
type SetFlowContainerItems = (items: FlowContainerItem[]) => void;
type UpdateFlowContainerItem = (flowContainerItem: FlowContainerItem) => void;
type OnFlowContainerItemResize = (
  uuid: string,
  props: FlowContainerItemProps,
) => void;
type DeleteFlowContainerItem = (uuid: string) => FlowContainerItem | undefined;
export type FlowContainerDataHandlers = {
  insertFlowContainerItem: InsertContentNode,
  setFlowContainerItems: SetFlowContainerItems,
  updateFlowContainerItem: UpdateFlowContainerItem,
  onFlowContainerItemResize: OnFlowContainerItemResize,
  deleteFlowContainerItem: DeleteFlowContainerItem,
};
export type FlowContainerItemHandlers = {
  getItems: () => FlowContainerItem[],
  setItems: (items: FlowContainerItem[]) => void,
  deleteItem: (uuid?: string | undefined) => void,
};

export function useItemHandlers(): FlowContainerItemHandlers {
  const { node } = useNode<FlowContainerData>();
  const getItems = () => {
    const { items } = node.data;
    return items || [];
  };
  const setItems = (items: FlowContainerItem[]) => {
    node.setData({ items });
  };
  const deleteItem = (uuid?: string) => {
    const path$ = uuid ? node.path.concat(uuid) : node.path;
    node.delete(path$);
  };
  return { getItems, setItems, deleteItem };
}

export function useFlowContainerDataHandlers(): FlowContainerDataHandlers {
  const { getItems, setItems, deleteItem } = useItemHandlers();
  const findItem = (startItem?: Pick<FlowContainerItem, 'uuid'>) => {
    const items = getItems();
    if (!startItem) return items.length;
    const index = items.findIndex(
      (item: FlowContainerItem) => startItem!.uuid === item.uuid,
    );
    return index === -1 ? items.length : index;
  };
  const spliceItem = (start: number, deleteCount: number, newItem?: FlowContainerItem) => {
    const newItems = [...getItems()];
    if (newItem) newItems.splice(start, deleteCount, newItem);
    else newItems.splice(start, deleteCount);
    setItems(newItems);
  };
  return {
    insertFlowContainerItem: (
      componentName: string,
      afterItem?: FlowContainerItem,
      wrapperPropsToClone: FlowContainerItemProps = {},
    ) => {
      const newItem = {
        uuid: v1(),
        wrapperProps: wrapperPropsToClone,
        type: componentName,
      };
      const index = findItem(afterItem);
      spliceItem(index + 1, 0, newItem);
      return newItem;
    },
    setFlowContainerItems: setItems,
    updateFlowContainerItem: (flowContainerItem: FlowContainerItem) => {
      const index = findItem(flowContainerItem);
      if (index < getItems().length) {
        spliceItem(index, 1, flowContainerItem);
      }
    },
    onFlowContainerItemResize: (uuid, itemProps) => {
      const items = getItems();
      const itemIndex = findItem({ uuid });
      if (itemIndex < items.length) {
        const currentFlowContainerItem = items[itemIndex];
        const updatedFlowContainerItem: FlowContainerItem = {
          ...currentFlowContainerItem,
          wrapperProps: {
            ...(currentFlowContainerItem.wrapperProps || {}),
            ...itemProps,
          },
        };
        if (JSON.stringify(currentFlowContainerItem) !== JSON.stringify(updatedFlowContainerItem)) {
          spliceItem(itemIndex, 1, updatedFlowContainerItem);
        }
      }
    },
    deleteFlowContainerItem: (uuid: string) => {
      const index = findItem({ uuid });
      if (index >= getItems().length) return undefined;
      spliceItem(index, 1);
      const items = getItems();
      deleteItem(uuid);
      return items[index] || items[items.length - 1];
    },
  };
}
