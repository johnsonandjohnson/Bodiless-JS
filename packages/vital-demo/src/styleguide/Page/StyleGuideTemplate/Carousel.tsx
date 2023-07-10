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
import {
  flowHoc,
  replaceWith,
  on,
  as,
  varyDesigns,
} from '@bodiless/fclasses';
import {
  VitalCarouselClean,
  vitalCarousel,
} from '@bodiless/vital-carousel';
import { asFluidToken } from '@bodiless/vital-elements';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
import { withDefaultContent } from '@bodiless/data';
import { StyleGuideExamplesClean, vitalStyleGuideExamples } from '../../Examples';

const BaseVariation = {
  // using '' means it won't add any string to name key of the variations
  '': on(VitalCarouselClean)(
    vitalCarousel.Default,
    vitalCarousel.WithImageSlide,
  ),
};

const CarouselVariations = {
  Default: '',
  NavButtons: vitalCarousel.WithNavigationButtons,
  InfiniteLoop: as(
    vitalCarousel.WithInfinitiveLoop,
    vitalCarousel.WithNavigationButtons,
  ),
  AutoPlay: as(
    vitalCarousel.WithNavigationButtons,
    vitalCarousel.WithAutoPlay
  ),
};

const vitalCarouselVariations = varyDesigns(
  BaseVariation,
  CarouselVariations,
);

const vitalCarouselFlowContainer = asFluidToken({
  Components: {
    ...vitalCarouselVariations
  },
});

// Setup Default Data
const image1 = {
  src: '/images/pages/styleguide/carousel/193cfc9be3b995831c6af2fea6650e60/red1400x300.svg',
  alt: 'red',
  title: 'red'
};
const image2 = {
  src: '/images/pages/styleguide/carousel/193cfc9be3b995831c6af2fea6650e60/green1400x300.svg',
  alt: 'green',
  title: 'green'
};
const image3 = {
  src: '/images/pages/styleguide/carousel/193cfc9be3b995831c6af2fea6650e60/blue1400x300.svg',
  alt: 'blue',
  title: 'blue'
};

const data = {
  examples$NavButtons$slides: {
    items: ['image1', 'image2', 'image3'],
  },
  examples$NavButtons$slides$image1$image: image1,
  examples$NavButtons$slides$image2$image: image2,
  examples$NavButtons$slides$image3$image: image3,
  examples$InfiniteLoop$slides: {
    items: ['image1', 'image2', 'image3'],
  },
  examples$InfiniteLoop$slides$image1$image: image1,
  examples$InfiniteLoop$slides$image2$image: image2,
  examples$InfiniteLoop$slides$image3$image: image3,
  examples$AutoPlay$slides: {
    items: ['image1', 'image2', 'image3'],
  },
  examples$AutoPlay$slides$image1$image: image1,
  examples$AutoPlay$slides$image2$image: image2,
  examples$AutoPlay$slides$image3$image: image3,
};

export const Carousel = asStyleGuideTemplateToken(vitalStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('Carousel'),
  Content: {
    Title: replaceWith(() => <>Carousel</>),
    Description: replaceWith(() => <>The following are examples of Vital Carousel.</>),
    Examples: on(StyleGuideExamplesClean)(
      vitalStyleGuideExamples.Default,
      vitalCarouselFlowContainer,
      withDefaultContent(data),
    ),
  },
});
