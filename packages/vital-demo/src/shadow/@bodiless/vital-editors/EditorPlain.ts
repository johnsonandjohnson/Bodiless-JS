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

import { flowIf } from '@bodiless/fclasses';
import { useNode } from '@bodiless/data';
import { asElementToken } from '@bodiless/vital-elements';
import { withAutoSuperscript } from '@bodiless/vital-editors';
import { vitalEditorPlainBase } from '@bodiless/vital-editors/lib/base';

/* Test case to get superscript working on /styleguide/editors-monofont */
const isEditorMonoRepo = () => useNode().node.pagePath === '/styleguide/editors-monofont/';

const WithSuperOnMonoFont = asElementToken({
  Flow: flowIf(isEditorMonoRepo),
  Core: {
    _: withAutoSuperscript('®™©', 'align-baseline'),
  },
});

const Default = asElementToken(vitalEditorPlainBase.Default, {
  Compose: {
    WithSuperOnMonoFont,
  },
});

export default {
  ...vitalEditorPlainBase,
  Default,
};
