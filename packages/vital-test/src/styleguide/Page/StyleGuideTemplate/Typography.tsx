/**
 * Copyright © 2019 Johnson & Johnson
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
import {
  as,
  flowHoc,
  replaceWith,
  on,
  Div,
  A,
  withDesign,
  varyDesigns,
} from '@bodiless/fclasses';
import { EditorPlainClean, vitalEditorPlain } from '@bodiless/vital-editors';
import { asFluidToken, vitalTypography } from '@bodiless/vital-elements';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
import { withDefaultContent, withNodeKey, withParent } from '@bodiless/core';
import { vitalLink } from '@bodiless/vital-link';
import { StyleGuideExamplesClean, vitalStyleGuideExamples } from '../../Examples';

const BaseVariation = {
  '': on(EditorPlainClean)(
    vitalEditorPlain.Default,
    withParent(Div),
  ),
};

const TypographyVariations = {
  H1: withDesign({ Parent: vitalTypography.H1 }),
  H2: withDesign({ Parent: vitalTypography.H2 }),
  H3: withDesign({ Parent: vitalTypography.H3 }),
  H4: withDesign({ Parent: vitalTypography.H4 }),
  H5: withDesign({ Parent: vitalTypography.H5 }),
  Body: withDesign({ Parent: vitalTypography.Body }),
  Eyebrow: withDesign({ Parent: vitalTypography.Eyebrow }),
  Gradient: withDesign({ Parent: vitalTypography.Gradient }),
  Rest: withDesign({ Parent: vitalTypography.Rest }),
};

const vitalTypographyVariations = varyDesigns(
  BaseVariation,
  TypographyVariations,
);

const LinkVariation = {
  Link: on(EditorPlainClean)(
    vitalEditorPlain.Default,
    withParent(A),
    withDesign({
      Parent: as(
        vitalTypography.Link,
        vitalLink.Default,
        vitalLink.Sidecar,
      )
    }),
    withNodeKey('linktext'),
  ),
};

const vitalTypographyFlowContainer = asFluidToken({
  Components: {
    ...vitalTypographyVariations,
    ...LinkVariation,
  },
});

const data = {
  examples$H1: { text: 'An example H1 Title' },
  examples$H2: { text: 'An example H2 Title' },
  examples$H3: { text: 'An example H3 Title' },
  examples$H4: { text: 'An example H4 Title' },
  examples$H5: { text: 'An example H5 Title' },
  examples$Body: { text: 'An example of the Body' },
  examples$Eyebrow: { text: 'An example of the Eyebrow' },
  examples$Gradient: { text: 'An example of the Gradient' },
  examples$Rest: { text: 'An example of the Rest' },
  examples$Link$linktext: { text: 'An example of the Link' },
  examples$Link: { href: '/test/' },
};

export const Typography = asStyleGuideTemplateToken(vitalStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('Typography'),
  Content: {
    Title: replaceWith(() => <>Typography</>),
    Description: replaceWith(() => <>The following are examples of Vital Typography.</>),
    Examples: on(StyleGuideExamplesClean)(
      vitalStyleGuideExamples.Default,
      vitalTypographyFlowContainer,
      withDefaultContent(data),
    ),
  },
});
