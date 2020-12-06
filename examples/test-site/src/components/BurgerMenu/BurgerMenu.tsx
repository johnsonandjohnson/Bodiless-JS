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

import { flow } from 'lodash';
import { asStatic } from '@bodiless/core';
import { withDesign, replaceWith } from '@bodiless/fclasses';
import { BurgerMenuClean, asMegaBurgerMenu, asSimpleBurgerMenu } from '@bodiless/organisms';

import Logo from '../Layout/logo';

import { MegaMenuBase } from '../Menu/MegaMenu';
import { SimpleMenuBase } from '../Menu/SimpleMenu';

import withBurgerMenuStyles from './BurgerMenu.token';
import withMegaBurgerMenuStyles from './MegaBurgerMenu.token';
import withSimpleBurgerMenuStyles from './SimpleBurgerMenu.token';

/**
 * BurgerMenuClean is built on top of the `react-burger-menu` package
 * which does not provide an API for styling and relies on .css to style
 * burger menu icon, close icon and hover effect.
 */
import './burger-menu.css';
import { asMegaMenuBreadcrumbSource, asBreadcrumbSource } from '../Breadcrumbs/MenuBreadcrumbs';

const MegaBurgerMenuBody = flow(
  // We need to register the burger menu as a second breadcrumb source
  // bc the top menu is unmounted at smaller viewports.
  asMegaMenuBreadcrumbSource,
  asMegaBurgerMenu,
  withMegaBurgerMenuStyles,
  asStatic,
)(MegaMenuBase);

const BurgerMenuBody = flow(
  // We need to register the burger menu as a second breadcrumb source
  // bc the top menu is unmounted at smaller viewports.
  asBreadcrumbSource,
  asSimpleBurgerMenu,
  withSimpleBurgerMenuStyles,
  asStatic,
)(SimpleMenuBase);

const withBurgerMenuLogo = withDesign({
  Header: replaceWith(Logo),
});

const SimpleBurgerMenu = flow(
  withDesign({
    Body: replaceWith(BurgerMenuBody),
  }),
  withBurgerMenuLogo,
  withBurgerMenuStyles,
)(BurgerMenuClean);

const MegaBurgerMenu = flow(
  withDesign({
    Body: replaceWith(MegaBurgerMenuBody),
  }),
  withBurgerMenuLogo,
  withBurgerMenuStyles,
)(BurgerMenuClean);

export {
  SimpleBurgerMenu,
  MegaBurgerMenu,
};
