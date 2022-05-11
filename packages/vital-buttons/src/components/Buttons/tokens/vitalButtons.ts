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
  Span,
  addProps,
} from '@bodiless/fclasses';
import { withPlaceholder } from '@bodiless/components';
import { vitalColor } from '@bodiless/vital-elements';
import { vitalEditorPlain, EditorPlainClean } from '@bodiless/vital-editors';
import { asLinkToken, vitalLink } from '@bodiless/vital-link';
import { withNodeKey } from '@bodiless/core';
import { WhereToBuy, WhereToBuyWithoutIcon } from './vitalWTB';

const ButtonThemeStyle = as(
  'rounded transition duration-150 ease-in-out',
  'focus:outline-none focus:ring-0',
  'leading-tight uppercase',
);

const Base = asLinkToken({
  Layout: {
    Wrapper: 'flex flex-row-reverse group',
  },
  Theme: {
    Wrapper: ButtonThemeStyle,
  },
  Spacing: {
    Wrapper: 'px-6 py-3.5',
  },
  Editors: {
    Body: on(EditorPlainClean)(vitalEditorPlain.Default),
  },
  Content: {
    Body: withPlaceholder('Link'),
  },
  Schema: {
    Body: withNodeKey('buttontext'),
    Wrapper: vitalLink.Default,
  },
  A11y: {
    Wrapper: addProps({ role: 'button' }),
  }
});

const WithArrow = asLinkToken(Base, {
  Components: {
    Icon: replaceWith(Span),
  },
  Theme: {
    Icon: 'vital-arrow hover:text-current text-transparent',
  },
  Spacing: {
    Icon: 'inline-block pr-1 w-6 h-2',
    Body: 'pl-6',
  },

});

const Primary = asLinkToken(Base, {
  Theme: {
    Wrapper: as(
      vitalColor.BgPrimaryInteractive,
      vitalColor.TextWhite,
    ),
  },
});

const Secondary = asLinkToken(Base, {
  Theme: {
    Wrapper: as(
      'border-2',
      vitalColor.TextPrimaryInteractive,
      vitalColor.BorderPrimaryInteractive,
    ),
  },
});

const PrimarySelected = asLinkToken(Base, {
  Theme: {
    Wrapper: as(
      vitalColor.BgButtonSelected,
      vitalColor.TextWhite,
    ),
  },
});
const SecondarySelected = asLinkToken(Base, {
  Theme: {
    Wrapper: as(
      'border-2',
      vitalColor.TextButtonSelected,
      vitalColor.BorderButtonSelected,
    ),
  },
});

const WithDisabled = asLinkToken(Base, {
  Behavior: {
    Wrapper: addProps({ disabled: 'true' }),
  },
  Theme: {
    Wrapper: 'opacity-50',
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
  WithArrow,
  WhereToBuy,
  WhereToBuyWithoutIcon,
};
