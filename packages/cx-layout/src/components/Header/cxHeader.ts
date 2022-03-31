/**
 * Copyright © 2022 Johnson & Johnson
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

import { withNodeKey } from '@bodiless/core';
import { cxColor } from '@bodiless/cx-elements';
import {
  A, addClasses, flowHoc, flowIf, replaceWith, Span,
  Ul, withDesign, withProps
} from '@bodiless/fclasses';
import {
  asBodilessLink, asBodilessList, asEditable, useListContext
} from '@bodiless/components';
import { asHeaderToken } from './HeaderClean';
import { cxLogo } from '../Logo';
import { cxMenuToggler } from '../MenuToggler';
import { cxDesktopSearch, cxSearchToggler } from '../Search';

// @todo replace UtilityMenu placeholder tokens
const UtilityMenuContainerPlaceholder = addClasses('flex')(Ul);
const UtilityMenuItemPlaceholder = flowHoc(
  asBodilessLink(),
  addClasses('px-4 border-l-2 border-gray-400'),
  // I'm sure there's a better way to get the first
  // list item, but this is just a placeholder, so...
  // Also, whoever's gonna implement this later: it's
  // probably better to use Tailwind's `first:`, but
  // you'll need to activate it in the config first.
  flowIf(() => {
    const { currentItem, items } = useListContext();
    return Boolean(items && currentItem === items[0]);
  })(addClasses('px-0')),
)(A);

/**
 * Token that defines a basic header.
 */
const Base = asHeaderToken({
  Components: {
    MenuToggler: cxMenuToggler.Default,
    SearchToggler: cxSearchToggler.Default,
    Logo: cxLogo.Default,
    DesktopSearch: cxDesktopSearch.Default,
    // @todo replace UtilityMenu placeholder
    UtilityMenu: replaceWith(flowHoc(
      asBodilessList(),
      withDesign({
        Title: flowHoc(
          replaceWith(UtilityMenuItemPlaceholder),
          asEditable('text', 'Menu Item')
        )
      })
    )(UtilityMenuContainerPlaceholder)),
    // @todo replace Menu placeholder
    Menu: flowHoc(
      replaceWith(Span),
      withProps({
        children: 'Main menu',
      })
    ),
    // @todo replace LanguageButton placeholder
    LanguageButton: flowHoc(
      replaceWith(Span),
      withProps({
        children: 'Español',
        className: 'px-4 border-l-2 border-gray-400'
      })
    ),
  },
  Theme: {
    Wrapper: cxColor.BgPrimaryCard,
  },
  Schema: {
    Logo: withNodeKey({ nodeKey: 'Logo' }),
    UtilityMenu: withNodeKey({ nodeKey: 'UtilityMenu' }),
  },
  Layout: {
    Container: 'container flex justify-between items-center',
    MenuContainer: 'hidden lg:flex justify-between items-center flex-grow',
    ActionMenuContainer: 'flex items-center',
  },
  Spacing: {
    Logo: withDesign({
      Wrapper: 'mx-4',
    }),
    Container: 'mx-auto py-4',
  }
});

const Default = asHeaderToken({
  ...Base,
});

export const cxHeader = {
  Base,
  Default,
};
