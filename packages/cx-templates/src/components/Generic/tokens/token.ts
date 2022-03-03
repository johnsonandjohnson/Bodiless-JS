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
  replaceWith,
  Fragment,
  on,
} from '@bodiless/fclasses';
import { LayoutClean, cxLayout } from '@bodiless/cx-layout';
import { asGenericTemplateToken } from '../GenericClean';

const Default = asGenericTemplateToken({
  Components: {
    PageWrapper: on(LayoutClean)(cxLayout.Default),
  },
  Schema: {
  },
  SEO: {
  },
  Theme: {
  },
});

const WithoutBreadcrumbs = asGenericTemplateToken({
  Components: {
    Breadcrumb: replaceWith(Fragment),
  },
});

export const cxGenericTemplate = {
  Default,
  WithoutBreadcrumbs,
};
