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
import { flow } from 'lodash';
import React, { ComponentType } from 'react';
import SearchClean, { SearchResult as SearchResultClean } from '@bodiless/search';
import {
  addClasses,
  withDesign,
  stylable,
} from '@bodiless/fclasses';

const Icon = flow(
  addClasses('material-icons cursor-pointer align-middle'),
)(stylable((props: any) => (<i {...props}>{props.children}</i>)));

const withIcon = (icon: string) => (Component: ComponentType) => (props: any) => (
  <Component {...props}>
    <Icon>{icon}</Icon>
  </Component>
);
const withSearchButton = (icon: string) => flow(
  withIcon(icon),
);

const searchDesign = {
  SearchBox: addClasses('px-2 align-middle text-1xl'),
  SearchButton: withSearchButton('search'),
};

const asSimpleSearch = withDesign(searchDesign);

// withPlaceholder

const Search = flow(
  asSimpleSearch,
)(SearchClean);

const searchResultDesign = {
  SearchResultWrapper: addClasses('p-2 border border-red'),
  SearchResultList: addClasses('p-2 border border-blue'),
  SearchResultItem: addClasses('p-2 border border-green'),
};

const asSimpleSearchResult = withDesign(searchResultDesign);

export const SearchResult = flow(
  asSimpleSearchResult,
)(SearchResultClean);

export default Search;
