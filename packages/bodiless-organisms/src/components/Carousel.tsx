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
import { withNode, withNodeKey, ifReadOnly } from '@bodiless/core';
import Carousel from 'nuka-carousel';
import {
  asEditableList,
  List,
  ListProps,
  asBodilessImage,
} from '@bodiless/components';

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
  designable(carouselStart),
  withDesign({
    Slider: asSlidesList,
  }),
)(CarouselBase);

// Replace my Slider div with Slides List.
const asEditableCarousel = flow(
  withNode,
  withDesign({
    Slider: flow(
      asEditableList,
      withNodeKey('slides'),
      withDesign({
        Title: asBodilessImage('image'),
      }),
    ),
  }),
);

const BCarousel = asEditableCarousel(BCarouselClean);

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
