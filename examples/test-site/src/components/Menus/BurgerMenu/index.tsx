/**
 * Copyright Ã‚Â© 2019 Johnson & Johnson
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
import React, { FunctionComponent } from 'react';
import { flow } from 'lodash';
import {
  A,
  addProps,
  withDesign,
  addClasses,
  Li,
  replaceWith,
} from '@bodiless/fclasses';
import { withChild, asStatic } from '@bodiless/core';
import {
  asEditableMenu,
  asEditableBurgerSubMenu,
  withSubmenu,
  BurgerMenuClean,
  SingleAccordionClean,
} from '@bodiless/organisms';
import {
  asEditable,
  List,
} from '@bodiless/components';
import { asMobileOnly } from '../../Elements.token';
import './burger-menu.css';

const defaultTopMenuLinksStyles = flow(
  addClasses('text-black'),
);

const EditableLinkList = flow(
  asEditableMenu(asEditable),
  defaultTopMenuLinksStyles,
)(List);

const BurgerSubMenu = flow(
  asEditableBurgerSubMenu('Overview', asEditable),
  withDesign({
    Wrapper: replaceWith(Li),
    TitleWrapper: addClasses('font-bold text-black'),
    Body: withDesign({
      Wrapper: addClasses('pl-1'),
    }),
  }),
)(SingleAccordionClean);

const Body = withSubmenu(BurgerSubMenu)(EditableLinkList);

const HeaderContents: FunctionComponent = () => (
  <A href="/">
    <img src="/images/bodiless_logo.png" className="h-16" alt="Return To Home" />
  </A>
);

const asBurgerMenuDefaultStyles = flow(
  withDesign({
    Wrapper: flow(
      asMobileOnly,
      addClasses('bg-teal-600'),
    ),
    Slide: flow(
      addClasses('bg-burger-menu'),
      addProps({
        noOverlay: true,
        width: '100%',
        right: true,
      }),
    ),
    Header: flow(
      withChild(HeaderContents),
      addClasses('bg-teal-600 pt-3 pb-4'),
    ),
    Body: flow(
      replaceWith(Body),
      addClasses('p-3'),
    ),
  }),
);

const BurgerMenu = flow(
  asStatic,
  asBurgerMenuDefaultStyles,
)(BurgerMenuClean);

export default BurgerMenu;
