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
  FC,
  createContext,
  useContext,
  useState,
  ComponentType,
} from 'react';
import { PageContextProvider, useEditContext, useUUID } from '@bodiless/core';

type MenuContextType = {
  activeSubmenu?: string,
  setActiveSubmenu: (id?: string) => void,
};

const MenuContext = createContext<MenuContextType>({
  activeSubmenu: undefined,
  setActiveSubmenu: () => null,
});

/**
 * Hook which can be used to get a current active submenu ID
 * and a setter to set active submenu.
 */
const useMenuContext = () => useContext(MenuContext);

const MenuContextProvider: FC = ({ children }) => {
  const [activeSubmenu, setActiveSubmenu] = useState<string>();

  return (
    <MenuContext.Provider value={{ activeSubmenu, setActiveSubmenu }}>
      { children }
    </MenuContext.Provider>
  );
};

/**
 * HOC that wrapps component in MenuContextProvider.
 * It stores `activeSubmenu` along with `setActiveSubmenu` setter.
 * Note that `activeSubmenu` is a string and corresponds to the top menu item node id.
 */
const withMenuContext = <P extends Object>(
  Component: ComponentType<P> | string,
) => (props: P) => (
  <MenuContextProvider>
    <Component {...props} />
  </MenuContextProvider>
  );

/**
 * HOC that wrapps component in PageContextProvider with type="menu" and unique id.
 * Used by useIsMenuOpen() to determine if menu context is active.
 */
const withMenuEditContext = <P extends Object>(
  Component: ComponentType<P> | string,
) => (props: P) => (
  <PageContextProvider type="menu" name={`menu-${useUUID()}`} id={`menu-${useUUID()}`}>
    <Component {...props} />
  </PageContextProvider>
  );

/**
 * Hook which can be used to determine if menu context is activated.
 *
 * @return true if context for any of Items is active, false otherwise.
 */
const useIsMenuOpen = () => {
  // Move up the context tree to see if we find an active menu context.
  for (let context = useEditContext(); context; context = context.parent!) {
    if (context.isEdit && context.type === 'menu' && context.isActive) return true;
  }

  return false;
};

export default withMenuContext;
export {
  withMenuEditContext,
  useIsMenuOpen,
  useMenuContext,
};
