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
import { asCxTokenSpec } from '@bodiless/cx-elements';
import {
  A,
  Div,
  Span,
  designable,
} from '@bodiless/fclasses';
import { CartIcon } from './assets/CartIcon';
import { WhereToBuyComponents, WhereToBuyProps } from './types';

const whereToBuyComponents: WhereToBuyComponents = {
  Wrapper: Div,
  Button: A,
  Icon: CartIcon,
  Label: Span,
};

// @TODO: When implementing WTB, make button editable to add links, and re-fix styles.
const WhereToBuyCleanBase: FC<WhereToBuyProps> = ({ components: C, ...rest }) => (
  <C.Wrapper {...rest}>
    <C.Button href="/where-to-buy">
      <C.Icon />
      <C.Label />
    </C.Button>
  </C.Wrapper>
);

const WhereToBuyClean = designable(whereToBuyComponents, 'WhereToBuy')(WhereToBuyCleanBase);

export const asWhereToBuyToken = asCxTokenSpec<WhereToBuyComponents>();

export default WhereToBuyClean;
