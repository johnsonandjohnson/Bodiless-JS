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
import { flow } from 'lodash';
import { Text as BaseText } from 'informed';
import {
  Li, Ul, stylable, addClasses, StylableProps, withoutProps, flowIf, hasProp, addProps,
  removeClasses,
} from '@bodiless/fclasses';
import { ButtonVariantProps, withChild } from '@bodiless/core';

import './bodiless.index.css';
import 'rc-tooltip/assets/bootstrap.css';

export const Title = stylable<HTMLProps<HTMLHeadingElement>>('h3');
export const Label = stylable<HTMLProps<HTMLLabelElement>>('label');
export const Img = stylable<HTMLProps<HTMLImageElement>>('img');
export const Input = stylable<HTMLProps<HTMLInputElement>>('input');
export const Div = stylable<HTMLProps<HTMLDivElement>>('div');
export const Span = stylable<HTMLProps<HTMLSpanElement>>('span');
export const Button = stylable<HTMLProps<HTMLButtonElement>>('button');
export const Hr = stylable<HTMLProps<HTMLHRElement>>('hr');
export const Text = stylable(BaseText);
export const Anchor = stylable<HTMLProps<HTMLAnchorElement>>('a');

const CheckBoxBase: FC<HTMLProps<HTMLInputElement>> = props => <input {...props} type="checkbox" />;
export const CheckBox = stylable(CheckBoxBase);

export const Icon = flow(
  addClasses('bl-rounded bl-p-grid-1 material-icons'),
  withoutProps<ButtonVariantProps>(['isActive']),
  addClasses('bl-text-3xl'),
  flowIf(hasProp('isActive'))(
    addClasses('bl-bg-primary'),
  ),
  addProps({ 'aria-hidden': true }),
)(Span);

export const ComponentFormTitle = addClasses(
  'bl-text-lg bl-font-bold bl-text-grey-100 bl-block bl-mb-grid-2',
)(Title);

export const ComponentFormListItem = addClasses(
  'first:bl-border-t-0 bl-border-t bl-py-grid-1 bl-px-grid-1 bl-max-w-xl-grid-1',
)(Li);

export const ComponentFormList = addClasses(
  'list-none bl-max-h-xl-grid-1 bl-overflow-y-scroll',
)(Ul);

export const ComponentFormLabel = addClasses(
  'bl-text-xs bl-text-grey-100 bl-block',
)(Label);

export const ComponentFormText = addClasses(
  'bl-text-grey-900 bg-grey-100 bl-text-xs bl-w-full bl-min-w-xl-grid-1 bl-block bl-my-grid-2 bl-p-grid-1',
)(Text);

export const ComponentFormButton = addClasses(
  'bl-text-grey-200 bl-cursor-pointer hover:bl-text-green',
)(Button);

export const ComponentFormUnwrapButton = addClasses(
  'bl-absolute bl-bottom-0 bl-left-0 bl-mb-5 bl-ml-3 bl-cursor-pointer bl-underline',
)(Button);

export const ComponentFormCloseButton = flow(
  addClasses('hover:bl-text-red bl-float-right'),
  removeClasses('hover:bl-text-green'),
  withChild(() => <Icon>cancel</Icon>),
)(ComponentFormButton);

export const ComponentFormSubmitButton = (props: HTMLProps<HTMLButtonElement>) => (
  <div className="bl-clearfix">
    <ComponentFormButton className="bl-float-right" {...props}>
      <Icon>done</Icon>
    </ComponentFormButton>
  </div>
);

export const ComponentFormError = addClasses(
  'bl-block bl-italic',
)(Div);

export const SubmitButton: FC<HTMLProps<HTMLButtonElement> & StylableProps> = props => <ComponentFormButton type="submit" {...props} />;


export const ToolbarButton = flow(
  withoutProps<ButtonVariantProps>(['isActive', 'isFirst', 'isDisabled']),
  addClasses('bl-cursor-pointer bl-text-grey-200 bl-block'),
  flowIf(hasProp('isDisabled'))(
    addClasses('bl-text-grey-600').removeClasses('bl-text-grey-200'),
  ),
  addProps({ type: 'button' }),
)(Button);

export const ResizeHandle = addClasses(
  'bl-block bl-text-2xl bl-absolute material-icons bl-z-1 bl-text-red bl-rotate-45deg bl-bottom-grid-0 bl-right-grid-0',
)(Span);
