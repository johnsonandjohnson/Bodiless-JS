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

import React, { FC, HTMLProps } from 'react';
import flow from 'lodash/flow';
import {
  Input as BaseText,
  TextArea as BaseTextArea,
  RadioGroup as BaseRadioGroup,
  Radio as BaseRadio,
  Checkbox as BaseCheckBox,
  Select as BaseSelect,
  FieldProps,
  InputProps,
  TextAreaProps,
  RadioGroupProps,
  SelectProps,
  CheckboxProps,
  RadioProps
} from 'informed';
import {
  Li, Ul, stylable, addClasses, StylableProps, withoutProps, flowIf, hasProp, addProps,
  removeClasses, addClassesIf, removeClassesIf, flowHoc,
} from '@bodiless/fclasses';
import { ButtonVariantProps, withChild } from '@bodiless/core';

import './bodiless.index.css';
import 'rc-tooltip/assets/bootstrap.css';

const BaseOption = ({
  value,
  ...rest
}: HTMLProps<HTMLOptionElement>) => (
  <option value={value} {...rest}>
    {value}
  </option>
);

export const Title = stylable<HTMLProps<HTMLHeadingElement>>('h3');
export const Label = stylable<HTMLProps<HTMLLabelElement>>('label');
export const Img = stylable<HTMLProps<HTMLImageElement>>('img');
export const Input = stylable<HTMLProps<HTMLInputElement>>('input');
export const Div = stylable<HTMLProps<HTMLDivElement>>('div');
export const Span = stylable<HTMLProps<HTMLSpanElement>>('span');
export const Button = stylable<HTMLProps<HTMLButtonElement>>('button');
export const Hr = stylable<HTMLProps<HTMLHRElement>>('hr');
export const Form = stylable<HTMLProps<HTMLFormElement>>('form');
export const Text = stylable<FieldProps<InputProps>>(BaseText);
export const TextArea = stylable<FieldProps<TextAreaProps>>(BaseTextArea);
export const RadioGroup = stylable<FieldProps<RadioGroupProps>>(BaseRadioGroup);
export const Radio = stylable<RadioProps>(BaseRadio);
export const CheckBox = stylable<FieldProps<CheckboxProps>>(BaseCheckBox);
export const Select = stylable<FieldProps<SelectProps>>(BaseSelect);
export const Option = stylable<HTMLProps<HTMLOptionElement>>(BaseOption);
export const Anchor = stylable<HTMLProps<HTMLAnchorElement>>('a');

export const Icon = flow(
  addClasses('bl-p-grid-1 bl-material-icons'),
  withoutProps<ButtonVariantProps>(['isActive']),
  flowIf(hasProp('isActive'))(
    addClasses('bl-bg-primary bl-rounded'),
  ),
  addProps({ 'aria-hidden': true }),
)(Span);

export const ComponentFormTitle = addClasses(
  'bl-text-lg bl-font-bold bl-text-gray-100 bl-block bl-mb-grid-2 bl-min-w-xl-grid-1',
)(Title);

export const ComponentFormFieldWrapper = addClasses(
  'bl-mb-grid-3 bl-w-full',
)(Div);

export const ComponentFormFieldTitle = addClasses(
  'bl-mb-grid-2 bl-font-bold bl-text-gray-100',
)(Div);

export const ComponentFormDescription = addClasses(
  'bl-text-xs bl-text-gray-100 bl-block bl-mb-grid-2 bl-max-w-xl-grid-1',
)(Div);

export const ComponentFormListItem = addClasses(
  'first:bl-border-t-0 bl-border-t bl-py-grid-1 bl-px-grid-1 bl-max-w-xl-grid-1',
)(Li);

export const ComponentFormList = addClasses(
  'bl-list-none bl-max-h-xl-grid-1 bl-overflow-y-scroll',
)(Ul);

export const ComponentFormLabel = addClasses(
  'bl-text-xs bl-text-gray-100 bl-block',
)(Label);

export const ComponentFormText = addClasses(
  'bl-text-gray-900 bl-bg-gray-100 bl-text-xs bl-w-full bl-min-w-xl-grid-1 bl-block bl-my-grid-2 bl-p-grid-1',
)(Text);

export const ComponentFormTextArea = addClasses(
  'bl-text-gray-900 bl-bg-gray-100 bl-text-xs bl-w-full bl-min-w-xl-grid-1 bl-min-h-grid-16 bl-block bl-my-grid-2 bl-p-grid-1 bl-resize-none bl-overflow-auto bl-whitespace-pre',
)(TextArea);

export const ComponentFormRadioGroup = addClasses(
  'bl-mb-grid-2',
)(RadioGroup);

export const ComponentFormRadio = addClasses(
  'bl-mr-grid-2 bl-mb-grid-2 bl-align-baseline',
)(Radio);

export const ComponentFormCheckBox = addClasses(
  'bl-mr-grid-2 bl-mb-grid-2 bl-align-baseline',
)(CheckBox);

export const ComponentFormSelect = addClasses(
  `bl-text-gray-900 bl-bg-gray-100 bl-text-xs bl-w-full
  bl-min-w-xl-grid-1 bl-block bl-my-grid-2 bl-p-grid-1`,
)(Select);

export const ComponentFormOption = Option;

export const ComponentFormButton = addClasses(
  'bl-text-gray-200 bl-cursor-pointer',
)(Button);

export const ComponentFormUnwrapButton = addClasses(
  'bl-absolute bl-bottom-0 bl-left-0 bl-mb-5 bl-ml-3 bl-cursor-pointer bl-underline',
)(Button);

export const ComponentFormCloseButton = flow(
  addClasses('hover:bl-text-gray-500 bl-float-right'),
  withChild(() => <Icon className="bl-small-icon">highlight_off</Icon>),
)(ComponentFormButton);

export const ComponentFormSubmitButton = (props: HTMLProps<HTMLButtonElement>) => (
  <div className="bl-flow-root">
    <ComponentFormButton className="bl-float-right" {...props}>
      <Icon className="hover:bl-bg-white hover:bl-text-tooltip">check_circle</Icon>
    </ComponentFormButton>
  </div>
);

export const ComponentFormError = addClasses(
  'bl-block bl-italic',
)(Div);

export const SubmitButton: FC<HTMLProps<HTMLButtonElement> & StylableProps> = props => <ComponentFormButton type="submit" {...props} />;

export const ToolbarIcon = flow(
  removeClasses('bl-p-grid-1'),
  addClasses('bl-w-grid-8 bl-h-grid-8 bl-large-icon'),
)(Icon);

export const ToolbarButton = flow(
  withoutProps<ButtonVariantProps>(['isActive', 'isFirst', 'isDisabled']),
  addClasses('bl-cursor-pointer bl-mb-3 bl-flex bl-flex-col bl-items-center'),
  flowIf(hasProp('isDisabled'))(
    flowHoc(
      addClasses('bl-text-gray-600'),
      removeClasses('bl-text-gray-200'),
    ),
  ),
  addProps({ type: 'button' }),
)(Button);

export const HorizontalToolbarButton = flow(
  removeClasses('bl-mb-3'),
  addClasses('bl-mr-grid-2 last:bl-mr-grid-0'),
)(ToolbarButton);

export const ToolbarBase = flow(
  addClasses('bl-text-white bl-bg-black bl-rounded bl-z-50 bl-flex'),
  addProps({ role: 'toolbar' }),
)(Div);

export const ToolbarHorizontal = addClasses('bl-py-2 bl-px-grid-2')(ToolbarBase);
export const ToolbarVertical = addClasses('bl-px-2 bl-py-grid-2 bl-flex-col')(ToolbarBase);

export const ToolbarButtonLabel = addClasses('bl-text-center bl-text-base')(Span);

const ResizeHandleBar = addClasses(
  'bl-resizable-handle bl-border-solid bl-border-l-2 bl-border-primary bl-h-full',
)(Div);

export const ResizeHandle = flow(
  addClasses(
    'bl-flex bl-justify-center bl-w-5 bl-right-rem-1 bl-z-1 bl-h-three-quarters bl-relative bl-top-half bl-transform bl--translate-y-1/2',
  ),
  withChild(() => <ResizeHandleBar />),
)(Div);

export const ResizeHandleRTL = flow(
  addClasses('bl-left-rem-1'),
  removeClasses('bl-right-rem-1'),
)(ResizeHandle);

export const ContextSubMenu = flow(
  addClasses('bl-flex bl-text-white'),
  addProps({ role: 'toolbar', 'aria-label': 'Submenu' }),
)(Div);

export const Warning = flow(
  addClasses('bl-w-grid-7 bl-text-yellow-500 bl-small-icon'), //
)((props: JSX.IntrinsicAttributes) => (
  <Icon {...props}>report_problem_outlined</Icon>
));

export const ComponentFormWarning = flow(
  addClasses('bl-float-left bl-flex bl-items-center'),
)(({ children, ...rest }: any) => (
  <Div {...rest}>
    <Warning />
    {children}
  </Div>
));

const isDisabled = (props: any) => hasProp('disabled')(props);
export const ComponentFormLink = flow(
  addClasses('bl-cursor-pointer bl-text-xs bl-block bl-underline'),
  addClassesIf(isDisabled)('bl-text-gray-600'),
  removeClassesIf(isDisabled)('bl-cursor-pointer bl-text-gray-100 '),
)(Anchor);

export const ComponentFormDefaultPanelWidth = addClasses('bl-w-xl-grid-2');
export const ComponentFormDefaultPanelHeight = addClasses('bl-h-xl-grid-1');
export const ComponentFormDefaultPanelSize = flowHoc(
  ComponentFormDefaultPanelWidth,
  ComponentFormDefaultPanelHeight,
);
