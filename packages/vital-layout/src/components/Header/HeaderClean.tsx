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

import React, { FC } from 'react';
import {
  A,
  Div,
  Fragment,
  Header,
  designable,
} from '@bodiless/fclasses';
import { withoutHydration } from '@bodiless/hydration';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { LinkClean } from '@bodiless/vital-link';
import {
  BurgerMenuClean,
  MenuClean,
} from '@bodiless/vital-navigation';
import { LogoClean } from '../Logo';
import { SearchTogglerClean, DesktopSearchClean } from '../Search';
import type { HeaderComponents, HeaderProps } from './types';

const headerComponents: HeaderComponents = {
  Wrapper: Header,
  Container: Div,
  MenuContainer: Div,
  MenuTogglerWrapper: Div,
  MenuToggler: A,
  MenuWrapper: Fragment,
  Menu: MenuClean,
  BurgerMenuWrapper: Fragment,
  BurgerMenu: BurgerMenuClean,
  Logo: LogoClean,
  ActionMenuContainer: Div,
  UtilityMenuWrapper: Fragment,
  UtilityMenu: MenuClean,
  DesktopSearch: DesktopSearchClean,
  SearchToggler: SearchTogglerClean,
  LanguageButton: Fragment,
  WhereToBuyWrapper: Fragment,
  WhereToBuy: LinkClean,
};

const HeaderCleanBase: FC<HeaderProps> = ({ components: C, ...rest }) => (
  <C.Wrapper {...rest}>
    <C.Container>
      <C.MenuTogglerWrapper>
        <C.MenuToggler />
      </C.MenuTogglerWrapper>
      <C.Logo />
      <C.SearchToggler />
      <C.MenuContainer>
        <C.MenuWrapper>
          <C.Menu />
        </C.MenuWrapper>
        <C.ActionMenuContainer>
          <C.DesktopSearch />
          <C.UtilityMenuWrapper>
            <C.UtilityMenu />
          </C.UtilityMenuWrapper>
          <C.LanguageButton />
          <C.WhereToBuyWrapper>
            <C.WhereToBuy />
          </C.WhereToBuyWrapper>
        </C.ActionMenuContainer>
      </C.MenuContainer>
      <C.BurgerMenuWrapper>
        <C.BurgerMenu />
      </C.BurgerMenuWrapper>
    </C.Container>
  </C.Wrapper>
);

/**
 * A clean header to be used in pages layouts.
 */
const HeaderClean = designable(headerComponents, 'Header')(HeaderCleanBase);
const HeaderStatic = withoutHydration()(HeaderClean);

const asHeaderToken = asVitalTokenSpec<HeaderComponents>();

export default HeaderClean;

export { asHeaderToken, HeaderStatic };
