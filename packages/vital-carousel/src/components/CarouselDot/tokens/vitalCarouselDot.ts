import {
  addProps, as,
} from '@bodiless/fclasses';
import { asCarouselDotToken } from '../CarouselDotClean';
import type { VitalCarouselDot } from '../types';

const Default = asCarouselDotToken({
  Theme: {
    DotWrapper: 'indicator',
    Dot: as(
      'rounded-full border-none',
      // @todo TOKEN PROBLEM IMPORT/VARIABLE NAME
      // vitalScrollIndicatorElement.LightThemeInactive = vitalColor.BorderLightThemeBase,
      // Token needs to change vitalColor.BackgroundLightThemeBase,
      'bg-kenvue-neutrals-light-grey',
    ),
  },
  A11y: {
    DotWrapper: addProps({ tabIndex: '-1' }),
  },
  Layout: {
    // Hardcoded for now, site builders can override this.
    Dot: 'dot block w-[8px] h-[8px]',
    DotWrapper: 'flex justify-center align-center',
  },
  Spacing: {
    DotWrapper: 'pe-2',
  },
});

/**
 * Tokens for CarouselDotClean
 *
 * @category Token Collection
 * @see [[VitalCarouselDot]]
 * @see [[CarouselDotClean]]
 */
const vitalCarouselDot: VitalCarouselDot = {
  Default,
};

export default vitalCarouselDot;
