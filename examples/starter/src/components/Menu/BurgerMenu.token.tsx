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
import {
  Div, asToken, replaceWith, withDesign, addClasses,
} from '@bodiless/fclasses';
import {
  asBurgerMenu, withSubMenuToken, withColumnSubMenuDesign,
  BurgerMenuDefaultToggler, withBurgerMenuToggler, asSlideLeft,
} from '@bodiless/navigation';

import Logo from '../Layout/logo';
import { asDefaultLogoStyle } from '../Layout/token';
import {
  asTealBackground, asTextWhite, asMobileOnly, asBold,
} from '../Elements.token';

const $asSiteToggler = asToken(
  withDesign({
    Button: asToken(asTextWhite, asMobileOnly),
    Wrapper: flow(
      replaceWith(Div),
      asMobileOnly,
      addClasses('flex'),
    ),
  }),
);

const withTogglerWrapper = asToken(
  withDesign({
    Wrapper: flow(
      asTealBackground,
      addClasses('w-full py-1'),
    ),
  }),
);

const withBurgerMenuHeader = withDesign({
  Header: flow(
    replaceWith(Logo),
    asDefaultLogoStyle,
    withDesign({
      SiteReturn: flow(
        withBurgerMenuToggler(
          $asSiteToggler(BurgerMenuDefaultToggler),
        ),
        asTealBackground,
        addClasses('flex items-center justify-between'),
      ),
    }),
  ),
});

const $withBoldAccordionTitle = withDesign({
  Wrapper: withDesign({
    Title: withDesign({
      Label: asBold,
    }),
  }),
});

const $withBaseSubMenuStyles = withDesign({
  Item: addClasses('pl-4'),
});

const $withColumnSubMenuStyles = withColumnSubMenuDesign(
  withDesign({
    Item: addClasses('pl-8'),
  }),
  $withBoldAccordionTitle,
);

const $withBurgerMenuStyles = asToken(
  asBurgerMenu('List', 'Columns', 'Touts'),
  withSubMenuToken('List', 'Columns', 'Touts')($withBaseSubMenuStyles, $withBoldAccordionTitle),
  withSubMenuToken('Columns')($withColumnSubMenuStyles),
);

const $asSiteBurgerMenu = flow(
  withBurgerMenuHeader,
  withDesign({
    Menu: $withBurgerMenuStyles,
    Nav: addClasses('p-3'),
  }),
  asSlideLeft,
);

export {
  withTogglerWrapper,
  $asSiteBurgerMenu,
  $asSiteToggler,
};
