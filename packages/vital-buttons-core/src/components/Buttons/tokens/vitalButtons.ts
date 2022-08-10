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
  Span,
  Button,
  addProps,
  flowHoc,
} from '@bodiless/fclasses';
import { vitalColor } from '@bodiless/vital-elements';
import { vitalLinkCore } from '@bodiless/vital-link-core';
import { asButtonToken } from '../ButtonClean';
import { WhereToBuy, WhereToBuyWithoutIcon } from './vitalWTB';

const ButtonThemeStyle = as(
  'rounded transition duration-150 ease-in-out',
  'focus:outline-none focus:ring-0',
  'leading-tight uppercase',
  'hover:opacity-80',
);

const Base = asButtonToken({
  Layout: {
    Wrapper: 'flex group justify-center',
  },
  Theme: {
    _: as(vitalLinkCore.WithDownloadStyles, vitalLinkCore.WithExternalStyles),
    Wrapper: ButtonThemeStyle,
  },
  Spacing: {
    Wrapper: 'px-6 py-3.5',
  },
  A11y: {
    Wrapper: addProps({ role: 'button' }),
  },
  Meta: flowHoc.meta.term('Type')('Buttons'),
});

const WithArrow = asButtonToken({
  Layout: {
    Wrapper: 'flex-row-reverse',
  },
  Components: {
    Icon: replaceWith(Span),
  },
  Theme: {
    Icon: 'vital-arrow group-hover:text-current text-transparent',
  },
  Spacing: {
    Icon: 'inline-block pr-1 w-6 h-2',
    Wrapper: 'pl-12 pr-6 py-3.5 group',
  },
  Meta: flowHoc.meta.term('Style')('With Hover Arrow'),
});

const WithPrimary = asButtonToken({
  Theme: {
    Wrapper: as(
      vitalColor.BgPrimaryInteractive,
      vitalColor.TextWhite,
    ),
  },
  Meta: flowHoc.meta.term('Style')('Primary'),
});

const Primary = asButtonToken(Base, WithPrimary);

const WithSecondary = asButtonToken({
  Theme: {
    Wrapper: as(
      'border-2',
      vitalColor.TextPrimaryInteractive,
      vitalColor.BorderPrimaryInteractive,
    ),
  },
  Meta: flowHoc.meta.term('Style')('Secondary'),
});

const Secondary = asButtonToken(Base, WithSecondary);

const WithPrimarySelected = asButtonToken({
  Theme: {
    Wrapper: as(
      vitalColor.BgButtonSelected,
      vitalColor.TextWhite,
    ),
  },
  Meta: flowHoc.meta.term('Style')('Primary Selected'),
});

const PrimarySelected = asButtonToken(Base, WithPrimarySelected);

const WithSecondarySelected = asButtonToken({
  Theme: {
    Wrapper: as(
      'border-2',
      vitalColor.TextButtonSelected,
      vitalColor.BorderButtonSelected,
    ),
  },
  Meta: flowHoc.meta.term('Style')('Secondary Selected'),
});

const SecondarySelected = asButtonToken(Base, WithSecondarySelected);

const WithDisabled = asButtonToken({
  // Replace the A with Button so disabled prop takes effect.
  Components: {
    Wrapper: startWith(Button),
  },
  Behavior: {
    Wrapper: addProps({ disabled: 'true' }),
  },
  Theme: {
    Wrapper: 'opacity-50 hover:opacity-50',
  },
  Meta: flowHoc.meta.term('Style')('Disabled'),
});

const Default = asButtonToken({
  ...Base,
});

export default {
  Default,
  Primary,
  WithPrimary,
  PrimarySelected,
  WithPrimarySelected,
  Secondary,
  WithSecondary,
  SecondarySelected,
  WithSecondarySelected,
  WithDisabled,
  WithArrow,
  WhereToBuy,
  WhereToBuyWithoutIcon,
};
