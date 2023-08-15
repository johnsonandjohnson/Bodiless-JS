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

import {
  on,
  addProps,
  Fragment,
  replaceWith,
  as,
} from '@bodiless/fclasses';
import { asGenericTemplateToken, vitalGenericTemplate } from '@bodiless/vital-templates';
import { SearchLayoutClean, vitalSearchLayout } from '../../SearchLayout';

const Search = asGenericTemplateToken({
  ...vitalGenericTemplate.Generic,
  Meta: {
    title: 'Search',
  },
  Components: {
    ...vitalGenericTemplate.Generic.Components,
    Breadcrumb: as(vitalGenericTemplate.Generic.Components.Breadcrumb, addProps({ children: 'Search', })),
    TopContent: replaceWith(Fragment),
    Content: on(SearchLayoutClean)(vitalSearchLayout.Default),
    BottomContent: replaceWith(Fragment),
  }
});

export default {
  Search,
};
