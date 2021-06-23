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

import FilterByGroupClean from './FilterByGroupClean';
import { TestableFilterByGroup, asTestableFilterByGroup } from './FilterByGroupTestable';
import {
  useFilterByGroupContext,
  useIsFilterTagSelected,
  withFBGSuggestions,
  withTagProps,
} from './FilterByGroupContext';
import asFilterableByGroup from './asFilterableByGroup';
import { Tag } from './FilterByGroupStore';
import type { FilterByGroupComponents, TagType } from './types';
import { asResponsiveFilter } from './Filter';
import withFilterByTags from './withFilterByTags';

export {
  FilterByGroupClean,
  TestableFilterByGroup,
  asTestableFilterByGroup,
  asFilterableByGroup,
  withFBGSuggestions,
  useFilterByGroupContext,
  useIsFilterTagSelected,
  withTagProps,
  Tag,
  asResponsiveFilter,
  withFilterByTags,
};

export type {
  FilterByGroupComponents,
  TagType,
};

export * from './token';
