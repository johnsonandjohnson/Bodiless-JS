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
  startWith,
  Button,
  addProps,
  flowHoc,
  TokenCollection,
} from '@bodiless/fclasses';
import { withPlaceholder } from '@bodiless/components';
import { vitalColor } from '@bodiless/vital-elements';
import { vitalEditorPlain, EditorPlainClean } from '@bodiless/vital-editors';
import { asEditableLink } from '@bodiless/vital-link';
import { withNodeKey } from '@bodiless/data';
import { ButtonComponent, ButtonToken, asButtonToken } from '../ButtonClean';
import { WhereToBuy, WhereToBuyWithoutIcon } from './vitalWTB';

const ButtonThemeStyle = as(
  'rounded-lg transition duration-400 ease-in-out',
  'focus:outline-none focus:ring-0',
  'leading-tight uppercase',
);

// const SecondaryButtonThemeStyle = as(
//   'focus:outline-none focus:ring-0',
//   'leading-tight uppercase',
//   'hover:opacity-80',
// );

const Default = asButtonToken({
  Layout: {
    Wrapper: 'flex group justify-center',
  },
  Theme: {
    // NOTE: Deprecated temporarily.
    // _: as(vitalLink.WithDownloadStyles, vitalLink.WithExternalStyles),
    Wrapper: ButtonThemeStyle,
  },
  Spacing: {
    Wrapper: 'px-6 py-4',
  },
  Components: {
    Body: on(EditorPlainClean)(vitalEditorPlain.Default),
  },
  Content: {
    Body: withPlaceholder('Link'),
  },
  Schema: {
    _: asEditableLink(),
    Body: withNodeKey('buttontext'),
  },
  A11y: {
    Wrapper: addProps({ role: 'button' }),
  },
  Meta: flowHoc.meta.term('Type')('Button'),
});

// NOTE: Deprecated temporarily.
// const WithArrow = asButtonToken({
//   Layout: {
//     Wrapper: 'flex-row-reverse',
//     Icon: 'inline-block',
//   },
//   Components: {
//     Icon: replaceWith(Span),
//   },
//   Theme: {
//     Icon: 'w-6 h-2 vital-arrow group-hover:text-current text-transparent',
//   },
//   Spacing: {
//     Icon: 'pr-1',
//     Wrapper: 'pl-12 pr-6 py-3.5 group',
//   },
//   Meta: flowHoc.meta.term('Style')('With Hover Arrow'),
// });

const Primary = asButtonToken(Default, {
  Theme: {
    Wrapper: as(
      vitalColor.BgPrimaryInteractive,
      vitalColor.TextWhite,
    ),
  },
  Meta: flowHoc.meta.term('Style')('Primary'),
});

const Secondary = asButtonToken(Default, {
  Theme: {
    Wrapper: as(
      'border-2',
      vitalColor.TextPrimaryInteractive,
      vitalColor.BorderPrimaryInteractive,
      vitalColor.SecondaryButtonInteractive,
    ),
  },
  Meta: flowHoc.meta.term('Style')('Secondary'),
});

const Tertiary = asButtonToken(Default, {
  Theme: {
    Wrapper: as(
      vitalColor.TextPrimaryInteractive,
    ),
  },
  Meta: flowHoc.meta.term('Style')('Tertiary'),
});

const PrimarySelected = asButtonToken(Default, {
  Theme: {
    Wrapper: as(
      vitalColor.BgButtonPrimarySelected,
      vitalColor.TextWhite,
    ),
  },
  Meta: flowHoc.meta.term('Style')('Primary Selected'),
});

const SecondarySelected = asButtonToken(Default, {
  Theme: {
    Wrapper: as(
      'border-2',
      vitalColor.TextSecondaryButtonSelected,
      vitalColor.BorderSecondaryButton,
      vitalColor.BgSecondaryButtonInteractive,
    ),
  },
  Meta: flowHoc.meta.term('Style')('Secondary Selected'),
});
const TertiarySelected = asButtonToken(Default, {
  Theme: {
    Wrapper: as(
      vitalColor.TextButtonSelected,
    ),
  },
  Meta: flowHoc.meta.term('Style')('Tertiary Selected'),
});

const WithDisabled = asButtonToken({
  // Replace the A with Button so disabled prop takes effect.
  Components: {
    Wrapper: startWith(Button),
  },
  Behavior: {
    Wrapper: addProps({ disabled: 'true' }),
  },
  Meta: flowHoc.meta.term('Style')('Disabled'),
});

interface VitalButton extends TokenCollection<ButtonComponent, {}> {
  Default: ButtonToken,
  Primary: ButtonToken,
  PrimarySelected: ButtonToken,
  Secondary: ButtonToken,
  SecondarySelected: ButtonToken,
  Tertiary: ButtonToken,
  TertiarySelected: ButtonToken,
  WithDisabled: ButtonToken,
  // WithArrow: ButtonToken,
  WhereToBuy: ButtonToken,
  WhereToBuyWithoutIcon: ButtonToken,
}

const vitalButton: VitalButton = {
  Default,
  Primary,
  PrimarySelected,
  Secondary,
  SecondarySelected,
  Tertiary,
  TertiarySelected,
  WithDisabled,
  // WithArrow,
  WhereToBuy,
  WhereToBuyWithoutIcon,
};

export default vitalButton;
