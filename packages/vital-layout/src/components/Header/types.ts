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

import { HTMLProps } from 'react';
import { ComponentOrTag, DesignableComponents, DesignableComponentsProps } from '@bodiless/fclasses';

/**
 * Type of the design element in the VitalDS `Header` component which consists of:
 * - Logo
 * - Menu
 * - Burger Menu toggler (on mobile)
 * - LanguageeSelector
 * - Search (mobile & desktop slots)
 * - Search toggler (on mobile)
 * - Utility Menu (second menu)
 * - Where to Buy
 *
 * @category Component
 */
export interface HeaderComponents extends DesignableComponents {
  /**
   * Wrapper around entire header
   */
  Wrapper: ComponentOrTag<any>,
  /**
   * Container to hold the specific header components
   */
  Container: ComponentOrTag<any>,
  /**
   * Container to hold the menu components
   */
  MenuContainer: ComponentOrTag<any>,
  /**
   * Wrapper around menu toggler
   */
  MenuTogglerWrapper: ComponentOrTag<any>,
  /**
   * Used for icon/link to open menu on smaller breakpoints
   */
  MenuToggler: ComponentOrTag<any>,
  /**
   * Wrapper around menu
   */
  MenuWrapper: ComponentOrTag<any>,
  /**
   * Used for the desktop menu
   */
  Menu: ComponentOrTag<any>,
  /**
   * Wrapper around burger menu toggler
   */
  BurgerMenuWrapper: ComponentOrTag<any>,
  /**
   * Used for burger menu on smaller breakpoints.
   */
  BurgerMenu: ComponentOrTag<any>,
  /**
   * Used for logo
   */
  Logo: ComponentOrTag<any>,
  /**
   * Wrapper container fo user interactions in header
   */
  ActionMenuContainer: ComponentOrTag<any>,
  /**
   * Wrapper around utility menu that is shown above the Header.
   * Not used by Default.
   */
  OuterUtilityMenuWrapper: ComponentOrTag<any>,
  /**
   * Used for secondary/utility menu that is shown above the Header.
   * Not used by Default.
   */
  OuterUtilityMenu: ComponentOrTag<any>,
  /**
   * Wrapper around utility menu
   */
  UtilityMenuWrapper: ComponentOrTag<any>,
  /**
   * Used for secondary/utility menu
   */
  UtilityMenu: ComponentOrTag<any>,
  /**
   * Wrapper around language selector
   */
  LanguageSelectorWrapper: ComponentOrTag<any>,
  /**
   * Used for language selector link/select
   */
  LanguageSelector: ComponentOrTag<any>,
  /**
   * Wrapper around where to buy toggler
   */
  WhereToBuyWrapper: ComponentOrTag<any>,
  /**
   * Used for a Link to Where to buy
   */
  WhereToBuy: ComponentOrTag<any>,
  /**
   * Used for a search box on desktop
   */
  DesktopSearch: ComponentOrTag<any>,
  /**
   * Used to show mobile search box
   */
  MobileSearch: ComponentOrTag<any>,
  /**
   * Used for the link/toggle on smaller devices to show search box
   */
  SearchToggler: ComponentOrTag<any>,
}

export type HeaderProps = DesignableComponentsProps<HeaderComponents> & HTMLProps<HTMLElement>;
