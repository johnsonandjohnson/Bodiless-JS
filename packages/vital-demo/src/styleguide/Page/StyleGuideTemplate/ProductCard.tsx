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
import { ProductCardClean, vitalProductCard } from '@bodiless/vital-card';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
import {
  flowHoc, replaceWith, on, varyDesigns, addProps, as,
} from '@bodiless/fclasses';

import { StyleGuideExamplesClean, vitalStyleGuideExamples } from '../../Examples';

/*
 * Compose the default variation with Ratings
 */
const RatingVariations = varyDesigns(
  {
    '': on(ProductCardClean)(vitalProductCard.Default), // Use '' to not get a name for these
  },
  {
    WithRatings: vitalProductCard.WithRatings,
  },
);

/*
 * Compose the Rating cards with buttons.
 */
const CoreVariations = varyDesigns(
  RatingVariations,
  {
    WithSecondaryButton: vitalProductCard.WithSecondaryButton,
    WithLineClamping: vitalProductCard.WithTitleLineClamp,
    WithHorizontalOrientation: vitalProductCard.WithHorizontalOrientation,
    WithBackground: vitalProductCard.WithBackground,
    WithPaddings: vitalProductCard.WithPaddings,
  },
);

const BackgroundVariations = varyDesigns(
  RatingVariations,
  {
    /**
     * EXAMPLE
     *
     * Since by default `vitalProductCard.WithBackground` refers to `BackgroundLightBackground`
     * which is white color, adding here the custom color to better recognize paddings and BG.
     *
     * On real site this would be: `WithBackground: vitalProductCard.WithBackground,`
     */
    WithBackgroundAndPadding: as(
      vitalProductCard.WithPaddings,
      'bg-kenvue-neutrals-light-grey',
    ),
  },
);

const WithProductCardVariations = asFluidToken({
  Components: {
    ...CoreVariations,
    ...BackgroundVariations,
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
  text: 'Example Product Card Title'
};

const link = {
  href: '#',
  buttontext: 'Button Text'
};

/**
 * Add two columns for the component preview on the Styleguide page.
 */
const StyleGuideColumns = asFluidToken({
  ...vitalStyleGuideExamples.Default,
  Layout: {
    Wrapper: 'flex flex-wrap',
    ItemWrapper: 'w-1/2 p-4',
    ItemTitle: 'truncate',
  },
});

export const ProductCard = asStyleGuideTemplateToken(vitalStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('ProductCard'),
  Content: {
    Title: replaceWith(() => <>Product Cards</>),
    Description: replaceWith(() => (
      <>
        The following are examples of Product Cards.
        {' '}
      </>
    )),
    Examples: on(StyleGuideExamplesClean)(
      StyleGuideColumns,
      WithProductCardVariations,
      addProps({ image, link, title }),
    ),
  },
});
