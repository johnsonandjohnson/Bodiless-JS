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

import { asStatic, withChild } from '@bodiless/core';
import { cxColor } from '@bodiless/cx-elements';
import { cxLink } from '@bodiless/cx-link';
import {
  addClassesIf,
  as,
  flowHoc,
} from '@bodiless/fclasses';
import { useIsBurgerMenuHidden, asBurgerMenuToggler } from '@bodiless/navigation';
import { cxMenu } from '../../Menu';
import CloseIcon from '../assets/CloseIcon';
import { asBurgerMenuToken } from '../BurgerMenuClean';

/**
 * Token that provides Push animation to the Burger Menu.
 */
const WithBurgerMenuPush = asBurgerMenuToken({
  Behavior: {
    Wrapper: flowHoc(
      addClassesIf(useIsBurgerMenuHidden)('transform -translate-x-full'),
      // @TODO: Maybe, put custom ease in tailwind theme configs?
      as('transition-all duration-200 ease-[cubic-bezier(.165,.84,.44,1)]'),
    ),
  },
});

/**
 * Token that produces the Base CanvasX Burger Menu.
 */
const Base = asBurgerMenuToken({
  Core: {
    _: asStatic,
    MenuToggler: asBurgerMenuToggler,
  },
  Components: {
    Menu: cxMenu.Burger,
    UtilityMenu: cxMenu.Utility,
    WhereToBuy: cxLink.WhereToBuy,
  },
  Layout: {
    Wrapper: 'w-full h-full fixed left-0 top-0 md:w-7/12 lg:hidden',
    Container: 'flex flex-col',
    FooterWrapper: 'w-full fixed left-0 bottom-0 flex flex-col items-center md:w-7/12',
    ActionFooterContainer: 'w-full flex justify-center items-center',
    Overlay: 'w-full h-full fixed left-0 top-0',
    MenuToggler: 'flex justify-center items-center',
    MenuTogglerWrapper: 'flex justify-end',
  },
  Spacing: {
    MenuWrapper: 'px-9',
    FooterWrapper: 'px-9 py-6',
    ActionFooterContainer: 'mt-5',
    // @TODO perhaps this should be an element spcing token ike "LargeIconSize".
    MenuToggler: 'w-6 h-6',
    MenuTogglerWrapper: 'flex justify-end mx-4 my-6',
  },
  Theme: {
    Wrapper: as(
      cxColor.BgPrimaryCard,
      'z-10',
    ),
    FooterWrapper: as(
      // @TODO: Is this bg color name correct for this wrapper?
      cxColor.BgPrimaryCard,
      // @TODO: Create tokens for borders?
      'border-t-2 border-cx-primary-page-bg',
    ),
    Overlay: 'z-5 bg-gray-112-10 backdrop-blur-m-md backdrop-brightness-80',
  },
  Behavior: {
    // Needs to hide it when menu is closed, otherwise it will not allow page interaction.
    Overlay: addClassesIf(useIsBurgerMenuHidden)('hidden'),
  },
  Content: {
    MenuToggler: withChild(CloseIcon),
  },
});

const Default = asBurgerMenuToken({
  ...Base,
  Compose: {
    WithBurgerMenuPush,
  },
});

export default {
  Base,
  Default,
};
