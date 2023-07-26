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
import { withParent } from '@bodiless/core';
import { withDefaultContent, withNodeKey } from '@bodiless/data';
import { vitalLink } from '@bodiless/vital-link';
import { StyleGuideExamplesClean, vitalStyleGuideExamples } from '../../Examples';

const BaseVariation = {
  '': on(EditorPlainClean)(
    vitalEditorPlain.Default,
    withParent(Div),
  ),
};

const TypographyVariations = {
  HeadlineXXLarge: withDesign({ Parent: vitalTypography.HeadlineXXLarge }),
  HeadlineXLarge: withDesign({ Parent: vitalTypography.HeadlineXLarge }),
  HeadlineLarge: withDesign({ Parent: vitalTypography.HeadlineLarge }),
  HeadlineMedium: withDesign({ Parent: vitalTypography.HeadlineMedium }),
  HeadlineSmall: withDesign({ Parent: vitalTypography.HeadlineSmall }),
  BodyLargeRegular: withDesign({ Parent: vitalTypography.BodyLargeRegular }),
  BodyLargeUnderlined: withDesign({ Parent: vitalTypography.BodyLargeUnderlined }),
  BodyLargeBold: withDesign({ Parent: vitalTypography.BodyLargeBold }),
  BodyLargeBoldUnderlined: withDesign({ Parent: vitalTypography.BodyLargeBoldUnderlined }),
  BodyRegular: withDesign({ Parent: vitalTypography.BodyRegular }),
  BodyUnderlined: withDesign({ Parent: vitalTypography.BodyUnderlined }),
  BodyBold: withDesign({ Parent: vitalTypography.BodyBold }),
  BodyBoldUnderlined: withDesign({ Parent: vitalTypography.BodyBoldUnderlined }),
  BodySmallRegular: withDesign({ Parent: vitalTypography.BodySmallRegular }),
  BodySmallUnderlined: withDesign({ Parent: vitalTypography.BodySmallUnderlined }),
  BodySmallBold: withDesign({ Parent: vitalTypography.BodySmallBold }),
  BodySmallBoldUnderlined: withDesign({ Parent: vitalTypography.BodySmallBoldUnderlined }),
  EyebrowRegular: withDesign({ Parent: vitalTypography.EyebrowRegular }),
  EyebrowBold: withDesign({ Parent: vitalTypography.EyebrowBold }),
};

const vitalTypographyVariations = varyDesigns(
  BaseVariation,
  TypographyVariations,
);

// TO DO bring in Component/Link/Text
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
  examples$HeadlineXXLarge: { text: 'An example of HeadlineXXLarge H1 Title' },
  examples$HeadlineXLarge: { text: 'An example of HeadlineXLarge H2 Title' },
  examples$HeadlineLarge: { text: 'An example of HeadlineLarge H3 Title' },
  examples$HeadlineMedium: { text: 'An example of HeadlineMedium H4 Title' },
  examples$HeadlineSmall: { text: 'An example of HeadlineSmall H5 Title' },
  examples$BodyLargeRegular: { text: 'An example of the BodyLargeRegular' },
  examples$BodyLargeUnderlined: { text: 'An example of the BodyLargeUnderlined' },
  examples$BodyLargeBold: { text: 'An example of the BodyLargeBold' },
  examples$BodyLargeBoldUnderlined: { text: 'An example of the BodyLargeBoldUnderlined' },
  examples$BodyRegular: { text: 'An example of the BodyRegular' },
  examples$BodyUnderlined: { text: 'An example of the BodyUnderlined' },
  examples$BodyBold: { text: 'An example of the BodyBold' },
  examples$BodyBoldUnderlined: { text: 'An example of the BodyBoldUnderlined' },
  examples$EyebrowRegular: { text: 'An example of the EyebrowRegular' },
  examples$EyebrowBold: { text: 'An example of the EyebrowBold' },
  examples$BodySmallRegular: { text: 'An example of the BodySmallRegular' },
  examples$BodySmallUnderlined: { text: 'An example of the BodySmallUnderlined' },
  examples$BodySmallBold: { text: 'An example of the BodySmallBold' },
  examples$BodySmallBoldUnderlined: { text: 'An example of the BodySmallBoldUnderlined' },
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
