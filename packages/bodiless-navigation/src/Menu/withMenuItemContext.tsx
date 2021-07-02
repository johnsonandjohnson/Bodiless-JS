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

type SubmenuContextType = {
  hasSubmenu: boolean,
};

type SubmenuProviderType = {
  hasSubmenu: boolean,
};

const SubmenuContext = createContext<SubmenuContextType>({
  hasSubmenu: false,
});

const useSubmenuContext = () => useContext(SubmenuContext);

const SubmenuProvider: FC<SubmenuProviderType> = ({ children, hasSubmenu }) => (
  <SubmenuContext.Provider value={{ hasSubmenu }}>
    { children }
  </SubmenuContext.Provider>
);

/**
 * HOC that wrapps component in SubmenuProvider.
 * It stores `hasSubmenu` and `isSubmenuOpen` values along with `setIsSubmenuOpen` setter.
 */
const withSubmenuContext = <P extends Object>(
  Component: ComponentType<P> | string,
) => (props: P) => (
  <SubmenuProvider hasSubmenu>
    <Component {...props} />
  </SubmenuProvider>
  );

export {
  withSubmenuContext,
  useSubmenuContext,
};
