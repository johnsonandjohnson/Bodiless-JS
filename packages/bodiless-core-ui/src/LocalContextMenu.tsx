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
import {
  addClasses,
  addClassesIf,
  addProps,
  removeClasses,
} from '@bodiless/fclasses';
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
const toolbarClasses = 'bl-flex bl-divide-x rtl:bl-divide-x-reverse bl-divide-white';
const groupClasses = 'bl-px-3';
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

const ContextMenuGroup: FC<IContextMenuItemProps> = ({
  children,
  index,
  option,
}) => {
  const hidden: boolean = Boolean(option && (
    typeof option.isHidden === 'function' ? option.isHidden() : option.isHidden
  ));
  if (hidden) return null;
  const { context, label } = option || {};
  const onClick = context ? { onClick: () => context.activate() } : {};
  const GroupTitle = flow(
    removeClasses('bl-mb-grid-2 bl-min-w-xl-grid-1'),
    addClassesIf(() => Number(index) > 0)('hover:bl-underline bl-cursor-pointer'),
    addClassesIf(() => index === 0)('bl-underline'),
  )(ComponentFormTitle);

  return (
    <div className={groupClasses}>
      {label && (
        <GroupTitle {...onClick}>{label}</GroupTitle>
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
