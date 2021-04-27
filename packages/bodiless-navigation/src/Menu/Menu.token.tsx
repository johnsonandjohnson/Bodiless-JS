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

import { useEditContext } from '@bodiless/core';
import {
  addClasses,
  removeClassesIf,
  addClassesIf,
  withDesign,
  asToken,
} from '@bodiless/fclasses';

import { useIsMenuOpen } from './withMenuContext';
import withMenuDesign from './withMenuDesign';
import {
  asFlex, asOverflowHidden, asRelative, asAbsolute,
  asPositionedLeft, withFullWidthStyles, withColumnDirectionStyles,
  withStaticOnHoverStyles, withVisibleOnHoverStyles,
} from '../token';

/*
 * Utility Styles
 * ===========================================
 */
const isContextActive = () => {
  const { isActive, isEdit } = useEditContext();
  return isEdit && isActive;
};

const isContextNotActive = () => {
  const { isActive, isEdit } = useEditContext();
  return isEdit ? !isActive : true;
};

const asVerticalSubMenu = withDesign({
  Wrapper: withColumnDirectionStyles,
});

const asVisibleOnActive = asToken(
  addClassesIf(isContextActive)('overflow-visible'),
);

const asResponsiveSublist = withDesign({
  Wrapper: asToken(
    addClasses('min-w-full'),
  ),
});

const asStaticOnHover = asToken(
  withStaticOnHoverStyles,
  removeClassesIf(useIsMenuOpen)('hover:static'),
);

const asRelativeNotActive = asToken(
  addClassesIf(isContextNotActive)('relative'),
);

const asFullWidthSublist = withDesign({
  Wrapper: withFullWidthStyles,
});

const withHoverStyles = withDesign({
  Item: asToken(
    withVisibleOnHoverStyles,
    removeClassesIf(useIsMenuOpen)('hover:overflow-visible'),
  ),
});

/*
 * Base Menu Styles
 * ===========================================
 */
const withBaseMenuStyles = asToken(
  withHoverStyles,
  withDesign({
    Wrapper: asToken(asFlex, asRelative),
    Item: asOverflowHidden,
  }),
);

/*
 * Base Sub Menu Styles
 * ===========================================
 */
const withBaseSubMenuStyles = withDesign({
  Wrapper: asToken(asFlex, asAbsolute, asPositionedLeft),
});

/*
 * List Sub Menu Styles
 * ===========================================
 */
const asListSubMenu = asToken(
  asResponsiveSublist,
  asVerticalSubMenu,
  withBaseSubMenuStyles,
  asVisibleOnActive,
  asRelative,
);

/*
 * Touts Sub Menu Styles
 * ===========================================
 */
const asToutsSubMenu = asToken(
  asFullWidthSublist,
  asStaticOnHover,
  withBaseSubMenuStyles,
  asRelativeNotActive,
);

/*
 * Columns Sub Menu Styles
 * ===========================================
 */
const asColumnSubMenu = asToken(
  asFullWidthSublist,
  asStaticOnHover,
  withBaseSubMenuStyles,
  asRelativeNotActive,
);

/**
 * Helper which allows specifying which submenu types should have default navigation styling added.
 *
 * @param keys List of the submenu key(s) to which the default menu styles be applied to.
 *
 * @return Token that applies default top navigation styles based on provided keys.
 */
const asTopNav = (...keys: string[]) => {
  const listSubmenuStyles = keys.indexOf('List') > -1 ? asListSubMenu : asToken({});
  const toutsSubmenuStyles = keys.indexOf('Touts') > -1 ? asToutsSubMenu : asToken({});
  const columnsSubmenuStyles = keys.indexOf('Columns') > -1 ? asColumnSubMenu : asToken({});

  return asToken(
    withMenuDesign('Main')(withBaseMenuStyles),
    withMenuDesign('List')(listSubmenuStyles),
    withMenuDesign('Touts')(toutsSubmenuStyles),
    withMenuDesign('Columns', 1)(columnsSubmenuStyles),
  );
};

export default asTopNav;
