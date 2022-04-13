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

import { useIsBurgerMenuHidden, withBurgerMenuProvider } from '@bodiless/cx-navigation';
import {
  addProps,
  as,
  flowIf,
  not,
} from '@bodiless/fclasses';
import { asLayoutToken } from '../LayoutClean';
import { cxFooter } from '../../Footer';
import { cxHeader } from '../../Header';
import { cxHelmet } from '../../Helmet';
import { LayoutIds } from './constants';
import { StyleGuide } from './StyleGuide';

/**
  * Token that defines a basic layout.
  */
const Base = asLayoutToken({
  Core: {
    _: withBurgerMenuProvider,
  },
  Components: {
    Helmet: cxHelmet.Default,
  },
  Behavior: {
    Container: addProps({ id: LayoutIds.Content }),
    SkipToMainContent: as(
      addProps({
        href: `#${LayoutIds.Content}`,
        children: 'Skip To Main Content',
      }),
      'sr-only focus:not-sr-only',
    ),
  },
  Layout: {
    Helmet: flowIf(
      not(useIsBurgerMenuHidden),
    )(as(cxHelmet.WithFixedBody, cxHelmet.WithDesktopStatickBody)),
  },
  Theme: {
    OuterContainer: 'flex flex-col h-screen',
    ContainerWrapper: 'flex-grow',
  },
  Content: {
    Header: addProps({ id: LayoutIds.HeaderContent }),
  },
});

const Default = asLayoutToken({
  ...Base,
  Components: {
    ...Base.Components,
    Header: cxHeader.Default,
    Footer: cxFooter.Default,
  },
});

export default {
  Base,
  Default,
  StyleGuide,
};
