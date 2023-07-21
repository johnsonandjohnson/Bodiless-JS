import { addProps, as } from '@bodiless/fclasses';
import { asCarouselDotToken } from '../CarouselDotClean';
import type { VitalCarouselDot } from '../types';
import vitalCarouselTokens from '../../CarouselTokens';

const Default = asCarouselDotToken({
  Theme: {
    Wrapper: 'indicator',
    Dot: as(
      'rounded-full border-none',
      vitalCarouselTokens.ScrollIndicatorBackgroundInactive,
    ),
  },
  A11y: {
    Wrapper: addProps({ tabindex: '-1' }),
  },
  Layout: {
    // Hardcoded for now, site builders can override this.
    Dot: 'dot block w-[8px] h-[8px]',
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
