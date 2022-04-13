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

import { withParent } from '@bodiless/core';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { Nav, Ul, flowHoc } from '@bodiless/fclasses';
import { asBodilessMenu } from '@bodiless/navigation';
import type { MenuComponents } from './types';

/**
 * A clean menu for use with all navigation elements.
 */
const MenuClean = flowHoc(
  asBodilessMenu(),
  withParent(Nav, 'Nav', 'Menu'),
)(Ul);

export const asMenuToken = asVitalTokenSpec<MenuComponents>();

export default MenuClean;
