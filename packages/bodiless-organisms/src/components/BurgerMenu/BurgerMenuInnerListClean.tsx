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
  FunctionComponent,
  ComponentType,
  HTMLProps,
} from 'react';
import {
  A,
  DesignableComponentsProps,
  designable,
  Div,
} from '@bodiless/fclasses';
import { List } from '@bodiless/components';

type BurgerMenuInnerListComponents = {
  Wrapper: ComponentType<any>,
  Header: ComponentType<any>,
  InnerLinks: ComponentType<any>,
};

const startComponents: BurgerMenuInnerListComponents = {
  Wrapper: Div,
  Header: A,
  InnerLinks: List,
};

type Props = DesignableComponentsProps<BurgerMenuInnerListComponents> & HTMLProps<HTMLElement>;

const BurgerMenuInnerListBase: FunctionComponent<Props> = ({ components, ...rest }) => {
  const { Wrapper, Header, InnerLinks } = components;
  return (
    <Wrapper>
      <Header />
      <InnerLinks {...rest} />
    </Wrapper>
  );
};

// eslint-disable-next-line
const BurgerMenuInnerListClean = designable(startComponents)(BurgerMenuInnerListBase) as ComponentType<Props>;

export default BurgerMenuInnerListClean;
