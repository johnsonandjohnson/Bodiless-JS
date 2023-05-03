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
import { vitalColor } from '@bodiless/vital-elements';
import { addSearchDataLayerSuggestion } from '@bodiless/ga4';
import { vitalSearchSuggestion } from '../../SearchSuggestion';
import { asSearchSuggestionsToken } from '../SearchSuggestionsClean';

const Default = asSearchSuggestionsToken({
  Behavior: {
    _: addSearchDataLayerSuggestion,
  },
  Theme: {
    Wrapper: as(
      vitalColor.BgPrimaryCard,
      vitalColor.BorderSecondarySearch,
      'border',
    ),
    ItemWrapper: 'even:bg-search-suggestion-row hover:bg-search-suggestion-hover',
  },
  Layout: {
    Wrapper: 'absolute top-full z-50 w-full',
  },
  Components: {
    Item: as(vitalSearchSuggestion.Default),
  },
});

export default {
  Default,
};
