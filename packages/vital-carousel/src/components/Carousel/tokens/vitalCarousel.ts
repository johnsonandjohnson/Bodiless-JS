import { withNodeKey } from '@bodiless/data';
import {
  Img, Div, as, on, replaceWith, stylable, flowHoc,
  withDesign,
  addProps,
} from '@bodiless/fclasses';
import { vitalImage } from '@bodiless/vital-image';
import { vitalCard, CardClean } from '@bodiless/vital-card';
import { asBodilessList } from '@bodiless/components';
import { vitalColor, vitalImageCarouselElement, vitalSpacing } from '@bodiless/vital-elements';
import { withChild } from '@bodiless/core';
import { asVitalCarouselToken, withCarouselInit } from '../VitalCarouselClean';
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
  Theme: {
    Wrapper: 'slider',
  },
  Behavior: {
    // Setup scroll snap behavior
    Slider: as(
      'scroll-smooth snap-always snap-x',
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
    Slider: vitalSpacing.PaddingBottomSmall,
  },
});

const WithControls = asVitalCarouselToken({
  Components: {
    Indicator: as(
      replaceWith(Div),
      // Convert Indicators to List and use the same node key as slides to keep in sync
      asBodilessList(CAROUSEL_NODE_KEY, undefined, () => ({ groupLabel: 'Slide' })),
      'controls indicators list-none',
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
        Item: addProps({ tabIndex: '0' }),
      }),
    },
    Behavior: {
      Wrapper: withCarouselInit,
      Slider: 'scroll-snap-dot-slider scrollbar-hide lg:scrollbar-default',
    },
    Spacing: {
      Slider: withDesign({
        Item: 'pe-2',
      }),
      ControlsWrapper: 'pt-2',
      Indicator: 'ps-2',
    },
    Layout: {
      ControlsWrapper: 'flex justify-center',
      Indicator: 'flex items-center dots -simple lg:hidden',
    }
  }
);

const WithCarouselDotsNums = asVitalCarouselToken({
  Components: {
    Indicator: withDesign({
      // Replace list items with styled dots
      Item: on(CarouselDotClean)(vitalCarouselDot.Default, vitalCarouselDot.Counter),
    }),
  },
});

const WithCarouselDotsAllViewports = asVitalCarouselToken({
  Layout: {
    Slider: as(
      'w-screen md:w-full',
      withDesign({
        // Controls Responspiveness Behavior.
        // A setting of at mobile of w-5/6 gives peek of next slide.
        Item: 'w-5/6 md:w-1/3 lg:w-1/4',
      }),
    ),
  }
});

const WithCarouselDotsMobileTablet = asVitalCarouselToken({
  Layout: {
    Slider: as(
      'w-screen md:w-full',
      withDesign({
        // Controls Responspiveness Behavior.
        // A setting of at mobile of w-5/6 gives peek of next slide.
        Item: 'w-5/6 md:w-full',
      }),
    ),
  }
});

const WithVerticalThumbs = asVitalCarouselToken({
  Components: {
    NavWrapper: replaceWith(Div),
    Prev: replaceWith(as(withChild(UpIcon))(Div)),
    Next: replaceWith(as(withChild(DownIcon))(Div)),
  },
  Theme: {
    // @todo TOKEN PROBLEM IMPORT/VARIABLE NAME
    // icons need to be text color to fill ImageThumbnailBorderLightThemeActive
    // vitalImageCarouselElement.ImageThumbnailBorderLightThemeActive,
    Prev: vitalColor.TextInteractiveDarkIdle,
    Next: vitalColor.TextInteractiveDarkIdle,
  },
  Layout: {
    Wrapper: 'lg:flex lg:flex-row-reverse',
    SliderWrapper: 'lg:w-full',
    ControlsWrapper: 'lg:w-[122px] flex-col',
    Indicator: 'flex flex-col list-item',
    NavWrapper: 'flex flex-row justify-center thumbcontrols',
    Prev: 'arrow -prev',
    Next: 'arrow -next',
  },
  Spacing: {
    SliderWrapper: 'pl-24px',
    Indicator: withDesign({
      Item: vitalSpacing.PaddingBottomMedium,
    }),
    NavWrapper: vitalSpacing.PaddingBottomMedium,
  },
});

const WithHorizontalThumbs = asVitalCarouselToken({
  Components: {
    NavWrapper: replaceWith(Div),
    Prev: replaceWith(as(withChild(PrevIcon))(Div)),
    Next: replaceWith(as(withChild(NextIcon))(Div)),
  },
  Theme: {
    Prev: vitalColor.TextPrimaryInteractive,
    Next: vitalColor.TextPrimaryInteractive,
  },
  Layout: {
    Wrapper: 'lg:flex-col',
    SliderWrapper: '',
    ControlsWrapper: 'flex-row',
    Indicator: 'items-center',
    NavWrapper: 'flex flex-col justify-between thumbcontrols',
    Prev: 'arrow -prev',
    Next: 'arrow -next',
  },
  Spacing: {
    ControlsWrapper: 'pt-6',
    Indicator: 'space-x-8px pe-8px',
    NavWrapper: 'p-8px',
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
      Wrapper: withCarouselInit,
      Slider: 'scroll-snap-thumb-slider scrollbar-hide',
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

const MobileTabletOnly = asVitalCarouselToken({
  Layout: {
    Wrapper: 'lg:hidden'
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
  WithCarouselDotsNums,
  WithCarouselDotsAllViewports,
  WithCarouselDotsMobileTablet,
  WithThumbnail,
  WithImageSlide,
  WithCardSlide,
  MobileOnly,
  TabletOnly,
  MobileTabletOnly,
  TabletDesktopOnly,
  DesktopOnly,
};

export default vitalCarousel;
