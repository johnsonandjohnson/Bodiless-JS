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

import { useListContext } from '@bodiless/components';
import { useEditContext, observer } from '@bodiless/core';
import type { HOC } from '@bodiless/fclasses';
import {
  addClasses,
  removeClassesIf,
  addClassesIf,
  withDesign,
  flowHoc,
} from '@bodiless/fclasses';

import withMenuContext, { useIsMenuOpen, useMenuContext } from './withMenuContext';
import withMenuDesign from './withMenuDesign';
import {
  asFlex, asRelative, withColumnDirectionStyles,
  withStaticOnHoverStyles,
} from '../token';
import { asAccessibleMenu, asAccessibleSubMenu, withAccessibleSubMenuAttr } from './asAccessibleMenu';
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

const asStaticOnHover = flowHoc(
  withStaticOnHoverStyles,
  removeClassesIf(useIsMenuOpen)('hover:static'),
);

const asFullWidthSublist = withDesign({
  Wrapper: addClasses('w-full left-0'),
});

const useIsSubmenuExpanded = () => {
  const { isActive, isEdit } = useEditContext();
  const { activeSubmenu } = useMenuContext();
  const { currentItem } = useListContext();
  return (activeSubmenu === currentItem) || (isEdit && isActive);
};

const useIsHoverEnabled = () => !useIsMenuOpen() && useMenuContext().activeSubmenu === undefined;

const useIsSubmenuContracted = () => {
  const { isActive, isEdit } = useEditContext();
  const { activeSubmenu } = useMenuContext();
  const { currentItem } = useListContext();
  const isNotActive = isEdit ? !isActive : true;
  return (activeSubmenu !== currentItem) && isNotActive;
};

const withHoverStyles = withDesign({
  OuterWrapper: flowHoc(
    addClassesIf(useIsHoverEnabled)('group'),
    observer as HOC,
  ),
  Wrapper: flowHoc(
    addClasses('group-hover:flex'),
    addClassesIf(useIsSubmenuContracted)('hidden'),
    observer as HOC,
    addClassesIf(useIsSubmenuExpanded)('flex'),
    observer as HOC,
  ),
});

/*
 * Base Menu Styles
 * ===========================================
 */
const withBaseMenuStyles = withDesign({
  Wrapper: flowHoc(asFlex, asRelative, withMenuContext),
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
const asListSubMenu = flowHoc(
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
const asFullWidthSubMenu = flowHoc(
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
 * @return HOC that applies default top navigation styles based on provided keys.
 */
const asTopNav = (...keys: string[]) => {
  const TopNavDesign: { [key: string]: HOC } = {
    Main: withMenuDesign('Main')(withBaseMenuStyles, asAccessibleMenu),
    List: withMenuDesign('List')(asListSubMenu),
    Cards: withMenuDesign('Cards')(asFullWidthSubMenu),
    Columns: flowHoc(
      withMenuDesign('Columns', 1)(asFullWidthSubMenu),
      withMenuDesign('Columns', 2)(withAccessibleSubMenuAttr),
    ),
  };

  return keys.length === 0
    ? flowHoc(TopNavDesign.Main)
    : flowHoc(...keys.map(key => TopNavDesign[key]));
};

export default asTopNav;
export {
  isMenuContextActive,
  isMenuContextNotActive,
  useIsSubmenuExpanded,
  useIsSubmenuContracted,
  useIsHoverEnabled,
};
