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
import { useEditContext } from '@bodiless/core';
import {
  withDesign, addClasses, addClassesIf, removeClassesIf,
} from '@bodiless/fclasses';
import { withSubListDesign } from '@bodiless/components';

import { useIsMenuOpen } from './withMenuContext';
import {
  withBaseSubMenuStyles, withBaseMenuStyles, asSimpleSubMenu, asRelative,
  asAccessibleMenu, asAccessibleSubMenu,
} from './SimpleMenu.token';

/*
 * Utility Styles
 * ===========================================
 */
const isContextNotActive = () => {
  const { isActive, isEdit } = useEditContext();
  return isEdit ? !isActive : true;
};

const asStaticOnHover = withDesign({
  Wrapper: withDesign({
    WrapperItem: flow(
      addClasses('hover:static focus:static'),
      removeClassesIf(useIsMenuOpen)('hover:static focus:static'),
    ),
  }),
});

const asRelativeNotActive = withDesign({
  Wrapper: withDesign({
    WrapperItem: addClassesIf(isContextNotActive)('relative'),
  }),
});

const asFullWidthSublist = withDesign({
  Wrapper: withDesign({
    List: addClasses('w-full'),
  }),
});

/**
 * Accessibility Features
 * ===========================================
 */
const asAccessibleMegaMenu = flow(
  withSubListDesign(2)({
    List: asAccessibleSubMenu,
    Touts: asAccessibleSubMenu,
    Columns: flow(
      asAccessibleSubMenu,
      withDesign({
        Item: asAccessibleSubMenu,
      }),
    ),
  }),
  asAccessibleMenu,
);

/*
 * Touts Sub Menu Styles
 * ===========================================
 */
const asToutsSubMenu = flow(
  asFullWidthSublist,
  asStaticOnHover,
  withBaseSubMenuStyles,
  asRelativeNotActive,
);

/*
 * Columns Sub Menu Styles
 * ===========================================
 */
const asColumnSubMenu = flow(
  withDesign({
    Item: asRelative,
  }),
  asFullWidthSublist,
  asStaticOnHover,
  withBaseSubMenuStyles,
  asRelativeNotActive,
);

/*
 * Mega Menu Sub Menu Styles
 * ===========================================
 */
const asMegaMenuSubListStyles = withDesign({
  List: asSimpleSubMenu,
  Touts: asToutsSubMenu,
  Columns: asColumnSubMenu,
});

/*
 * Mega Menu Styles
 * ===========================================
 */
const asMegaMenuTopNav = flow(
  withDesign({
    Item: asMegaMenuSubListStyles,
  }),
  withBaseMenuStyles,
  asAccessibleMegaMenu,
);

export default asMegaMenuTopNav;
