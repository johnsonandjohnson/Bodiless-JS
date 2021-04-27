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

import React, { FC, ComponentType, HTMLProps } from 'react';
import {
  designable,
  DesignableComponentsProps,
  withDesign,
  Div,
  asToken,
} from '@bodiless/fclasses';
import { withNodeKey } from '@bodiless/core';
import ResponsiveMenu, { BurgerMenuToggler } from '../Menu';
import { ResponsiveSearchBox } from '../Search';
import Logo from './logo';

type HeaderComponents = {
  Wrapper: ComponentType<any>,
  Container: ComponentType<any>,
  MenuContainer: ComponentType<any>,
  MenuToggler: ComponentType<any>,
  SearchContainer: ComponentType<any>,
  Menu: ComponentType<any>,
  Search: ComponentType<any>,
  SiteLogoReturn: ComponentType<any>,
};

export type Props = DesignableComponentsProps<HeaderComponents> & HTMLProps<HTMLElement>;

const headerComponents:HeaderComponents = {
  Wrapper: Div,
  Container: Div,
  MenuContainer: Div,
  MenuToggler: BurgerMenuToggler,
  SearchContainer: Div,
  Menu: ResponsiveMenu,
  Search: ResponsiveSearchBox,
  SiteLogoReturn: Logo,
};

const HeaderClean: FC<Props> = ({ components }) => {
  const {
    Wrapper,
    Container,
    MenuContainer,
    MenuToggler,
    SearchContainer,
    Menu,
    Search,
    SiteLogoReturn,
  } = components;

  return (
    <Wrapper>
      <Container>
        <SiteLogoReturn />
        <SearchContainer>
          <Search placeholder="Search" />
        </SearchContainer>
        <MenuContainer>
          <MenuToggler />
          <Menu />
        </MenuContainer>
      </Container>
    </Wrapper>
  );
};

const asSiteHeader = asToken(
  designable(headerComponents, 'Header'),
  withDesign({
    Menu: withNodeKey({ nodeKey: 'MainMenu', nodeCollection: 'site' }),
  }),
);

const Header = asSiteHeader(HeaderClean);
export default Header;
