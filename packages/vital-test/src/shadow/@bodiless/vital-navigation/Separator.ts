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

import { vitalSeparator } from '@bodiless/vital-navigation/lib/base';
import { asElementToken } from '@bodiless/vital-elements';
import { addProps } from '@bodiless/fclasses';

const FooterMenu = asElementToken(vitalSeparator.FooterMenu, {
  Behavior: {
    _: addProps({ 'data-shadowed-by': '__vital__:FooterMenuSeparator' }),
  },
});
const UtilityMenu = asElementToken(vitalSeparator.UtilityMenu, {
  Behavior: {
    _: addProps({ 'data-shadowed-by': '__vital__:UtilityMenuSeparator' }),
  },
});

export default {
  ...vitalSeparator,
  FooterMenu,
  UtilityMenu,
};
