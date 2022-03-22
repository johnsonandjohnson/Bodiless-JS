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

import {
  withNode,
  withNodeKey,
} from '@bodiless/core';
import { cxColor } from '@bodiless/cx-elements';
import {
  cxMenu,
  cxMenuToggler,
  // cxUtilityMenu,
} from '@bodiless/cx-navigation';
import {
  Span,
  flowHoc,
  replaceWith,
  withDesign,
  withProps,
} from '@bodiless/fclasses';
import { asHeaderToken } from './HeaderClean';
import { cxLogo } from '../Logo';
import { cxDesktopSearch, cxSearchToggler } from '../Search';

/**
 * Token that defines a basic header.
 */
const Base = asHeaderToken({
  Components: {
    MenuToggler: cxMenuToggler.Default,
    SearchToggler: cxSearchToggler.Default,
    Logo: cxLogo.Default,
    Menu: cxMenu.TopNav,
    DesktopSearch: cxDesktopSearch.Default,
    UtilityMenu: cxMenu.Utility,
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
    Menu: withNodeKey({ nodeKey: 'MainMenu', nodeCollection: 'site' }),
    UtilityMenu: withNodeKey({ nodeKey: 'UtilityMenu', nodeCollection: 'site' }),
    _: withNode,
  },
  Layout: {
    Container: 'flex justify-between items-center',
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
