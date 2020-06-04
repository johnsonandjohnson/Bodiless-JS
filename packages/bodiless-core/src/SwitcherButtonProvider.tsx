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
import PageContextProvider from './PageContextProvider';
import { useEditContext } from './hooks';

/**
 * Provide a component Button to switch the position of the global menu.
 *
 * @param children
 * @constructor
 */
const SwitcherButtonProvider: FC = ({ children }) => {
  const context = useEditContext();
  const getMenuOptions = () => [{
    name: 'switcher',
    icon: 'compare_arrows',
    handler: () => {
      context.togglePosition();
      context.refresh();
    },
  }];
  return (
    <PageContextProvider getMenuOptions={getMenuOptions}>
      {children}
    </PageContextProvider>
  );
};

export default SwitcherButtonProvider;
