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

/* eslint-disable react/jsx-pascal-case */
import React, { FC, Fragment } from 'react';
import { designable, Div, H1 } from '@bodiless/fclasses';
import { SearchResult as SearchResultClean } from '@bodiless/search';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { SearchLayoutComponents, SearchLayoutProps } from './types';

const searchLayoutComponents: SearchLayoutComponents = {
  Wrapper: Div,
  Header: H1,
  Result: SearchResultClean,
  Suggestions: Fragment,
};

const SearchLayoutBase: FC<SearchLayoutProps> = ({
  components: C,
  ...rest
}) => (
  <C.Wrapper {...rest}>
    <C.Header {...rest} />
    <C.Result {...rest} />
    <C.Suggestions {...rest} />
  </C.Wrapper>
);

const SearchLayoutClean = designable(searchLayoutComponents, 'Search Layout')(SearchLayoutBase);

export const asSearchLayoutToken = asVitalTokenSpec<SearchLayoutComponents>();

export default SearchLayoutClean;
