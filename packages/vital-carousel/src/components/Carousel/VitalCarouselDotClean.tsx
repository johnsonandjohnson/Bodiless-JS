import React, { FC } from 'react';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { designable, Div, Span } from '@bodiless/fclasses';
import type { DesignableComponentsProps } from '@bodiless/fclasses';
import type { VitalCarouselDotComponents } from './types';
import { useCarouselSlideIndex } from './utils/hooks';

type VitalCarouselDotBaseProps = DesignableComponentsProps<VitalCarouselDotComponents>;

/**
 * The starting components for each slot.
 */
const vitalCarouselDotComponents: VitalCarouselDotComponents = {
  Wrapper: Div,
  Dot: Span,
};

const VitalCarouselDotBase: FC<VitalCarouselDotBaseProps> = ({ components: C, ...rest }) => {
  const slideIndex = useCarouselSlideIndex();

  return (
    <C.Wrapper class="dot indicator" data-index={slideIndex} tab-index="-1" {...rest}>
      <C.Dot />
    </C.Wrapper>
  );
};

const VitalCarouselDotClean = designable(vitalCarouselDotComponents, 'VitalCarouselDot')(VitalCarouselDotBase);

/**
 * A token creator that respects the VitalCarousel slots.
 *
 * @category Token Collection
 */
export const asVitalCarouselDotToken = asVitalTokenSpec<VitalCarouselDotComponents>();

export default VitalCarouselDotClean;