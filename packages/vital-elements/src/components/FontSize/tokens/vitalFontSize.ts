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

import { addProps } from '@bodiless/fclasses';
import { asElementToken, asTokenGroup } from '../../../util';

import { FontSizeMeta } from '../meta';

const vitalFontSize = asTokenGroup(FontSizeMeta)({
  Base: 'text-m-base lg:text-base',
  XXXL: 'text-m-3xl lg:text-3xl',
  XXL: 'text-m-2xl lg:text-2xl',
  XL: 'text-m-xl lg:text-xl',
  L: 'text-m-lg lg:text-lg',
  XS: 'text-m-xs lg:text-xs',
  WithDemoContent: undefined,
  BurgerMenu: 'text-m-lg xl:text-lg',
});

vitalFontSize.WithDemoContent = asElementToken({
  Meta: {
    categories: {
      Type: ['Element'],
      Group: ['Demo'],
    },
  },
  Content: {
    _: addProps({ children: 'Lorem ipsum dolor sit amet.' }),
  }
});

export default vitalFontSize;
