/**
 * Copyright © 2021 Johnson & Johnson
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

import React, { createContext, ComponentType, useContext } from 'react';

type FClassesContextType = {
  showDesignKeys?: boolean,
  designKeysAttributeName?: string;
};

const FClassesContext = createContext<FClassesContextType>({});
FClassesContext.displayName = 'DesignKeys';

/**
 * Enable or disable printing of design keys in markup for a component and
 * all children. When enabled, the design key of the component which renders
 * an HTML element will be shown in the markup as an attribute.
 *
 * @param showDesignKeys
 * Whether or not to show the design keys in the markup.
 *
 * @param designKeysAttributeName
 * The name of the data attribute to use to show the design keys.
 * Defualt is bl-design-key`.
 *
 * @category Design API
 */
export const withShowDesignKeys = (
  showDesignKeys = true,
  designKeysAttributeName = 'bl-design-key',
) => <P extends object>(C: ComponentType<P>) => (props: P) => {
  const {
    showDesignKeys: showKeys = undefined,
    designKeysAttributeName: keysAttribute = undefined,
  } = useContext(FClassesContext);
  // Here we apply new value only if it's empty in context or reuse the previous one
  const value = {
    ...(
      showKeys !== undefined
        ? { showDesignKeys: showKeys }
        : { showDesignKeys }
    ),
    ...(
      keysAttribute !== undefined
        ? { designKeysAttributeName: keysAttribute }
        : { designKeysAttributeName }
    ),
  };

  return (
    <FClassesContext.Provider value={value}>
      <C {...props} />
    </FClassesContext.Provider>
  );
};

/**
 * @hidden
 * Hook which can be used to determine whether or not design keys should be printed.
 */
export const useShowDesignKeys = () => Boolean(
  useContext(FClassesContext).showDesignKeys,
);

/**
 * @hidden
 * Hook which can be used to retrieve the design key attribute name.
 */
export const useDesignKeysAttribute = () => useContext(FClassesContext).designKeysAttributeName;
