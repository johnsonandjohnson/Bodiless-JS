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

import React, { FC, ComponentType } from 'react';
import { slide } from 'react-burger-menu';
import {
  Div, stylable, designable, DesignableComponentsProps,
} from '@bodiless/fclasses';

type BurgerMenuComponents = {
  Wrapper: ComponentType<any>,
  Header: ComponentType<any>,
  Menu: ComponentType<any>,
  Body: ComponentType<any>,
};

type BurgerMenuProps = DesignableComponentsProps<BurgerMenuComponents>;

const burgerMenuComponents: BurgerMenuComponents = {
  Wrapper: Div,
  Menu: stylable(slide),
  Body: Div,
  Header: Div,
};

const BurgerMenuBase: FC<BurgerMenuProps> = ({ components, ...rest }) => {
  const {
    Wrapper, Menu, Body, Header,
  } = components;

  return (
    <Wrapper>
      <Menu>
        <Header />
        <Body {...rest} />
      </Menu>
    </Wrapper>
  );
};

const BurgerMenuClean = designable(burgerMenuComponents, 'BurgerMenu')(BurgerMenuBase);

export default BurgerMenuClean;
