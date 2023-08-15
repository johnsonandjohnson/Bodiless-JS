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
  flowHoc, replaceWith, on, addProps
} from '@bodiless/fclasses';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
import { vitalCardFlowContainer } from '@bodiless/vital-card';
import { StyleGuideExamplesClean, vitalStyleGuideExamples } from '../../Examples';

const eyebrow = {
  text: 'LOREM EYEBROW'
};

// @todo Provide actual default image in package rather than manual upload.
const image = {
  src: '/images/pages/styleguide/card/89e732f5d5bfe4a4a80eebfa4e01a8bd/image1.png',
  alt: '',
  title: '',
  preset: 'fluid_withWebp'
};

const title = {
  text: 'Ipsum Title'
};

const description = [
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

const content = {
  title, description, eyebrow, image
};

export const Card = asStyleGuideTemplateToken(vitalStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('Card'),
  Content: {
    Title: replaceWith(() => <>Card</>),
    Examples: on(StyleGuideExamplesClean)(
      vitalStyleGuideExamples.Default,
      vitalCardFlowContainer.WithCardVariations,
      addProps({ content }),
    ),
  },
});
