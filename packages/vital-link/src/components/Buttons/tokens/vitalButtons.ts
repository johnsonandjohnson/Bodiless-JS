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
  on,
  replaceWith,
  startWith,
  withProps,
} from '@bodiless/fclasses';
import { vitalColor, vitalTextDecoration, } from '@bodiless/vital-elements';
import { withPlaceholder } from '@bodiless/components';
import { vitalEditorPlain, EditorPlainClean } from '@bodiless/vital-editors';
import { asEditableLink } from '../../Link/util';
import { asLinkToken } from '../../Link/LinkClean';
import { CartIcon } from '../assets/CartIcon';

const Default = asLinkToken({
  Layout: {
    Wrapper: 'inline-block',
  },
  Theme: {
    Wrapper: 'rounded shadow-md transition duration-150 ease-in-out',
  },
  Spacing: {
    Wrapper: 'px-6 py-2.5',
  },
  Editors: {
    Body: on(EditorPlainClean)(vitalEditorPlain.Default),
  },
  Content: {
    Body: withPlaceholder('Link'),
  },
  Schema: {
    _: asEditableLink(),
  },
});

// Typography: font-medium text-xs leading-tight uppercase

// Hover: hover:bg-blue-700 hover:shadow-lg
// Focus: focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
// Active: active:bg-blue-800 active:shadow-lg

const Primary = asLinkToken({
  ...Default,
  Theme: {
    ...Default.Theme,
    Wrapper: as(
      vitalColor.BgPrimaryInteractive,
      'hover:shadow-lg',
    ),
    // Content: vitalColor.TextWhite,
  },
});

// Typography text-gray-800 font-medium text-xs leading-tight uppercase

// THeme: border-2 border-gray-800
// Theme rounded transition duration-150 ease-in-out
// Hover: hover:bg-black hover:bg-opacity-5
// Focus: focus:outline-none focus:ring-0

const Secondary = asLinkToken({
  ...Default,
  Theme: {
    ...Default.Theme,
    Wrapper: 'btn-primary',
  },
});

const WhereToBuy = asLinkToken({
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
      // @TODO: Create token? It should be same size for both mobile and desktop...
      'text-m-base',
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
const WhereToBuyWithoutIcon = asLinkToken({
  ...WhereToBuy,
  Components: {
    Icon: replaceWith(() => null),
  },
});

export default {
  Default,
  Primary,
  Secondary,
  WhereToBuy,
  WhereToBuyWithoutIcon,
};
