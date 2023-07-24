import React, {
  FC, Fragment, useLayoutEffect, useRef
} from 'react';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import {
  designable, Div, Ul, HOC
} from '@bodiless/fclasses';
import { Helmet } from 'react-helmet';
import type { DesignableComponentsProps } from '@bodiless/fclasses';
import isUndefined from 'lodash/isUndefined';
import type { VitalCarouselComponents } from './types';
import { carouselScrollSnapSliderScript } from '../utils/ScrollSnapSlider';
import { sliderSimpleInitScript } from '../utils/sliderSimpleInit';

type VitalCarouselBaseProps = DesignableComponentsProps<VitalCarouselComponents>;

const CarouselScript = () => (
  <Helmet>
    <script type="text/javascript">
      {carouselScrollSnapSliderScript}
    </script>
    <script type="text/javascript">
      {sliderSimpleInitScript}
    </script>
  </Helmet>
);

const sliderSimpleInit = isUndefined; // Seems needed or get errors on line 35/36

const withCarouselInit: HOC = Component => {
  const WithCarouselInit = (props: any) => {
    const carouselRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
      // if (sliderSimpleInit !== 'undefined') {
      sliderSimpleInit(carouselRef.current);
      // }
    }, []);
    return (
      <Component forwardRef={carouselRef} {...props} />
    );
  };
  return WithCarouselInit;
};

/**
 * The starting components for each slot.
 */
const vitalCarouselComponents: VitalCarouselComponents = {
  Wrapper: Div,
  Script: CarouselScript,
  SliderWrapper: Div,
  Slider: Ul,
  Slide: Div,
  ControlsWrapper: Div,
  Indicator: Fragment,
  Prev: Fragment,
  Next: Fragment,
  NavWrapper: Fragment,
};

const VitalCarouselBase: FC<VitalCarouselBaseProps> = ({ components: C, ...rest }) => (
  <C.Wrapper {...rest}>
    <C.Script />
    <C.SliderWrapper>
      <C.Slider />
    </C.SliderWrapper>
    <C.ControlsWrapper>
      <C.Indicator />
      <C.NavWrapper>
        <C.Prev />
        <C.Next />
      </C.NavWrapper>
    </C.ControlsWrapper>
  </C.Wrapper>
);

const VitalCarouselClean = designable(vitalCarouselComponents, 'VitalCarousel')(VitalCarouselBase);

/**
 * A token creator that respects the VitalCarousel slots.
 *
 * @category Token Collection
 */
export const asVitalCarouselToken = asVitalTokenSpec<VitalCarouselComponents>();

export default VitalCarouselClean;

export {
  withCarouselInit,
};
