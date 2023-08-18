import React, { FC } from 'react';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import {
  designable, Div, Span, Fragment
} from '@bodiless/fclasses';
import type { DesignableComponentsProps } from '@bodiless/fclasses';
import type { CarouselDotComponents } from './types';
import { useCarouselSlideIndex } from '../utils/hooks';

type CarouselDotBaseProps = DesignableComponentsProps<CarouselDotComponents>;

/**
 * The starting components for each slot.
 */
const carouselDotComponents: CarouselDotComponents = {
  Wrapper: Div,
  DotWrapper: Div,
  Dot: Span,
  CounterWrapper: Div,
  Counter: Fragment,
};

const CarouselDotBase: FC<CarouselDotBaseProps> = ({ components: C, ...rest }) => {
  const slideIndex = useCarouselSlideIndex();

  return (
    <C.Wrapper {...rest}>
      <C.CounterWrapper data-index={slideIndex}>
        <C.Counter />
      </C.CounterWrapper>
      <C.DotWrapper data-index={slideIndex}>
        <C.Dot />
      </C.DotWrapper>
    </C.Wrapper>
  );
};

const CarouselDotClean = designable(carouselDotComponents, 'CarouselDot')(CarouselDotBase);

/**
 * A token creator that respects the CarouselDot slots.
 *
 * @category Token Collection
 */
export const asCarouselDotToken = asVitalTokenSpec<CarouselDotComponents>();

export default CarouselDotClean;
