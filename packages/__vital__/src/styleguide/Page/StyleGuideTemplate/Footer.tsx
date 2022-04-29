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
import { FooterClean, vitalFooter } from '@bodiless/vital-layout';

// Apply similar method as done in the vitalLayout token.
const StickFooterLayout = asStyleGuideTemplateToken({
  ...vitalStyleGuideTemplate.NoLayout,
  Theme: {
    ...vitalStyleGuideTemplate.NoLayout.Theme,
    Container: 'flex flex-col h-screen',
    DescriptionWrapper: 'flex-grow',
  },
});

export const Footer = asStyleGuideTemplateToken(StickFooterLayout, {
  Meta: flowHoc.meta.term('Token')('Footer'),
  Content: {
    Title: replaceWith(() => <>Footer</>),
    Examples: on(FooterClean)(vitalFooter.Default),
  },
});
