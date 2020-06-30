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

import { useEditContext, useActivateOnEffect } from '@bodiless/core';
import { EditFlowContainerProps, FlowContainerItem } from './types';
import { useFlowContainerDataHandlers, useItemHandlers } from './model';
import { ComponentSelectorProps } from '../ComponentSelector/types';
import componentSelectorForm from '../ComponentSelector/componentSelectorForm';

/**
 * Returns actions which can be executed upon selecting a component in the
 * component selector.
 *
 * @param props The props provided to the FlowContainer
 * @param currentItem The currently selected item in the grid (optional);
 */
const useComponentSelectorActions = (
  currentItem?: FlowContainerItem,
) => {
  const { insertFlowContainerItem, updateFlowContainerItem } = useFlowContainerDataHandlers();
  const { setId } = useActivateOnEffect();

  const insertItem: ComponentSelectorProps['onSelect'] = (event, componentName) => {
    const { uuid } = insertFlowContainerItem(componentName, currentItem);
    // Set the new id so it will activate on creation.
    setId(uuid);
  };

  const replaceItem: ComponentSelectorProps['onSelect'] = (event, componentName) => {
    if (currentItem) {
      const newItem: FlowContainerItem = { ...currentItem, type: componentName };
      updateFlowContainerItem(newItem);
    }
  };

  return { insertItem, replaceItem };
};

function useGetMenuOptions(props: EditFlowContainerProps, item?: FlowContainerItem) {
  const context = useEditContext();
  const { setId } = useActivateOnEffect();
  const { maxComponents } = props;
  const { getItems } = useItemHandlers();
  const { deleteFlowContainerItem } = useFlowContainerDataHandlers();
  const { insertItem, replaceItem } = useComponentSelectorActions(item);
  const addButton = {
    icon: 'add',
    label: 'Add',
    name: 'add',
    handler: () => componentSelectorForm(props, insertItem),
  };
  const deleteButton = !item ? undefined : {
    name: 'delete',
    label: 'Delete',
    icon: 'delete',
    handler: () => {
      const newContextItem = deleteFlowContainerItem(item.uuid);
      // Set the context to the next item in the flow container (if it exists)
      // or to the flow container itself (if not).
      if (newContextItem !== undefined) setId(newContextItem.uuid);
      else context.activate();
    },
  };
  const swapButton = !item ? undefined : {
    name: 'swap',
    label: 'Swap',
    icon: 'repeat',
    handler: () => componentSelectorForm(props, replaceItem),
  };


  const getFlowContainerButtons = (nItems: Number) => (
    // The flow container itself only has an add button when empty (otherwise an add button.
    // will be attached to each item).
    nItems ? [] : [addButton]
  );
  const getItemButtons = (nItems: Number) => (
    // An item only has an add button if we have not hit the maximum allowed items.
    maxComponents && nItems >= maxComponents
      ? [swapButton!, deleteButton!]
      : [addButton, swapButton!, deleteButton!]
  );

  return () => {
    if (!context.isEdit) return [];
    const nItems = getItems().length;
    return item ? getItemButtons(nItems) : getFlowContainerButtons(nItems);
  };
}
export default useGetMenuOptions;
