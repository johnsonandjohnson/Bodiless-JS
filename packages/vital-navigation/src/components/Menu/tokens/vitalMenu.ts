/**
 * Copyright © 2022 Johnson & Johnson
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

import {
  addProps,
  as,
  flowHoc,
  flowIf,
  on,
} from '@bodiless/fclasses';
import {
  asBurgerMenu,
  withMenuDesign,
  withListSubMenu,
  asTopNav,
} from '@bodiless/navigation';
import { withNodeKey } from '@bodiless/core';
import { vitalColor, vitalFontSize, vitalTextDecoration } from '@bodiless/vital-elements';
import {
  useHasSubMenu,
  useIsFirstMenuItem,
  withExpandedAttr,
  withMenuTitleAnalytics,
} from '../../../util';
import { asMenuToken } from '../MenuClean';
import { vitalMenuTitle, MenuTitleClean } from '../../MenuTitle';
import { vitalSubMenu } from '../../SubMenu';
import { vitalSeparator } from '../../Separator';

/**
 * Token which produces the Base VitalDS Menu. Can be customized and
 * extended to produce TopNav, Burger, Footer, etc...
 *
 * This basic menu does not contain submenus.
 */
const Base = asMenuToken({
  Analytics: {
    _: withMenuTitleAnalytics,
  },
  A11y: {
    Nav: addProps({ role: 'navigation' }),
    Wrapper: addProps({ role: 'menubar' }),
    Item: addProps({ role: 'none' }),
    Title: addProps({ role: 'menuitem' }),
  },
  Components: {
    Title: on(MenuTitleClean)(vitalMenuTitle.Default),
  },
});

/**
 * Token which produces a Default VitalDS Menu, with submenus list.
 */
const Default = asMenuToken({
  ...Base,
  Core: {
    _: withListSubMenu(),
  },
});

/**
 * Token which produces the VitalDS Utility Menu.
 */
const Utility = asMenuToken({
  ...Base,
  A11y: {
    Nav: addProps({ role: 'tablist' }),
  },
  A11yContent: {
    Nav: addProps({ 'aria-label': 'Utility Menu' }),
  },
  Layout: {
    Wrapper: 'flex',
  },
  Theme: {
    Title: as(
      vitalSeparator.UtilityMenu,
      // @TODO: Create token? It should be same size for both mobile and desktop...
      'text-m-base whitespace-nowrap',
    ),
  },
  Schema: {
    _: withNodeKey({ nodeKey: 'utility-menu', nodeCollection: 'site' }),
  },
});

/**
 * Token which produces the VitalDS Footer Menu.
 */
const Footer = asMenuToken({
  ...Default,
  A11yContent: {
    Nav: addProps({ 'aria-label': 'Footer Navigation Menu' }),
    Wrapper: addProps({ 'aria-label': 'Navigation Menu' }),
  },
  Components: {
    ...Default.Components,
    _: withMenuDesign('List')(as(vitalSubMenu.Footer)),
  },
  Layout: {
    Nav: 'w-full lg:h-full',
    Wrapper: 'w-full md:flex md:justify-between md:flex-grow lg:h-full',
    Item: 'md:min-w-1/4 md:w-full',
  },
  Spacing: {
    Title: 'lg:mb-4',
    Wrapper: 'md:space-x-10 lg:space-x-12',
  },
  Theme: {
    // @TODO: This 'as' is needed only because of a bug and should be removed when it is fixed.
    // See https://github.com/johnsonandjohnson/Bodiless-JS/issues/1455
    Item: as(vitalSeparator.FooterMenu),
    Title: as(
      vitalColor.TextPrimaryFooterCopy,
      vitalTextDecoration.Bold,
      vitalFontSize.XL,
    ),
  },
});

/**
 * Token which produces the VitalDS Top Navigation Menu.
 */
const TopNav = asMenuToken({
  ...Default,
  Core: {
    _: flowHoc(withListSubMenu(), asTopNav('List')),
  },
  Components: {
    ...Default.Components,
    _: withMenuDesign('List')(as(vitalSubMenu.TopNav)),
  },
  Layout: {
    Wrapper: 'flex',
    Item: 'flex items-center',
  },
  Spacing: {
    Item: 'mx-3',
    Title: 'py-6',
  },
  Theme: {
    Item: 'relative group',
    Title: as(
      vitalColor.TextPrimaryHeaderCopy,
      vitalTextDecoration.Bold,
      vitalTextDecoration.Uppercase,
      // @TODO: Add to tokens?
      'text-base whitespace-nowrap cursor-pointer',
      // Hover effect on the menu item.
      'group-hover:text-vital-primary-interactive hover:text-vital-primary-interactive',
      // Underline below the menu item.
      'shadow-vital-primary-interactive group-hover:shadow-inner-bottom-md',
    ),
  },
  Behavior: {
    Title: flowIf(useHasSubMenu)(as(vitalMenuTitle.WithLinkDisabled)),
  },
  Schema: {
    _: withNodeKey({ nodeKey: 'main-menu', nodeCollection: 'site' }),
  },
});

/**
 * Token which produces the VitalDS Burger Menu.
 *
 * Reuses top navigation schema to retrieve desktop menu data.
 */
const Burger = asMenuToken({
  ...Default,
  // Turns burger menus into accordions.
  Core: {
    _: flowHoc(withListSubMenu(), asBurgerMenu('List')),
  },
  Components: {
    ...Default.Components,
    _: withMenuDesign('List')(as(vitalSubMenu.Burger)),
  },
  Layout: {
    Wrapper: 'flex flex-col',
  },
  Spacing: {
    Item: 'mb-12',
  },
  Theme: {
    Title: as(
      vitalColor.TextPrimaryHeaderCopy,
      vitalFontSize.BurgerMenu,
      vitalTextDecoration.Bold,
      vitalTextDecoration.Uppercase,
    ),
  },
  Behavior: {
    Item: flowIf(useIsFirstMenuItem)(withExpandedAttr),
    Title: flowIf(useHasSubMenu)(as(vitalMenuTitle.WithLinkDisabled)),
  },
  Schema: {
    ...TopNav.Schema,
  },
});

export default {
  Default,
  Burger,
  Footer,
  TopNav,
  Utility,
};
