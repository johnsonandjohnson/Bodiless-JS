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

/**
 * Props passed to the list of items within the component margin.
 */
export type ItemListProps = {
  /**
   * Callback to handle changes on existing fields.
   */
  onChange: (e: any, fieldType: string) => void,
};

export type ComponentMarginProps = ItemListProps & {
  /**
   * Callback to close the form.
   */
  closeForm?: (e?: any) => void;
  /**
   * Styled components to use in the component selector UI.
   */
  ui?: ComponentMarginUI;
  /**
   * Margin value assigned to the component.
   */
  marginValue?: string,
  /**
   * Flag o let UI know if item has margin classes.
   */
  hasMarginClasses?: boolean,
};

export type FinalUI = {
  MasterWrapper: ComponentType<HTMLProps<HTMLDivElement>> | string;
  MarginSideCheckboxesWrapper: ComponentType<HTMLProps<HTMLDivElement>> | string;
  MarginSideCheckboxLabel: ComponentType<HTMLProps<HTMLLabelElement>> | string;
  MarginSideCheckbox: ComponentType<HTMLProps<HTMLInputElement>> | string;
  MarginValueInput: ComponentType<HTMLProps<HTMLInputElement>> | string;
};

export type ComponentMarginUI = Partial<FinalUI>;
