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
import { observer } from 'mobx-react-lite';

import {
  withDesign, addClassesIf, Design, stylable,
} from '@bodiless/fclasses';
import {
  withSidecarNodes, WithNodeKeyProps,
} from '@bodiless/core';
import {
  asBreadcrumb, useBreadcrumbContext, asBodilessList,
  withSubListDesign, withSubLists, asSubList, withDeleteNodeOnUnwrap,
} from '@bodiless/components';

import asStylableList from './asStylableList';
import withMenuContext from './withMenuContext';

/**
 * Creates a stylable sublist which deletes it's data when the last item is removed.
 * Suitable for use for all menus.
 */
const asMenuSubList = flow(
  asSubList,
  asStylableList,
  withDesign({
    Wrapper: withDesign({
      WrapperItem: stylable,
      List: stylable,
    }),
  }),
  withDeleteNodeOnUnwrap('sublist'),
);

/**
 * Applies the specified design to the main list and all sublists.
 *
 * @param design
 */
const withMenuDesign = (design: Design<any>) => {
  const withDesign$ = typeof design === 'function' ? design : withDesign(design);
  return flow(
    withSubListDesign(1)({
      SubMenu: withDesign$,
    }),
    withDesign$,
  );
};

/**
 * Bodiless HOC generator which creates the basic structure of the Mega Menu. The component
 * to which the HOC applies is irrelevant (it will be replaced by the Menu wrapper).
 *
 * The base mega menu serves as a base for various views on the Menu data, including
 * a site's main menu, a burger menu and breadcrumbs.
 *
 * @param nodeKeys The optional nodekeys specifying where the data should be stored.
 *
 * @return HOC which creates a basic mega menu list.
 */
const asMenuBase = (nodeKeys?: WithNodeKeyProps) => flow(
  asBodilessList(nodeKeys),
  asStylableList,
  withSubLists(1)({ SubMenu: asMenuSubList }),
  withMenuContext,
);

/**
 * HOC which can be applied to a base menu to make it into a site's breadcrumbs
 *
 * @param A base menu component created via asMenuBase()
 *
 * @return A clean (unstyled) site breadcrumb component.
 */
const asBreadcrumbsClean = withMenuDesign({
  Item: withSidecarNodes(asBreadcrumb('title$component')),
  Title: flow(
    addClassesIf(() => !useBreadcrumbContext().isActive)('hidden'),
    observer,
  ),
});

// @TODO Add a similar HOC for BurgerMenu, something like:
// const asMegaMenuClean = withMenuDesign({
//   WrapperItem: asAccodionTitle,
//   List: asAccordionBody,
// });

export {
  asMenuBase, asBreadcrumbsClean, withMenuDesign, asMenuSubList,
};
