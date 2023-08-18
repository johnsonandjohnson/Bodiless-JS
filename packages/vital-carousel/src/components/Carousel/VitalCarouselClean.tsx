import React, {
  FC, Fragment, useLayoutEffect, useRef
} from 'react';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import {
  designable, Div, Ul, HOC
} from '@bodiless/fclasses';
import { Helmet } from 'react-helmet';
import type { DesignableComponentsProps } from '@bodiless/fclasses';
import type { VitalCarouselComponents } from './types';
import { carouselScrollSnapSliderScript } from '../utils/ScrollSnapSlider';
import { sliderSimpleInitScript, sliderSimpleInit } from '../utils/sliderSimpleInit';

type VitalCarouselBaseProps = DesignableComponentsProps<VitalCarouselComponents>;

const CarouselScript = () => (process.env.NODE_ENV === 'production' ? (
  <Helmet>
    <script type="text/javascript">
      {carouselScrollSnapSliderScript}
    </script>
    <script type="text/javascript">
      {sliderSimpleInitScript}
    </script>
  </Helmet>
): <></>);

const withCarouselInit: HOC = Component => {
  const WithCarouselInit = (props: any) => {
    const carouselRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
      if (typeof sliderSimpleInit !== 'undefined' && carouselRef.current) {
        sliderSimpleInit(carouselRef.current);
      }
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
      <C.NavWrapper>
        <C.Prev />
      </C.NavWrapper>
      <C.Indicator />
      <C.NavWrapper>
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
