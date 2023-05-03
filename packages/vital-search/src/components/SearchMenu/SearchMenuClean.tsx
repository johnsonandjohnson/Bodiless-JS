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
import { Div, designable, HOC } from '@bodiless/fclasses';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { SearchBoxClean } from '../SearchBox';
import { useSearchMenuContext } from '../../SearchMenuContext';
import { SearchMenuComponents, SearchMenuProps } from './types';

const searchComponents: SearchMenuComponents = {
  Wrapper: Div,
  Search: SearchBoxClean,
};

const SearchBase: FC<SearchMenuProps> = ({ components: C }) => (
  <C.Wrapper>
    <C.Search />
  </C.Wrapper>
);

/**
 * Adds the necessary ARIA props to the given Component so it behaves
 * like a search menu wrapper in the accessibility tree.
 *
 * This toggled by a search menu wrapper. See {@link asSearchMenuToggler}.
 *
 * This HOC needs to be inside a SearchMenuContext to work. The
 * `vitalLayout.Default` token provides this context by default.
 */
export const asSearchMenuWrapper: HOC = Component => {
  const AsSearchMenuWrapper: FC<any> = props => {
    const { togglerId } = useSearchMenuContext();

    return (
      <Component
        role="region"
        aria-labelledby={togglerId}
        {...props}
      />
    );
  };

  return AsSearchMenuWrapper;
};

const SearchMenuClean = designable(searchComponents, 'SearchMenu')(SearchBase);

/**
 * Create a desktop search token.
 */
export const asSearchMenuToken = asVitalTokenSpec<SearchMenuComponents>();

export default SearchMenuClean;
