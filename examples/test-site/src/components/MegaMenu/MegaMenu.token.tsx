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
import { asToutHorizontal } from '@bodiless/organisms';
import { withDesign, addClasses } from '@bodiless/fclasses';

import { asToutWithPaddings, asToutDefaultStyle } from '../Tout/token';

/**
 * Base Menu Styles
 * ===========================================
 */
const withBaseMenuStyles = withDesign({
  Wrapper: addClasses('w-full bg-teal-600 text-white'),
  Item: addClasses('py-1 px-3 hover:bg-teal-500 min-w-100 leading-loose text-sm'),
});

/**
 * Base Sub Menu Styles
 * ===========================================
 */
const withBaseSubMenuStyles = withDesign({
  Wrapper: withDesign({
    List: addClasses('bg-teal-600 text-white my-1 z-10'),
  }),
  Item: addClasses('py-1 px-3 hover:bg-teal-500 min-w-100 leading-loose text-sm'),
});

/**
 * Simple Sub Menu Styles
 * ===========================================
 */
const asSimpleSubMenu = flow(
  withBaseSubMenuStyles,
);

/**
 * Touts Sub Menu Styles
 * ===========================================
 */
export const withMenuToutStyles = flow(
  asToutWithPaddings,
  asToutDefaultStyle,
  asToutHorizontal,
);

const withToutStyles = withDesign({
  Item: addClasses('w-1/3'),
});

const asToutsSubMenu = flow(
  withToutStyles,
  withBaseSubMenuStyles,
);

/**
 * Columns Sub Menu Styles
 * ===========================================
 */
// Since removeClasses doesn't work this will allow correct hover effects on column items.
const withColumnHoverEffect = withDesign({
  Wrapper: withDesign({
    WrapperItem: addClasses('hover:bg-teal-600'),
  }),
  Item: addClasses('hover:bg-teal-500'),
});

const withColumnStyles = flow(
  withDesign({
    Item: addClasses('pr-2 pl-5'),
  }),
  withColumnHoverEffect,
);

const asColumnSubMenu = flow(
  withDesign({
    Item: withColumnStyles,
  }),
  withBaseSubMenuStyles,
);

/**
 * Simple Menu Sub Menu Styles
 * ===========================================
 */
const asSimpleSubMenuStyles = withDesign({
  SubMenu: asSimpleSubMenu,
});

/**
 * Mega Menu Sub Menu Styles
 * ===========================================
 */

const asMegaMenuSubListStyles = withDesign({
  List: asSimpleSubMenu,
  Touts: asToutsSubMenu,
  Columns: asColumnSubMenu,
});

/**
 * Simple Menu Styles
 * ===========================================
 */
export const withSimpleMenuStyles = flow(
  withDesign({
    Item: asSimpleSubMenuStyles,
  }),
  withBaseMenuStyles,
);

/**
 * Mega Menu Styles
 * ===========================================
 */
export const withMegaMenuStyles = flow(
  withDesign({
    Item: asMegaMenuSubListStyles,
  }),
  withBaseMenuStyles,
);
