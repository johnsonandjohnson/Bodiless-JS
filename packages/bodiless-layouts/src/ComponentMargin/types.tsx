/**
 * Copyright © 2021 Johnson & Johnson
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

import type { ComponentType, HTMLProps } from 'react';

export type ComponentMarginProps = ItemListProps & {
  /**
   * Calback to close the form.
   */
  closeForm?: (e?: any) => void;
  /**
   * Styled components to use in the component selector UI.
   */
  ui?: ComponentMarginUI;
};

/**
 * Component metadata used to display information about margin settings.
 */
export type Meta = {
  /**
   * default static prop for react component to distingush it in the render tree
   */
  displayName: string;
  /**
   * Title to show in the item selector menu
   */
  title: string;
  /**
   * Description to display in the item selector
   */
  description: string;
};

export type ComponentWithMeta<P = any> = ComponentType<P> & Meta;
export type ComponentWithPartialMeta<P = any> = ComponentType<P> & Partial<Meta>;

/**
 * Props passed to the list of items within the component margin.
 */
export type ItemListProps = {
  /**
   * Callback when one or more settings are changed.
   */
  onChange: (names: string[]) => void,
};

export type FinalUI = {
  MasterWrapper: ComponentType<HTMLProps<HTMLDivElement>> | string;
  MarginSideCheckboxesWrapper: ComponentType<HTMLProps<HTMLDivElement>> | string;
  MarginSideCheckboxLabel: ComponentType<HTMLProps<HTMLLabelElement>> | string;
  MarginSideCheckbox: ComponentType<HTMLProps<HTMLInputElement>> | string;
  MarginValueInput: ComponentType<HTMLProps<HTMLInputElement>> | string;
};

export type ComponentMarginUI = Partial<FinalUI>;
