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

import { EditorPlainClean } from '@bodiless/cx-editors';
import { asCxTokenSpec } from '@bodiless/cx-elements';
import { LinkClean } from '@bodiless/cx-link';
import { replaceable, replaceWith, withDesign } from '@bodiless/fclasses';
import { MenuTitle } from '@bodiless/navigation';
import type { MenuTitleComponents } from '@bodiless/navigation';

const MenuTitleClean = withDesign({
  Link: replaceWith(LinkClean),
  Title: replaceWith(replaceable(EditorPlainClean)),
})(MenuTitle);

export const asMenuTitleToken = asCxTokenSpec<MenuTitleComponents>();

export default MenuTitleClean;
