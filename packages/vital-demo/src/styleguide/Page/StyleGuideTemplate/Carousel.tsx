/* eslint-disable max-len */
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
  varyDesigns,
  as,
} from '@bodiless/fclasses';
import {
  CarouselStatic,
  asVitalCarouselToken,
  vitalCarouselStatic,
} from '@bodiless/vital-carousel';
import { asFluidToken } from '@bodiless/vital-elements';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
import { withDefaultContent } from '@bodiless/data';
import { StyleGuideExamplesClean, vitalStyleGuideExamples } from '../../Examples';

const BaseVariation = {
  // using '' means it won't add any string to name key of the variations
  '': on(CarouselStatic)(
    vitalCarouselStatic.Default,
    vitalCarouselStatic.WithImageSlide,
  ),
};

const forceHalf = asVitalCarouselToken({
  Theme: {
    Wrapper: 'lg:w-1/2'
  }
});

const vitalPDPVariations = varyDesigns(
  BaseVariation,
  {
    MobilePDPCarousel: as(
      vitalCarouselStatic.WithCarouselDots,
      vitalCarouselStatic.MobileTabletOnly,
      vitalCarouselStatic.WithCarouselDotsMobileTablet,
    ),
    // DesktopTabletPDPCarousel: as(
    //   vitalCarouselStatic.WithThumbnail,
    //   vitalCarouselStatic.DesktopOnly,
    //   vitalCarouselStatic.WithHorizontalThumbs,
    //   forceHalf, // forcing half since this is how it will display on PDP
    // ),
    DesktopPDPVerticalCarousel: as(
      vitalCarouselStatic.WithThumbnail,
      vitalCarouselStatic.DesktopOnly,
      vitalCarouselStatic.WithVerticalThumbs,
      forceHalf, // forcing half since this is how it will display on PDP
    ),
  },
);

const vitalCarouselFlowContainer = asFluidToken({
  Components: {
    ProductCardSection: on(CarouselStatic)(
      vitalCarouselStatic.Default,
      vitalCarouselStatic.WithCardSlide,
      vitalCarouselStatic.WithCarouselDots,
      vitalCarouselStatic.WithCarouselDotsAllViewports
    ),
    ...vitalPDPVariations,
  },
});

// Setup Default Data
const squareimage1 = {
  src: 'https://placehold.co/800x800/ff0000/FFF',
  alt: 'red',
  title: 'red'
};
const squareimage2 = {
  src: 'https://placehold.co/800x800/00ff00/FFF',
  alt: 'green',
  title: 'green'
};
const squareimage3 = {
  src: 'https://placehold.co/800x800/0000ff/FFF',
  alt: 'blue',
  title: 'blue'
};
const squareimage4 = {
  src: 'https://placehold.co/800x800/f2bdcd/FFF',
  alt: 'pink',
  title: 'pink'
};
const squareimage5 = {
  src: 'https://placehold.co/800x800/bcd2ee/FFF',
  alt: 'lightblue',
  title: 'lightblue'
};
const squareimage6 = {
  src: 'https://placehold.co/800x800/cc6633/FFF',
  alt: 'brown',
  title: 'brown'
};
const squareimage7 = {
  src: 'https://placehold.co/800x800/fff000/FFF',
  alt: 'yellow',
  title: 'yellow'
};
const squareimage8 = {
  src: 'https://placehold.co/800x800/884de3/FFF',
  alt: 'purple',
  title: 'purple'
};
const squareimage9 = {
  src: 'https://placehold.co/800x800/00ffff/FFF',
  alt: 'aqua',
  title: 'aqua'
};
const data = {
  examples$ProductCardSection$slides: {
    items: ['card1', 'card2', 'card3', 'card4', 'card5'],
  },
  examples$MobilePDPCarousel$slides: {
    items: ['image1', 'image2', 'image3', 'image4', 'image5', 'image6'],
  },
  examples$MobilePDPCarousel$slides$image1$image: squareimage1,
  examples$MobilePDPCarousel$slides$image2$image: squareimage2,
  examples$MobilePDPCarousel$slides$image3$image: squareimage3,
  examples$MobilePDPCarousel$slides$image4$image: squareimage4,
  examples$MobilePDPCarousel$slides$image5$image: squareimage5,
  examples$MobilePDPCarousel$slides$image6$image: squareimage6,
  examples$DesktopTabletPDPCarousel$slides: {
    items: ['image1', 'image2', 'image3', 'image4', 'image5', 'image6', 'image7', 'image8', 'image9'],
  },
  examples$DesktopTabletPDPCarousel$slides$image1$image: squareimage1,
  examples$DesktopTabletPDPCarousel$slides$image2$image: squareimage2,
  examples$DesktopTabletPDPCarousel$slides$image3$image: squareimage3,
  examples$DesktopTabletPDPCarousel$slides$image4$image: squareimage4,
  examples$DesktopTabletPDPCarousel$slides$image5$image: squareimage5,
  examples$DesktopTabletPDPCarousel$slides$image6$image: squareimage6,
  examples$DesktopTabletPDPCarousel$slides$image7$image: squareimage7,
  examples$DesktopTabletPDPCarousel$slides$image8$image: squareimage8,
  examples$DesktopTabletPDPCarousel$slides$image9$image: squareimage9,
  examples$DesktopPDPVerticalCarousel$slides: {
    items: ['image1', 'image2', 'image3', 'image4', 'image5', 'image6', 'image7', 'image8', 'image9'],
  },
  examples$DesktopPDPVerticalCarousel$slides$image1$image: squareimage1,
  examples$DesktopPDPVerticalCarousel$slides$image2$image: squareimage2,
  examples$DesktopPDPVerticalCarousel$slides$image3$image: squareimage3,
  examples$DesktopPDPVerticalCarousel$slides$image4$image: squareimage4,
  examples$DesktopPDPVerticalCarousel$slides$image5$image: squareimage5,
  examples$DesktopPDPVerticalCarousel$slides$image6$image: squareimage6,
  examples$DesktopPDPVerticalCarousel$slides$image7$image: squareimage7,
  examples$DesktopPDPVerticalCarousel$slides$image8$image: squareimage8,
  examples$DesktopPDPVerticalCarousel$slides$image9$image: squareimage9,
};

export const Carousel = asStyleGuideTemplateToken(vitalStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('Carousel'),
  Content: {
    Title: replaceWith(() => <>Carousel</>),
    Description: replaceWith(() => (
      <>
        The following are examples of Vital Carousel.
        {' '}
        <ul>
          <li>The First example is a carousel used in the Product Section.</li>
          <li>The Second example is carousel used on Product Detail Page, and is waiting on implementation of final designs.</li>
        </ul>
      </>
    )),
    Examples: on(StyleGuideExamplesClean)(
      vitalStyleGuideExamples.Default,
      vitalCarouselFlowContainer,
      withDefaultContent(data),
    ),
  },
});
