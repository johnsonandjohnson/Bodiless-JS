/**
 * Copyright Â© 2019 Johnson & Johnson
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

import React, {
  FunctionComponent as FC,
  ComponentType,
  HTMLProps,
} from 'react';
import { slide } from 'react-burger-menu';
import {
  designable,
  DesignableComponentsProps,
  stylable,
  Div,
} from '@bodiless/fclasses';

type BurgerMenuComponents = {
  Wrapper: ComponentType<any>,
  Slide: ComponentType<any>,
  Header: ComponentType<any>,
  Body: ComponentType<any>,
};

const burgerMenuComponents: BurgerMenuComponents = {
  Wrapper: Div,
  Slide: stylable(slide),
  Body: Div,
  Header: Div,
};

type Props = DesignableComponentsProps<BurgerMenuComponents> & HTMLProps<HTMLElement>;

const BurgerMenuBase: FC<Props> = ({ components, ...rest }) => {
  const {
    Wrapper,
    Slide,
    Body,
    Header,
  } = components;
  return (
    <Wrapper>
      <Slide>
        <Header />
        <Body {...rest} />
      </Slide>
    </Wrapper>
  );
};


const BurgerMenuClean = designable(burgerMenuComponents)(BurgerMenuBase) as ComponentType<Props>;

export default BurgerMenuClean;
