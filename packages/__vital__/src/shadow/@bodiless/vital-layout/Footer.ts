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
import { asFooterToken } from '@bodiless/vital-layout';
import { vitalFooter } from '@bodiless/vital-layout/lib/base';
import { addProps } from '@bodiless/fclasses';
import { withLanguageNode } from '@bodiless/i18n';

// Setup the vital package to use the Rewards by default.
const Default = asFooterToken(vitalFooter.Default, {
  ...vitalFooter.WithRewardsExpanding2XL,
  Behavior: {
    Container: addProps({ 'data-shadowed-by': '__vital__Footer' }),
  },
  Schema: {
    _: withLanguageNode,
  },
});

export default {
  ...vitalFooter,
  Default,
};
