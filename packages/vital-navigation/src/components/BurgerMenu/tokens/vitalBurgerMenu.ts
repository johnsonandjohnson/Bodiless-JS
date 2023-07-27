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
import { vitalColor } from '@bodiless/vital-elements';
import { vitalButtons } from '@bodiless/vital-buttons';
import { asIsland } from '@bodiless/hydration';
import {
  addClassesIf,
  as,
} from '@bodiless/fclasses';
import { useIsBurgerMenuHidden, asBurgerMenuToggler } from '@bodiless/navigation';
import { vitalMenu } from '../../Menu';
import CloseIcon from '../assets/CloseIcon';
import { asBurgerMenuToken } from '../BurgerMenuClean';

/**
 * Token that produces the Base VitalDS Burger Menu.
 */
const Base = asBurgerMenuToken({
  Core: {
    _: as(
      asStatic
    ),
    MenuToggler: asBurgerMenuToggler,
  },
  Components: {
    Menu: vitalMenu.Burger,
    UtilityMenu: vitalMenu.Utility,
    WhereToBuy: vitalButtons.WhereToBuyWithoutIcon,
  },
  Layout: {
    Wrapper: 'w-full h-full fixed left-0 top-0 bottom-0 md:w-7/12 xl:hidden',
    Container: 'flex flex-col h-full max-h-screen',
    MenuTogglerWrapper: 'flex justify-end',
    MenuToggler: 'flex justify-center items-center',
    MenuWrapper: 'flex-grow overflow-y-auto',
    FooterWrapper: 'w-full flex flex-col items-center',
    ActionFooterContainer: 'w-full flex justify-center items-center',
    Overlay: 'w-full h-full fixed left-0 top-0 xl:hidden',
  },
  Spacing: {
    // @TODO: perhaps this should be an element spacing token like "LargeIconSize".
    MenuTogglerWrapper: 'mx-4 my-6',
    MenuToggler: 'w-6 h-6',
    MenuWrapper: 'px-9',
    FooterWrapper: 'px-9 py-6',
    ActionFooterContainer: 'mt-5',
  },
  Theme: {
    Wrapper: as(
      vitalColor.BgPrimaryCard,
      'z-20',
    ),
    FooterWrapper: as(
      // @TODO: Is this bg color name correct for this wrapper?
      vitalColor.BgPrimaryCard,
      // @TODO: Create tokens for borders?
      'border-t-2 border-vital-primary-page-bg',
    ),
    Overlay: 'z-10 bg-gray-112-10 backdrop-filter backdrop-blur-m-md backdrop-brightness-80',
  },
  Behavior: {
    _: asIsland('vitalBurgerMenu'),
    // Opens/closes burger menu.
    Wrapper: as(
      addClassesIf(useIsBurgerMenuHidden)('transform -translate-x-full'),
      'transition-all duration-200 ease-[cubic-bezier(.165,.84,.44,1)]',
    ),
    // Needs to hide it when menu is closed, otherwise it will not allow page interaction.
    Overlay: addClassesIf(useIsBurgerMenuHidden)('hidden'),
  },
  Content: {
    MenuToggler: withChild(CloseIcon),
  },
});

const Default = asBurgerMenuToken({
  ...Base,
});

export default {
  Base,
  Default,
};
