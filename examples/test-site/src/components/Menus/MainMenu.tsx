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
import React from 'react';
import { flow } from 'lodash';
import {
  addClasses,
  addProps,
  removeClasses,
  withDesign,
} from '@bodiless/fclasses';
import { List } from '@bodiless/components';
import {
  asHorizontalMenu,
  asHorizontalSubMenu,
  asEditableMainMenu,
  asEditableMainSubMenu,
  withSubmenu,
} from '@bodiless/organisms';
import { withEditorSimple } from '../Editors';
import { asExceptMobile } from '../Elements.token';

const asWhiteColoredLink = flow(
  removeClasses('bl-text-primary hover:bl-underline'),
  addClasses('text-white'),
);
const withActivePageStyles = addClasses('bg-teal-500');
const withLinkStyles = withDesign({
  ActiveLink: flow(asWhiteColoredLink, withActivePageStyles),
  Link: asWhiteColoredLink,
});
const withMenuStyles = addClasses('hover:bg-teal-500 text-white text-left min-w-100 leading-loose text-sm px-2');
const withTealBackground = addClasses('bg-teal-600');
const withLimitedHeightStyles = addClasses('overflow-y-hidden max-h-menu-row');
const withSubmenuStyles = addClasses('-ml-2');
const MenuSubList = flow(
  asEditableMainSubMenu(withEditorSimple),
  asHorizontalSubMenu,
  withDesign({
    Title: withLinkStyles,
    Wrapper: flow(
      withTealBackground,
      withMenuStyles,
    ),
    Item: flow(
      withMenuStyles,
      withTealBackground,
      withSubmenuStyles,
    ),
  }),
)(List);

const MenuList = flow(
  asEditableMainMenu(withEditorSimple),
  asHorizontalMenu,
  withDesign({
    Title: withLinkStyles,
    Wrapper: flow(
      withTealBackground,
      addProps({ overflowedIndicator: <span className="text-white">...</span> }),
      withLimitedHeightStyles,
    ),
    Item: flow(
      withTealBackground,
      withMenuStyles,
    ),
  }),
  asExceptMobile,
)(List);

export default withSubmenu(MenuSubList)(MenuList);
