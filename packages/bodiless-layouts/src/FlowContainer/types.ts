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

import { WithNodeProps, TMenuOptionGetter } from '@bodiless/core';
import {
  DesignableComponents, ComponentOrTag, DesignableComponentsProps, DesignableProps,
} from '@bodiless/fclasses';
import { HTMLProps } from 'react';
import { ComponentSelectorUI } from '../ComponentSelector/types';
import { UI as SortableResizableUI } from '../SlateSortableResizable';
import { SnapData } from './utils/appendTailwindWidthClass';

export type UI = ComponentSelectorUI & SortableResizableUI;

export type FlowContainerData = {
  items: FlowContainerItem[];
};
export type EditFlowContainerProps = DesignableComponentsProps & HTMLProps<HTMLDivElement> & {
  ui?: UI,
  snapData?: SnapData,
  getDefaultWidth?: (snapData: SnapData) => string;
  maxComponents?: number,
  minComponents?: number,
  mandatoryCategories?: string[],
  blacklistCategoris?: string[],
  isResizeEnabled?: boolean,
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

export type FlowContainerComponents = {
  Wrapper: ComponentOrTag<any>,
  ComponentWrapper: ComponentOrTag<any>,
};
