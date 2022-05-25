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
import { vitalTypography } from '@bodiless/vital-elements';
import { vitalSearchResult } from '../../SearchResult';
// import { GTMDataLayerSearchResultHelmet } from '@bodiless/vital-gtm';
import { asSearchResultsToken } from '../SearchResultsClean';

const Default = asSearchResultsToken({
  Components: {
    SearchResultListItem: as(vitalSearchResult.Default),
    // @todo uncomment after implementing gtm package
    // SearchHelmet: startWith(GTMDataLayerSearchResultHelmet),
  },
  Theme: {
    SearchResultSummary: vitalTypography.Eyebrow,
  },
});

export default {
  Default,
};
