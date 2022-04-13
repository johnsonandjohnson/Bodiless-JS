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

import React from 'react';
import negate from 'lodash/negate';
import {
  as,
  flowIf,
  on,
  replaceWith
} from '@bodiless/fclasses';
import { asFluidToken } from '@bodiless/vital-elements';
import {
  vitalPage,
  GenericTemplateClean,
  vitalGenericTemplate,
  asGenericTemplateToken
} from '@bodiless/vital-templates';
import { useNode } from '@bodiless/core';

// @todo remove NoBreadcrumbsGeneric when breadcrumbs is implemented and
// content editor can choose to use breadcrumb
const NoBreadcrumbsGeneric = asGenericTemplateToken({
  ...vitalGenericTemplate.Default,
  Components: {
    ...vitalGenericTemplate.Default.Components,
    BreadcrumbWrapper: replaceWith(React.Fragment),
    Breadcrumb: replaceWith(React.Fragment),
  },
});

const isHomePage = () => useNode().node.pagePath === '/';

const Default = asFluidToken({
  ...vitalPage.Default,
  Components: {
    _default: on(GenericTemplateClean)(
      flowIf(isHomePage)(as(NoBreadcrumbsGeneric)),
      flowIf(negate(isHomePage))(as(vitalGenericTemplate.Default)),
    ),
  },
});

export default {
  ...vitalPage,
  Default,
};
