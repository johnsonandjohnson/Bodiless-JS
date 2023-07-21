import React, { FC } from 'react';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { designable, Div, Img } from '@bodiless/fclasses';
import type { DesignableComponentsProps } from '@bodiless/fclasses';
import type { CarouselThumbComponents } from './types';
import { useCarouselSlideIndex } from '../utils/hooks';

type CarouselThumbBaseProps = DesignableComponentsProps<CarouselThumbComponents>;

/**
 * The starting components for each slot.
 */
const carouselThumbComponents: CarouselThumbComponents = {
  Wrapper: Div,
  Image: Img,
};

const CarouselThumbBase: FC<CarouselThumbBaseProps> = ({ components: C, ...rest }) => {
  const slideIndex = useCarouselSlideIndex();

  return (
    // Accessiblility Set tabindex for natural order
    <C.Wrapper data-index={slideIndex} type="button" {...rest}>
      <C.Image />
    </C.Wrapper>
  );
};

const CarouselThumbClean = designable(carouselThumbComponents, 'CarouselThumb')(CarouselThumbBase);

/**
 * A token creator that respects the CarouselThumb slots.
 *
 * @category Token Collection
 */
export const asCarouselThumbToken = asVitalTokenSpec<CarouselThumbComponents>();

export default CarouselThumbClean;
