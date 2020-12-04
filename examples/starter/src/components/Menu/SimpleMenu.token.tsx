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

import { flow } from 'lodash';
import { withDesign, addClasses } from '@bodiless/fclasses';
import { withSimpleMenuDesign, useIsActiveTrail } from '@bodiless/organisms';

import { ifToggledOn } from '@bodiless/core';
import {
  asBold, asLightTealBackgroundOnHover, asLightTealBackground, asTealBackground, asTextWhite,
} from '../Elements.token';
import { asUnderline } from '../ElementDefault.token';

/**
 * Colors
 * ===========================================
 */

const withMenuBackground = asTealBackground;
const withActiveMenuBackground = asLightTealBackground;
const withHoverMenuBackground = asLightTealBackgroundOnHover;
const withMenuForeground = asTextWhite;

/**
 * Title Styles
 * ===========================================
 */

const withTitleStyles = flow(
  withHoverMenuBackground,
  addClasses('block w-full px-3'),
);

const withActiveTitleStyles = ifToggledOn(useIsActiveTrail)(
  withActiveMenuBackground, asBold, asUnderline,
);

const withActiveSubTitleStyles = ifToggledOn(useIsActiveTrail)(
  withActiveMenuBackground, asBold,
);

/**
 * Base Menu Styles
 * ===========================================
 */

const withBaseMenuStyles = withDesign({
  Wrapper: flow(
    withMenuBackground,
    withMenuForeground,
    addClasses('w-full'),
  ),
  Item: addClasses('leading-loose text-sm'),
  Title: flow(withTitleStyles, withActiveTitleStyles),
});

/**
 * Base Sub Menu Styles
 * ===========================================
 */

const withBaseSubMenuStyles = withDesign({
  Wrapper: withDesign({
    List: flow(
      withMenuBackground,
      withMenuForeground,
      addClasses('z-10'),
    ),
  }),
  Item: addClasses('leading-loose text-sm'),
  Title: flow(withTitleStyles, withActiveSubTitleStyles),
});

/**
 * Simple Menu Styles
 * ===========================================
 */

const withSimpleMenuStyles = flow(
  withSimpleMenuDesign(withBaseSubMenuStyles),
  withBaseMenuStyles,
);

export default withSimpleMenuStyles;
export {
  withBaseMenuStyles,
  withBaseSubMenuStyles,
};
