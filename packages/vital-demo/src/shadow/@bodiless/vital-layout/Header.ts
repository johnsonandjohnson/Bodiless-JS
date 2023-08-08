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

import { asHeaderToken } from '@bodiless/vital-layout';
import { vitalHeaderBase } from '@bodiless/vital-layout/lib/base';
import { LinkClean, vitalLink, asLinkToken } from '@bodiless/vital-link';
import { withoutHydration } from '@bodiless/hydration';
import { asLanguageSelector, withLanguageNode } from '@bodiless/i18n';
import {
  addProps,
  on,
  startWith,
  Div,
  Fragment,
  replaceWith,
} from '@bodiless/fclasses';

/**
 * To address the performance issues we disabled the Burger Menu and Hydration for Header.
 * @TODO: address by converting js functionality to css only.
 */
const DemoHeaderBase = asHeaderToken({
  ...vitalHeaderBase.Default,
  Core: {
    ...vitalHeaderBase.Default.Core,
    _: withoutHydration(),
  },
  Components: {
    ...vitalHeaderBase.Default.Components,
    BurgerMenu: replaceWith(Fragment),
    UtilityMenu: replaceWith(Fragment),
  },
});

export const asLanguageSelectorLink = on(LinkClean)(
  asLinkToken({
    ...vitalLink.Default,
    // Make the link not editable.
    Schema: {},
  }),
  asLanguageSelector
);

const Default = asHeaderToken(
  DemoHeaderBase,
  vitalHeaderBase.WithLanguageSelector,
  {
    Schema: {
      _: withLanguageNode,
    },
    Components: {
      LanguageSelectorWrapper: startWith(Div),
      LanguageSelector: asLanguageSelectorLink,
    },
    Behavior: {
      Wrapper: addProps({ 'data-shadowed-by': 'vital-demo:Header' }),
    },
  },
);

export default {
  ...vitalHeaderBase,
  Default,
};
