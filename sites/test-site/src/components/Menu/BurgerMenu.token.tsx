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
  ifToggledOff, ifToggledOn, withAppendChild, withChild
} from '@bodiless/core';
import {
  Div, flowHoc, replaceWith, startWith, withDesign, addClasses, withoutProps,
} from '@bodiless/fclasses';
import {
  asBurgerMenu, withMenuDesign, BurgerMenuDefaultToggler, asSlideLeft, useIsBurgerMenuVisible,
} from '@bodiless/navigation';
import { asAccordionIconSvg } from '@bodiless/accordion';

import { $withTitleEditors } from './Menu.token';
import Logo from '../Layout/logo';
import { asDefaultLogoStyle } from '../Layout/token';
import {
  asTealBackground, asMobileOnly, asBold,
} from '../Elements.token';
import MenuIcon from './icons/Menu';
import CloseIcon from './icons/Close';

const OpenMenuIcon = addClasses('fill-current')(MenuIcon);
const CloseMenuIcon = addClasses('fill-current')(CloseIcon);

/**
 * Tokens
 * ===========================================
 */
const $withTogglerStyles = flowHoc(
  withDesign({
    Button: flowHoc(
      ifToggledOn(useIsBurgerMenuVisible)(withChild(CloseMenuIcon)),
      ifToggledOff(useIsBurgerMenuVisible)(withChild(OpenMenuIcon)),
      asMobileOnly,
    ),
    Wrapper: flowHoc(
      replaceWith(Div),
      asMobileOnly,
      addClasses('flex text-white'),
    ),
  }),
);

const $withBurgerMenuHeaderStyles = flowHoc(
  asDefaultLogoStyle,
  withDesign({
    SiteReturn: flowHoc(
      withoutProps('design'),
      withAppendChild(BurgerMenuDefaultToggler, 'MenuToggler'),
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
      Icon: asAccordionIconSvg,
    }),
  }),
});

const $withBaseSubMenuStyles = withDesign({
  Item: addClasses('pl-4'),
});

const $withColumnSubMenuStyles = withDesign({
  Item: addClasses('pl-8'),
});

const $withMenuStyles = flowHoc(
  asBurgerMenu('List', 'Columns', 'Cards'),
  withMenuDesign()($withTitleEditors),
  withMenuDesign(['List', 'Columns', 'Cards'])($withBaseSubMenuStyles, $withBoldAccordionTitleStyles),
  withMenuDesign('Columns')($withColumnSubMenuStyles),
);

const $withBurgerMenuStyles = flowHoc(
  withDesign({
    Menu: $withMenuStyles,
    Nav: addClasses('p-3'),
    Header: flowHoc(
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
