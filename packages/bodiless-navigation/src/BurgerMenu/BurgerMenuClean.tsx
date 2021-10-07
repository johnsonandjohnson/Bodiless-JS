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
import {
  Div, designable, DesignableProps, DesignableComponentsProps, Nav as NavBase, Fragment,
} from '@bodiless/fclasses';

export type BurgerMenuComponents = {
  Wrapper: ComponentType<any>,
  Header: ComponentType<any>,
  Nav: ComponentType<any>,
  Menu: ComponentType<any>,
  Overlay: ComponentType<any>,
};

export type BurgerMenuProps = DesignableProps<BurgerMenuComponents>;

type BurgerMenuBaseProps = DesignableComponentsProps<BurgerMenuComponents>;

const burgerMenuComponents: BurgerMenuComponents = {
  Wrapper: Div,
  Nav: NavBase,
  Menu: Div,
  Header: Div,
  Overlay: Div,
};

const BurgerMenuBase: FC<BurgerMenuBaseProps> = ({ components, ...rest }) => {
  const {
    Wrapper, Nav, Menu, Header, Overlay,
  } = components;

  return (
    <Fragment>
      <Wrapper>
        <Header />
        <Nav>
          <Menu {...rest} />
        </Nav>
      </Wrapper>
      <Overlay />
    </Fragment>
  );
};

const BurgerMenuClean = designable(burgerMenuComponents, 'BurgerMenu')(BurgerMenuBase);

export default BurgerMenuClean;
