/**
  * Copyright © 2022 Johnson & Johnson
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  * http:www.apache.org/licenses/LICENSE-2.0
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
  addProps
} from '@bodiless/fclasses';
import { asFluidToken } from '@bodiless/vital-elements';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
import { CardClean } from '@bodiless/vital-card';
import { exampleCard } from '../../../reusable-tokens';
import { StyleGuideExamplesClean, vitalStyleGuideExamples } from '../../Examples';

const TestFlowContainer = asFluidToken({
  Components: {
    Default: on(CardClean)(exampleCard.Default),
    Hero: on(CardClean)(exampleCard.Hero),
  },
});

const StyleGuideColumns = asFluidToken({
  ...vitalStyleGuideExamples.Default,
  Layout: {
    Wrapper: 'flex flex-wrap gap-20',
  },
});

const eyebrow = {
  text: 'LOREM EYEBROW'
};

const image = {
  src: '/images/pages/styleguide/card/placeholder-13c7db9d958b72acb4b6ea5647341ff6.png',
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
  Meta: flowHoc.meta.term('Token')('Buttons'),
  Content: {
    Title: replaceWith(() => <>Example Cards</>),
    Description: replaceWith(() => (
      <>
        Below are examples of the &quot;Simple&quot; and &quot;Fancy&quot;
        radius token variants being applied to the
        {' '}
        <b>Default</b>
        {' '}
        and
        {' '}
        <b>Hero</b>
        {' '}
        cards, respectively.
      </>
    )),
    Examples: on(StyleGuideExamplesClean)(
      StyleGuideColumns,
      TestFlowContainer,
      addProps({ content }),
    ),
  },
  Theme: {
    DescriptionWrapper: 'mb-4',
  }
});
