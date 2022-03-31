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
import { asBodilessChameleon } from '@bodiless/components';
import { asElementToken } from '@bodiless/cx-elements';
import { asBodilessPage } from '../asBodilessPage';
// import { cxGenericTemplate, GenericTemplateClean } from '../../Generic';
// import { cxStyleGuideTemplate, StyleGuideTemplateClean } from '../../StyleGuideTemplate';

const Default = asElementToken({
  Core: {
    _: as(
      asBodilessChameleon('template', undefined, () => ({
        root: true,
        label: 'Template',
        icon: 'grid_view',
        group: 'page-group',
        formTitle: 'Choose a template for this page',
      })),
    ),
  },
  // @todo restore tools
  // Behavior: {
  //   _: withTools,
  // },
  Schema: {
    _: asBodilessPage,
  },
  // Override this to set nonstandard breakpoints.
  // @todo revisit breakpoints after responsive refactor
  // Layout: {
  //   _: withPageDimensionsContext({ breakpoints }),
  // },
  // @todo add GTM
  // Analytics: {
  //   _: withGTMDesignKeys,
  // },
  Components: {
    // _default: on(GenericTemplateClean)(cxGenericTemplate.Default),
    // StyleGuide: on(StyleGuideTemplateClean)(cxStyleGuideTemplate.Default),
  },
});

export default { Default };
