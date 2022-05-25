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

import { addProps, as } from '@bodiless/fclasses';
import { vitalTypography } from '@bodiless/vital-elements';
// import { withSearchDataLayer } from '@bodiless/vital-gtm';
import { asSearchLayoutToken } from '../SearchLayoutClean';
import { vitalSearchResults } from '../../SearchResults';

const DefaultSearchLayout = asSearchLayoutToken({
  // @todo uncomment after implementing gtm package
  // Behavior: {
  //   Box: as(withSearchDataLayer),
  // },
  Components: {
    Result: as(vitalSearchResults.Default),
  },
  Theme: {
    Header: vitalTypography.H1,
  },
  Content: {
    Header: addProps({ children: 'Search Results' }),
  },
});

export default {
  Default: DefaultSearchLayout,
};
