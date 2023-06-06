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

import { vitalRewardsBase } from '@bodiless/vital-layout/lib/base';
// @TODO Restore to enable multi-lingual support
// import {
//   addProps,
//   flowIf,
//   withProps,
// } from '@bodiless/fclasses';
// import { useLanguageContext } from '@bodiless/i18n';
// import { asRewardsToken } from '@bodiless/vital-layout';

// const isCurrentLanguageEs = () => useLanguageContext().getCurrentLanguage().name === 'es';

// const Default = asRewardsToken(vitalRewardsBase.Default, {
//   Content: {
//     Brand: flowIf(isCurrentLanguageEs)(
//       withProps({
//         children: 'Brand ES',
//       }),
//     ),
//   },
//   Behavior: {
//     Wrapper: addProps({ 'data-shadowed-by': '__vital__:Rewards' }),
//   },
// });

export default {
  ...vitalRewardsBase,
  // Default,
};
