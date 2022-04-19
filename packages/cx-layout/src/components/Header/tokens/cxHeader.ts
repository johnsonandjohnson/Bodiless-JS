/**
 * Copyright © 2022 Johnson & Johnson
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
  withChild,
  withNode,
  withNodeKey,
} from '@bodiless/core';
import { cxColor, cxSpacing } from '@bodiless/cx-elements';
import {
  cxBurgerMenu,
  cxMenu,
  asBurgerMenuToggler,
} from '@bodiless/cx-navigation';
import {
  Span,
  as,
  flowHoc,
  replaceWith,
  withDesign,
  withProps,
} from '@bodiless/fclasses';
import { cxLink } from '@bodiless/cx-link';
import { cxLogo } from '../../Logo';
import { cxDesktopSearch, cxSearchToggler } from '../../Search';
import { asHeaderToken } from '../HeaderClean';
import BurgerIcon from '../assets/BurgerIcon';

// @TODO: Get rid of this after language button is implemented.
const WithLanguageButton = flowHoc(
  replaceWith(Span),
  withProps({
    children: 'Español',
    // @TODO: Create divider tokens.
    // @TODO: Use existing tokens.
    className: 'text-m-base border-l-2 border-cx-primary-divider pl-5 lg:mr-5 lg:px-5 lg:py-2 lg:border-r-2',
  }),
);

/**
 * Token that defines a basic header.
 */
const Base = asHeaderToken({
  Core: {
    MenuToggler: asBurgerMenuToggler,
  },
  Components: {
    SearchToggler: cxSearchToggler.Default,
    Logo: cxLogo.Default,
    Menu: cxMenu.TopNav,
    BurgerMenu: flowHoc(
      as(cxBurgerMenu.Default),
      // @TODO: Is there a better way to inject WhereToBuy and (future) LanguageButton
      // components into the menu? Maybe, move the components to another package...
      withDesign({
        // @TODO: Replace LanguageButton placeholder.
        LanguageButton: WithLanguageButton,
      }),
    ),
    DesktopSearch: cxDesktopSearch.Default,
    UtilityMenu: cxMenu.Utility,
    // @TODO: Replace LanguageButton placeholder.
    LanguageButton: WithLanguageButton,
    WhereToBuy: cxLink.WhereToBuy,
  },
  Layout: {
    Container: 'flex justify-between items-center',
    MenuContainer: 'hidden lg:flex justify-between items-center flex-grow',
    ActionMenuContainer: 'flex items-center',
    MenuToggler: 'flex justify-center items-center',
    MenuTogglerWrapper: 'flex lg:hidden',
  },
  Spacing: {
    Container: as(
      cxSpacing.WithSiteMargin,
      cxSpacing.WithSiteXLConstraint,
      'py-3 lg:py-0',
    ),
    ActionMenuContainer: 'pl-5',
    // @todo perhaps this should be an element spcing token ike "LargeIconSize".
    MenuToggler: 'w-6 h-6',
    MenuTogglerWrapper: 'my-4',
  },
  Theme: {
    Wrapper: cxColor.BgPrimaryPage,
  },
  Schema: {
    Logo: withNodeKey({ nodeKey: 'Logo' }),
    _: withNode,
  },
  Content: {
    MenuToggler: withChild(BurgerIcon),
  },
});

const Default = asHeaderToken({
  ...Base,
});

const cxHeader = {
  Base,
  Default,
};

export default cxHeader;
