import { addProps, as } from '@bodiless/fclasses';

import { asCarouselDotToken } from '../CarouselDotClean';
import type { VitalCarouselDot } from '../types';

const Default = asCarouselDotToken({
  Theme: {
    Wrapper: 'indicator',
    Dot: as(
      'rounded-full border-none',
      // @TODO TOKEN PROBLEM IMPORT/VARIABLE NAME
      // vitalScrollIndicatorElement.LightThemeInactive = vitalColor.BorderLightThemeBase,
      // Token needs to change vitalColor.BackgroundLightThemeBase,
      'bg-kenvue-neutrals-light-grey',
    ),
  },
  A11y: {
    Wrapper: addProps({ tabIndex: '-1' }),
  },
  Layout: {
    // Hardcoded for now, site builders can override this.
    Dot: 'dot block w-[8px] h-[8px]',
  },
  Spacing: {
    Wrapper: 'pe-2',
  },
});

// Add additional variant tokens or variators here.
// ...

/**
 * Tokens for CarouselDotClean
 *
 * @category Token Collection
 * @see [[VitalCarouselDot]]
 * @see [[CarouselDotClean]]
 */
const vitalCarouselDot: VitalCarouselDot = {
  Default,
  // ...
};

export default vitalCarouselDot;
