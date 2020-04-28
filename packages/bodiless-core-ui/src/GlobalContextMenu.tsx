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
  addClasses, removeClasses, addProps,
} from '@bodiless/fclasses';
import {
  ContextMenu, ContextMenuUI, ContextMenuProps,
} from '@bodiless/core';
import {
  ComponentFormTitle, ComponentFormCloseButton, ComponentFormLabel, ComponentFormText,
  ComponentFormButton, Icon, Div, Hr, ToolbarButton, ComponentFormUnwrapButton,
  ComponentFormError, ComponentFormSubmitButton,
} from '@bodiless/ui';
import ReactTagsField from './ReactTags';

const Toolbar = flow(
  addClasses('bl-bg-black bl-rounded bl-z-50 bl-p-grid-2 bl-fixed bl-top-grid-0 bl-left-grid-0 bl-text-white'),
  addProps({ role: 'toolbar', 'aria-label': 'Global Context Menu Left', id: 'global-context-menu' }),
)(Div);

const ToolbarRight = flow(
  addClasses('bl-right-grid-0'),
  removeClasses('bl-left-grid-0'),
  addProps({ 'aria-label': 'Global Context Menu Right' }),
)(Toolbar);

export const FormWrapper = addClasses('bl-flex')(Div);

export const ToolbarDivider = addClasses(
  'bl-bg-grey bl-w-auto bl-my-grid-3 bl-h-px',
)(Hr);

export const GlobalTooltip: FC<ReactTooltip['props']> = props => (
  <ReactTooltip
    {...props}
    placement="rightTop"
    overlayStyle={{ position: 'fixed', opacity: 1 }}
    getTooltipContainer={() => {
      let el = document.getElementById('global-tooltip-container');

      if (!el) {
        el = document.createElement('div');
        el.setAttribute('id', 'global-tooltip-container');
        el.setAttribute('style', 'position:fixed;');
        document.body.appendChild(el);
      }

      return el;
    }}
  />
);

const ui: ContextMenuUI = {
  ComponentFormTitle,
  ComponentFormLabel,
  ComponentFormText,
  ComponentFormButton,
  ComponentFormCloseButton,
  ComponentFormSubmitButton,
  ComponentFormUnwrapButton,
  ComponentFormError,
  Icon,
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  FormWrapper,
  Tooltip: GlobalTooltip,
  ReactTags: ReactTagsField,
};

const GlobalContextMenu: FC<ContextMenuProps> = props => {
  const { isPositionToggled = false } = props;
  if (isPositionToggled) {
    const updatedUi = {
      ...ui,
      Toolbar: ToolbarRight,
    };
    return <ContextMenu {...props} ui={updatedUi} />;
  }
  return <ContextMenu {...props} ui={ui} />;
};

export default GlobalContextMenu;
