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

import { as } from '@bodiless/fclasses';
// import { GTMDataLayerSearchResultHelmet } from '@bodiless/vital-gtm';
import {
  asSearchResultListItemToken,
  asSearchResultToken,
} from './ResultClean';

const DefaultSearchResultListItem = asSearchResultListItemToken({
  Theme: {
    ItemH3: 'text-xl',
    ItemAnchor: 'font-bold',
    ItemParagraph: 'text-base',
  },
  Spacing: {
    ItemList: 'mb-9',
    ItemH3: 'mb-5',
  },
});

const vitalSearchResultListItem = {
  Default: DefaultSearchResultListItem,
};

const DefaultSearchResult = asSearchResultToken({
  Components: {
    SearchResultListItem: as(vitalSearchResultListItem.Default),
    // @todo uncomment after implementing gtm package
    // SearchHelmet: startWith(GTMDataLayerSearchResultHelmet),
  },
  Theme: {
    SearchResultSummary: 'capitalize',
  },
  Spacing: {
    SearchResultSummary: 'mb-3'
  },
});

const vitalSearchResult = {
  Default: DefaultSearchResult,
};

export {
  vitalSearchResult,
  vitalSearchResultListItem
};
