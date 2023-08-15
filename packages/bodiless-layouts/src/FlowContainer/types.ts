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

import { TMenuOptionGetter } from '@bodiless/core';
import { WithNodeProps } from '@bodiless/data';
import {
  DesignableComponents, ComponentOrTag, DesignableProps,
} from '@bodiless/fclasses';
import { HTMLProps } from 'react';
import { ComponentSelectorUI, ComponentSelectorProps } from '../ComponentSelector/types';
import { UI as SortableResizableUI, SlateSortableResizableProps } from '../SlateSortableResizable';
import { SnapData } from './utils/appendTailwindWidthClass';

export type UI = ComponentSelectorUI & SortableResizableUI;

export type FlowContainerData = {
  items: FlowContainerItem[];
};
export type EditFlowContainerProps =
  DesignableProps
  & HTMLProps<HTMLDivElement>
  & Pick<ComponentSelectorProps, 'mandatoryCategories'|'blacklistCategories'|'scale'>
  & {
    ui?: UI,
    snapData?: SnapData,
    getDefaultWidth?: (snapData: SnapData) => string;
    maxComponents?: number,
    minComponents?: number,
    isResizeEnabled?: boolean,
    /**
     * The label to use for the context menu buttons provided by an empty flow container.
     */
    buttonGroupLabel?: string|((props:EditFlowContainerProps) => string),
    /**
     * The label to use for the context menu buttons provided by a flow container item.
     */
    itemButtonGroupLabel?: string|((props:SlateSortableResizableProps) => string),
  };

export type WidthClassTuple = {
  width: number;
  media: string;
  class: string;
};
export type FlowContainerBaseProps = EditFlowContainerProps & WithNodeProps;
export type FlowContainerProps = Omit<FlowContainerBaseProps, 'components'> & DesignableProps;
export type FlowContainerComponentProps = {
  components: DesignableComponents;
  ui?: ComponentSelectorUI;
};
export interface FlowContainerItemProps {
  defaultSize?: {
    width?: string | number;
    height?: string | number;
  };
  className?: string;
}
export interface FlowContainerItem {
  type: string;
  uuid: string;
  wrapperProps: FlowContainerItemProps;
}

export type SortableChildProps = {
  flowContainerItem: FlowContainerItem;
  onResizeStop(props: FlowContainerItemProps): void;
  useGetMenuOptions: () => TMenuOptionGetter;
  index: number;
  children: React.ReactNode;
  ui?: SortableResizableUI;
  snapData?: SnapData;
  getDefaultWidth?: (snapData: SnapData) => string;
  className?: string;
};

export type FlowContainerWrapperProps = {
  itemCount: number,
};

/**
 * Design keys available for the flow container.
 *
 * @category Component
 */
export interface FlowContainerComponents extends DesignableComponents {
  /**
   * The outer wrapper of the flow container.  Usually a `Div`.
   * This will have `flex` and `flex-row` classes by default to manage
   * the layout of its children.
   */
  Wrapper: ComponentOrTag<any>,
  /**
   * The wrapper for each component placed in the flow container.  Usually a `Div`.
   * Width classes are applied to this wrapper dynamically to control layout.
   */
  ComponentWrapper: ComponentOrTag<any>,
}
