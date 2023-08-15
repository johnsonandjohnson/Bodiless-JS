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

import FilterClean from './Filter';
import FilterByGroupClean from './FilterByGroupClean';
import { TestableFilterByGroup, asTestableFilterByGroup } from './FilterByGroupTestable';
import {
  useFilterByGroupContext,
  useIsFilterTagSelected,
  withTagProps,
  useRegisterItem,
} from './FilterByGroupContext';
import asFilterableByGroup from './asFilterableByGroup';
import { Tag } from './FilterByGroupStore';
import type {
  FilterByGroupComponents,
  FilterComponents,
  TagTitleComponents,
  TagType,
  FilterTagType,
  FilteredItemType,
  DefaultFilterData,
} from './types';
import withFilterByTags from './withFilterByTags';
import withFilterSelection from './withFilterSelection';

export {
  FilterClean,
  FilterByGroupClean,
  TestableFilterByGroup,
  asTestableFilterByGroup,
  asFilterableByGroup,
  useFilterByGroupContext,
  useIsFilterTagSelected,
  withTagProps,
  useRegisterItem,
  Tag,
  withFilterByTags,
  withFilterSelection,
};

export type {
  FilterByGroupComponents,
  FilterComponents,
  TagTitleComponents,
  TagType,
  FilterTagType,
  FilteredItemType,
  DefaultFilterData,
};

export * from './CategoryListContext';
export * from './token';
