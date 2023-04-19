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
  ComponentType,
} from 'react';
import { useNode } from '@bodiless/data';
import { DEFAULT_NODE_KEYS } from './MenuTitles';

type SubmenuContextType = {
  hasSubmenu: boolean,
  menuItemId: string,
  menuItemTitle: string,
};

type SubmenuProviderType = {
  hasSubmenu: boolean,
  menuItemId: string,
  menuItemTitle: string,
};

const SubmenuContext = createContext<SubmenuContextType>({
  hasSubmenu: false,
  menuItemId: '',
  menuItemTitle: '',
});

const useSubmenuContext = () => useContext(SubmenuContext);

const SubmenuProvider: FC<SubmenuProviderType> = ({
  children, hasSubmenu, menuItemId, menuItemTitle,
}) => (
  <SubmenuContext.Provider value={{ hasSubmenu, menuItemId, menuItemTitle }}>
    { children }
  </SubmenuContext.Provider>
);

/**
 * HOC that wrapps component in SubmenuProvider.
 * It stores `hasSubmenu` and `isSubmenuOpen` values along with `setIsSubmenuOpen` setter.
 */
const withSubmenuContext = <P extends Object>(
  Component: ComponentType<P> | string,
) => (props: P) => {
    // Generate Random Menu Item ID for submenu linking purposes.
    const menuItemId = `menu-item-${Math.random().toString(36).slice(-6)}`;

    const { node } = useNode();
    const parentNode = node.peer(node.path.slice(0, node.path.length - 1));
    const menuItemTextNode = parentNode.child<{ text: string }>(DEFAULT_NODE_KEYS.titleNodeKey);
    const menuItemText = menuItemTextNode.data.text;

    return (
      <SubmenuProvider hasSubmenu menuItemId={menuItemId} menuItemTitle={menuItemText}>
        <Component label={menuItemId} {...props} />
      </SubmenuProvider>
    );
  };

export {
  withSubmenuContext,
  useSubmenuContext,
};
