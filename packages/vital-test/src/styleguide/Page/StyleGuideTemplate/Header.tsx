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
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
import { flowHoc, on, replaceWith } from '@bodiless/fclasses';
import { vitalHeader, HeaderClean } from '@bodiless/vital-layout';

export const Header = asStyleGuideTemplateToken(vitalStyleGuideTemplate.NoLayout, {
  Meta: flowHoc.meta.term('Token')('Header'),
  Content: {
    Title: replaceWith(() => <>Header</>),
    Examples: on(HeaderClean)(vitalHeader.Default),
  },
});
