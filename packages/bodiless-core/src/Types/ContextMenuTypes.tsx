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

import React, {
  ComponentType, HTMLProps, ReactNode,
} from 'react';
import {
  FieldProps, ChildFieldProps, SelectFieldProps,
} from 'informed';
import Tooltip from 'rc-tooltip';
import type { StylableProps } from '@bodiless/fclasses';
import { ReactTagsFieldProps } from '../components/ReactTagsField';

export type TMenuOption = {
  name: string;
  icon?: (() => string) | string;
  label?: (() => string) | string;
  isActive?: (() => boolean) | boolean;
  isDisabled?: (() => boolean) | boolean;
  isHidden?: (() => boolean) | boolean;
  handler?: (event: React.MouseEvent) => any;
  local?: boolean;
  global?: boolean;
  group?: string;
  Component?: ComponentType<IContextMenuItemProps>;
};

export type ButtonVariantProps = HTMLProps<HTMLDivElement> & {
  isActive?: boolean;
  isFirst?: boolean;
  isDisabled?: boolean;
};

type IconVariantProps = HTMLProps<HTMLSpanElement> & {
  isActive?: boolean;
};

export type ContextMenuGroupProps = {
  name: string,
  label?: string,
  group?: string,
};

export type UI = {
  Icon?: ComponentType<StylableProps & IconVariantProps> | string;
  Toolbar?: ComponentType<HTMLProps<HTMLDivElement>> | string;
  ToolbarButton?: ComponentType<StylableProps & ButtonVariantProps> | string;
  HorizontalToolbarButton?: ComponentType<StylableProps & ButtonVariantProps> | string;
  ToolbarButtonLabel?: ComponentType<HTMLProps<HTMLSpanElement>> | string;
  FormWrapper?: ComponentType<HTMLProps<HTMLDivElement>> | string;
  ToolbarDivider?: ComponentType<HTMLProps<HTMLHRElement>> | string;
  ComponentFormFieldWrapper?: ComponentType<HTMLProps<HTMLDivElement>> | string;
  ComponentFormTitle?: ComponentType<HTMLProps<HTMLHeadingElement>> | string;
  ComponentFormLabel?: ComponentType<HTMLProps<HTMLLabelElement>> | string;
  ComponentFormDescription?: ComponentType<HTMLProps<HTMLDivElement>> | string;
  ComponentFormButton?: ComponentType<HTMLProps<HTMLButtonElement>> | string;
  ComponentFormCloseButton?: ComponentType<HTMLProps<HTMLButtonElement>> | string;
  ComponentFormSubmitButton?: ComponentType<HTMLProps<HTMLButtonElement>> | string;
  ComponentFormUnwrapButton?: ComponentType<HTMLProps<HTMLButtonElement>> | string;
  ComponentFormText?: ComponentType<FieldProps<any, any>>;
  ComponentFormTextArea?: ComponentType<FieldProps<any, any>>;
  ComponentFormRadioGroup?: ComponentType<FieldProps<any, any>>;
  ComponentFormFieldTitle?: ComponentType<HTMLProps<HTMLDivElement>> | string;
  ComponentFormRadio?: ComponentType<ChildFieldProps<any, any>>;
  ComponentFormCheckBox?: ComponentType<FieldProps<any, any>>;
  ComponentFormSelect?: ComponentType<SelectFieldProps<any, any>>;
  ComponentFormOption?: ComponentType<ChildFieldProps<any, any>>;
  ComponentFormError?: ComponentType<HTMLProps<HTMLDivElement>> | string;
  ComponentFormWarning?: ComponentType<HTMLProps<HTMLDivElement>> | string;
  ComponentFormLink?: ComponentType<HTMLProps<HTMLAnchorElement>> | string;
  Form?: ComponentType<HTMLProps<HTMLFormElement>> | string;
  Tooltip?: ComponentType<Tooltip['props']>;
  ReactTags?: ComponentType<ReactTagsFieldProps>;
  ComponentFormList?: ComponentType<HTMLProps<HTMLUListElement>> | string;
  ComponentFormListItem?: ComponentType<HTMLProps<HTMLLIElement>> | string;
  ContextSubMenu?: ComponentType<HTMLProps<HTMLDivElement>> | string;
  ContextMenuGroup?: ComponentType<ContextMenuGroupProps>;
};

export type IContextMenuProps = {
  children?: ReactNode;
  options?: TMenuOption[];
  // onDispose?: (wasSubmitted: boolean) => void;
  ui?: UI;
  isPositionToggled?: boolean;
  renderInTooltip?: boolean;
} & HTMLProps<HTMLElement>;

export type ContextMenuFormProps = {
  closeForm: () => void;
  ui?: UI;
  'aria-label'?: string;
};

export type IContextMenuItemProps = {
  ui?: UI
  option: TMenuOption;
  name: string,
  index?: number;
  group?: string;
  // eslint-disable-next-line max-len
  setRenderForm?: React.Dispatch<React.SetStateAction<((props: ContextMenuFormProps) => JSX.Element) | undefined>>;
};
