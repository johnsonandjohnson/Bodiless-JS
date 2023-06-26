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

import { vitalBurgerMenuBase } from '@bodiless/vital-navigation/lib/base';
// import { on } from '@bodiless/fclasses';
// import { asBurgerMenuToken } from '@bodiless/vital-navigation';
// import { LinkClean, vitalLink, asLinkToken } from '@bodiless/vital-link';
// import { asLanguageSelector } from '@bodiless/i18n';

// @TODO Restore to enable multi-lingual support
// export const asLanguageSelectorLink = on(LinkClean)(
//   asLinkToken({
//     ...vitalLink.Default,
//     // Make the link not editable.
//     Schema: {},
//   }),
//   asLanguageSelector
// );
//
// const Default = asBurgerMenuToken(vitalBurgerMenuBase.Base, {
//   Components: {
//     LanguageSelector: asLanguageSelectorLink,
//   },
//   Spacing: {
//     LanguageSelector: 'pl-5',
//   },
// });

export default {
  ...vitalBurgerMenuBase,
  // Default,
};
