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

import { on } from '@bodiless/fclasses';
import { withPlaceholder } from '@bodiless/components';
import { vitalEditorPlain, EditorPlainClean } from '@bodiless/vital-editors';
import { asEditableLink } from '@bodiless/vital-link';
import { withNodeKey } from '@bodiless/core';
import { asButtonToken, vitalButtonsCore } from '@bodiless/vital-buttons-core';

const WithEditors = asButtonToken({
  Editors: {
    Body: on(EditorPlainClean)(vitalEditorPlain.Default),
  },
  Content: {
    Body: withPlaceholder('Link'),
  },
  Schema: {
    _: asEditableLink(),
    Body: withNodeKey('buttontext'),
  },
});

const Default = asButtonToken(
  vitalButtonsCore.Default,
  WithEditors,
);

const Primary = asButtonToken(
  Default,
  vitalButtonsCore.WithPrimary,
);

const PrimarySelected = asButtonToken(
  Default,
  vitalButtonsCore.WithPrimarySelected,
);

const Secondary = asButtonToken(
  Default,
  vitalButtonsCore.WithSecondary,
);

const SecondarySelected = asButtonToken(
  Default,
  vitalButtonsCore.WithSecondarySelected,
);

export default {
  ...vitalButtonsCore,
  Default,
  Primary,
  PrimarySelected,
  Secondary,
  SecondarySelected,
};
