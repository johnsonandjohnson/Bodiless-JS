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

import { asElementToken, vitalColor } from '@bodiless/vital-elements';
import { as } from '@bodiless/fclasses';

/**
 * An element token which adds a separator border to a footer menu item.
 */
const FooterMenu = asElementToken({
  Meta: {
    title: 'FooterMenuSeparator',
    categories: {
      Type: ['Element'],
    },
  },
  Theme: {
    _: as(
      vitalColor.BorderSecondarySeparator,
      'border-b last:border-0',
      'md:border-b-0 md:border-r md:last:border-0',
    ),
  },
  Spacing: {
    _: as(
      'mb-7 pb-8 last:mb-0 last:pb-0',
      'md:mb-0 md:pb-0',
    ),
  },
});

const UtilityMenu = asElementToken({
  Meta: {
    title: 'UtilityMenuSeparator',
    categories: {
      Type: ['Element'],
    },
  },
  Theme: {
    // @TODO: Create divider tokens.
    _: as(
      'pr-5 lg:px-5 lg:py-2',
      'border-vital-primary-divider xl:border-l-2 border-r-2',
    ),
  },
});

// No Default exists yet and unique per use.
export default {
  FooterMenu,
  UtilityMenu,
};
