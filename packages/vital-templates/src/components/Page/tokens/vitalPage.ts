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

import { as, on } from '@bodiless/fclasses';
import { asBodilessChameleon } from '@bodiless/components';
import { asFluidToken } from '@bodiless/vital-elements';
import { WithGA4DesignKeys } from '@bodiless/ga4';
import { asBodilessPage } from '../asBodilessPage';
import { GenericTemplateClean, vitalGenericTemplate } from '../../GenericTemplate';
import { PDPTemplateClean, vitalPDPTemplate } from '../../PDPTemplate';

const Default = asFluidToken({
  Core: {
    _: as(
      asBodilessChameleon(
        'template',
        // Sets 'Default' for new pages creation.
        { component: 'Default' },
        () => ({
          root: true,
          label: 'Template',
          icon: 'grid_view',
          group: 'page-group',
          formTitle: 'Choose a template for this page',
        }),
      ),
    ),
  },
  Components: {
    Default: on(GenericTemplateClean)(vitalGenericTemplate.Default),
    PDP: on(PDPTemplateClean)(vitalPDPTemplate.Default),
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
  Compose: {
    WithGA4DesignKeys,
  },
});

export default { Default };
