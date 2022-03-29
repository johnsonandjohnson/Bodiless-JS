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
  useIsActiveTrail,
  withMenuDesign,
  withListSubMenu,
} from '@bodiless/navigation';
import { withNodeKey } from '@bodiless/core';
import { cxColor, cxFontSize, cxTextDecoration } from '@bodiless/cx-elements';
import {
  useHasSubMenu,
  useIsFirstMenuItem,
  withExpandedAttr,
  withMenuTitleAnalytics,
} from '../../../util';
import { asMenuToken } from '../MenuClean';
import { cxMenuTitle, MenuTitleClean } from '../../MenuTitle';
import { cxSubMenu } from '../../SubMenu';
import { cxSeparator } from '../../Separator';

/**
 * @private
 *
 * asTitleLinkDisabledWithSubmenus applies default menu title with link, but
 * it removes the link if the menu has a submenu.
 */
const asTitleLinkDisabledWithSubmenus = as(
  // Default.
  on(MenuTitleClean)(cxMenuTitle.Default),
  // Replaces title with disabled link is useHasSubMenu is true.
  flowIf(() => useHasSubMenu('List', 'cham-sublist'))(
    on(MenuTitleClean)(cxMenuTitle.WithTitleLinkDisabled),
  ),
);

/**
 * Token which produces the Base CanvasX Menu. Can be customized and
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
    Title: on(MenuTitleClean)(cxMenuTitle.Default),
  },
  Behavior: {
    Title: flowIf(useIsActiveTrail)(
      // @TODO: Add active trail styles.
    ),
  },
});

/**
 * Token which produces a Default CanvasX Menu, with submenus list.
 */
const Default = asMenuToken({
  ...Base,
  Core: {
    _: withListSubMenu(),
  },
});

/**
 * Token which produces the CanvasX Utility Menu.
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
      cxSeparator.UtilityMenu,
      // @TODO: Create token? It should be same size for both mobile and desktop...
      'text-m-base whitespace-nowrap',
    ),
  },
  Schema: {
    _: withNodeKey({ nodeKey: 'utility-menu', nodeCollection: 'site' }),
  },
});

/**
 * Token which produces the CanvasX Footer Menu.
 */
const Footer = asMenuToken({
  ...Default,
  A11yContent: {
    Nav: addProps({ 'aria-label': 'Footer Navigation Menu' }),
    Wrapper: addProps({ 'aria-label': 'Navigation Menu' }),
  },
  Components: {
    ...Default.Components,
    _: withMenuDesign('List')(as(cxSubMenu.Footer)),
  },
  Layout: {
    Nav: 'w-full lg:h-full',
    Wrapper: 'w-full md:flex md:justify-between md:flex-grow lg:h-full',
    Item: 'md:min-w-1/4 md:w-full',
  },
  Spacing: {
    Title: 'lg:mb-4',
  },
  Theme: {
    // @TODO: This 'as' is needed only because of a bug and should be removed when it is fixed.
    // See https://github.com/johnsonandjohnson/Bodiless-JS/issues/1455
    Item: as(cxSeparator.FooterMenu),
    Title: as(
      cxColor.TextPrimaryFooterCopy,
      cxTextDecoration.Bold,
      cxFontSize.XL,
    ),
  },
});

/**
 * Token which produces the CanvasX Top Navigation Menu.
 */
const TopNav = asMenuToken({
  ...Default,
  Components: {
    _: withMenuDesign('List')(as(cxSubMenu.TopNav)),
    Title: asTitleLinkDisabledWithSubmenus,
  },
  Layout: {
    Wrapper: 'flex',
    Item: 'flex items-center',
  },
  Spacing: {
    Item: 'py-6',
    Title: 'px-3',
  },
  Theme: {
    Title: as(
      cxColor.TextPrimaryHeaderCopy,
      cxTextDecoration.Bold,
      cxTextDecoration.Uppercase,
      // @TODO: Add to tokens?
      'text-base whitespace-nowrap',
    ),
  },
  Schema: {
    _: withNodeKey({ nodeKey: 'main-menu', nodeCollection: 'site' }),
  },
});

/**
 * Token which produces the CanvasX Burger Menu.
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
    _: withMenuDesign('List')(as(cxSubMenu.Burger)),
    Title: asTitleLinkDisabledWithSubmenus,
  },
  Layout: {
    Wrapper: 'flex flex-col',
  },
  Spacing: {
    Item: 'mb-12',
  },
  Theme: {
    Title: as(
      cxColor.TextPrimaryHeaderCopy,
      cxFontSize.L,
      cxTextDecoration.Bold,
      cxTextDecoration.Uppercase,
    ),
  },
  Behavior: {
    Item: flowIf(useIsFirstMenuItem)(withExpandedAttr),
  },
  Schema: {
    ...TopNav.Schema,
  },
});

export default {
  Base,
  Burger,
  Default,
  Footer,
  TopNav,
  Utility,
};
