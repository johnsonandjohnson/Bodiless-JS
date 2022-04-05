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

import { asFluidToken } from '@bodiless/cx-elements';
import { cxRichTextBase } from '@bodiless/cx-editors';
import { addProps } from '@bodiless/fclasses';

const Default = asFluidToken({
  ...cxRichTextBase.Default,
  Compose: {
    ...(cxRichTextBase.Default.Compose || {}),
    WithShadowedBy: addProps({ 'data-shadowed-by': '__cxstarter_:RichText' }),
  },
  // Demonstrates how to remove a component from the default editor.
  // Core: {
  //   ...omit(cxRichTextBase.Default.Core, 'H1'),
  // },
  // Components: {
  //   ...omit(cxRichTextBase.Default.Components, 'H1'),
  // },
});

export default {
  ...cxRichTextBase,
  Default,
};
