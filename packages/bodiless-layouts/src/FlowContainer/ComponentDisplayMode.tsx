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

import React, { useContext, ComponentType } from 'react';
import { flowIf } from '@bodiless/fclasses';
import negate from 'lodash/negate';

enum ComponentDisplayMode {
  ComponentSelector = 1,
  EditFlowContainer = 2,
  StaticFlowContainer = 3,
}

const defaultMode = ComponentDisplayMode.StaticFlowContainer;

const ComponentDisplayModeContext = React.createContext({
  mode: defaultMode,
});

const useComponentDisplayModeContext = () => useContext(ComponentDisplayModeContext);

type Props = {
  mode: ComponentDisplayMode,
};

const ComponentDisplayModeProvider: ComponentType<Props> = ({ children, mode = defaultMode }) => {
  const contextValue = { mode };
  return (
    <ComponentDisplayModeContext.Provider value={contextValue}>
      {children}
    </ComponentDisplayModeContext.Provider>
  );
};

// eslint-disable-next-line max-len
const isComponentSelector = () => useComponentDisplayModeContext().mode === ComponentDisplayMode.ComponentSelector;
const isNotComponentSelector = negate(isComponentSelector);

const ifComponentSelector = flowIf(isComponentSelector);
const ifNotComponentSelector = flowIf(isNotComponentSelector);

export {
  ComponentDisplayMode,
  ComponentDisplayModeProvider,
  useComponentDisplayModeContext,
  ifComponentSelector,
  ifNotComponentSelector,
};
