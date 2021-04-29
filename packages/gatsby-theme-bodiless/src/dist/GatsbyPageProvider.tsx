/**
 * Copyright © 2019 Johnson & Johnson
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

import React, { FC, useContext } from 'react';

export type GatsbyPage = {
  slug: string,
  subPageTemplate: string,
  template: string,
};

const defaultGatsbyPage = {
  slug: '/',
  subPageTemplate: '_default',
  template: '_default',
};

export type PageProviderProps = {
  pageContext: GatsbyPage,
};

const GatsbyPageContext = React.createContext<GatsbyPage>(defaultGatsbyPage);

const GatsbyPageProvider: FC<PageProviderProps> = ({ children, pageContext }) => (
  <GatsbyPageContext.Provider value={pageContext}>
    {children}
  </GatsbyPageContext.Provider>
);

export const useGatsbyPageContext = () => useContext(GatsbyPageContext);
export default GatsbyPageProvider;
