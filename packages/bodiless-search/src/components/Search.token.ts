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
import { addClasses, asToken } from '@bodiless/fclasses';
import { withChild, ifToggledOn } from '@bodiless/core';
import { isSearchToggleButtonExpanded } from './ResponsiveSearchBox';
import SearchIcon from '../icons/Search';
import CloseIcon from '../icons/Close';

const SearchButtonIcon = addClasses('fill-current')(SearchIcon);
const CloseButtonIcon = addClasses('fill-current')(CloseIcon);

const withSearchIconSvg = asToken(
  addClasses('cursor-pointer align-middle'),
  withChild(SearchButtonIcon),
);

const withSearchToggleIconSvg = asToken(
  ifToggledOn(isSearchToggleButtonExpanded)(withChild(CloseButtonIcon)),
  ifToggledOn(negate(isSearchToggleButtonExpanded))(withChild(SearchButtonIcon)),
);

export {
  withSearchIconSvg,
  withSearchToggleIconSvg,
};