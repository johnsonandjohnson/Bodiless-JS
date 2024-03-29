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
import { vitalButtonTokens } from '@bodiless/vital-elements';
import { ButtonComponent, ButtonToken, asButtonToken } from '../ButtonClean';
import { WhereToBuy, WhereToBuyWithoutIcon } from './vitalWTB';

const Plain = asButtonToken({
  Layout: {
    Wrapper: 'group justify-center',
  },
  Theme: {
    // NOTE: Deprecated temporarily.
    // _: as(vitalLink.WithDownloadStyles, vitalLink.WithExternalStyles),
    Wrapper: as(
      vitalButtonTokens.PrimaryBorderRadiusAll,
    ),
    Body: vitalButtonTokens.TextButtonDefault,
  },
  Components: {
    Body: on(EditorPlainClean)(vitalEditorPlain.Default),
  },
  Content: {
    Body: withPlaceholder('BUTTON'),
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

// Deprecated for now but will be added in later
// const WithArrow = asButtonToken({
//   Layout: {
//     Wrapper: 'flex-row-reverse',
//     Icon: 'inline-block',
//   },
//   Components: {
//     Icon: replaceWith(Span),
//   },
//   Theme: {
//     Icon: 'w-6 h-6 vital-arrow group-hover:text-current text-transparent',
//   },
//   Spacing: {
//     Icon: 'pr-1',
//     Wrapper: 'pl-12 pr-6 py-3.5 group',
//   },
//   Meta: flowHoc.meta.term('Style')('With Hover Arrow'),
// });

const WithPrimaryStyle = asButtonToken({
  Theme: {
    Wrapper: as(
      vitalButtonTokens.ShadowButtonFocus,
      vitalButtonTokens.BorderPaddingButton,
      vitalButtonTokens.PrimaryBackgroundLightThemeIdle,
      vitalButtonTokens.PrimaryBackgroundLightThemeHover,
      vitalButtonTokens.PrimaryBackgroundLightThemeFocus,
      vitalButtonTokens.PrimaryBackgroundLightThemePressed,
    ),
    Body: vitalButtonTokens.PrimaryTextLightThemeText,
  },
  Meta: flowHoc.meta.term('Style')('Primary'),
});

const WithSecondaryStyle = asButtonToken({
  Theme: {
    Wrapper: as(
      vitalButtonTokens.BorderShadowButtonFocus,
      vitalButtonTokens.BorderWidthButton,
      vitalButtonTokens.BorderPaddingButton,
      vitalButtonTokens.SecondaryBorderLightThemeIdle,
      vitalButtonTokens.SecondaryBorderLightThemeHover,
      vitalButtonTokens.SecondaryBorderLightThemeFocus,
      vitalButtonTokens.SecondaryBorderLightThemePressed,
    ),
    Body: as(
      vitalButtonTokens.SecondaryTextLightThemeIdle,
      vitalButtonTokens.SecondaryTextLightThemeHover,
      vitalButtonTokens.SecondaryTextLightThemeFocus,
      vitalButtonTokens.SecondaryTextLightThemePressed,
    ),
  },
  Meta: flowHoc.meta.term('Style')('Secondary'),
});

const WithTertiaryStyle = asButtonToken({
  Theme: {
    Wrapper: vitalButtonTokens.ShadowButtonFocus,
    Body: as(
      vitalButtonTokens.TertiaryTextLightThemeIdle,
      vitalButtonTokens.TertiaryTextLightThemeHover,
      vitalButtonTokens.TertiaryTextLightThemeFocus,
      vitalButtonTokens.TertiaryTextLightThemePressed,
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
      Wrapper: as(
        vitalButtonTokens.PrimaryBackgroundLightThemeDisabled,
        vitalButtonTokens.BorderPaddingButton
      ),
      Body: vitalButtonTokens.PrimaryTextLightThemeText,
    },
  }
);

const SecondaryDisabled = asButtonToken(
  WithDisabled,
  {
    Theme: {
      Wrapper: as(
        vitalButtonTokens.SecondaryBorderLightThemeDisabled,
        vitalButtonTokens.BorderWidthButton,
        vitalButtonTokens.BorderPaddingButton,
      ),
      Body: vitalButtonTokens.SecondaryTextLightThemeDisabled,
    }
  }
);

const TertiaryDisabled = asButtonToken(
  WithDisabled,
  {
    Theme: {
      Body: vitalButtonTokens.TertiaryTextLightThemeDisabled,
    }
  }
);

interface VitalButton extends TokenCollection<ButtonComponent, {}> {
  Plain: ButtonToken,
  WithPrimaryStyle: ButtonToken,
  WithSecondaryStyle: ButtonToken,
  WithTertiaryStyle: ButtonToken,
  PrimaryDisabled: ButtonToken,
  SecondaryDisabled: ButtonToken,
  TertiaryDisabled: ButtonToken,
  // WithArrow: ButtonToken,
  WithDisabled: ButtonToken,
  WhereToBuy: ButtonToken,
  WhereToBuyWithoutIcon: ButtonToken,
}

const vitalButton: VitalButton = {
  Plain,
  WithPrimaryStyle,
  WithSecondaryStyle,
  WithTertiaryStyle,
  PrimaryDisabled,
  SecondaryDisabled,
  TertiaryDisabled,
  // WithArrow,
  WithDisabled,
  WhereToBuy,
  WhereToBuyWithoutIcon,
};

export default vitalButton;
