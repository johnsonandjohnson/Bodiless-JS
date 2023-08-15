/**
 * Copyright © 2022 Johnson & Johnson
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

import { withChild } from '@bodiless/core';
import { as } from '@bodiless/fclasses';
import { vitalColor, vitalSpacing } from '@bodiless/vital-elements';
import { asSearchBoxToken } from '../SearchBoxClean';
import { vitalSearchSuggestions } from '../../SearchSuggestions';
import SearchIcon from '../assets/SearchIcon';

const Default = asSearchBoxToken({
  Theme: {
    SearchWrapper: as(
      vitalColor.BgPrimaryCard,
      vitalColor.BorderSecondarySearch,
      'border'
    ),
    SearchInput: 'focus:outline-none',
  },
  Layout: {
    SearchWrapper: 'relative flex items-center',
    SearchInput: 'flex-grow',
    SearchButton: 'flex items-center',
  },
  Spacing: {
    SearchInput: 'px-2',
    SearchButton: 'mx-1',
  },
  Components: {
    SearchButton: withChild(SearchIcon),
    Suggestions: as(vitalSearchSuggestions.Default),
  },
});

const Mobile = asSearchBoxToken({
  ...Default,
  Spacing: {
    SearchWrapper: vitalSpacing.WithSiteMargin,
    SearchInput: 'p-2',
    SearchButton: 'mx-2'
  },
});

const Inline = asSearchBoxToken({
  ...Default,
  Theme: {
    SearchInput: as(vitalColor.BorderSecondarySearch, 'outline-none border'),
  },
  Layout: {
    SearchWrapper: 'flex relative lg:w-1/2',
    SearchInput: 'flex-grow',
  },
  Spacing: {
    SearchInput: 'mr-2 my-2 px-2 py-1',
  },
});

export default {
  Default,
  Mobile,
  Inline,
};
