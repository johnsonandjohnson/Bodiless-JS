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

import { WithNodeProps } from '@bodiless/core';
import { DesignableComponents } from '@bodiless/fclasses';
import { ComponentSelectorUI } from '../ComponentSelector/types';
import { UI as SortableResizableUI } from '../SlateSortableResizable';
import { SnapData } from './utils/appendTailwindWidthClass';

export type UI = ComponentSelectorUI & SortableResizableUI;

export type FlexboxData = {
  items: FlexboxItem[];
};
export type StaticFlexboxProps = {
  components: DesignableComponents;
};
export type EditFlexboxProps = StaticFlexboxProps & {
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
export type FlexboxGridProps = EditFlexboxProps & WithNodeProps;
export type FlexboxComponentProps = {
  components: DesignableComponents;
  ui?: ComponentSelectorUI;
};
export interface FlexboxItemProps {
  defaultSize?: {
    width?: string | number;
    height?: string | number;
  };
  className?: string;
}
export interface FlexboxItem {
  type: string;
  uuid: string;
  wrapperProps: FlexboxItemProps;
}
