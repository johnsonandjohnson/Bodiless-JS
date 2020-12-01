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
import { PageEditContextInterface } from '../PageEditContext/types';

/**
 * @private
 * Keyed list of default components to use for a context menu item.
 */
export type MenuOptionDefaultComponents = {
  item: ComponentType<IContextMenuItemProps>,
  group: ComponentType<IContextMenuItemProps>,
};

/**
 * Type of the props which will be passed to a context menu
 * item or context menu group.
 */
export type IContextMenuItemProps = {
  /**
   * The name of this item.  Must be unique in a menu.
   */
  name: string,
  /**
   * The context menu option option which this item is rendering
   */
  option?: TMenuOption;
  /**
   * The index of this item.  Used to determine whether it is the first item in the list.
   */
  index?: number;
  /**
   * The group to which this item belongs (if any).
   */
  group?: string;
};

/**
 * Type of a context menu option.
 */
export type TMenuOption = {
  /**
   * Machine name of the option.  Must be unique on a given menu.
  */
  name: string;
  /**
   * Name of the material icon to use for this option.
   */
  icon?: (() => string) | string;
  /**
   * Label text to print for this option
   */
  label?: (() => string) | string;
  /**
   * Callback or boolean defining whether this option is "active". Active buttons are rendered
   * differently in thi UI.  Usually used to inicate that a state managed by the button is
   * in effect (eg formatting applied). Also, most edit form buttons are shown as active when
   * their form is open.
   */
  isActive?: (() => boolean) | boolean;
  /**
   * Callback or boolean defining whether this option is "disabled". Disabled buttons are
   * rendered differently in the UI, and are not clickable.
   */
  isDisabled?: (() => boolean) | boolean;
  /**
   * Callback or boolean defining whether this option is "hidden". Hidden buttons are not
   * displayed. Use this to control visibility of your button rather than changing the array
   * of buttons returned from `getMenuOptions` to avoid unnecessary re-renders of the context
   * menu.
   */
  isHidden?: (() => boolean) | boolean;
  /**
   * Callback to invoke when the button is clicked.  May return a render function, in which
   * case, clicking the button will open a tooltip whose contents are determined by the return
   * value of the render fuction.
   */
  handler?: (event: React.MouseEvent) => any;
  activateContext?: (() => boolean) | boolean;
  /**
   * When true, display this button on the local context menu.  Default is false.
   */
  local?: boolean;
  /**
   * When true, display this button on the global menu. Default is true.
   */
  global?: boolean;
  /**
   * String defining the name of a group to which this option belongs.
   */
  group?: string;
  /**
   * For groups only - defines if/how this group merges with other groups.
   * - 'none' - This group does not merge.
   * - 'merge' - This group merges into the next innermost group (if one exists).
   * Default is 'none'.
   */
  groupMerge?: 'merge'|'merge-up'|'none';
  /**
   * An optional component used to render this item, or one of 'item' or 'group' to specify
   * which default component should be used. If not specified, then the option will be rendered
   * using the `ContextMenuItem` component.  If `_group`, then the default group component
   * as defined in the Context Menu UI will be used instead.
   */
  Component?: ComponentType<IContextMenuItemProps>|keyof MenuOptionDefaultComponents;
  /**
   * A reference to the page edit context instance which is providing this button.
   */
  context?: PageEditContextInterface;
  /**
   * An optional title for the form.
   */
  formTitle?: string|(() => string);
  /**
   * Optional descriptive text for the form.
   */
  formDescription?: string|(() => string);
  /**
   * If specified, used as the aria label of the button. If not specified
   * the label will be used.
   */
  ariaLabel?: string|(() => string);
};

export type ButtonVariantProps = HTMLProps<HTMLDivElement> & {
  isActive?: boolean;
  isFirst?: boolean;
  isDisabled?: boolean;
};

type IconVariantProps = HTMLProps<HTMLSpanElement> & {
  isActive?: boolean;
};

/**
 * Type of the UI for the context menu.
 */
export type ContextMenuUI = {
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
  ContextMenuGroup?: ComponentType<IContextMenuItemProps>;
};

export type IContextMenuProps = {
  children?: ReactNode;
  options?: TMenuOption[];
  // onDispose?: (wasSubmitted: boolean) => void;
  ui?: ContextMenuUI;
  isPositionToggled?: boolean;
  renderInTooltip?: boolean;
  /**
   * `closeForm` prop used to override the default `closeForm` behaviour if provided.
   * Currently it will only be triggered by clicking outside of `ComponentFormCloseButton`.
   */
  closeForm?: (e: any) => void;
} & HTMLProps<HTMLElement>;

export type ContextMenuFormProps = {
  ui?: ContextMenuUI;
  title?: string;
  description?: string,
  closeForm: (e: any) => void;
  'aria-label'?: string;
};
