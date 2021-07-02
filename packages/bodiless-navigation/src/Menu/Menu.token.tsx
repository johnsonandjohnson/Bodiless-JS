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

import { useEditContext, useNode } from '@bodiless/core';
import type { Token } from '@bodiless/fclasses';
import {
  addClasses,
  removeClassesIf,
  addClassesIf,
  withDesign,
  asToken,
  not,
} from '@bodiless/fclasses';

import withMenuContext, { useIsMenuOpen, useMenuContext } from './withMenuContext';
import withMenuDesign from './withMenuDesign';
import {
  asFlex, asRelative, withColumnDirectionStyles,
  withStaticOnHoverStyles,
} from '../token';
import { asAccessibleMenu, asAccessibleSubMenu } from './asAccessibleMenu';
import { withSubmenuContext } from './withMenuItemContext';

/*
 * Utility Styles
 * ===========================================
 */
const isMenuContextActive = () => {
  const { isActive, isEdit } = useEditContext();
  return isEdit && isActive;
};

const isMenuContextNotActive = () => {
  const { isActive, isEdit } = useEditContext();
  return isEdit ? !isActive : true;
};

const asVerticalSubMenu = withDesign({
  Wrapper: withColumnDirectionStyles,
});

const asResponsiveSublist = withDesign({
  Wrapper: addClasses('min-w-full'),
});

const asStaticOnHover = asToken(
  withStaticOnHoverStyles,
  removeClassesIf(useIsMenuOpen)('hover:static'),
);

const asFullWidthSublist = withDesign({
  Wrapper: addClasses('w-full left-0'),
});

const useIsSubmenuExpanded = () => {
  const { isActive, isEdit } = useEditContext();
  const { activeSubmenu } = useMenuContext();

  const { node } = useNode();
  const parentNodeId = node.path[node.path.length - 2];

  return (activeSubmenu === parentNodeId) || (isEdit && isActive);
};

const useIsSubmenuContracted = () => {
  const { isActive, isEdit } = useEditContext();
  const { activeSubmenu } = useMenuContext();
  const isNotActive = isEdit ? !isActive : true;

  const { node } = useNode();
  const parentNodeId = node.path[node.path.length - 2];

  return (activeSubmenu !== parentNodeId) && isNotActive;
};

const withHoverStyles = withDesign({
  OuterWrapper: addClassesIf(not(useIsMenuOpen) && useIsSubmenuContracted)('group'),
  Wrapper: asToken(
    addClasses('group-hover:flex'),
    addClassesIf(useIsSubmenuContracted)('hidden'),
    addClassesIf(useIsSubmenuExpanded)('flex'),
  ),
});

/*
 * Base Menu Styles
 * ===========================================
 */
const withBaseMenuStyles = withDesign({
  Wrapper: asToken(asFlex, asRelative, withMenuContext),
  Item: asFlex,
});

/*
 * Base Sub Menu Styles
 * ===========================================
 */
const withBaseSubMenuStyles = withDesign({
  OuterWrapper: withSubmenuContext,
  Wrapper: addClasses('absolute top-full'),
  SubmenuIndicator: addClasses('flex items-center'),
});

/*
 * List Sub Menu Styles
 * ===========================================
 */
const asListSubMenu = asToken(
  withBaseSubMenuStyles,
  asAccessibleSubMenu,
  asResponsiveSublist,
  asVerticalSubMenu,
  withHoverStyles,
  asRelative,
);

/*
 * Full Width Submenu Styles
 * ===========================================
 */
const asFullWidthSubMenu = asToken(
  withBaseSubMenuStyles,
  asAccessibleSubMenu,
  asFullWidthSublist,
  asStaticOnHover,
  withHoverStyles,
);

/**
 * Helper which allows specifying which submenu types should have default navigation styling added.
 *
 * @param keys List of the submenu key(s) to which the default menu styles be applied to.
 *
 * @return Token that applies default top navigation styles based on provided keys.
 */
const asTopNav = (...keys: string[]) => {
  const TopNavDesign: { [key: string]: Token } = {
    Main: withMenuDesign('Main')(withBaseMenuStyles, asAccessibleMenu),
    List: withMenuDesign('List')(asListSubMenu),
    Cards: withMenuDesign('Cards')(asFullWidthSubMenu),
    Columns: withMenuDesign('Columns', 1)(asFullWidthSubMenu),
  };

  return keys.length === 0
    ? asToken(TopNavDesign.Main)
    : asToken(...keys.map(key => TopNavDesign[key]));
};

export default asTopNav;
export {
  isMenuContextActive,
  isMenuContextNotActive,
  useIsSubmenuExpanded,
  useIsSubmenuContracted,
};
