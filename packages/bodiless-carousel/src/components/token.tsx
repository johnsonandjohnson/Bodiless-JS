/**
 * Copyright © 2021 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { FC } from 'react';
import {
  withDesign,
  addProps,
  replaceWith,
  stylable,
  Ul,
  Li,
  addPropsIf,
  flowHoc,
  HOC,
} from '@bodiless/fclasses';
import { ifEditable, withChild } from '@bodiless/core';
import type { WithNodeKeyProps } from '@bodiless/data';
import { asBodilessList } from '@bodiless/components';
import negate from 'lodash/negate';
import {
  ButtonBack,
  ButtonNext,
  ButtonPlay,
} from 'pure-react-carousel';
import CarouselDot from './CarouselDot';
import { useIsCarouselItemActive } from './hooks';

const withIntrinsicHeight = withDesign({
  Wrapper: addProps({
    isIntrinsicHeight: true,
  }),
});

const withNoDragIfEditable = withDesign({
  Wrapper: ifEditable(
    addProps({
      dragEnabled: false,
    }),
  ),
});

const withNoAutoPlayIfEditable = withDesign({
  Wrapper: ifEditable(
    addProps({
      isPlaying: false,
    }),
  ),
});

const withDisabledPlayButtonIfEditable = withDesign({
  ButtonPlay: ifEditable(
    addProps({
      disabled: true,
    }),
  ),
});

const withInfinitiveLoop = withDesign({
  Wrapper: addProps({
    infinite: true,
  }),
});

const withCarouselDots = (nodeKeys?: WithNodeKeyProps) => flowHoc(
  withDesign({
    Dots: flowHoc(
      replaceWith(Ul),
      asBodilessList(nodeKeys, undefined, () => ({ groupLabel: 'Slide' })),
      withDesign({
        Item: replaceWith(
          withChild(
            stylable(CarouselDot), 'Dot',
          )(Li),
        ),
      }),
    ),
  }),
);

const withNavigationButtons = withDesign({
  ButtonBack: replaceWith(stylable(ButtonBack)),
  ButtonNext: replaceWith(stylable(ButtonNext)),
});

const withAutoPlayButton = flowHoc(
  withDesign({
    ButtonPlay: replaceWith(stylable(ButtonPlay)),
  }),
  withDisabledPlayButtonIfEditable,
);

const withAutoPlayInterval = (interval: number = 3000) => withDesign({
  Wrapper: addProps({
    interval,
  }),
});

const withCarouselItemTabIndex: HOC = Component => {
  const WithCarouselItemTabIndex: FC<any> = props => {
    const isItemActive = useIsCarouselItemActive();
    const tabIndex = isItemActive ? 0 : -1;
    return <Component {...props} tabIndex={tabIndex} />;
  };
  return WithCarouselItemTabIndex;
};

const asAccessibleCarouselButton = flowHoc(
  addProps({
    role: 'button',
  }),
);

const withAriaSelectedCarouselItem = flowHoc(
  addPropsIf(useIsCarouselItemActive)({
    'aria-selected': true,
    'aria-hidden': false,
  }),
  addPropsIf(negate(useIsCarouselItemActive))({
    'aria-selected': false,
    'aria-hidden': true,
  }),
);

const asAccessibleCarousel = withDesign({
  Slider: flowHoc(
    addProps({
      tabIndex: 'auto',
    }),
    withDesign({
      Item: flowHoc(
        withCarouselItemTabIndex,
        withAriaSelectedCarouselItem,
      ),
    }),
  ),
  ButtonBack: asAccessibleCarouselButton,
  ButtonNext: asAccessibleCarouselButton,
  Dots: withDesign({
    Item: flowHoc(
      withAriaSelectedCarouselItem,
      addProps({
        'aria-hidden': false,
        role: 'presentation',
      }),
      withDesign({
        Dot: asAccessibleCarouselButton,
      }),
    ),
  }),
  ButtonPlay: asAccessibleCarouselButton,
});

export {
  withIntrinsicHeight,
  withNoDragIfEditable,
  withInfinitiveLoop,
  withCarouselDots,
  withNavigationButtons,
  withAutoPlayButton,
  withAutoPlayInterval,
  asAccessibleCarousel,
  withNoAutoPlayIfEditable,
};
