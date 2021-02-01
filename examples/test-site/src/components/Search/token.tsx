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
import {
  I,
  addClasses,
  withDesign,
  addClassesIf,
} from '@bodiless/fclasses';
import { asPageContainer, asDesktopOnly, asTextWhite } from '../Elements.token';

const Icon = flow(
  addClasses('material-icons cursor-pointer align-middle bg-white text-gray-500'),
)(I);

const withIcon = (icon: string) => (Component: ComponentType) => (props: any) => (
  <Component {...props}>
    <Icon>{icon}</Icon>
  </Component>
);

const isEven = (item: number) => item % 2 === 0;
const isOdd = (item: number) => item % 2 === 1;

const searchDesign = {
  SearchWrapper: flow(
    asDesktopOnly,
    addClasses('my-4 border border-black align-middle border-gray-500 relative'),
  ),
  SearchInput: addClasses('px-2 align-middle text-1xl outline-none'),
  SearchButton: withIcon('search'),
  Suggestions: withDesign({
    Wrapper: addClasses('absolute top-full z-50 w-full'),
    Item: withDesign({
      Wrapper: flow(
        addClasses('flex px-2'),
        addClassesIf(({ position }: any) => isEven(position))('bg-white'),
        addClassesIf(({ position }: any) => isOdd(position))('bg-gray-400'),
      ),
      Count: addClasses('ml-auto mr-1'),
    }),
  }),
};

const responsiveSearchDesign = {
  Wrapper: addClasses('h-full'),
  SearchWrapper: flow(asPageContainer, addClasses('absolute w-full p-3 flex z-10 bg-gray-700 inset-x-0')),
  SearchInput: addClasses('align-middle w-full p-2'),
  ToggleButton: asTextWhite,
  SearchButton: flow(
    withIcon('search'),
    addClasses('flex absolute right-0 self-center mr-4'),
  ),
  Suggestions: withDesign({
    Wrapper: addClasses('absolute top-full z-50 w-full'),
    Item: withDesign({
      Wrapper: flow(
        addClasses('flex px-2'),
        addClassesIf(({ position }: any) => isEven(position))('bg-white'),
        addClassesIf(({ position }: any) => isOdd(position))('bg-gray-400'),
      ),
      Count: addClasses('ml-auto mr-1'),
    }),
  }),
};

const searchInlineDesign = {
  SearchWrapper: addClasses('inline-block border border-black align-middle border-gray-500 relative'),
  SearchInput: addClasses('px-2 align-middle text-1xl outline-none'),
  SearchButton: withIcon('search'),
  Suggestions: withDesign({
    Wrapper: addClasses('absolute top-full z-50 w-full'),
    Item: withDesign({
      Wrapper: flow(
        addClasses('flex px-2'),
        addClassesIf(({ position }: any) => isEven(position))('bg-white'),
        addClassesIf(({ position }: any) => isOdd(position))('bg-gray-400'),
      ),
      Count: addClasses('ml-auto mr-1'),
    }),
  }),
};

const asSimpleSearch = withDesign(searchDesign);
const asInlineSearch = withDesign(searchInlineDesign);
const asResponsiveSearch = withDesign(responsiveSearchDesign);

const searchResultDesign = {
  SearchResultWrapper: addClasses('py-2'),
  SearchResultList: addClasses('py-2'),
  SearchResultSummary: addClasses('text-sm italic'),
  SearchResultListItem: withDesign({
    ItemAnchor: addClasses('my-4 text-blue-500 underline'),
    ItemParagraph: addClasses('text-sm'),
    ItemList: addClasses('my-4'),
  }),
};

const asSimpleSearchResult = withDesign(searchResultDesign);

export {
  asSimpleSearch,
  asInlineSearch,
  asSimpleSearchResult,
  asResponsiveSearch,
};
