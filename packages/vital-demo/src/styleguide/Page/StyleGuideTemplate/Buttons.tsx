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
import {
  flowHoc,
  replaceWith,
  on,
  varyDesigns,
} from '@bodiless/fclasses';
import { ButtonClean, vitalButton } from '@bodiless/vital-button';
import { asFluidToken } from '@bodiless/vital-elements';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
// import { LinkClean, vitalLink } from '@bodiless/vital-link';
import { withDefaultContent } from '@bodiless/data';
import { StyleGuideExamplesClean, vitalStyleGuideExamples } from '../../Examples';

const label = {
  buttontext: { text: 'Button' },
};

const Default = on(ButtonClean)(
  vitalButton.Default,
  withDefaultContent(label),
);

const ButtonStyleVariations = varyDesigns(
  {
    Primary: vitalButton.Primary,
    PrimaryDisabled: vitalButton.PrimaryDisabled,
    Secondary: vitalButton.Secondary,
    SecondaryDisabled: vitalButton.SecondaryDisabled,
    Tertiary: vitalButton.Tertiary,
    TertiaryDisabled: vitalButton.TertiaryDisabled,
  },
  {
    '': '', // vary on itself and produce default button variation
    // WithArrow: vitalButton.WithArrow,
  },
  {
    '': Default
  },
);

// SAVING FOR FUTURE // Generate the Link Varations
// const LinkVariations = varyDesigns(
//   {
//     Default: vitalLink.Default,
//     Primary: vitalLink.PrimaryLink,
//   },
//   {
//     '': '', // vary on itself and produce plain link variation
//     External: vitalLink.Default,
//     PDF: vitalLink.Default,
//   },
//   {
//     Link: on(LinkClean)(
//       vitalTypography.Link,
//       addProps({ children: 'Lorem Ipsum' }),
//     ),
//   },
// );

const DemoFlowContainer = asFluidToken({
  Components: {
    // ...LinkVariations,
    // Default,
    ...ButtonStyleVariations,
  },
});

const StyleGuideColumns = asFluidToken({
  ...vitalStyleGuideExamples.Default,
  Layout: {
    Wrapper: 'flex flex-wrap gap-28',
  },
});

// const data = {
//   examples$DefaultPDFLink: { href: '/files/pages/styleguide/buttons/test.pdf' },
//   examples$DefaultExternalLink: { href: 'https://www.example.com/' },
//   examples$PrimaryPDFLink: { href: '/files/pages/styleguide/buttons/test.pdf' },
//   examples$PrimaryExternalLink: { href: 'https://www.example.com/' },
// };

export const Buttons = asStyleGuideTemplateToken(vitalStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('Buttons'),
  Content: {
    Title: replaceWith(() => <>Buttons</>),
    Description: replaceWith(() => <>The following are examples of Vital Links & Buttons.</>),
    Examples: on(StyleGuideExamplesClean)(
      StyleGuideColumns,
      DemoFlowContainer,
      // withDefaultContent(data),
    ),
  },
});
