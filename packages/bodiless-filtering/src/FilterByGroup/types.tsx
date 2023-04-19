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

import { ComponentType, HTMLProps } from 'react';
import { TagType as BaseTagType } from '@bodiless/core';
import { WithNodeProps, ContentNode } from '@bodiless/data';
import { StylableProps, DesignableComponentsProps, DesignableProps } from '@bodiless/fclasses';
import { ListProps } from '@bodiless/components';

export type TagType = Omit<BaseTagType, 'id'> & {
  id: string,
  isEqual: (tag: TagType) => boolean,
  categoryId: string,
};

export type FilterByGroupComponents = {
  Wrapper: ComponentType<any>,
  FilterWrapper: ComponentType<any>,
  FilterHeader: ComponentType<any>,
  FilterTitle: ComponentType<any>,
  ContentWrapper: ComponentType<any>,
  ResetButton: ComponentType<any>,
  FilterBody: ComponentType<any>,
  Filter: ComponentType<any>,
  RefineButton: ComponentType<any>,
};

export type FilterComponents = {
  CategoryList: ComponentType<StylableProps & ListProps>,
  TagList: ComponentType<StylableProps & ListProps>,
};

export type TagTitleComponents = {
  FilterGroupItemInput: ComponentType<StylableProps & HTMLProps<HTMLInputElement>>,
  FilterGroupItemLabel: ComponentType<StylableProps & HTMLProps<HTMLLabelElement>>,
  FilterGroupItemPlaceholder: ComponentType<StylableProps & HTMLProps<HTMLLabelElement>>,
  FilterInputWrapper: ComponentType<StylableProps>,
};

export type FilterProps = DesignableProps<FilterComponents> & WithNodeProps;

export type FilterByGroupProps = {
  resetButtonText?: string,
  filterTitle?: string,
} & DesignableProps<FilterByGroupComponents>;

export type TagTitleProps = {
  emptyTitleText?: string,
  onChange?: () => any,
} & DesignableComponentsProps<TagTitleComponents>;

export type NodeTagType = {
  tags: TagType[],
};

export type FilteredItemType<D = any> = {
  id: string,
  isDisplayed?: boolean,
  data: D,
};

export type RegisterItem = (item: FilteredItemType) => void;

export type RegisterItemContextType = {
  registerItem: RegisterItem,
};

export type FBGContextOptions = {
  suggestions?: TagType[],
  items?: FilteredItemType[],
} & Pick<Partial<FBGContextType>, 'multipleAllowedTags'>;

export type SuggestionsRefType = {
  id: string,
  tags: TagType[],
};

export type RegisterSuggestionsProps = {
  registerSuggestions: (tags: TagType[]) => undefined,
};

export type FilterTagType = TagType & {
  categoryId: string,
  categoryName: string,
};

export type DefaultFilterData = {
  tags?: FilterTagType[],
};

/**
 * Type of the context which supports filtering by tags/groups.
 */
export type FBGContextType = {
  /**
   * Returns a list of suggestions for the autocomplete tag field.
   */
  getSuggestions: () => TagType[],
  /**
   * Registers the tags assigned to an item as possible suggestions for the
   * autocomplete tag field.
   */
  useRegisterSuggestions: () => (tags: TagType[]) => void,
  /**
   * Selects the specified tag.  It will be used to filter items.
   */
  selectTag: (tag: FilterTagType, callback?: Function) => void,
  /**
   * Returns the list of selected tags.
   */
  getSelectedTags: () => FilterTagType[],
  /**
   * Unselects the specified tag.  It will no longer be used to filter items.
   */
  unSelectTag: (tag: FilterTagType, callback?: Function) => void,
  /**
   * Tests whether the specified tag is currently selected.
   */
  isTagSelected: (tag: FilterTagType) => boolean,
  /**
   * Set selected tags with given filter tag array.
   */
  updateSelectedTags: (tags: FilterTagType[]) => void,
  /**
   * Return true if filter selection parameters presented in url.
   */
  hasTagFromQueryParams: () => Boolean,
  /**
   * Removes all selected tags.  All filters will be cleared.
   */
  clearSelectedTags: () => void,
  /**
   * Indicates whether or not more than one tag can be selected.
   */
  multipleAllowedTags: boolean,
  /**
   * Returns a list of all registered filterable items. Note that this list
   * will contain all items (even those hidden by the filtering). The `isDisplayed`
   * property on the item indicates whether that item is currently visible.
   */
  getFilteredItems: () => FilteredItemType[],
  /**
   * True when the filters have been fully initialized from query parameters.
   */
  filtersInitialized?: boolean,
};

/**
 * Type of the props expected by a filtereable item.
 */
export type WithFilterByTagsProps = {
  /**
   * The currently selected tags.
   */
  selectedTags: FilterTagType[],
  /**
   * Callback to append data to the item when it registers itself.
   */
  getFilteredItemData?: (node: ContentNode<any>) => any,
  /**
   * Determines whether an item should display itself when no tags are selected.
   */
  showWhenNoTagSelected?: boolean,
};
