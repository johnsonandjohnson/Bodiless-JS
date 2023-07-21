import { vitalImage } from '@bodiless/vital-image';
import { addProps } from '@bodiless/fclasses';
import { asCarouselThumbToken } from '../CarouselThumbClean';
import type { VitalCarouselThumb } from '../types';

const Default = asCarouselThumbToken({
  Components: {
    Image: vitalImage.Default,
  },
  Theme: {
    Wrapper: 'border-none thumbs indicator',
  },
  A11y: {
    Wrapper: addProps({ tabindex: '0' }),
  },
  Layout: {
    Wrapper: 'block',
    // Fixed width for now. Site builder can override if they choose
    Image: 'w-[94px] h-[94px]',
  },
  Behavior: {
    Image: 'cursor-pointer'
  },
});

// Add additional variant tokens or variators here.
// ...

/**
 * Tokens for CarouselThumbClean
 *
 * @category Token Collection
 * @see [[VitalCarouselThumb]]
 * @see [[CarouselThumbClean]]
 */
const vitalCarouselThumb: VitalCarouselThumb = {
  Default,
  // ...
};

export default vitalCarouselThumb;
