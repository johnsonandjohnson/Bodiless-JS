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

const CardVariations = {
  '': on(VitalCarouselClean)(
    vitalCarousel.Default,
    vitalCarousel.WithCardSlide,
    vitalCarousel.WithCarouselDots
  ),
};

const vitalCardCarouselVariations = varyDesigns(
  CardVariations,
  {
    MobileProductCarousel: as(vitalCarousel.WithPeek, vitalCarousel.MobileOnly),
    TabletProductCarousel: as(vitalCarousel.WithThreeSlides, vitalCarousel.TabletOnly),
    DesktopProductCarousel: as(vitalCarousel.WithFourSlides, vitalCarousel.DesktopOnly),
  },
);

const vitalCarouselFlowContainer = asFluidToken({
  Components: {
    ...vitalCardCarouselVariations,
  },
});

const data = {
  examples$MobileProductCarousel$slides: {
    items: ['card1', 'card2', 'card3', 'card4', 'card5'],
  },
  examples$TabletProductCarousel$slides: {
    items: ['card1', 'card2', 'card3', 'card4', 'card5'],
  },
  examples$DesktopProductCarousel$slides: {
    items: ['card1', 'card2', 'card3', 'card4', 'card5'],
  },
};

export const CarouselPC = asStyleGuideTemplateToken(vitalStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('CarouselPC'),
  Content: {
    Title: replaceWith(() => <>Carouse for Product Card Section</>),
    Description: replaceWith(
      () => <>The following are examples of Vital Carousel in the Product Card Section.</>
    ),
    Examples: on(StyleGuideExamplesClean)(
      vitalStyleGuideExamples.Default,
      vitalCarouselFlowContainer,
      withDefaultContent(data),
    ),
  },
});
