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

import { asElementToken, cxTypographyBase } from '@bodiless/cx-elements';
import { addProps } from '@bodiless/fclasses';

export default {
  ...cxTypographyBase,
  H1: asElementToken(cxTypographyBase.H1, {
    Theme: {
      _: addProps({ 'data-shadowed-by': '__cxstarter__:Typography' }),
    },
  }),
};
