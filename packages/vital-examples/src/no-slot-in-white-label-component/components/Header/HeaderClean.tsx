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
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { ButtonClean } from '@bodiless/vital-buttons';
import {
  BurgerMenuClean,
  MenuClean,
} from '@bodiless/vital-navigation';
import { LogoClean } from '@bodiless/vital-layout/';
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
  OuterUtilityMenuWrapper: Fragment,
  OuterUtilityMenu: Fragment,
  UtilityMenuWrapper: Fragment,
  UtilityMenu: MenuClean,
  DesktopSearch: Fragment,
  MobileSearch: Fragment,
  SearchToggler: Fragment,
  LanguageSelectorWrapper: Fragment,
  LanguageSelector: Fragment,
  WhereToBuyWrapper: Fragment,
  WhereToBuy: ButtonClean,
  // Below you'll see the new `NewButton` slot, instantiaed at a fragment. Doing this adds
  // this new slot to the structure of the `Header` component, but essentially hides it until
  // specifically called upon.
  NewButton: Fragment,
};

const HeaderCleanBase: FC<HeaderProps> = ({ components: C, ...rest }) => (
  <C.Wrapper {...rest}>
    <C.OuterUtilityMenuWrapper>
      <C.OuterUtilityMenu />
    </C.OuterUtilityMenuWrapper>
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
          <C.LanguageSelectorWrapper>
            <C.LanguageSelector />
          </C.LanguageSelectorWrapper>
          <C.WhereToBuyWrapper>
            <C.WhereToBuy />
            <C.NewButton />
          </C.WhereToBuyWrapper>
        </C.ActionMenuContainer>
      </C.MenuContainer>
      <C.BurgerMenuWrapper>
        <C.BurgerMenu />
      </C.BurgerMenuWrapper>
    </C.Container>
    <C.MobileSearch />
  </C.Wrapper>
);

/**
 * A clean header to be used in pages layouts following vital design.
 *
 * @category Component
 *
 */
const HeaderClean = designable(headerComponents, 'Header')(HeaderCleanBase);

// /**
//  * Use this version of the header when all components are static.
//  *
//  * @category Component
//  *
//  */
// const HeaderStatic = withoutHydration()(HeaderClean);

/**
 * A token modifier that respects the Header Components.
 *
 * @category Token Collection
 */
const asHeaderToken = asVitalTokenSpec<HeaderComponents>();

// These are used in defining the VitalHeader interface.
const headerToken = asHeaderToken();
export type HeaderToken = typeof headerToken;

export default HeaderClean;

export { asHeaderToken };
