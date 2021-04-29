/**
 * Copyright © 2021 Johnson & Johnson
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

import React, { Fragment, ComponentType } from 'react';
import {
  Div,
  designable,
  stylable,
} from '@bodiless/fclasses';
import type { DesignableComponentsProps } from '@bodiless/fclasses';
import {
  CarouselProvider,
  Slider,
  Slide,
} from 'pure-react-carousel';

type CarouselComponents = {
  Wrapper: ComponentType<any>,
  SliderWrapper: ComponentType<any>,
  Slider: ComponentType<any>,
  Slide: ComponentType<any>,
  ControlsWrapper: ComponentType<any>,
  Dots: ComponentType<any>,
  ButtonBack: ComponentType<any>,
  ButtonNext: ComponentType<any>,
  ButtonPlay: ComponentType<any>,
};

const carouselComponents: CarouselComponents = {
  Wrapper: stylable(CarouselProvider),
  SliderWrapper: Div,
  Slider: stylable(Slider),
  Slide,
  ControlsWrapper: Div,
  Dots: Fragment,
  ButtonBack: Fragment,
  ButtonNext: Fragment,
  ButtonPlay: Fragment,
};

export type CarouselProps = DesignableComponentsProps<CarouselComponents>;

const CarouselBase = (props: CarouselProps) => {
  const { components: C } = props;
  return (
    <C.Wrapper>
      <C.SliderWrapper>
        <C.Slider />
        <C.ButtonBack />
        <C.ButtonNext />
      </C.SliderWrapper>
      <C.ControlsWrapper>
        <C.Dots />
        <C.ButtonPlay />
      </C.ControlsWrapper>
    </C.Wrapper>
  );
};

const CarouselClean = designable(carouselComponents, 'Carousel')(CarouselBase);

export {
  CarouselClean,
};
