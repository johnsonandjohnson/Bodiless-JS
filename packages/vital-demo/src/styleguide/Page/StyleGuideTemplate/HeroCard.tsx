/**
 * Copyright © 2023 Johnson & Johnson
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
import { asFluidToken } from '@bodiless/vital-elements';
import { HeroCardClean, vitalHeroCard } from '@bodiless/vital-card';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
import {
  flowHoc, replaceWith, on, varyDesigns, addProps,
} from '@bodiless/fclasses';

import { StyleGuideExamplesClean, vitalStyleGuideExamples } from '../../Examples';

/*
 * Compose the default vertical & horizontal cards
 */
const OrientationVariations = varyDesigns(
  {
    '': on(HeroCardClean)(vitalHeroCard.Default), // Use '' to not get a name for these
  },
  {
    ImageLeft: vitalHeroCard.WithHorizontalWithImageLeft,
    ImageRight: vitalHeroCard.WithHorizontalWithImageRight,
  },
);

/*
 * Compose the orientated cards with Descriptions & Eyebrows & Both toggles
 */
const EyebrowVariations = varyDesigns(
  OrientationVariations,
  {
    WithEyebrow: vitalHeroCard.WithEyebrow,
    WithNoEyebrow: vitalHeroCard.WithNoEyebrow
  },
);

const ButtonVariations = varyDesigns(
  EyebrowVariations,
  {
    WithPrimaryButton: vitalHeroCard.WithPrimaryButton,
    WithSecondaryButton: vitalHeroCard.WithSecondaryButton,
    WithTertiaryButton: vitalHeroCard.WithTertiaryButton,
  },
);

const ContentVariations = varyDesigns(
  ButtonVariations,
  {
    WithSubheading: vitalHeroCard.WithSubtitle,
    WithNoDescription: vitalHeroCard.WithNoDescription,
    WithNoHeroImage: vitalHeroCard.WithNoHeroImage
  }
);

const WithHeroCardVariations = asFluidToken({
  Components: {
    ...OrientationVariations,
    ...EyebrowVariations,
    ...ButtonVariations,
    ...ContentVariations,
  },
});

// @todo Provide actual default image in package rather than manual upload.
const image = {
  src: '/images/pages/styleguide/card/89e732f5d5bfe4a4a80eebfa4e01a8bd/image1.png',
  alt: '',
  title: '',
  preset: 'fluid_withWebp'
};

const title = {
  text: 'Headline'
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

const link = {
  href: '#',
  buttontext: 'Read More'
};

const content = {
  description, image, link, title,
};

/**
 * Add two columns for the component preview on the Styleguide page.
 */
const StyleGuideColumns = asFluidToken({
  ...vitalStyleGuideExamples.Default,
  Layout: {
    Wrapper: 'flex flex-wrap',
    ItemWrapper: 'w-full p-4',
  },
});

export const HeroCard = asStyleGuideTemplateToken(vitalStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('Carousel'),
  Content: {
    Title: replaceWith(() => <>Hero Cards</>),
    Description: replaceWith(() => (
      <>
        The following are examples of Hero Cards.
        {' '}
      </>
    )),
    Examples: on(StyleGuideExamplesClean)(
      StyleGuideColumns,
      WithHeroCardVariations,
      addProps({ content }),
    ),
  },
});
