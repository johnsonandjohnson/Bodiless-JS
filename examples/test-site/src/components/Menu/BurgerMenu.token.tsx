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

import { withPrependChild } from '@bodiless/core';
import {
  Div, asToken, replaceWith, startWith, withDesign, addClasses, withoutProps,
} from '@bodiless/fclasses';
import {
  asBurgerMenu, withMenuDesign, BurgerMenuDefaultToggler, asSlideLeft,
} from '@bodiless/navigation';

import { $withTitleEditors } from './Menu.token';
import Logo from '../Layout/logo';
import { asDefaultLogoStyle } from '../Layout/token';
import {
  asTealBackground, asTextWhite, asMobileOnly, asBold,
} from '../Elements.token';

/**
 * Tokens
 * ===========================================
 */
const $withTogglerStyles = asToken(
  withDesign({
    Button: asToken(asTextWhite, asMobileOnly),
    Wrapper: asToken(
      replaceWith(Div),
      asMobileOnly,
      addClasses('flex'),
    ),
  }),
);

const $withBurgerMenuHeaderStyles = asToken(
  asDefaultLogoStyle,
  withDesign({
    SiteReturn: asToken(
      withoutProps('design'),
      withPrependChild(BurgerMenuDefaultToggler, 'MenuToggler'),
      asTealBackground,
      withDesign({
        MenuToggler: $withTogglerStyles,
      }),
      addClasses('flex items-center justify-between'),
    ),
  }),
);

const $withBoldAccordionTitleStyles = withDesign({
  OuterWrapper: withDesign({
    Title: withDesign({
      Label: asBold,
    }),
  }),
});

const $withBaseSubMenuStyles = withDesign({
  Item: addClasses('pl-4'),
});

const $withColumnSubMenuStyles = withDesign({
  Item: addClasses('pl-8'),
});

const $withMenuStyles = asToken(
  asBurgerMenu('List', 'Columns', 'Touts'),
  withMenuDesign()($withTitleEditors),
  withMenuDesign(['List', 'Columns', 'Touts'])($withBaseSubMenuStyles, $withBoldAccordionTitleStyles),
  withMenuDesign('Columns')($withColumnSubMenuStyles),
);

const $withBurgerMenuStyles = asToken(
  withDesign({
    Menu: $withMenuStyles,
    Nav: addClasses('p-3'),
    Header: asToken(
      startWith(Logo),
      $withBurgerMenuHeaderStyles,
    ),
  }),
  asSlideLeft,
);

export {
  $withBurgerMenuStyles,
  $withTogglerStyles,
};
