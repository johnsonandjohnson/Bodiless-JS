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

import { ComponentType } from 'react';
import { ifToggledOn, ifToggledOff, withFlowToggle } from '@bodiless/core';
import { usePageDimensionsContext } from './PageDimensionsProvider';

const useResponsiveToggle = (sizes: string[] | string) => () => {
  const { size } = usePageDimensionsContext();
  return Array.isArray(sizes) ? sizes.includes(size) : sizes === size;
};

const useRehydrationToggle = () => typeof window !== 'undefined';

const ifViewportIs = (sizes: string[] | string) => ifToggledOn(useResponsiveToggle(sizes));
const ifViewportIsNot = (sizes: string[] | string) => ifToggledOff(useResponsiveToggle(sizes));

const ifHydrated = ifToggledOn(useRehydrationToggle);
const ifNotHydrated = ifToggledOff(useRehydrationToggle);

const withRehydrationPlaceholder = <P extends object>(
  Placeholder: ComponentType<P>,
) => (Component: ComponentType<P>) => withFlowToggle(useRehydrationToggle)(Placeholder, Component);

export {
  ifHydrated,
  ifNotHydrated,
  ifViewportIs,
  ifViewportIsNot,
  withRehydrationPlaceholder,
};
