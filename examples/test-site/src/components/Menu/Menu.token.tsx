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
  asToken, withDesign, addClasses, flowIf,
} from '@bodiless/fclasses';
import {
  asTopNav, useIsActiveTrail, withMenuDesign, withMenuTitleEditors,
} from '@bodiless/navigation';

import {
  asBold, asLightTealBackground, asAlignLeft,
  asLightTealBackgroundOnHover, asTealBackground, asTextWhite,
} from '../Elements.token';
import { asUnderline } from '../ElementDefault.token';
import { withMenuCardStyles } from '../Card/token';
import { withMenuCardsEditors } from '../Card/index';

/**
 * Colors
 * ===========================================
 */

const withMenuBackground = asTealBackground;
const withActiveMenuBackground = asLightTealBackground;
const withHoverMenuBackground = asLightTealBackgroundOnHover;

/**
 * Title Styles
 * ===========================================
 */

// We need to manually pass title Editors
const $withTitleEditors = withMenuTitleEditors();

const $withTitleStyles = withDesign({
  Title: asToken(
    withHoverMenuBackground,
    asAlignLeft,
    asTextWhite,
    addClasses('flex px-3'),
  ),
});

const withActiveTitleStyles = flowIf(useIsActiveTrail)(
  asUnderline, asBold, withActiveMenuBackground,
);

const withActiveSubTitleStyles = flowIf(useIsActiveTrail)(
  asBold, withActiveMenuBackground,
);

/**
 * Base Menu Styles
 * ===========================================
 */

const $withBaseMenuStyles = withDesign({
  Wrapper: asToken(
    withMenuBackground,
    addClasses('w-full'),
  ),
  Item: addClasses('leading-loose text-sm'),
  Title: withActiveTitleStyles,
});

/**
 * Base Sub Menu Styles
 * ===========================================
 */

const $withBaseSubMenuStyles = withDesign({
  Wrapper: asToken(
    withMenuBackground,
    addClasses('z-10'),
  ),
  Title: withActiveSubTitleStyles,
  SubmenuIndicator: addClasses('text-sm text-white'),
});

const $withListSubmenuStyles = withDesign({
  Wrapper: addClasses('w-content'),
});

const $withColumnsSublistStyles = withDesign({
  Title: addClasses('pl-6'),
});

const $withCardsSublistStyles = withDesign({
  Title: asToken(withMenuCardsEditors, withMenuCardStyles),
  Item: addClasses('w-1/3'),
  Wrapper: addClasses('flex-wrap'),
});

const $asNavStyles = asToken(
  asTopNav('Main', 'List', 'Columns', 'Cards'),
  withMenuDesign(['Main', 'List', 'Columns'])($withTitleEditors),
  withMenuDesign()($withTitleStyles),
  withMenuDesign('Main')($withBaseMenuStyles),
  withMenuDesign(['List', 'Columns', 'Cards'])($withBaseSubMenuStyles),
  withMenuDesign('Columns', 2)($withColumnsSublistStyles),
  withMenuDesign('List')($withListSubmenuStyles),
  withMenuDesign('Cards')($withCardsSublistStyles),
);

export default $asNavStyles;
export {
  $withTitleEditors,
  $withBaseMenuStyles,
  $withBaseSubMenuStyles,
  $withTitleStyles,
  $withListSubmenuStyles,
  $withColumnsSublistStyles,
};
