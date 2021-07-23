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

import React, { ComponentType, FC, useRef } from 'react';
import {
  withParent, withPrependChild, useNode, useClickOutside,
} from '@bodiless/core';
import type { LinkData } from '@bodiless/components';
import {
  addProps,
  addPropsIf,
  addClasses,
  withDesign,
  asToken,
  Nav,
  Span,
  DesignableComponentsProps,
  designable,
  flowIf,
  not,
  startWith,
} from '@bodiless/fclasses';

import { useMenuContext } from './withMenuContext';
import { useSubmenuContext } from './withMenuItemContext';
import { DEFAULT_NODE_KEYS } from './MenuTitles';

const useHasSubmenu = () => useSubmenuContext().hasSubmenu;
const useIsSubmenuExpanded = () => useMenuContext().activeSubmenu !== undefined;
const useHasLink = () => {
  const { linkNodeKey } = DEFAULT_NODE_KEYS;
  const { node } = useNode();
  const linkHref = node.child<LinkData>(linkNodeKey);

  return Boolean(linkHref.data.href);
};

const ClickOutside = React.forwardRef<any, any>((props, ref) => {
  useClickOutside(ref as React.MutableRefObject<HTMLLIElement>, props.onClickOutside);
  return null;
});

// const withSubmenuToggle = (Component: ComponentType<any> | string) => (props: any) => {
//   const { activeSubmenu, setActiveSubmenu } = useMenuContext();
//   const { node } = useNode();
//   const nodeID = node.path[node.path.length - 1];

//   const toggleSubmenu = () => (
//     activeSubmenu === nodeID
//       ? setActiveSubmenu(undefined)
//       : setActiveSubmenu(nodeID)
//   );

//   return (
//     <button
//       type="button"
//       role="menuitem"
//       aria-label={useSubmenuContext().menuItemTitle}
//       aria-expanded={activeSubmenu === nodeID}
//       onClick={toggleSubmenu}
//     >
//       <Component {...props} tabIndex={-1} />
//     </button>
//   );
// };

const withSubmenuToggle = (Component: ComponentType<any> | string) => (props: any) => {
  const { activeSubmenu, setActiveSubmenu } = useMenuContext();
  const { node } = useNode();
  const nodeID = node.path[node.path.length - 1];

  const toggleSubmenu = () => (
    activeSubmenu === nodeID
      ? setActiveSubmenu(undefined)
      : setActiveSubmenu(nodeID)
  );

  return <Component {...props} onClick={toggleSubmenu} />;
};

const AccessibleMenuItem: FC<any> = props => {
  const { activeSubmenu, setActiveSubmenu } = useMenuContext();
  const { node } = useNode();
  const nodeID = node.path[node.path.length - 2];

  const ref = useRef(null);

  return (
    <>
      <li ref={ref} {...props} />
      {
        activeSubmenu === nodeID
          && <ClickOutside ref={ref} onClickOutside={() => setActiveSubmenu(undefined)} />
      }
    </>
  );
};

const withAccessibleSubmenuItem = withDesign({
  OuterWrapper: startWith(AccessibleMenuItem),
});

type SubmenuIndicatorComponents = {
  Button: ComponentType<any>,
  Title: ComponentType<any>,
};

type SubmenuIndicatorProps = DesignableComponentsProps<SubmenuIndicatorComponents>;

const SubmenuIndicatorBase: FC<SubmenuIndicatorProps> = ({ components: C, ...rest }) => (
  <C.Button {...rest}>
    <C.Title />
  </C.Button>
);

const SubmenuIndicatorComponents: SubmenuIndicatorComponents = {
  Button: Span,
  Title: Span,
};

/**
 * Clean component that renders Submenu Indicator.
 *
 * @see SubmenuIndicatorComponents for a list of design components.
 */
const SubmenuIndicatorClean = designable(SubmenuIndicatorComponents, 'SubmenuIndicator')(SubmenuIndicatorBase);
const SubmenuIndicator = asToken(
  withSubmenuToggle,
  withDesign({
    Button: addClasses('flex items-center'),
    Title: asToken(
      addClasses('material-icons'),
      addProps({ children: 'expand_more' }),
    ),
  }),
)(SubmenuIndicatorClean);

const withSubmenuIndicator = flowIf(useHasLink)(
  withPrependChild(SubmenuIndicator, 'SubmenuIndicator'),
);

/**
 * HOC that wrappes the component in a navigation region implemented with
 * a nav element that has an aria-label that matches the label on the menubar.
 */
const withMenuNav = asToken(
  withParent(Nav, 'Nav'),
  withDesign({
    Nav: asToken(
      addClasses('w-full'),
      addProps({ 'aria-label': 'Main Site Navigation Menu', role: 'navigation' }),
    ),
  }),
);

/**
 * Token that adds an accessibility attributes to the menu
 */
const withAccessibleMenuAttr = withDesign({
  Wrapper: addProps({ role: 'menubar', 'aria-label': 'Navigation Menu' }),
  Title: asToken(
    addProps({ role: 'menuitem', tabIndex: 0 }),
    flowIf(useHasSubmenu)(
      addProps({ 'aria-haspopup': 'true', 'aria-expanded': 'false' }),
      addPropsIf(useIsSubmenuExpanded)({ 'aria-expanded': 'true' }),
    ),
  ),
  Item: addProps({ role: 'none' }),
});

/**
 * Token that wraps menu in the Nav tag and adds an ability
 * to toggle submenus with a keyboard.
 */
const withAccessibleMenuInteractions = withDesign({
  Wrapper: withMenuNav,
  Title: flowIf(useHasSubmenu)(
    flowIf(not(useHasLink))(withSubmenuToggle),
  ),
});

/**
 * Token that makes menu accessible.
 * Wraps menu in Nav tag and adds keyboard interactions.
 */
const asAccessibleMenu = asToken(
  withAccessibleMenuAttr,
  withAccessibleMenuInteractions,
);

/**
 * HOC that adds the accessibility attributes to the Submenu Wrapper.
 * This includes 'role' and dynamic `aria-labelledby` that corresponds to
 * the menu Item this submenu belongs to.
 */
const withSubmenuWrapperAttrs = <P extends Object>(
  Component: ComponentType<P> | string,
) => (props: P) => (
  <Component role='menu' aria-labelledby={useSubmenuContext().menuItemId} {...props} />
);

/**
 * Token that adds an accessibility attributes to the Sub Menu.
 */
const withAccessibleSubMenuAttr = withDesign({
  Wrapper: withSubmenuWrapperAttrs,
  Title: addProps({ role: 'menuitem' }),
  Item: addProps({ role: 'none' }),
});

/**
 * Token that makes Sub Menu accessible.
 * It adds Sub Menu indicator to the main menu items that have submenus
 * and accessibility attributes to the submenu items.
 */
const asAccessibleSubMenu = asToken(
  withAccessibleSubmenuItem,
  withSubmenuIndicator,
  withAccessibleSubMenuAttr,
);

export {
  withAccessibleMenuAttr,
  withAccessibleSubMenuAttr,
  withAccessibleMenuInteractions,
  asAccessibleMenu,
  asAccessibleSubMenu,
};
