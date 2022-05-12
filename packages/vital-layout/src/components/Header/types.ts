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
import { ComponentOrTag, DesignableComponentsProps } from '@bodiless/fclasses';

export type HeaderComponents = {
  Wrapper: ComponentOrTag<any>,
  Container: ComponentOrTag<any>,
  MenuContainer: ComponentOrTag<any>,
  MenuTogglerWrapper: ComponentOrTag<any>,
  MenuToggler: ComponentOrTag<any>,
  MenuWrapper: ComponentOrTag<any>,
  Menu: ComponentOrTag<any>,
  BurgerMenuWrapper: ComponentOrTag<any>,
  BurgerMenu: ComponentOrTag<any>,
  Logo: ComponentOrTag<any>,
  ActionMenuContainer: ComponentOrTag<any>,
  UtilityMenuWrapper: ComponentOrTag<any>,
  UtilityMenu: ComponentOrTag<any>,
  LanguageButton: ComponentOrTag<any>,
  WhereToBuyWrapper: ComponentOrTag<any>,
  WhereToBuy: ComponentOrTag<any>,
  DesktopSearch: ComponentOrTag<any>,
  SearchToggler: ComponentOrTag<any>,
};

export type HeaderProps = DesignableComponentsProps<HeaderComponents> & HTMLProps<HTMLElement>;
