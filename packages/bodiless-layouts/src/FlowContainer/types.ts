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

import { ComponentType } from 'react';
import { WithNodeProps, TMenuOptionGetter } from '@bodiless/core';
import { DesignableComponents, StylableProps } from '@bodiless/fclasses';
import { ComponentSelectorUI } from '../ComponentSelector/types';
import { UI as SortableResizableUI } from '../SlateSortableResizable';
import { SnapData } from './utils/appendTailwindWidthClass';
import { SortableListProps } from './SortableContainer';

export type UI = ComponentSelectorUI & SortableResizableUI;

export type FlowContainerData = {
  items: FlowContainerItem[];
};
export type StaticFlowContainerProps = {
  components: DesignableComponents;
};
export type EditFlowContainerProps = StaticFlowContainerProps & {
  ui?: UI,
  snapData?: SnapData,
  defaultWidth?: string|number,
  maxComponents?: number,
};
export type WidthClassTuple = {
  width: number;
  media: string;
  class: string;
};
export type FlowContainerProps = EditFlowContainerProps & WithNodeProps;
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
  getMenuOptions: TMenuOptionGetter;
  index: number;
  children: React.ReactNode;
  ui?: SortableResizableUI;
  snapData?: SnapData;
  defaultWidth?: string | number;
  className?: string;
};

export type FlowContainerComponents = {
  Wrapper: ComponentType<StylableProps & SortableListProps>,
  ComponentWrapper: ComponentType<StylableProps & SortableChildProps>,
};
