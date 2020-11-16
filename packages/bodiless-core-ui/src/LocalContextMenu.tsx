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
import ReactTooltip from 'rc-tooltip';
import { flow } from 'lodash';
import { addClasses, addProps, removeClasses } from '@bodiless/fclasses';
import {
  ContextMenu, ContextMenuProps, ContextMenuUI, IContextMenuItemProps,
} from '@bodiless/core';
import {
  ComponentFormTitle, ComponentFormLabel, ComponentFormText, ComponentFormButton,
  ComponentFormCloseButton, ComponentFormSubmitButton, ToolbarIcon, Div, HorizontalToolbarButton,
  ComponentFormUnwrapButton, ComponentFormTextArea, ComponentFormDescription, ComponentFormWarning,
  ComponentFormFieldWrapper, ComponentFormFieldTitle, ComponentFormCheckBox, ComponentFormRadio,
  ComponentFormRadioGroup, ComponentFormSelect, ComponentFormOption, ContextSubMenu,
  ToolbarButtonLabel,
} from '@bodiless/ui';
import ReactTagsField from './ReactTags';

// Stacked toolbar orientation...
// Horizontal
const toolbarClasses = 'bl-flex';
const groupClasses = 'bl-border-l first:bl-border-l-0 bl-border-white bl-px-3';
// Vertical
// const toolbarClasses = '';
// eslint-disable-next-line max-len
// const groupClasses = 'bl-border-t first:bl-border-t-0 bl-border-white bl-mt-grid-2 first:bl-mt-grid-0';

// For accessibility attributes, see https://www.w3.org/TR/wai-aria-practices/examples/toolbar/toolbar.html
const Toolbar = flow(
  addClasses(toolbarClasses),
  addProps({ role: 'toolbar', 'aria-label': 'Local Context Menu' }),
)(Div);

const LocalTooltip: FC<ReactTooltip['props']> = props => (
  <ReactTooltip
    {...props}
    placement="bottomLeft"
  />
);

const GroupTitle = flow(
  removeClasses('bl-mb-grid-2 bl-min-w-xl-grid-1'),
)(ComponentFormTitle);

const ContextMenuGroup: FC<IContextMenuItemProps> = ({ option, children }) => {
  const hidden: boolean = Boolean(option && (
    typeof option.isHidden === 'function' ? option.isHidden() : option.isHidden
  ));
  if (hidden) return null;
  return (
    <div className={groupClasses}>
      {option && option.label && (
        <GroupTitle>{option.label}</GroupTitle>
      )}
      <div className="flex">
        {children}
      </div>
    </div>
  );
};

export const FormWrapper = addClasses('bl-flex')(Div);

const ui: ContextMenuUI = {
  ComponentFormText,
  ComponentFormTextArea,
  ComponentFormFieldWrapper,
  ComponentFormFieldTitle,
  ComponentFormCheckBox,
  ComponentFormRadio,
  ComponentFormRadioGroup,
  ComponentFormSelect,
  ComponentFormOption,
  ComponentFormButton,
  ComponentFormCloseButton,
  ComponentFormUnwrapButton,
  ComponentFormSubmitButton,
  ComponentFormTitle,
  ComponentFormLabel,
  ComponentFormDescription,
  ContextSubMenu,
  ComponentFormWarning,
  Icon: ToolbarIcon,
  Toolbar,
  ToolbarButton: HorizontalToolbarButton,
  ToolbarButtonLabel,
  FormWrapper,
  Tooltip: LocalTooltip,
  ReactTags: ReactTagsField,
  ContextMenuGroup,
};

const LocalContextMenu: FC<ContextMenuProps> = props => (
  <ContextMenu {...props} ui={ui} />
);

export default LocalContextMenu;
