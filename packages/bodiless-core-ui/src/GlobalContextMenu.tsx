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
import { ContextMenu, ContextMenuUI, ContextMenuProps } from '@bodiless/core';
import {
  ComponentFormTitle, ComponentFormCloseButton, ComponentFormLabel, ComponentFormText,
  ComponentFormButton, ToolbarIcon, Div, Hr, ToolbarButton, ComponentFormUnwrapButton,
  ComponentFormError, ComponentFormSubmitButton, ComponentFormList, ComponentFormListItem,
  ComponentFormDescription, ComponentFormWarning, ComponentFormLink, ComponentFormFieldWrapper,
  ComponentFormFieldTitle, ComponentFormCheckBox, ComponentFormRadio, ComponentFormRadioGroup,
  ComponentFormSelect, ComponentFormOption, ComponentFormTextArea, ContextSubMenu,
  ToolbarButtonLabel, HorizontalToolbarButton,
} from '@bodiless/ui';
import ReactTagsField from './ReactTags';

const Toolbar = flow(
  addClasses('bl-flex bl-flex-col bl-w-grid-12 bl-bg-black bl-rounded bl-z-50 bl-px-grid-2 bl-py-2 bl-fixed bl-top-grid-0 bl-left-grid-0 bl-text-white'),
  addProps({ role: 'toolbar', 'aria-label': 'Global Context Menu Left', id: 'global-context-menu' }),
)(Div);

const ToolbarRight = flow(
  addClasses('bl-right-grid-0'),
  removeClasses('bl-left-grid-0'),
  addProps({ 'aria-label': 'Global Context Menu Right' }),
)(Toolbar);

export const FormWrapper = addClasses('bl-flex')(Div);

export const ToolbarDivider = addClasses(
  'bl-bg-grey bl-w-grid-12 bl--ml-grid-2 bl-mb-grid-3 bl-h-px',
)(Hr);

export const GlobalTooltip: FC<ReactTooltip['props']> = props => (
  <ReactTooltip
    align={{
      offset: [5, 0],
    }}
    {...props}
    placement="rightTop"
    overlayStyle={{ position: 'fixed', opacity: 1 }}
    getTooltipContainer={() => {
      let el = document.getElementById('global-tooltip-container');

      if (!el) {
        el = document.createElement('div');
        el.setAttribute('id', 'global-tooltip-container');
        el.setAttribute('style', 'position: fixed; z-index: 1000;');
        document.body.appendChild(el);
      }

      return el;
    }}
  />
);

const GlobalTooltipRight = flow(
  addProps({
    align: {
      offset: [5, 0],
      useCssRight: true,
    },
  }),
)(GlobalTooltip);

const ui: ContextMenuUI = {
  ComponentFormTitle,
  ComponentFormLabel,
  ComponentFormDescription,
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
  ComponentFormSubmitButton,
  ComponentFormUnwrapButton,
  ComponentFormError,
  ComponentFormWarning,
  ComponentFormLink,
  ComponentFormList,
  ComponentFormListItem,
  Icon: ToolbarIcon,
  ContextSubMenu,
  Toolbar,
  ToolbarButton,
  HorizontalToolbarButton,
  ToolbarButtonLabel,
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
      Tooltip: GlobalTooltipRight,
    };
    return <ContextMenu {...props} ui={updatedUi} />;
  }
  return <ContextMenu {...props} ui={ui} />;
};

export default GlobalContextMenu;
