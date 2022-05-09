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
import { vitalHeaderBase, asHeaderToken } from '@bodiless/vital-layout';
import { LinkClean, vitalLink, asLinkToken } from '@bodiless/vital-link';
import { asLanguageSelector } from '@bodiless/i18n';
import {
  addProps, on, startWith, Div,
} from '@bodiless/fclasses';

export const asLanguageSelectorLink = on(LinkClean)(
  asLinkToken({
    ...vitalLink.Default,
    // Make the link not editable.
    Schema: {},
  }),
  asLanguageSelector
);

const WithLanguageSelector = asHeaderToken({
  Core: {
    _: addProps({ 'data-shadowed-by': '__vital__Header' }),
    LanguageSelectorWrapper: startWith(Div),
  },
  Components: {
    LanguageSelector: asLanguageSelectorLink,
  },
  Theme: {
    LanguageSelectorWrapper: 'lg:border-vital-primary-divider lg:border-r-2',
  },
  Spacing: {
    LanguageSelectorWrapper: 'pl-5 lg:mr-5 lg:px-5 lg:py-2',
  }
});

const Default = asHeaderToken(
  vitalHeaderBase.Default,
  WithLanguageSelector,
);

export default {
  ...vitalHeaderBase,
  Default,
};
