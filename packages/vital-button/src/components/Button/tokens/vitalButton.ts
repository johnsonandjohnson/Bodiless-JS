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
import { vitalEditorPlain, EditorPlainClean } from '@bodiless/vital-editors';
import { asEditableLink } from '@bodiless/vital-link';
import { withNodeKey } from '@bodiless/data';
import { ButtonComponent, ButtonToken, asButtonToken } from '../ButtonClean';
import { WhereToBuy, WhereToBuyWithoutIcon } from './vitalWTB';
import vitalButtonTokens from '../../ButtonTokens';

const Default = asButtonToken({
  Layout: {
    Wrapper: 'flex group justify-center',
  },
  Theme: {
    // NOTE: Deprecated temporarily.
    // _: as(vitalLink.WithDownloadStyles, vitalLink.WithExternalStyles),
    Wrapper: as(
      vitalButtonTokens.BorderRadiusButton,
      vitalButtonTokens.ShadowButtonFocus,
    ),
    Body: vitalButtonTokens.TextButtonDefault,
  },
  Spacing: {
    Wrapper: vitalButtonTokens.BorderPaddingButton,
  },
  Components: {
    Body: on(EditorPlainClean)(vitalEditorPlain.Default),
  },
  Content: {
    Body: withPlaceholder('Button'),
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
      vitalButtonTokens.ColorButtonPrimaryBackgroundDefault,
      vitalButtonTokens.ColorButtonPrimaryBackgroundHover,
      vitalButtonTokens.ColorButtonPrimaryBackgroundFocus,
      vitalButtonTokens.ColorButtonPrimaryBackgroundPressed,
    ),
    Body: vitalButtonTokens.ColorButtonPrimaryTextDefault,
  },
  Meta: flowHoc.meta.term('Style')('Primary'),
});

const Secondary = asButtonToken(Default, {
  Theme: {
    Wrapper: as(
      vitalButtonTokens.BorderButtonSecondaryDefault,
      vitalButtonTokens.BorderButtonSecondaryHover,
      vitalButtonTokens.BorderButtonSecondaryFocus,
      vitalButtonTokens.BorderButtonSecondaryPressed,
      vitalButtonTokens.ColorButtonSecondaryBackgroundHover,
      vitalButtonTokens.ColorButtonSecondaryBackgroundFocus,
      vitalButtonTokens.ColorButtonSecondaryBackgroundPressed,
    ),
    Body: as(
      vitalButtonTokens.ColorButtonSecondaryTextDefault,
      vitalButtonTokens.ColorButtonSecondaryTextHover,
      vitalButtonTokens.ColorButtonSecondaryTextFocus,
      vitalButtonTokens.ColorButtonSecondaryTextPressed,
    ),
  },
  Meta: flowHoc.meta.term('Style')('Secondary'),
});

const Tertiary = asButtonToken(Default, {
  Theme: {
    Wrapper: vitalButtonTokens.ColorButtonTertiaryBackgroundFocus,
    Body: as(
      vitalButtonTokens.ColorButtonTertiaryTextDefault,
      vitalButtonTokens.ColorButtonTertiaryTextHover,
      vitalButtonTokens.ColorButtonTertiaryTextFocus,
      vitalButtonTokens.ColorButtonTertiaryTextPressed,
    ),
  },
  Meta: flowHoc.meta.term('Style')('Tertiary'),
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

const PrimaryDisabled = asButtonToken(
  WithDisabled,
  {
    Theme: {
      Wrapper: vitalButtonTokens.ColorButtonPrimaryBackgroundDisabled,
      Body: vitalButtonTokens.ColorButtonPrimaryTextDefault,
    },
  }
);

const SecondaryDisabled = asButtonToken(
  WithDisabled,
  {
    Theme: {
      Wrapper: vitalButtonTokens.BorderButtonSecondaryDisabled,
      Body: vitalButtonTokens.ColorButtonSecondaryTextDisabled,
    }
  }
);

const TertiaryDisabled = asButtonToken(
  WithDisabled,
  {
    Theme: {
      Body: vitalButtonTokens.ColorButtonTertiaryTextDisabled,
    }
  }
);

interface VitalButton extends TokenCollection<ButtonComponent, {}> {
  Default: ButtonToken,
  Primary: ButtonToken,
  Secondary: ButtonToken,
  Tertiary: ButtonToken,
  PrimaryDisabled: ButtonToken,
  SecondaryDisabled: ButtonToken,
  TertiaryDisabled: ButtonToken,
  // WithArrow: ButtonToken,
  WithDisabled: ButtonToken,
  WhereToBuy: ButtonToken,
  WhereToBuyWithoutIcon: ButtonToken,
}

const vitalButton: VitalButton = {
  Default,
  Primary,
  Secondary,
  Tertiary,
  PrimaryDisabled,
  SecondaryDisabled,
  TertiaryDisabled,
  // WithArrow,
  WithDisabled,
  WhereToBuy,
  WhereToBuyWithoutIcon,
};

export default vitalButton;
