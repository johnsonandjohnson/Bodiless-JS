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

/* eslint-disable react/jsx-indent */
import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useMemo,
  createContext,
  FC,
  PropsWithChildren,
} from 'react';
import { v1 } from 'uuid';
import uniqBy from 'lodash/uniqBy';
import { Injector, Enhancer } from '@bodiless/fclasses';
import {
  FBGContextOptions,
  SuggestionsRefType,
  FBGContextType,
  TagType,
  FilteredItemType,
  RegisterItemContextType,
} from './types';
import { useTagsAccessors } from './FilterModel';
import { useFilterByGroupStore } from './FilterByGroupStore';
import { TagButtonProps } from '../TagButton';

const RegisterItemContext = React.createContext<RegisterItemContextType>({
  registerItem: () => undefined,
});

/**
 * @private
 * The context which provides access to the current state of the filters.
 */
const FilterByGroupContext = createContext<FBGContextType>({
  getSuggestions: () => [],
  useRegisterSuggestions: () => () => undefined,
  selectTag: () => { },
  getSelectedTags: () => [],
  unSelectTag: () => { },
  isTagSelected: () => false,
  updateSelectedTags: () => { },
  hasTagFromQueryParams: () => false,
  clearSelectedTags: () => { },
  multipleAllowedTags: false,
  getFilteredItems: () => [],
  filtersInitialized: false,
});

/**
 * Hook which provides access to the current state of the filters, an methods
 * for registering tag autocomplete suggestions and selecting/unselecting tags.
 *
 * @returns
 * The current value of the FilterByGroup context.
 */
const useFilterByGroupContext = () => useContext(FilterByGroupContext);

/**
 * Hook which can be used to determine whether the tag is selected or not.
 *
 * @returns
 * Boolean whether the current tag is selected or not.
 */
const useIsFilterTagSelected = () => {
  const { tag } = useTagsAccessors();
  return useFilterByGroupContext().isTagSelected(tag);
};

/**
 * @private
 * Context provider for the FilterByGroup context.
 */
const FilterByGroupProvider: FC<PropsWithChildren<FBGContextOptions>> = ({
  children,
  suggestions,
  multipleAllowedTags,
  items = [],
}) => {
  const {
    selectTag,
    unSelectTag,
    getSelectedTags,
    isTagSelected,
    clearSelectedTags,
    updateSelectedTags,
    hasTagFromQueryParams,
    filtersInitialized,
  } = useFilterByGroupStore({ multipleAllowedTags });

  const refs = useRef<any>([]);

  const getSuggestions = (): TagType[] => {
    const allSuggestions: TagType[] = refs.current.reduce(
      (acc: any, ref: any) => [...acc, ...ref.current.tags],
      suggestions || [],
    );
    return uniqBy(allSuggestions, 'value').sort((a, b) => a.label.localeCompare(b.label));
  };

  const useRegisterSuggestions = () => {
    const newRef = useRef<SuggestionsRefType>({
      id: v1(),
      tags: [] as TagType[],
    });

    if (!refs.current.find((ref: any) => ref.current.id === newRef.current.id)) {
      refs.current.push(newRef);
    }

    return (tags: TagType[]) => {
      newRef.current.tags = [...tags];
    };
  };

  const newValue = {
    getSuggestions,
    useRegisterSuggestions,
    selectTag,
    getSelectedTags,
    unSelectTag,
    isTagSelected,
    multipleAllowedTags: Boolean(multipleAllowedTags),
    clearSelectedTags,
    updateSelectedTags,
    hasTagFromQueryParams,
    getFilteredItems: () => items,
    filtersInitialized,
  };
  return (
    <FilterByGroupContext.Provider value={newValue}>
      {children}
    </FilterByGroupContext.Provider>
  );
};

/**
 * @private
 * Provider for the context which allows filterable items to register themselves.
 */
const FBGRegisterItemsProvider: FC<any> = ({
  children,
  setItems,
}) => {
  const registerItem = (newItem: FilteredItemType) => setItems(
    (oldItems: FilteredItemType[]) => {
      const items = [...oldItems];
      const itemIndex = items.findIndex(x => x.id === newItem.id);

      if (itemIndex === -1) {
        items.push(newItem);
      } else {
        items[itemIndex] = newItem;
      }

      return items;
    },
  );

  const contextValue = useMemo(() => ({ registerItem }), [setItems]);

  return (
    <RegisterItemContext.Provider value={contextValue}>
      {children}
    </RegisterItemContext.Provider>
  );
};

/**
 * HOC which provides the context necessary to enable filtering by groups/tags. Must enclose
 * the filters and all filterable items.
 *
 * @param Component
 * The component to receive the context.
 *
 * @returns
 * A version of the component wrapped in the context.
 */
const withFilterByGroupContext: Enhancer<FBGContextOptions> = Component => props => {
  const { suggestions, multipleAllowedTags, ...rest } = props;
  const [items, setItems] = useState<FilteredItemType[]>([]);

  return (
      <FilterByGroupProvider
        suggestions={suggestions}
        multipleAllowedTags={multipleAllowedTags}
        items={items}
      >
        <FBGRegisterItemsProvider
          setItems={setItems}
          items={items}
        >
          <Component {...rest as any} />
        </FBGRegisterItemsProvider>
      </FilterByGroupProvider>
  );
};

type DefaultTagProps = {
  getSuggestions: () => TagType[],
  registerSuggestions: (tags: TagType[]) => void,
  selectedTags: TagType[],
};

const withTagProps = (
  suggestionOptions?: TagButtonProps,
): Injector<DefaultTagProps> => Component => (props: any) => {
  const {
    getSuggestions,
    useRegisterSuggestions,
    getSelectedTags,
  } = useFilterByGroupContext();
  const registerSuggestions = useRegisterSuggestions();

  const defaultProps: DefaultTagProps = {
    getSuggestions,
    registerSuggestions,
    selectedTags: getSelectedTags(),
  };

  const suggestionProps = Object.assign(defaultProps, suggestionOptions);

  return <Component {...props} {...suggestionProps} />;
};

/**
 * Hook which should be used in a filterable item to register itself on effect.
 *
 * Items register themselves in order to provide a source of truth
 * about which items are visible with the currently selected tags. Items
 * may also attach arbitrary data when they register themselves. This allows
 * for things like pagination, dynamically updated TOC's, etc.
 *
 * Note: an item which uses this *must not* observe the FilterByGroupContext.
 * Doing so will result in a render loop.
 *.
 * @param item
 * The item which which to register itself.
 *
 * @see withFilterByTags
 */
const useRegisterItem = (item: FilteredItemType) => {
  const { id, isDisplayed } = item;
  const { registerItem } = useContext(RegisterItemContext);
  const { filtersInitialized } = useFilterByGroupContext();
  useEffect(
    () => {
      // Only register the item once the filters have been initialized from query params.
      // This avoids registering all items on page load.
      if (filtersInitialized) {
        registerItem(item);
      }
    },
    [registerItem, id, filtersInitialized, isDisplayed],
  );
};

export {
  useFilterByGroupContext,
  withFilterByGroupContext,
  withTagProps,
  useIsFilterTagSelected,
  useRegisterItem,
};
