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

import { asFluidToken } from '@bodiless/vital-elements';
import { vitalRichTextBase } from '@bodiless/vital-editors';
import { addProps } from '@bodiless/fclasses';

const Default = asFluidToken({
  ...vitalRichTextBase.Default,
  Compose: {
    ...(vitalRichTextBase.Default.Compose || {}),
    WithShadowedBy: addProps({ 'data-shadowed-by': '__vitalstarter_:RichText' }),
  },
  // Demonstrates how to remove a component from the default editor.
  // Core: {
  //   ...omit(vitalRichTextBase.Default.Core, 'H1'),
  // },
  // Components: {
  //   ...omit(vitalRichTextBase.Default.Components, 'H1'),
  // },
});

export default {
  ...vitalRichTextBase,
  Default,
};
