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
  Div,
  Fragment,
  designable,
  Header
} from '@bodiless/fclasses';
import { withoutHydration } from '@bodiless/hydration';
import { asCxTokenSpec } from '@bodiless/cx-elements';
import { LogoClean } from '../Logo';
import { MenuTogglerClean } from '../MenuToggler';
import { SearchTogglerClean, DesktopSearchClean } from '../Search';
import { HeaderComponents, HeaderProps } from './types';

const headerComponents: HeaderComponents = {
  Wrapper: Header,
  Container: Div,
  MenuContainer: Div,
  MenuToggler: MenuTogglerClean,
  Menu: Fragment,
  Logo: LogoClean,
  ActionMenuContainer: Div,
  UtilityMenu: Fragment,
  DesktopSearch: DesktopSearchClean,
  SearchToggler: SearchTogglerClean,
  LanguageButton: Fragment,
};

const HeaderCleanBase: FC<HeaderProps> = ({ components: C }) => (
  <C.Wrapper>
    <C.Container>
      <C.MenuToggler />
      <C.Logo />
      <C.SearchToggler />
      <C.MenuContainer>
        <C.Menu />
        <C.ActionMenuContainer>
          <C.DesktopSearch />
          <C.UtilityMenu />
          <C.LanguageButton />
        </C.ActionMenuContainer>
      </C.MenuContainer>
    </C.Container>
  </C.Wrapper>
);

const HeaderClean = designable(headerComponents, 'Header')(HeaderCleanBase);
const HeaderStatic = withoutHydration()(HeaderClean);

const asHeaderToken = asCxTokenSpec<HeaderComponents>();

export default HeaderClean;

export { asHeaderToken, HeaderStatic };
