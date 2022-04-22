/**
 * Copyright © 2020 Johnson & Johnson
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
  addClasses, addClassesIf, flowHoc, withDesign,
} from '@bodiless/fclasses';

import { useIsBurgerMenuVisible, useIsBurgerTransitionCompleted } from './BurgerMenuContext';
import {
  withLightGrayBg, withNoInsetStyles, withFullWidthStyles, withFullHeightStyles,
  asFixed, withFullZIndex, withPointerCursorStyles, asDisabled,
} from '../token';

const withSlideInOutAnimation = withDesign({
  Wrapper: flowHoc(
    addClasses('transform -translate-x-full'),
    // Since Burger Menu is Hidden by default,
    // we can not use useIsBurgerMenuHidden to add 'animate-slide-out'
    // since it will play the animation on initial render.
    // We use `useIsBurgerTransitionCompleted` to detect when Burger Menu
    // has completed all animations.
    addClassesIf(useIsBurgerTransitionCompleted)('animate-slide-out'),
    addClassesIf(useIsBurgerMenuVisible)('animate-slide-in'),
  ),
});

const asFullScreen = withDesign({
  Wrapper: flowHoc(
    withFullWidthStyles,
    withFullHeightStyles,
    withNoInsetStyles,
    asFixed,
    withFullZIndex,
    addClasses('overflow-y-scroll'),
  ),
});

const withDefaultBackground = withDesign({
  Wrapper: withLightGrayBg,
});

/**
 * A HOC that adds styles to the Button component of Burger Menu Toggler.
 * Adds pointer styles.
 *
 * @return HOC that adds styles to the Button component.
 */
const withBurgerMenuTogglerStyles = withDesign({
  Button: flowHoc(
    withPointerCursorStyles,
  ),
});

/**
 * A HOC that disables pointer events on the accordion Label element.
 *
 * @return HOC that disables pointer events on the accordion Label element.
 */
const withDisabledTitleLink = withDesign({
  Label: asDisabled,
});

/**
 * A HOC that adds styles and transitions needed for a slide-in animation for the Burger menu.
 *
 * @return HOC that applies required styles for slide-in animation.
 */
const asSlideLeft = flowHoc(
  withSlideInOutAnimation,
  asFullScreen,
  withDefaultBackground,
);

export {
  asSlideLeft,
  withDisabledTitleLink,
  withBurgerMenuTogglerStyles,
};
