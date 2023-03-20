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
import { AccordionClean, vitalAccordion } from '@bodiless/vital-accordion';
import { asFluidToken } from '@bodiless/vital-elements';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
import { withDefaultContent } from '@bodiless/core';
import { StyleGuideExamplesClean, vitalStyleGuideExamples } from '../../Examples';

const BaseVariation = {
  // using '' means it won't add any string to name key of the variations
  '': on(AccordionClean)(
    vitalAccordion.Default,
  ),
};

const AccordionVariations = {
  Default: '',
  FAQ: vitalAccordion.WithFAQSchema,
};

const vitalAccordionVariations = varyDesigns(
  BaseVariation,
  AccordionVariations,
  {
    '': '', // vary on itself and produce closed accordion variation
    Expanded: vitalAccordion.WithInitiallyExpanded,
  }
);

const vitalAccordionFlowContainer = asFluidToken({
  Components: {
    ...vitalAccordionVariations,
  },
});

const simplebody = [
  {
    type: 'paragraph',
    children: [
      {
        text: 'Lorem ipsum '
      },
      {
        text: 'dolor',
        Bold: true
      },
      {
        text: ' sit amet'
      },
      {
        text: 'super',
        SuperScript: true
      },
      {
        text: ', consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
      }
    ]
  }
];

const data = {
  examples$Default$accordion$title: { text: 'What is the Accordion Default?' },
  examples$Default$accordion$body: simplebody,
  examples$DefaultExpanded$accordion$title: { text: 'What is Expanded on Open Accordion?' },
  examples$DefaultExpanded$accordion$body: simplebody,
  examples$FAQ$accordion$title: { text: 'What is FAQ accordion?' },
  examples$FAQ$accordion$body: simplebody,
  examples$FAQExpanded$accordion$title: { text: 'What is Expanded on a FAQ accordion?' },
  examples$FAQExpanded$accordion$body: simplebody,
};

export const Accordion = asStyleGuideTemplateToken(vitalStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('Accordion'),
  Content: {
    Title: replaceWith(() => <>Accordion</>),
    Description: replaceWith(() => <>The following are examples of Vital Accordion.</>),
    Examples: on(StyleGuideExamplesClean)(
      vitalStyleGuideExamples.Default,
      vitalAccordionFlowContainer,
      withDefaultContent(data),
    ),
  },
});
