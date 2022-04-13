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

// Re-export navigation necessary modules to make burger menu work.
export {
  asBurgerMenuToggler,
  useIsBurgerMenuHidden,
  withBurgerMenuProvider,
} from '@bodiless/navigation';

// VitalNavigation components and tokens.
export { BurgerMenuClean, asBurgerMenuToken, vitalBurgerMenu } from './components/BurgerMenu';
export { MenuClean, asMenuToken, vitalMenu } from './components/Menu';
export { MenuTitleClean, asMenuTitleToken, vitalMenuTitle } from './components/MenuTitle';
export { asSubMenuToken, vitalSubMenu } from './components/SubMenu';

// VitalNavigation types.
export type { BurgerMenuComponents, BurgerMenuProps } from './components/BurgerMenu';
export type { MenuComponents } from './components/Menu';
export type { SubMenuComponents, SubMenuWrapperComponents } from './components/SubMenu';
