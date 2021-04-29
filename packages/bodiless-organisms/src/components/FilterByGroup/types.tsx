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
import { TagType, WithNodeProps } from '@bodiless/core';
import { StylableProps, DesignableComponentsProps, DesignableProps } from '@bodiless/fclasses';
import { ListProps } from '@bodiless/components';

export type FilterByGroupComponents = {
  Wrapper: ComponentType<any>,
  FilterWrapper: ComponentType<any>,
  FilterHeader: ComponentType<any>,
  FilterTitle: ComponentType<any>,
  ContentWrapper: ComponentType<any>,
  ResetButton: ComponentType<any>,
  Filter: ComponentType<any>,
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
} & DesignableComponentsProps<TagTitleComponents>;

export type NodeTagType = {
  tags: TagType[],
};

export type FBGContextOptions = {
  suggestions?: TagType[],
};

export type SuggestionsRefType = {
  id: string,
  tags: TagType[],
};

export type RegisterSuggestionsProps = {
  registerSuggestions: (tags: TagType[]) => undefined,
};

export type FBGContextType = {
  getSuggestions: () => TagType[],
  useRegisterSuggestions: () => (tags: TagType[]) => void,
  setSelectedTag: (tag?: TagType) => void,
  setSelectedNode: (nodeId?: string) => void,
  selectedTag?: TagType,
  selectedNode?: string,
};
