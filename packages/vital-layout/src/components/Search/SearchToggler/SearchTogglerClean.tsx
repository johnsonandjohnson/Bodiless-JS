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

import { Div, designable } from '@bodiless/fclasses';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { SearchTogglerComponents, SearchTogglerProps } from './types';
import SearchIcon from '../assets/SearchIcon';

const searchTogglerComponents: SearchTogglerComponents = {
  Wrapper: Div,
  Icon: SearchIcon,
};

const SearchTogglerBase: FC<SearchTogglerProps> = ({ components: C }) => (
  <C.Wrapper>
    <C.Icon />
  </C.Wrapper>
);

/**
 * Create a search toggler token.
 */
const asSearchTogglerToken = asVitalTokenSpec<SearchTogglerComponents>();

const SearchTogglerClean = designable(searchTogglerComponents, 'SearchToggler')(SearchTogglerBase);

export {
  SearchTogglerClean,
  asSearchTogglerToken
};
