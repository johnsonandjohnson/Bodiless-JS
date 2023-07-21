import { withNodeKey } from '@bodiless/data';
import {
  Img, Div, as, on, replaceWith, stylable, flowHoc,
  withDesign,
  addProps,
} from '@bodiless/fclasses';
import { vitalImage } from '@bodiless/vital-image';
import { vitalCard, CardClean } from '@bodiless/vital-card';
import { asBodilessList } from '@bodiless/components';
import vitalCarouselTokens from '../../CarouselTokens';
import { asVitalCarouselToken } from '../VitalCarouselClean';
import type { VitalCarousel } from '../types';
import { CAROUSEL_NODE_KEY } from '../../utils/constants';
import CarouselSlide from '../../utils/CarouselSlide';
import { CarouselThumbClean, vitalCarouselThumb } from '../../CarouselThumb';
import { CarouselDotClean, vitalCarouselDot } from '../../CarouselDot';

// Using withDesign throughout file to target the list that is added by asBodilessList.

const Default = asVitalCarouselToken({
  // Core: {
  //   Wrapper: withCarouselInit,
  // },
  Components: {
    Slider: flowHoc(
      // Convert to Bodiless List with carousel node key
      asBodilessList(CAROUSEL_NODE_KEY, undefined, () => ({ groupLabel: 'Slide' })),
      withDesign({
        // Replaces Slide with LI that adds slide indexing
        Item: replaceWith(stylable(CarouselSlide)),
      }),
    ),
  },
  Behavior: {
    // Setup scroll snap behavior
    Wrapper: 'slider',
    Slider: as(
      'scroll-smooth snap-always snap-x',
      'scroll-snap-slider -simple',
      'scrollbar', // Colors the scrollbar
      withDesign({
        Item: as(
          'scroll-snap-slide',
          'snap-start',
        ),
      }),
    ),
  },
  Layout: {
    Slider: as(
      'flex flex-nowrap justify-normal overflow-x-auto',
      withDesign({
        Item: as(
          'items-center flex flex-col justify-center max-w-none',
          'shrink-0 grow-0',
        ),
      }),
    ),
  },
  Spacing: {
    // Padding under slider above controls
    Slider: vitalCarouselTokens.SpacingMedium,
  },
});

const WithControls = asVitalCarouselToken({
  Components: {
    Indicator: as(
      replaceWith(Div),
      // Convert Indicators to List and use the same node key as slides to keep in sync
      asBodilessList(CAROUSEL_NODE_KEY, undefined, () => ({ groupLabel: 'Slide' })),
      'controls indicators',
      'align-center flex-row justify-center opacity-100',
    ),
  },
});

const WithCarouselDots = asVitalCarouselToken(
  WithControls,
  {
    Components: {
      Indicator: withDesign({
        // Replace list items with styled dots
        Item: on(CarouselDotClean)(vitalCarouselDot.Default),
      }),
    },
    A11y: {
      Slider: withDesign({
        Item: addProps({ tabindex: '0' }),
      }),
    },
    Behavior: {
      Slider: 'scrollbar-hide lg:scrollbar-default',
    },
    Spacing: {
      Slider: as('-multi', vitalCarouselTokens.Spacing8),
      ControlsWrapper: 'pt-2',
      Indicator: vitalCarouselTokens.Spacing8,
    },
    Layout: {
      Slider: as(
        'w-screen md:w-full',
        withDesign({
          // Controls Responspivenes Behavior.
          // A setting of at mobile of w-5/6 gives peek of next slide.
          Item: 'w-5/6 md:w-1/3 lg:w-1/4',
        }),
      ),
      ControlsWrapper: 'flex',
      Indicator: 'flex items-center dots -simple lg:hidden',
    }
  }
);

const WithThumbnail = asVitalCarouselToken(
  WithControls,
  {
    Components: {
      Indicator: withDesign({
        // Replace list items with styled thumbs
        Item: on(CarouselThumbClean)(vitalCarouselThumb.Default),
      }),
    },
    Behavior: {
      Slider: 'scrollbar-hide',
    },
    Theme: {
      Slider: withDesign({
        Item: 'w-full',
      }),
    },
    Layout: {
      ControlsWrapper: 'flex justify-left',
      Indicator: 'flex items-center',
    },
    Spacing: {
      ControlsWrapper: 'pt-6',
      Indicator: vitalCarouselTokens.Spacing8,
    },
  }
);

const WithImageSlide = asVitalCarouselToken({
  Components: {
    Slider: withDesign({
      Title: on(Img)(
        vitalImage.Default,
        withNodeKey('image'),
      )
    }),
  }
});

const WithCardSlide = asVitalCarouselToken({
  Components: {
    Slider: withDesign({
      Title: on(CardClean)(
        vitalCard.Product,
        withNodeKey('card'),
      )
    }),
  },
});

// These are not ideal but allows to swap between tokens on responsive
const MobileOnly = asVitalCarouselToken({
  Layout: {
    Wrapper: 'md:hidden'
  },
});

const TabletOnly = asVitalCarouselToken({
  Layout: {
    Wrapper: 'hidden md:block lg:hidden'
  },
});

const TabletDesktopOnly = asVitalCarouselToken({
  Layout: {
    Wrapper: 'hidden md:block'
  },
});

const DesktopOnly = asVitalCarouselToken({
  Layout: {
    Wrapper: 'hidden lg:block'
  },
});

/**
 * Tokens for VitalCarouselClean
 *
 * @category Token Collection
 * @see [[VitalCarousel]]
 * @see [[VitalCarouselClean]]
 */
const vitalCarousel: VitalCarousel = {
  Default,
  // WithNavigationButtons,
  WithControls,
  WithCarouselDots,
  WithThumbnail,
  WithImageSlide,
  WithCardSlide,
  MobileOnly,
  TabletOnly,
  TabletDesktopOnly,
  DesktopOnly,
};

export default vitalCarousel;
