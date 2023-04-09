// @ts-nocheck
/*
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

import { on, as } from '@bodiless/fclasses';
import { withLanguages } from '@bodiless/i18n';
import { asFluidToken } from '@bodiless/vital-elements';
import {
  vitalPageBase, vitalPDPTemplate, vitalGenericTemplate, GenericTemplateClean, PDPTemplateClean,
} from '@bodiless/vital-templates';

const Default = asFluidToken(vitalPageBase.Default, {
  Core: {
    _: withLanguages([
      {
        name: 'en',
        label: 'English',
        isDefault: true,
      },
      {
        name: 'es',
        label: 'Español',
      },
    ]),
  },
  // @todo Restore if you want these special templates on your site.
  // Components: {
  //   PDP: on(PDPTemplateClean)(vitalPDPTemplate.Default),
  //   // Adds a template for search results.
  //   Search: on(GenericTemplateClean)(vitalSearchGenericTemplate.Search),
  //   ContentListing: on(GenericTemplateClean)(vitalContentListingTemplate.Default),
  // },
  Compose: {
    // Adds the search context.
    // @todo Restore if you want search on your site
    // WithSearchContext: as(withSearchMenuProvider, withSearchResult),
  },
});

const vitalPage: typeof vitalPageBase = {
  ...vitalPageBase,
  Default,
};

export default vitalPage;
