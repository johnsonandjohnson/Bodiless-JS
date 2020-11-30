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

import React, { FC } from 'react';
import MaterialIcon, { MaterialIconDefaultProps } from '@material/react-material-icon';
import { addClasses } from '@bodiless/fclasses';
import {
  SubmitButton as SubmitButtonBase, Div, Span, Label, Input,
  Button, Anchor, ComponentFormTitle, ComponentFormLink,
} from '@bodiless/ui';
import { ComponentSelector as CleanComponentSelector, ComponentSelectorUI, ComponentSelectorProps } from '@bodiless/layouts';

/**
 * Checkbox component used on flow container.
 *
 * Used instead of informed Checkbox for more concise handling.
 */
const CheckBox = ({
  name, checked, onChange, disabled, id, ...rest
} : any) => (
  <Input
    type="checkbox"
    name={name}
    disabled={disabled}
    checked={checked}
    onChange={onChange}
    id={id}
    {...rest}
  />
);

// eslint-disable-next-line import/prefer-default-export
export const ui: ComponentSelectorUI = {
  MasterWrapper: addClasses('bl-flex bl-form-wrapper')(Div),
  FlexSection: addClasses('bl-pt-grid-2')(Div),
  FlexSectionFull: addClasses('bl-pt-grid-2 bl-w-full')(Div),
  FlowContainerEmpty: addClasses(
    'bl-border-2 bl-border-dashed bl-text-gray-600',
  )(Div),
  ItemBoxWrapper: addClasses('bl-p-grid-2')(Div),
  ItemBox: addClasses(
    'bl-bg-grey-200 bl-flex bl-flex-col bl-items-center bl-p-grid-2 bl-h-full bl-w-full bl-relative bl-overflow-hidden bl-cursor-pointer',
  )(Div),
  GridListBoxWrapper: addClasses(
    'bl-w-full bl-h-xl-grid-2',
  )(Div),
  GridListBoxInner: addClasses(
    'bl-w-full bl-overflow-y-scroll bl-flex bl-flex-wrap bl-h-xl-grid-2',
  )(Div),

  GridListBox: addClasses(
    'bl-text-xs bl-flex bl-flex-wrap bl-mb-grid-2 bl-bg-white',
  )(Div),

  TitleWrapper: addClasses(
    'bl-font-semibold bl-text-sm bl-text-grey-800',
  )(Span),

  ComponentTitleWrapper: ComponentFormTitle,

  ComponentLinkWrapper: ComponentFormLink,

  IconWrapper: addClasses(
    'bl-block bl-absolute bl-left-grid-0 bl-top-grid-0',
  )(Span),

  ComponentSelectorWrapper: addClasses(
    'bl-text-white bl-mr-grid-3  bl-whitespace-no-wrap',
  )(Div),

  SubmitButton: addClasses(
    'bl-right-grid-0 bl-absolute tbl-ext-m bl-mr-grid-2',
  )(SubmitButtonBase),

  AccordionWrapper: addClasses(
    'bl-font-semibold',
  )(Div),

  AccordionCheckboxWrapper: addClasses(
    'bl-italic bl-mt-grid-1',
  )(Div),

  AccordionItemWrapper: addClasses(
    'bl-flex bl-items-center bl-mt-grid-2 bl-text-base',
  )(Anchor),

  AccordionCheckboxLabel: addClasses(
    'bl-ml-grid-2 bl-font-semibold',
  )(Label),

  AccordionCheckBox: addClasses(
    'bl-ml-grid-1 bl-mr-grid-1',
  )(CheckBox),

  SearchBarWrapper: addClasses(
    'bl-bg-white bl-content-center bl-h-grid-9 bl-font-sans bl-px-grid-2 bl-py-grid-1 bl-text-black',
  )(Div),

  SearchBar: addClasses(
    'bl-border bl-border-grey bl-p-grid-1 bl-w-full',
  )(Input),

  AccordionLabel: addClasses(
    'bl-inline-block',
  )(Label),

  AccordionIconContract: () => (
    <MaterialIcon className="bl-mr-2" icon="expand_less" />
  ),

  AccordionIconExpand: () => (
    <MaterialIcon className="bl-mr-2" icon="expand_more" />
  ),

  ComponentDescriptionWrapper: addClasses(
    'bl-w-xl-grid-0 bl-min-h-32',
  )(Div),

  ComponentDescriptionStyle: addClasses(
    'bl-bg-white bl-text-red bl-w-xl-grid-0 bl-p-grid-2 bl-mt-grid-2 bl-h-xl-grid-0 bl-mb-grid-2',
  )(Div),

  ComponentDescriptionIcon: addClasses(
    'bl-absolute bl-top-grid-0 bl-right-grid-0 material-icons bl-z-20 bl-text-grey-800 bl-m-grid-1',
  )(Div),

  ComponentSelectButton: addClasses(
    'bl-absolute bl-z-10 bl-top-grid-0 bl-left-grid-0 bl-w-full bl-h-full bl-opacity-0',
  )(Button),

  ScalingHeader: addClasses('bl-w-full bl-cursor-pointer bl-justify-end bl-text-grey-900 bl-p-grid-2 bl-flex')(Div),
  ScalingButtonFull: (props:MaterialIconDefaultProps) => <MaterialIcon {...props} icon="view_stream" />,
  ScalingButtonHalf: (props:MaterialIconDefaultProps) => <MaterialIcon {...props} icon="view_module" />,
  ScalingButtonQuarter: (props:MaterialIconDefaultProps) => <MaterialIcon {...props} icon="view_comfy" />,
};

const ComponentSelector: FC<ComponentSelectorProps> = props => (
  <CleanComponentSelector ui={ui} {...props} />
);

export default ComponentSelector;
