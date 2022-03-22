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

import { Div, designable, Span } from '@bodiless/fclasses';
import { asCxTokenSpec } from '@bodiless/cx-elements';
import { MenuTogglerComponents, MenuTogglerProps } from './types';

const menuTogglerComponents: MenuTogglerComponents = {
  Wrapper: Div,
  Icon: Span,
};

const MenuTogglerBase: FC<MenuTogglerProps> = ({ components: C, ...rest }) => (
  <C.Wrapper {...rest}>
    <C.Icon />
  </C.Wrapper>
);

/**
 * Creates a menu toggler token.
 */
export const asMenuTogglerToken = asCxTokenSpec<MenuTogglerComponents>();

const MenuTogglerClean = designable(menuTogglerComponents, 'MenuToggler')(MenuTogglerBase);

export default MenuTogglerClean;
