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
  Dot: Span,
  Counter: Fragment,
};

const CarouselDotBase: FC<CarouselDotBaseProps> = ({ components: C, ...rest }) => {
  const slideIndex = useCarouselSlideIndex();

  return (
    <C.Wrapper data-index={slideIndex} {...rest}>
      <C.Counter />
      <C.Dot />
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
