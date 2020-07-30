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

import React, { useContext } from 'react';

type GatsbyStoreContextProps = {
  hasError: () => boolean;
};

const GatsbyStoreContext = React.createContext<GatsbyStoreContextProps>({
  hasError: () => false,
});

const GatsbyStoreProvider: React.FC<GatsbyStoreContextProps> = ({ children, hasError }) => {
  const contextValue = {
    hasError,
  };
  return <GatsbyStoreContext.Provider value={contextValue}>{children}</GatsbyStoreContext.Provider>;
};

const useGatsbyStoreProvider = () => useContext(GatsbyStoreContext);

export default GatsbyStoreProvider;
export { useGatsbyStoreProvider };
