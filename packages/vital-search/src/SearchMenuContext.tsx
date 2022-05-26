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

import React, {
  createContext, useContext, useState,
} from 'react';
import uniqueId from 'lodash/uniqueId';
import { HOC } from '@bodiless/fclasses';

/**
 * Type of a Burger Menu Context.
 */
type SearchMenuContextValue = {
  isVisible: boolean
  toggle: () => void
  togglerId: string
};

const SearchMenuContext = createContext<SearchMenuContextValue>({
  isVisible: false,
  toggle: () => undefined,
  togglerId: '',
});

const useSearchMenuContext = () => useContext(SearchMenuContext);

const withSearchMenuProvider: HOC = Component => props => {
  const [isVisible, setIsVisible] = useState(false);
  const [togglerId] = useState(() => uniqueId('search-menu-toggler-'));

  const toggle = () => {
    setIsVisible(visible => !visible);
  };

  return (
    <SearchMenuContext.Provider value={{ isVisible, toggle, togglerId }}>
      <Component {...props} />
    </SearchMenuContext.Provider>
  );
};

const useIsSearchMenuVisible = () => useSearchMenuContext().isVisible;

const useIsSearchMenuHidden = () => !useSearchMenuContext().isVisible;

export {
  SearchMenuContext,
  withSearchMenuProvider,
  useSearchMenuContext,
  useIsSearchMenuVisible,
  useIsSearchMenuHidden,
};
