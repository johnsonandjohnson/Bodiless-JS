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

import {
  addClasses,
  addProps,
  withDesign,
  replaceWith,
  addPropsIf,
} from '@bodiless/fclasses';
import flow from 'lodash/flow';
import negate from 'lodash/negate';
import { ifToggledOn, withChild } from '@bodiless/core';
import {
  useIsCarouselItemActive,
  useCarouselIsPlaying,
} from '@bodiless/carousel';
import { asBodilessChameleon } from '@bodiless/components';
import MaterialIcon from '@material/react-material-icon';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { LandscapeImage, LandscapeLinkableImage } from '../Image';
import Tout from '../Tout';
import { Reponsive16By9YouTube } from '../YouTube';

const withImageSlide = withDesign({
  Slider: withDesign({
    Title: replaceWith(LandscapeImage),
  }),
});

const withChameleonSlide = withDesign({
  Slider: flow(
    asBodilessChameleon('cham-slide', { component: 'GatsbyImage' }),
    withDesign({
      Linkable: withDesign({
        Title: replaceWith(LandscapeLinkableImage),
      }),
      GatsbyImage: withDesign({
        Title: replaceWith(LandscapeImage),
      }),
      HorizontalTout: withDesign({
        Title: replaceWith(Tout),
      }),
      Video: withDesign({
        Title: replaceWith(Reponsive16By9YouTube),
      }),
    }),
  ),
});

const withAutoPlay = withDesign({
  Wrapper: addProps({
    isPlaying: true,
  }),
});

const withNavButtonStyles = addClasses('p-2 text-white uppercase bg-blue-700');

const withNavButtonsStyles = withDesign({
  SliderWrapper: addClasses('relative'),
  ButtonNext: flow(
    withNavButtonStyles,
    addClasses('absolute transform -translate-y-1/2 top-1/2 ltr:right-0 rtl:left-0 z-20'),
    addProps({
      children: 'Next',
    }),
  ),
  ButtonBack: flow(
    withNavButtonStyles,
    addClasses('absolute transform -translate-y-1/2 top-1/2 ltr:left-0 rtl:right-0 z-20'),
    addProps({
      children: 'Back',
    }),
  ),
});

const withControlsWrapperStyles = withDesign({
  ControlsWrapper: addClasses('flex justify-center pt-2'),
});

const withDotStyles = flow(
  withControlsWrapperStyles,
  withDesign({
    Dots: flow(
      addClasses('flex items-center'),
      withDesign({
        Item: withDesign({
          Dot: flow(
            addClasses('w-2 h-2 rounded-full mx-2 p-1 inline-block border-2 border-solid align-middle'),
            ifToggledOn(useIsCarouselItemActive)(
              addClasses('bg-blue-700'),
            ),
          ),
        }),
      }),
    ),
  }),
);

const withAutoPlayButtonStyles = flow(
  withControlsWrapperStyles,
  withDesign({
    ButtonPlay: flow(
      addClasses('ml-2 rounded-full p-1 block w-8'),
      addClasses('leading-none text-1xl bg-blue-700 text-white'),
      withChild(MaterialIcon),
      withDesign({
        Child: flow(
          addPropsIf(useCarouselIsPlaying)({
            icon: 'pause',
          }),
          addPropsIf(negate(useCarouselIsPlaying))({
            icon: 'play_arrow',
          }),
        ),
      }),
    ),
  }),
);

export {
  withImageSlide,
  withAutoPlay,
  withNavButtonsStyles,
  withDotStyles,
  withAutoPlayButtonStyles,
  withChameleonSlide,
};
