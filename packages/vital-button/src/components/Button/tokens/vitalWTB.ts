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

import {
  as,
  replaceWith,
  startWith,
  withProps,
} from '@bodiless/fclasses';
import { vitalColor, vitalTextDecoration, vitalFontSize } from '@bodiless/vital-elements';
import { asButtonToken } from '../ButtonClean';
import { CartIcon } from '../assets/CartIcon';

const WhereToBuy = asButtonToken({
  Components: {
    Icon: startWith(CartIcon),
  },
  Layout: {
    Wrapper: 'w-full flex justify-center items-center max-w-64 h-12 lg:w-full',
  },
  Spacing: {
    Wrapper: 'mx-auto p-3',
    Icon: 'mr-3 xl:mr-0 2xl:mr-3',
  },
  Theme: {
    Wrapper: as(
      vitalColor.BgPrimaryInteractive,
      vitalColor.TextPrimaryFooterCopy,
      vitalTextDecoration.Bold,
      vitalTextDecoration.Uppercase,
      vitalFontSize.Base,
      'rounded',
    ),
    Icon: 'w-6 h-6',
    Body: 'leading xl:hidden 2xl:block',
  },
  Content: {
    _: withProps({
      children: 'Where to Buy',
    }),
    Wrapper: withProps({
      href: '/where-to-buy',
    }),
  },
});

/**
 * Token that provides the Where To Buy button without an icon.
 */
const WhereToBuyWithoutIcon = asButtonToken({
  ...WhereToBuy,
  Components: {
    Icon: replaceWith(() => null),
  },
});

export {
  WhereToBuy,
  WhereToBuyWithoutIcon,
};
