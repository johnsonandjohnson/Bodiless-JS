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
  withChild,
} from '@bodiless/core';
import {
  withNode,
  withNodeKey,
} from '@bodiless/data';

import { vitalColor, vitalSpacing } from '@bodiless/vital-elements';
import {
  vitalBurgerMenu,
  vitalMenu,
  asBurgerMenuToggler,
} from '@bodiless/vital-navigation';
import {
  as,
  flowHoc,
  addProps
} from '@bodiless/fclasses';
import { vitalButton } from '@bodiless/vital-button';
import { vitalLogo } from '../../Logo';
import { asHeaderToken } from '../HeaderClean';
import type { HeaderToken } from '../HeaderClean';
import BurgerIcon from '../assets/BurgerIcon';

const Default = asHeaderToken({
  Core: {
    MenuToggler: asBurgerMenuToggler,
  },
  Components: {
    Logo: vitalLogo.Default,
    Menu: vitalMenu.TopNav,
    BurgerMenu: flowHoc(
      as(vitalBurgerMenu.Default),
      // @TODO: Is there a better way to inject WhereToBuy and (future) LanguageButton
      // components into the menu? Maybe, move the components to another package...
    ),
    // UtilityMenu: vitalMenu.Utility,
    WhereToBuy: vitalButton.WhereToBuy,
  },
  Analytics: {
    Wrapper: addProps({ 'data-layer-region': 'header' }),
  },
  Layout: {
    Container: 'flex justify-between items-center',
    MenuContainer: 'hidden xl:flex justify-between items-center flex-grow',
    ActionMenuContainer: 'flex items-center',
    MenuToggler: 'flex justify-center items-center',
    MenuTogglerWrapper: 'flex xl:hidden',
  },
  Spacing: {
    Container: as(
      vitalSpacing.WithSiteMargin,
      vitalSpacing.WithSiteXLConstraint,
      'py-3 lg:py-0',
    ),
    ActionMenuContainer: 'pl-5',
    MenuTogglerWrapper: 'my-4',
  },
  Theme: {
    // @todo perhaps this should be an element spcing token ike "LargeIconSize".
    MenuToggler: 'w-6 h-6',
    Wrapper: vitalColor.BgPrimaryPage,
  },
  Schema: {
    Logo: withNodeKey({ nodeKey: 'Logo' }),
    _: withNode,
  },
  Content: {
    MenuToggler: withChild(BurgerIcon),
  },
});

const WithLanguageSelector = asHeaderToken({
  Theme: {
    LanguageSelectorWrapper: 'lg:border-vital-primary-divider lg:border-r-2',
  },
  Spacing: {
    LanguageSelectorWrapper: 'pl-5 lg:mr-5 lg:px-5 lg:py-2',
  }
});

/**
 * Tokens for the vital header
 *
 * @category Token Collection
 * @see [[HeaderClean]]
 */
export interface VitalHeader {
  /**
   * Default applies the following as defaults:
   * - Logo
   * - Togglers: BurgerMenu, Search
   * - Defines the components: Logo, Menu, BurgerMenu, Search, WhereToBuy
   *
   * @example Will remove Search components & Where to Buy components
   * ```js
   * import { vitalHeaderBase, asHeaderToken, } from '@bodiless/vital-layout';
   * import { replaceWith } from '@bodiless/fclasses';
   *
   * const Default = asHeaderToken({
   *   ...vitalHeaderBase.Default,
   *   Components: {
   *     ...vitalHeaderBase.Default.Components,
   *     DesktopSearch: replaceWith(() => null),
   *     MobileSearch: replaceWith(() => null),
   *     WhereToBuy: replaceWith(() => null),
   *     SearchToggler: replaceWith(() => null),
   *   },
   * }),
   *
   * export default {
   *   ...vitalHeaderBase,
   *   Default,
   * };
   * ```
   */
  Default: HeaderToken,
  /**
   * Extendable token that adds language selector
   */
  WithLanguageSelector: HeaderToken,
}

/**
 * Tokens for Vital Header
 *
 * @category Token Collection
 * @see [[VitalHeader]]
 * @see [[HeaderClean]]
 */
const vitalHeader: VitalHeader = {
  Default,
  WithLanguageSelector,
};

export default vitalHeader;
