/**
 * Copyright © 2020 Johnson & Johnson
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

import React, { ComponentType, FC } from 'react';
import { flow } from 'lodash';
import {
  addProps,
  withDesign,
  Div,
  DesignableComponentsProps,
  designable,
  replaceWith,
  Img,
  StylableProps,
} from '@bodiless/fclasses';
import {
  withNode,
  withNodeKey,
  ifReadOnly,
  ifEditable,
} from '@bodiless/core';
import Carousel from 'nuka-carousel';
import {
  asEditableList,
  List,
  ListProps,
} from '@bodiless/components';
import { asBodilessImage } from '@bodiless/components-ui';

type CarouselComponents = {
  Wrapper: ComponentType<StylableProps>,
  Slider: ComponentType<any>,
};

const carouselStart: CarouselComponents = {
  Wrapper: Div,
  Slider: List,
};

// TODO: Maybe make the whole slider stylable?
type Props = DesignableComponentsProps<CarouselComponents> & { };

const CarouselBase: FC<Props> = ({ components }) => {
  const {
    Wrapper,
    Slider,
  } = components;

  return (
    <Wrapper>
      <Slider />
    </Wrapper>
  );
};

type Token<P> = (Component: ComponentType<P>) => ComponentType<P>;

// Define the slides <Carousel><div><img/></div></Carousel>
// HOC to apply to a List to make it a list of slides.
const asSlidesList: Token<ListProps> = flow(
  withDesign({
    Wrapper: replaceWith(Carousel),
    Item: replaceWith(Div),
    Title: replaceWith(Img),
  }),
);

const BCarouselClean = flow(
  designable(carouselStart, 'Carousel'),
  withDesign({
    Slider: asSlidesList,
  }),
)(CarouselBase);

// Allows the Image Editor form to work and not slide with the image.
const asNoDraggingSlider = ifEditable(
  addProps({
    dragging: false,
  }),
);

/**
 * Adds data- identifiers to help select carousel elements in automated tests.
 *
 * @param id The id attribute to apply to the outer wrapper.
 */
const asTestableCarousel = withDesign({
  Wrapper: addProps({ 'data-carousel-element': 'wrapper' }),
  Slider: withDesign({
    Item: addProps({ 'data-carousel-element': 'slide' }),
    Title: addProps({ 'data-carousel-element': 'slide-image' }),
  }),
});

// Replace my Slider div with Slides List.
// TO DO: This should move to Site Level because,
//        its currently the composition of combining Slide List + Carousel.
const asEditableCarousel = flow(
  withNode,
  withDesign({
    Slider: flow(
      asEditableList,
      asNoDraggingSlider,
      withNodeKey('slides'),
      withDesign({
        Title: asBodilessImage('image'),
      }),
    ),
  }),
  asTestableCarousel,
);

const BCarousel = asEditableCarousel(BCarouselClean);

// Auto rotating is only on in preview/static other you can edit an image.
const asAutoSlider = ifReadOnly(
  addProps({
    autoplay: true,
    autoplayInterval: '3000',
    wrapAround: true,
  }),
);

const BAutoCarousel = withDesign({
  Slider: asAutoSlider,
})(BCarousel);

export default BCarousel;
export {
  BCarousel,
  BAutoCarousel,
  BCarouselClean,
  asEditableCarousel,
};
