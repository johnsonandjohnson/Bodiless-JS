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

import React, { FC } from 'react';
import type { Props as PageContextProviderProps } from '../../src/Types/PageContextProviderTypes';
import type { PageEditContextInterface, DefinesLocalEditContext } from '../../src/PageEditContext/types';
import { useEditContext } from '../../src/hooks';
import PageEditContext from '../../src/PageEditContext';

interface PageEditContextClass {
  new (values: DefinesLocalEditContext, parent: PageEditContextInterface): PageEditContextInterface;
}

const mockContextProvider = (Class: PageEditContextClass) => {
  const MockContextProvider: FC<PageContextProviderProps> = ({ children }) => {
    const context = useEditContext();
    const newContext: PageEditContextInterface = new Class({
      getMenuOptions: () => [],
      name: 'mock',
      id: 'mock',
    }, context);
    newContext.spawn = (v: DefinesLocalEditContext) => new Class(v, newContext);
    return (
      <PageEditContext.Provider value={newContext}>
        {children}
      </PageEditContext.Provider>
    );
  };
  return MockContextProvider;
};

export class AlwaysActive extends PageEditContext {
  // eslint-disable-next-line class-methods-use-this
  get isActive() { return true; }
}

export default mockContextProvider;
