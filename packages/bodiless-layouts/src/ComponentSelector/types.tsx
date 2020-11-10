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

import {
  ComponentType, HTMLProps, MouseEvent, ReactNode,
} from 'react';
import { FormApi, FormState, FieldProps } from 'informed';
import { LinkVariantProps } from '@bodiless/core';

export type AllowedComponent = ComponentWithMeta<any>;
export type RenderList = (options: {
  formState: FormState<any>;
  formApi: FormApi<any>;
  components: AllowedComponent[];
  onSelect: onSelectType;
}) => ReactNode;
export type ComponentSelectorProps = {
  components: (ComponentType<any> | string)[];
  renderList?: RenderList;
  onSelect(event: MouseEvent, componentName: string): void;
  closeForm?(e: any): void;
  ui?: ComponentSelectorUI;
  mandatoryCategories?: string[];
};
export type onSelectType = (
  event: MouseEvent,
  componentName: string,
) => void | boolean;
export type Categories = {
  [key: string]: string[];
};
export type ComponentWithMeta<P> = ComponentType<P> & {
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
  /**
   * Category and value pairs for facets
   */
  categories: Categories;
};
export type ItemListProps = {
  components: ComponentWithMeta<any>[];
  onSelect: onSelectType;
};
export type FinalUI = {
  // A div that wraps everything
  MasterWrapper: ComponentType<HTMLProps<HTMLDivElement>> | string;
  // A div that can be configured as column or row
  FlexSection: ComponentType<HTMLProps<HTMLDivElement>> | string;
  // A div that can be configured as column or row and takes all available space
  FlexSectionFull: ComponentType<HTMLProps<HTMLDivElement>> | string;
  // A div wraps an empty flow container
  FlowContainerEmpty: ComponentType<HTMLProps<HTMLDivElement>> | string;
  // A div that will wrap the entirety of the Accordions and Accordion Checkboxes
  ComponentSelectorWrapper: ComponentType<HTMLProps<HTMLDivElement>> | string;
  // A input that will wrap the close menu icon
  SubmitButton: ComponentType<HTMLProps<HTMLButtonElement>> | string;
  // A div that will wrap all Accordion
  AccordionWrapper: ComponentType<HTMLProps<HTMLDivElement>> | string;
  // A div the will wrap the AccordionCheckbox
  AccordionCheckboxWrapper: ComponentType<HTMLProps<HTMLDivElement>> | string;
  // An Anchor tag that will wrap each Accordion Item
  AccordionItemWrapper: ComponentType<HTMLProps<HTMLAnchorElement>> | string;
  // A label that will be displayed by the AccordionCheckbox
  AccordionCheckboxLabel: ComponentType<HTMLProps<HTMLLabelElement>> | string;
  // A input that will be displayed by the Accordion Label
  AccordionCheckBox: ComponentType<FieldProps<any, any>> | string;
  // A div that will wrap the search bar
  SearchBarWrapper: ComponentType<HTMLProps<HTMLDivElement>> | string;
  // A styled text input
  SearchBar: ComponentType<HTMLProps<HTMLInputElement>> | string;
  // A div element containing label text
  AccordionLabel: ComponentType<HTMLProps<HTMLLabelElement>> | string;
  // A span element containing the icon for the contracted menu
  AccordionIconContract: ComponentType<HTMLProps<HTMLSpanElement>> | string;
  // A span element containing the icon for the expanded menu
  AccordionIconExpand: ComponentType<HTMLProps<HTMLSpanElement>> | string;
  // A span element containting icon for the close menu button
  CloseMenuIcon: ComponentType<HTMLProps<HTMLSpanElement>> | string;
  // A div the wraps an individual component box
  ItemBox: ComponentType<HTMLProps<HTMLDivElement>> | string;
  // A div that wraps all component boxes
  ItemBoxWrapper: ComponentType<HTMLProps<HTMLDivElement>> | string;
  // A div that wraps the ItemBox
  GridListBox: ComponentType<HTMLProps<HTMLDivElement>> | string;
  // A div that wraps the ItemBox Elements
  GridListBoxWrapper: ComponentType<HTMLProps<HTMLDivElement>> | string;
  // An additional div that wraps the ItemBox Elements
  GridListBoxInner: ComponentType<HTMLProps<HTMLDivElement>> | string;
  // A span that wraps the title element of a component box
  TitleWrapper: ComponentType<HTMLProps<HTMLSpanElement>> | string;
  // An h3 that wraps the component title element of a component box
  ComponentTitleWrapper: ComponentType<HTMLProps<HTMLHeadingElement>> | string;
  // A link element.
  ComponentLinkWrapper: ComponentType<HTMLProps<HTMLAnchorElement> & LinkVariantProps> | string;

  // A span that wraps the icon element of a component box
  IconWrapper: ComponentType<HTMLProps<HTMLSpanElement>> | string;
  // A div that wraps the component description
  ComponentDescriptionWrapper:
  | ComponentType<HTMLProps<HTMLDivElement>>
  | string;
  // A div that wraps the component description of a component box
  ComponentDescriptionStyle: ComponentType<HTMLProps<HTMLDivElement>> | string;
  // A div that styles the component preview
  ComponentPreviewStyle: ComponentType<HTMLProps<HTMLImageElement>> | string;
  // A button that overlays the itembox and used to select component for placement
  ComponentSelectButton: ComponentType<HTMLProps<HTMLButtonElement>> | string;
  // A div that wraps the component description icon
  ComponentDescriptionIcon: ComponentType<HTMLProps<HTMLDivElement>> | string;
  // A div that wraps all of the scaling icons
  ScalingHeader: ComponentType<HTMLProps<HTMLDivElement>> | string;
  // A button to change scaling to Full
  ScalingButtonFull: ComponentType<HTMLProps<HTMLElement>> | string;
  // A button to change scaling to Half
  ScalingButtonHalf: ComponentType<HTMLProps<HTMLElement>> | string;
  // A button to change scaling to Quarter
  ScalingButtonQuarter: ComponentType<HTMLProps<HTMLElement>> | string;
};
export type ComponentSelectorUI = Partial<FinalUI>;
