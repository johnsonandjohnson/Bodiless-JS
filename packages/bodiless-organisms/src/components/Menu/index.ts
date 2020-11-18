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

import {
  asMenuBase as asMegaMenuBase,
  withMenuDesign as withMegaMenuDesign,
  asBreadcrumbsClean as asMegaMenuBreadcrumbs,
} from './MegaMenu';

import {
  asMenuBase as asSimpleMenuBase,
  withMenuDesign as withSimpleMenuDesign,
  asBreadcrumbsClean as asSimpleMenuBreadcrumbs,
} from './SimpleMenu';

import { useIsMenuOpen } from './withMenuContext';
import asSimpleMenuTopNav from './SimpleMenu.token';
import asMegaMenuTopNav from './MegaMenu.token';

export {
  asMenuTout,
  asMenuLink,
} from './MenuTitles';

export {
  asMegaMenuBase,
  withMegaMenuDesign,
  asMegaMenuBreadcrumbs,
};

export {
  asSimpleMenuBase,
  withSimpleMenuDesign,
  asSimpleMenuBreadcrumbs,
};

export {
  asSimpleMenuTopNav,
  asMegaMenuTopNav,
  useIsMenuOpen,
};

export * from './BurgerMenu';
