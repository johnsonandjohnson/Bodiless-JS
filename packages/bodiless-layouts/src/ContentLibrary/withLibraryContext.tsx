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

import React, {
  FC, useState, createContext, useContext, PropsWithChildren,
} from 'react';
import { HOC } from '@bodiless/fclasses';

import type { FlowContainerItem } from '../FlowContainer/types';

/**
 * Default Prefix for the Library Item Flow Container Item type.
 */
export const CONTENT_LIBRARY_TYPE_PREFIX = 'ContentLibrary';

/**
 * Check if the current Flow Container Item is Library Item
 *
 * @param item FlowContainerItem
 * @return boolean
 */
export const isLibraryItem = (item: FlowContainerItem) => (
  item && item.type.startsWith(CONTENT_LIBRARY_TYPE_PREFIX));

/**
 * Flow Container Library Item Provider Props.
 */
export type LibraryItemProviderProps = {
  isLibrary: boolean,
};

/**
 * Flow Container Library Item Context Props where `isLibraryItem` defaults to `true`
 * if FlowContainerItem is actually a Library Item.
 */
export type LibraryItemContextProps = {
  isLibraryItem: boolean,
  setIsLibraryItem: React.Dispatch<React.SetStateAction<boolean>>,
};

/**
 * Flow Container Library Item Context.
 * @see LibraryItemContextProps
 */
export const LibraryItemContext = createContext<LibraryItemContextProps>({
  isLibraryItem: false,
  setIsLibraryItem: () => null,
});

/**
 * Hook that can be used to access the Flow Container Library Item Context.
 * Component must be within a `LibraryItemProvider`.
 * @see LibraryItemContextProps
 */
export const useLibraryItemContext = () => useContext(LibraryItemContext);

/**
 * Hook to check if the current Flow Container Item is Library Item
 * Must only be used on `FlowContainerItem`.
 * @return boolean
 */
export const useIsLibraryItem = () => useLibraryItemContext().isLibraryItem;

/**
 * A `LibraryItemProvider` indicates whether the current Flow Container Item is a Library Item.
 * @see LibraryItemProviderProps.
 */
export const LibraryItemProvider: FC<PropsWithChildren<LibraryItemProviderProps>> = (
  { isLibrary, children }
) => {
  const [isLibraryItem, setIsLibraryItem] = useState(isLibrary);

  return (
    <LibraryItemContext.Provider value={{ isLibraryItem, setIsLibraryItem }}>
      {children}
    </LibraryItemContext.Provider>
  );
};

/**
 * HOC that wraps component in LibraryItemProvider.
 * When wrapped in `LibraryItemProvider`, it checks whether FlowContainerItem
 * is actually a Library Item by checking its `FlowContainerItem.type` prefix.
 * @see LibraryItemContextProps
 */
export const withLibraryItemContext: HOC<any> = Component => props => (
  // eslint-disable-next-line react/destructuring-assignment
  <LibraryItemProvider isLibrary={isLibraryItem(props.flowContainerItem)}>
    <Component {...props} />
  </LibraryItemProvider>
);
