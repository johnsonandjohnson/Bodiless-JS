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

import { useIsMenuOpen } from './withMenuContext';
/*
 * Utility Styles
 * ===========================================
 */
const isContextActive = () => {
  const { isActive, isEdit } = useEditContext();
  return isEdit && isActive;
};

const asVerticalSubMenu = withDesign({
  Wrapper: withDesign({
    List: addClasses('flex-col'),
  }),
});

const asRelative = withDesign({
  Wrapper: withDesign({
    WrapperItem: addClasses('relative'),
  }),
});

const asExpandedOnActive = withDesign({
  Wrapper: withDesign({
    WrapperItem: addClassesIf(isContextActive)('overflow-visible'),
  }),
});

const asResponsiveSublist = withDesign({
  Wrapper: withDesign({
    List: addClasses('w-content min-w-full'),
  }),
});

/*
 * Base Menu Styles
 * ===========================================
 */
const withHoverStyles = withDesign({
  Item: flow(
    addClasses('hover:overflow-visible'),
    removeClassesIf(useIsMenuOpen)('hover:overflow-visible'),
  ),
});

const withBaseMenuStyles = flow(
  withHoverStyles,
  withDesign({
    Wrapper: addClasses('relative flex'),
    Item: addClasses('overflow-hidden'),
  }),
);

/*
 * Base Sub Menu Styles
 * ===========================================
 */
const withBaseSubMenuStyles = withDesign({
  Wrapper: withDesign({
    List: addClasses('flex absolute left-0'),
  }),
});

/*
 * Simple Sub Menu Styles
 * ===========================================
 */
const asSimpleSubMenu = flow(
  asResponsiveSublist,
  asVerticalSubMenu,
  withBaseSubMenuStyles,
  asExpandedOnActive,
  asRelative,
);

/*
 * Simple Menu Sub Menu Styles
 * ===========================================
 */
const asSimpleSubMenuStyles = withDesign({
  SubMenu: asSimpleSubMenu,
});

/*
 * Simple Menu Styles
 * ===========================================
 */
const asSimpleMenuTopNav = flow(
  withDesign({
    Item: asSimpleSubMenuStyles,
  }),
  withBaseMenuStyles,
);

export default asSimpleMenuTopNav;
export {
  withBaseSubMenuStyles,
  withBaseMenuStyles,
  asSimpleSubMenu,
  asRelative,
};
