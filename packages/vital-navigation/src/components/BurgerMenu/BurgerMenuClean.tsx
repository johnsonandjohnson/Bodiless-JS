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
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import {
  Div, Fragment, A, designable,
} from '@bodiless/fclasses';
import { ButtonClean } from '@bodiless/vital-button';
import { MenuClean } from '../Menu';
import type { BurgerMenuComponents, BurgerMenuProps } from './types';

const burgerMenuComponents: BurgerMenuComponents = {
  Wrapper: Div,
  Container: Div,
  MenuTogglerWrapper: Div,
  MenuToggler: A,
  MenuWrapper: Div,
  Menu: MenuClean,
  FooterWrapper: Div,
  WhereToBuyWrapper: Fragment,
  WhereToBuy: ButtonClean,
  ActionFooterContainer: Div,
  UtilityMenuWrapper: Fragment,
  UtilityMenu: MenuClean,
  LanguageSelector: Fragment,
  Overlay: Div,
};

const BurgerMenuCleanBase: FC<BurgerMenuProps> = ({ components: C, ...rest }) => (
  <>
    <C.Wrapper {...rest}>
      <C.Container>
        <C.MenuTogglerWrapper>
          <C.MenuToggler />
        </C.MenuTogglerWrapper>
        <C.MenuWrapper>
          <C.Menu />
        </C.MenuWrapper>
        <C.FooterWrapper>
          <C.WhereToBuyWrapper>
            <C.WhereToBuy />
          </C.WhereToBuyWrapper>
          <C.ActionFooterContainer>
            <C.UtilityMenuWrapper>
              <C.UtilityMenu />
            </C.UtilityMenuWrapper>
            <C.LanguageSelector />
          </C.ActionFooterContainer>
        </C.FooterWrapper>
      </C.Container>
    </C.Wrapper>
    <C.Overlay />
  </>
);

/**
 * A clean Burger Menu that contains several components inside.
 * For new components in the menu, provide new slots with clean, designable components.
 */
const BurgerMenuClean = designable(burgerMenuComponents, 'BurgerMenu')(BurgerMenuCleanBase);

export const asBurgerMenuToken = asVitalTokenSpec<BurgerMenuComponents>();

export default BurgerMenuClean;
