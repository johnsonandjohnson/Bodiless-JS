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

import React, { ComponentType } from 'react';
import { PageContextProvider, useEditContext, useUUID } from '@bodiless/core';

/**
 * HOC that wrapps component in PageContextProvider with type="menu" and unique id.
 * Used by useIsMenuOpen() to determine if menu context is active.
 */
const withMenuContext = <P extends Object>(
  Component: ComponentType<P> | string,
) => (props: P) => (
  <PageContextProvider type="menu" name={`menu-${useUUID()}`} id={`menu-${useUUID()}`}>
    <Component {...props} />
  </PageContextProvider>
  );

/**
 * Hook which can be used to determine if any of submenus are open and have it's context activated.
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
  useIsMenuOpen,
};
