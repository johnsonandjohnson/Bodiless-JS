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

import BurgerMenuClean from './BurgerMenuClean';
import { BurgerMenuTogglerClean, BurgerMenuDefaultToggler } from './BurgerMenuToggler';
import asBurgerMenu, { withBurgerMenuWrapper, withOverviewLink } from './asBurgerMenu';
import {
  withBurgerMenuProvider, useBurgerMenuContext, useIsBurgerMenuVisible, useIsBurgerMenuHidden,
  useIsBurgerTransitionCompleted,
} from './BurgerMenuContext';

import {
  asSlideLeft,
} from './BurgerMenu.token';

export {
  BurgerMenuClean,
  asBurgerMenu,
  BurgerMenuDefaultToggler,
  BurgerMenuTogglerClean,
  withOverviewLink,
  withBurgerMenuWrapper,
  withBurgerMenuProvider,
  useBurgerMenuContext,
  useIsBurgerMenuVisible,
  useIsBurgerMenuHidden,
  useIsBurgerTransitionCompleted,
  asSlideLeft,
};

export type {
  BurgerMenuProps,
  BurgerMenuComponents,
} from './BurgerMenuClean';

export type {
  TogglerComponents,
} from './BurgerMenuToggler';
