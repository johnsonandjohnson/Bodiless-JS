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

import { useCallback } from 'react';
import { omit } from 'lodash';
import {
  useEditContext, useActivateOnEffect, useGetter, TMenuOption,
} from '@bodiless/core';
import { EditFlowContainerProps, FlowContainerItem } from './types';
import type { FlowContainerDataHandlers, FlowContainerItemHandlers } from './model';
import { useFlowContainerDataHandlers, useItemHandlers } from './model';
import { ComponentSelectorProps } from '../ComponentSelector/types';
import componentSelectorForm from '../ComponentSelector/componentSelectorForm';
import { FALLBACK_SNAP_CLASSNAME } from './SortableChild';
import { defaultSnapData } from './utils/appendTailwindWidthClass';

type Handlers = FlowContainerDataHandlers & FlowContainerItemHandlers;

/**
 * @private
 *
 * Removes components from the design which are part of the actual flow container design,
 * not intended to appear as options in the component selector.
 *
 * @param props The original props of the flow container.
 *
 * @return The props with irrelevant components removed.
 */
const withNoDesign = (props:EditFlowContainerProps):EditFlowContainerProps => ({
  ...props,
  components: omit(props.components, ['Wrapper', 'ComponentWrapper']),
});

/**
 * @private
 *
 * Returns actions which can be executed upon selecting a component in the
 * component selector.
 *
 * @param props The props provided to the FlowContainer
 * @param currentItem The currently selected item in the grid (optional);
 */
const useComponentSelectorActions = (
  handlers: Handlers,
  props: EditFlowContainerProps,
  currentItem?: FlowContainerItem,
) => {
  const {
    getDefaultWidth = () => FALLBACK_SNAP_CLASSNAME,
    snapData = defaultSnapData,
  } = props;
  const { insertFlowContainerItem, updateFlowContainerItem } = handlers;
  const { setId } = useActivateOnEffect();

  const wrapperProps = {
    className: getDefaultWidth(snapData),
  };

  const insertItem: ComponentSelectorProps['onSelect'] = ([componentName]) => {
    const { uuid } = insertFlowContainerItem(componentName, currentItem, wrapperProps);
    // Set the new id so it will activate on creation.
    setId(uuid);
  };

  const replaceItem: ComponentSelectorProps['onSelect'] = ([componentName]) => {
    if (currentItem) {
      const newItem: FlowContainerItem = { ...currentItem, type: componentName };
      updateFlowContainerItem(newItem);
    }
  };

  return { insertItem, replaceItem };
};

const useCloneButton = (
  handlers: Handlers,
  props: EditFlowContainerProps,
  item: FlowContainerItem,
) => {
  const context = useEditContext();
  const { insertFlowContainerItem, getItems } = handlers;
  const { maxComponents = Infinity } = props;
  const { setId } = useActivateOnEffect();

  const handler = () => {
    const { uuid } = insertFlowContainerItem(item.type, item, item.wrapperProps);
    setId(uuid);
  };

  const isHidden = useCallback(
    () => !context.isEdit || getItems().length >= maxComponents, [maxComponents],
  );

  return {
    name: 'copy-item',
    label: 'Copy',
    icon: 'content_copy',
    global: false,
    local: true,
    handler,
    isHidden,
  };
};

const useDeleteButton = (
  handlers: Handlers,
  item: FlowContainerItem,
) => {
  const context = useEditContext();
  const { deleteFlowContainerItem } = handlers;
  const { setId } = useActivateOnEffect();

  const handler = () => {
    const newContextItem = deleteFlowContainerItem(item.uuid);
    // Set the context to the next item in the flow container (if it exists)
    // or to the flow container itself (if not).
    if (newContextItem !== undefined) setId(newContextItem.uuid);
    else context.activate();
  };

  return {
    name: 'delete',
    label: 'Delete',
    icon: 'delete',
    global: false,
    local: true,
    handler,
    isHidden: useCallback(() => !context.isEdit, []),
  };
};

const useAddButton = (
  handlers: Handlers,
  props: EditFlowContainerProps,
  item?: FlowContainerItem,
) => {
  const { maxComponents = Infinity } = props;
  const context = useEditContext();
  const { insertItem } = useComponentSelectorActions(handlers, props, item);
  const { getItems } = handlers;
  const isHidden = item
    ? useCallback(() => !context.isEdit || getItems().length >= maxComponents, [maxComponents])
    : useCallback(() => !context.isEdit || getItems().length > 0, []);
  // @TODO For nested flow containers we'll have to give these unique names.
  const name = item ? 'add-item' : 'add';
  return {
    icon: 'add',
    label: 'Add',
    global: false,
    local: true,
    name,
    handler: () => componentSelectorForm(props, insertItem),
    activateContext: false,
    formTitle: 'Insert Component',
    isHidden,
  };
};

const useSwapButton = (
  handlers: Handlers,
  props: EditFlowContainerProps,
  item: FlowContainerItem,
) => {
  const context = useEditContext();
  const { replaceItem } = useComponentSelectorActions(handlers, props, item);
  return {
    name: 'swap',
    label: 'Swap',
    icon: 'repeat',
    global: false,
    local: true,
    handler: () => componentSelectorForm(props, replaceItem),
    activateContext: false,
    isHidden: useCallback(() => !context.isEdit, []),
    formTitle: 'Replace Component',
  };
};

/**
 * @private
 * Gets the context menu options for the flow container itself (an add button when the
 * flow container is empty).
 *
 * @param props The props passed to the flow container
 */
function useMenuOptions(props: EditFlowContainerProps) {
  const handlers = { ...useFlowContainerDataHandlers(), ...useItemHandlers() };
  const addButton: TMenuOption = useAddButton(handlers, withNoDesign(props));
  return [addButton];
}

/**
 * @private
 *
 * Returns a function which takes a flow container item and returns a 'useGetMenuOptions' hook
 * which is passed as a prop to that item. This hook is invoked in by the item to obtain a
 * memoized 'getMenuOptions' callback, which is in turn passed to PageContextProvider to define
 * the menu options for that item.
 *
 * The reasons for this extra indirection (a hook returning a hook) are:
 * - we want to build the menu options using the node of the flow container
 * - We want the options added using the context of the item
 * - The memoization of the options has to happen in the context of the item to avoid changing the
 *   order of hooks in the container as items are added and removed.
 * - The item must memoize the callback itself and use PageContextProvider directly
 *   rather than relying on `withMenuOptions`. This is because we don't want to call
 *   the `withMenuOptions` HOC in the context of a render.
 *
 * @param props Props passed to the flow container
 *
 * @return A function which generates a 'useGetMenuOptions' prop for an item.
 */
const useGetItemUseGetMenuOptions = (props: EditFlowContainerProps) => {
  // We have to obtain the handlers in the flow container context, and we have
  // to do it only once to avoid hook sequencing errors.
  const handlers = { ...useFlowContainerDataHandlers(), ...useItemHandlers() };
  const props$ = withNoDesign(props);
  return (item: FlowContainerItem) => () => {
    const buttons = [
      // These hooks are all invoked by the flow container item (not the flow container itself).
      useAddButton(handlers, props$, item),
      useCloneButton(handlers, props$, item),
      useSwapButton(handlers, props$, item),
      useDeleteButton(handlers, item),
    ];
    return useGetter(buttons);
  };
};

export { useMenuOptions, useGetItemUseGetMenuOptions };
