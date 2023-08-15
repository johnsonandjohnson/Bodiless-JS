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

import React, {
  FC,
  PropsWithChildren,
  useContext,
} from 'react';
import type {
  PageDataContextProps,
  PageDataContextProviderProps,
} from '../types';

const defaultPageData: PageDataContextProps = {
  pagePath: '/',
  subPageTemplate: '_default',
  template: '_default',
};

const PageDataContext = React.createContext<PageDataContextProps>(defaultPageData);

const PageDataProvider: FC<PropsWithChildren<PageDataContextProviderProps>> = ({
  children,
  pageData,
}) => (
  <PageDataContext.Provider value={pageData}>
    {children}
  </PageDataContext.Provider>
);

const usePageDataContext = () => useContext(PageDataContext);

export {
  PageDataProvider,
  PageDataContext,
  usePageDataContext,
};
