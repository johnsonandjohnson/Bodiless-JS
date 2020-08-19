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
import { addClasses, removeClasses, addProps } from '@bodiless/fclasses';
import {
  ContextMenu, ContextMenuProps, ContextMenuUI,
} from '@bodiless/core';
import {
  ComponentFormTitle, ComponentFormLabel, ComponentFormText, ComponentFormButton,
  ComponentFormCloseButton, ComponentFormSubmitButton, ToolbarIcon, Div, ToolbarButton,
  ComponentFormUnwrapButton, ComponentFormTextArea, ComponentFormDescription, ComponentFormWarning,
  ComponentFormFieldWrapper, ComponentFormFieldTitle, ComponentFormCheckBox, ComponentFormRadio,
  ComponentFormRadioGroup, ComponentFormSelect, ComponentFormOption, ToolbarButtonLabel,
} from '@bodiless/ui';
import ReactTagsField from './ReactTags';

// For accessibility attributes, see https://www.w3.org/TR/wai-aria-practices/examples/toolbar/toolbar.html
const Toolbar = flow(
  addClasses('bl-flex bl--mr-grid-2'),
  addProps({ role: 'toolbar', 'aria-label': 'Local Context Menu' }),
)(Div);

const LocalToolbarButton = flow(
  removeClasses('bl-mb-3'),
  addClasses('bl-mr-grid-2'),
)(ToolbarButton);

const LocalTooltip: FC<ReactTooltip['props']> = props => (
  <ReactTooltip
    {...props}
    placement="bottomLeft"
    overlayClassName="TEST"
  />
);

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
  ComponentFormWarning,
  Icon: ToolbarIcon,
  Toolbar,
  ToolbarButton: LocalToolbarButton,
  ToolbarButtonLabel,
  Tooltip: LocalTooltip,
  ReactTags: ReactTagsField,
};

const LocalContextMenu: FC<ContextMenuProps> = props => (
  <ContextMenu {...props} ui={ui} />
);

export default LocalContextMenu;
