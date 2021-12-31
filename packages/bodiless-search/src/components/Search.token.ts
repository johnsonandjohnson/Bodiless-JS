/**
 * Copyright © 2021 Johnson & Johnson
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

import negate from 'lodash/negate';
import { addClasses, asToken, stylable } from '@bodiless/fclasses';
import { withChild, ifToggledOn } from '@bodiless/core';
import { isSearchToggleButtonExpanded } from './ResponsiveSearchBox';

// @ts-ignore Cannot find module.
import iconSearch from '../assets/search_black_24dp.csvg';
// @ts-ignore Cannot find module.
import iconClose from '../assets/close_black_24dp.csvg';

const IconSearch = addClasses('fill-current')(stylable(iconSearch));
const IconClose = addClasses('fill-current')(stylable(iconClose));

const withSearchIconSvg = asToken(
  addClasses('cursor-pointer align-middle'),
  withChild(IconSearch),
);

const withSearchToggleIconSvg = asToken(
  ifToggledOn(isSearchToggleButtonExpanded)(withChild(IconClose)),
  ifToggledOn(negate(isSearchToggleButtonExpanded))(withChild(IconSearch)),
);

export {
  withSearchIconSvg,
  withSearchToggleIconSvg,
};