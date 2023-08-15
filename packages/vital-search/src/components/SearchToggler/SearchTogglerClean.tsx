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

import React, { FC, useCallback } from 'react';
import { Div, designable, HOC } from '@bodiless/fclasses';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { SearchTogglerComponents, SearchTogglerProps } from './types';
import SearchIcon from '../../assets/SearchIcon';
import { useSearchMenuContext } from '../../SearchMenuContext';

const searchTogglerComponents: SearchTogglerComponents = {
  Wrapper: Div,
  Icon: SearchIcon,
};

const SearchTogglerBase: FC<SearchTogglerProps> = ({ components: C, ...props }) => (
  <C.Wrapper {...props}>
    <C.Icon />
  </C.Wrapper>
);

/**
 * Adds the necessary behavior and ARIA props to the given Component
 * so it behaves like a search menu toggler.
 *
 * This toggles a search menu wrapper. See {@link asSearchMenuWrapper}.
 *
 * This HOC needs to be inside a SearchMenuContext to work. The
 * `vitalLayout.Default` token provides this context by default.
 */
export const asSearchMenuToggler: HOC = Component => {
  const AsSearchMenuToggler: FC<any> = props => {
    const { isVisible, toggle, togglerId } = useSearchMenuContext();
    const { onClick, ...rest } = props;

    const handleOnClick = useCallback(() => {
      if (onClick && typeof onClick === 'function') onClick();
      toggle();
    }, [onClick]);

    const handleOnKeyPress = useCallback((event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleOnClick();
      }
    }, [handleOnClick]);

    return (
      <Component
        id={togglerId}
        onClick={handleOnClick}
        tabIndex="0"
        role="button"
        onKeyPress={handleOnKeyPress}
        aria-expanded={!!isVisible}
        aria-label="Toggle search"
        {...rest}
      />
    );
  };

  return AsSearchMenuToggler;
};

const SearchTogglerClean = designable(searchTogglerComponents, 'SearchToggler')(SearchTogglerBase);

/**
 * Create a search toggler token.
 */
export const asSearchTogglerToken = asVitalTokenSpec<SearchTogglerComponents>();

export default SearchTogglerClean;
