/**
 * Copyright © 2020 Johnson & Johnson
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
import { flow } from 'lodash';
import { withChild } from '@bodiless/core';
import {
  addClasses,
  addProps,
  withDesign,
  replaceWith,
  A,
  Li,
} from '@bodiless/fclasses';
import { asMobileOnly } from '../Elements.token';

const asWhiteColoredLink = addClasses('text-white');
const withMenuBackground = addClasses('bg-teal-500');
const withTealBackground = addClasses('bg-teal-600');
const withMenuStyles = addClasses('hover:bg-teal-500 text-white text-left min-w-100 leading-loose text-sm px-2');
const withLimitedHeightStyles = addClasses('overflow-y-hidden max-h-menu-row');
const withSubmenuStyles = addClasses('-ml-2');

const withLinkStyles = withDesign({
  ActiveLink: flow(asWhiteColoredLink, withMenuBackground),
  Link: asWhiteColoredLink,
});

const BurgerMenuHeader: FC = () => (
  <A href="/">
    <img src="/images/bodiless_logo.png" className="h-16" alt="Return To Home" />
  </A>
);

const withMenuSublistStyles = withDesign({
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
});

const withMenuListStyles = withDesign({
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
});

const withBurgerMenuStyles = withDesign({
  Wrapper: flow(
    asMobileOnly,
    withTealBackground,
  ),
  Slide: flow(
    addClasses('bg-burger-menu'),
    addProps({ noOverlay: true, width: '100%', right: true }),
  ),
  Header: flow(
    withChild(BurgerMenuHeader),
    withTealBackground,
    addClasses('py-4'),
  ),
  Body: flow(
    addClasses('p-3 text-black'),
  ),
});

const withBurgerSubMenuStyles = withDesign({
  Wrapper: replaceWith(Li),
  TitleWrapper: addClasses('font-bold text-black'),
  Body: withDesign({
    Wrapper: addClasses('pl-1'),
  }),
});

export {
  withMenuListStyles,
  withMenuSublistStyles,
  withBurgerMenuStyles,
  withBurgerSubMenuStyles,
};
