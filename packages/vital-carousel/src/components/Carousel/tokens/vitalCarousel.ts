import { withNodeKey } from '@bodiless/data';
import {
  Img, Div, as, on, replaceWith, stylable, flowHoc,
  withDesign,
  addProps,
} from '@bodiless/fclasses';
import { vitalImage } from '@bodiless/vital-image';
import { vitalCard, CardClean } from '@bodiless/vital-card';
import { asBodilessList } from '@bodiless/components';
import { vitalColor, vitalSpacing } from '@bodiless/vital-elements';
import { asVitalCarouselToken } from '../VitalCarouselClean';
import type { VitalCarousel } from '../types';
import { CAROUSEL_NODE_KEY } from '../../utils/constants';
import CarouselSlide from '../../utils/CarouselSlide';
import { CarouselThumbClean, vitalCarouselThumb } from '../../CarouselThumb';
import { CarouselDotClean, vitalCarouselDot } from '../../CarouselDot';
import PrevIcon from '../../assets/PrevIcon';
import NextIcon from '../../assets/NextIcon';
import UpIcon from '../../assets/UpIcon';
import DownIcon from '../../assets/DownIcon';

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
  A11y: {
    Wrapper: as(
      addProps({ role: 'region' }),
      addProps({ 'aria-label': 'carousel' }),
    ),
    Slider: withDesign({
      Item: addProps({ role: 'list' }),
    }),
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
    Slider: vitalSpacing.PaddingBottomMedium,
  },
});

const WithControls = asVitalCarouselToken({
  Components: {
    Indicator: as(
      replaceWith(Div),
      // Convert Indicators to List and use the same node key as slides to keep in sync
      asBodilessList(CAROUSEL_NODE_KEY, undefined, () => ({ groupLabel: 'Slide' })),
      'controls indicators',
      'align-center justify-center opacity-100',
    ),
  },
  A11y: {
    Indicator: as(
      addProps({ 'aria-label': 'Navigation Controls' }),
      addProps({ role: 'list' }),
    ),
  }
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
      Slider: as(
        '-multi',
        withDesign({
          Item: 'pe-2',
        }),
      ),
      ControlsWrapper: 'pt-2',
      Indicator: 'ps-2',
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

const WithVerticalThumbs = asVitalCarouselToken({
  Components: {
    NavWrapper: replaceWith(Div),
    Prev: replaceWith(UpIcon),
    Next: replaceWith(DownIcon),
  },
  Theme: {
    Prev: vitalColor.TextPrimaryInteractive,
    Next: vitalColor.TextPrimaryInteractive,
  },
  Layout: {
    Wrapper: 'md:flex md:flex-row-reverse',
    SliderWrapper: 'md:w-5/6',
    ControlsWrapper: 'md:w-1/6 flex-col',
    Indicator: 'flex flex-col',
    NavWrapper: 'flex flex-row justify-between'
  },
  Spacing: {
    ControlsWrapper: 'pr-16px',
    Indicator: withDesign({
      Item: 'pb-8px',
    }),
  },
});

const WithHorizontalThumbs = asVitalCarouselToken({
  Components: {
    NavWrapper: replaceWith(Div),
    Prev: replaceWith(PrevIcon),
    Next: replaceWith(NextIcon),
  },
  Theme: {
    Prev: vitalColor.TextPrimaryInteractive,
    Next: vitalColor.TextPrimaryInteractive,
  },
  Layout: {
    Wrapper: 'md:flex-col',
    SliderWrapper: '',
    ControlsWrapper: 'flex-row',
    Indicator: 'items-center',
  },
  Spacing: {
    ControlsWrapper: 'pt-6',
    Indicator: 'space-x-8px pe-8',
  },
});

const WithThumbnail = asVitalCarouselToken(
  WithControls,
  {
    Components: {
      Indicator: as(
        withDesign({
          // Replace list items with styled thumbs
          Item: on(CarouselThumbClean)(vitalCarouselThumb.Default),
        }),
      ),
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
      Indicator: 'flex',
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
    Wrapper: 'hidden md:flex lg:hidden'
  },
});

const TabletDesktopOnly = asVitalCarouselToken({
  Layout: {
    Wrapper: 'hidden md:flex'
  },
});

const DesktopOnly = asVitalCarouselToken({
  Layout: {
    Wrapper: 'hidden lg:flex'
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
  WithHorizontalThumbs,
  WithVerticalThumbs,
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
