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
  Button,
  Span,
  // addProps,
} from '@bodiless/fclasses';
import { withPlaceholder } from '@bodiless/components';
import { vitalColor, vitalTextDecoration, } from '@bodiless/vital-elements';
import { vitalEditorPlain, EditorPlainClean } from '@bodiless/vital-editors';
import { asEditableLink } from '../../Link/util';
import { asLinkToken } from '../../Link/LinkClean';
import { CartIcon } from '../assets/CartIcon';

const Base = asLinkToken({
  Components: {
    Wrapper: replaceWith(Button),
    Icon: replaceWith(Span),
  },
  Layout: {
    Wrapper: 'flex flex-row-reverse group',
  },
  Theme: {
    Wrapper: as(
      'rounded shadow-md transition duration-150 ease-in-out',
      'focus:outline-none focus:ring-0',
      'leading-tight uppercase',
    ),
    Icon: 'group-hover:vital-download-link',
  },
  Spacing: {
    Wrapper: 'px-6 py-3.5',
    Icon: 'inline-block group-hover:px-1 group-hover:w-4 group-hover:h-2',
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

const Primary = asLinkToken({
  ...Base,
  Theme: {
    ...Base.Theme,
    Wrapper: as(
      vitalColor.BgPrimaryInteractive,
      vitalColor.TextWhite,
    ),
  },
});

const Secondary = asLinkToken({
  ...Base,
  Theme: {
    ...Base.Theme,
    Wrapper: as(
      vitalColor.TextPrimaryInteractive,
      vitalColor.BorderPrimaryInteractive,
    ),
  },
});

const PrimarySelected = asLinkToken({
  ...Base,
  Theme: {
    ...Base.Theme,
    Wrapper: as(
      vitalColor.BgButtonSelected,
      vitalColor.TextWhite,
    ),
  },
});
const SecondarySelected = asLinkToken({
  ...Base,
  Theme: {
    ...Base.Theme,
    Wrapper: as(
      vitalColor.TextButtonSelected,
      'border-2',
      vitalColor.BorderButtonSelected,
    ),
  },
});

const WithDisabled = asLinkToken({
  /*
  Component: {
    Wrapper: addProps({ disabled: 'true' }),
  },
  Theme: {
    Wrapper: 'opacity-50',
  },
  */
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

const Default = asLinkToken({
  ...Base,
});

export default {
  Default,
  Primary,
  PrimarySelected,
  Secondary,
  SecondarySelected,
  WithDisabled,
  WhereToBuy,
  WhereToBuyWithoutIcon,
};
