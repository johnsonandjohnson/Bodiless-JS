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
import { asStyleGuideTemplateToken, cxStyleGuideTemplate } from '@bodiless/cx-templates';
import { flowHoc, on, replaceWith } from '@bodiless/fclasses';
import { cxLayout, LayoutClean } from '@bodiless/cx-layout';

export const Layout = asStyleGuideTemplateToken(cxStyleGuideTemplate.NoLayout, {
  Meta: flowHoc.meta.term('Token')('Layout'),
  Content: {
    Title: replaceWith(() => <>Layout</>),
    Examples: on(LayoutClean)(cxLayout.WithBordersLabels),
  },
});
