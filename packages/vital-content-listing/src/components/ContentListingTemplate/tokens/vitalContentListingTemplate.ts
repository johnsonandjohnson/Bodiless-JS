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
import { vitalGenericTemplate, asGenericTemplateToken } from '@bodiless/vital-templates';
import { as, on } from '@bodiless/fclasses';
import { withNode, withNodeKey } from '@bodiless/data';
import { ContentListingClean, vitalContentListing } from '../../ContentListing';

const Default = asGenericTemplateToken({
  ...vitalGenericTemplate.Default,
  Meta: {
    title: 'Content Listing',
  },
  Components: {
    ...vitalGenericTemplate.Default.Components,
    Content: on(ContentListingClean)(vitalContentListing.Default),
  },
  Schema: {
    ...vitalGenericTemplate.Default.Schema,
    Content: as(
      withNodeKey({ nodeKey: 'content-listing', nodeCollection: 'site' }),
      withNode,
      vitalGenericTemplate.Default.Schema.Content,
    ),
  }
});

export default { Default };
