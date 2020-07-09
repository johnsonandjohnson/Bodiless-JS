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
  ComponentType,
  HTMLProps,
  ReactNode,
} from 'react';
import { FieldProps } from 'informed';
import Tooltip from 'rc-tooltip';
import { TMenuOption } from '../PageEditContext/types';
import { ReactTagsFieldProps } from '../components/ReactTagsField';

export type ButtonVariantProps = HTMLProps<HTMLDivElement> & {
  isActive?: boolean;
  isFirst?: boolean;
  isDisabled?: boolean;
};

type IconVariantProps = HTMLProps<HTMLSpanElement> & {
  isActive?: boolean;
};

export type UI = {
  Icon?: ComponentType<IconVariantProps> | string;
  Toolbar?: ComponentType<HTMLProps<HTMLDivElement>> | string;
  ToolbarButton?: ComponentType<ButtonVariantProps> | string;
  FormWrapper?: ComponentType<HTMLProps<HTMLDivElement>> | string;
  ToolbarDivider?: ComponentType<HTMLProps<HTMLHRElement>> | string;
  ComponentFormTitle?: ComponentType<HTMLProps<HTMLHeadingElement>> | string;
  ComponentFormLabel?: ComponentType<HTMLProps<HTMLLabelElement>> | string;
  ComponentFormDescription?: ComponentType<HTMLProps<HTMLDivElement>> | string;
  ComponentFormButton?: ComponentType<HTMLProps<HTMLButtonElement>> | string;
  ComponentFormCloseButton?: ComponentType<HTMLProps<HTMLButtonElement>> | string;
  ComponentFormSubmitButton?: ComponentType<HTMLProps<HTMLButtonElement>> | string;
  ComponentFormUnwrapButton?: ComponentType<HTMLProps<HTMLButtonElement>> | string;
  ComponentFormText?: ComponentType<FieldProps<any, any>>;
  ComponentFormTextArea?: ComponentType<FieldProps<any, any>>;
  ComponentFormError?: ComponentType<HTMLProps<HTMLDivElement>> | string;
  Form?: ComponentType<HTMLProps<HTMLFormElement>> | string;
  Tooltip?: ComponentType<Tooltip['props']>;
  ReactTags?: ComponentType<ReactTagsFieldProps>;
  ComponentFormList?: ComponentType<HTMLProps<HTMLUListElement>> | string;
  ComponentFormListItem?: ComponentType<HTMLProps<HTMLLIElement>> | string;
  // @TODO: Add other controls from informed.
};

export type IContextMenuProps = {
  children?: ReactNode;
  options: TMenuOption[];
  // onDispose?: (wasSubmitted: boolean) => void;
  ui?: UI;
  isPositionToggled?: boolean;
} & HTMLProps<HTMLElement>;

export type IContextMenuItemProps = {
  ui?: UI
  option: TMenuOption;
  index: number;
};
