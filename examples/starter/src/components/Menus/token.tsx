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

import React from 'react';
import { flow } from 'lodash';
import {
  addClasses,
  addProps,
  withDesign,
  replaceWith,
  Li,
} from '@bodiless/fclasses';
import { asMobileOnly } from '../Elements.token';

const asWhiteColoredLink = addClasses('text-white');
const withMenuBackground = addClasses('bg-blue-700');
const withMenuStyles = addClasses('hover:bg-blue-500 text-white text-left leading-loose text-sm px-2');
const withLimitedHeightStyles = addClasses('overflow-y-hidden max-h-menu-row');
const withSubmenuStyles = addClasses('-ml-2');

const withLinkStyles = withDesign({
  ActiveLink: flow(asWhiteColoredLink, withMenuBackground),
  Link: asWhiteColoredLink,
});

const withMenuSublistStyles = withDesign({
  Title: withLinkStyles,
  Wrapper: flow(
    withMenuBackground,
    withMenuStyles,
  ),
  Item: flow(
    withMenuStyles,
    withMenuBackground,
    withSubmenuStyles,
  ),
});

const withMenuListStyles = withDesign({
  Title: withLinkStyles,
  Wrapper: flow(
    withMenuBackground,
    addProps({ overflowedIndicator: <span className="text-white">...</span> }),
    withLimitedHeightStyles,
  ),
  Item: flow(
    withMenuBackground,
    withMenuStyles,
  ),
});

const withBurgerMenuStyles = withDesign({
  Wrapper: flow(
    asMobileOnly,
    withMenuBackground,
    addClasses('py-1'),
  ),
  Slide: flow(
    addClasses('bg-white'),
    addProps({ noOverlay: true, width: '100%', right: true }),
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

const withBurgerLogoBg = flow(
  addClasses('bg-gray-200'),
);

export {
  withMenuListStyles,
  withMenuSublistStyles,
  withBurgerMenuStyles,
  withBurgerSubMenuStyles,
  withBurgerLogoBg,
};
