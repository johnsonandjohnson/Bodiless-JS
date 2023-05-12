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

import { asElementToken } from '@bodiless/vital-elements';
import { vitalTypographyBase } from '@bodiless/vital-elements/lib/base';
import { addProps } from '@bodiless/fclasses';

export default {
  ...vitalTypographyBase,
  H1: asElementToken(vitalTypographyBase.H1, {
    Theme: {
      _: addProps({ 'data-shadowed-by': 'vital-demo:Typography:H1' }),
    },
  }),
  H2: asElementToken(vitalTypographyBase.H2, {
    Theme: {
      _: addProps({ 'data-shadowed-by': 'vital-demo:Typography:H2' }),
    },
  }),
  H3: asElementToken(vitalTypographyBase.H3, {
    Theme: {
      _: addProps({ 'data-shadowed-by': 'vital-demo:Typography:H3' }),
    },
  }),
  H4: asElementToken(vitalTypographyBase.H4, {
    Theme: {
      _: addProps({ 'data-shadowed-by': 'vital-demo:Typography:H4' }),
    },
  }),
  H5: asElementToken(vitalTypographyBase.H5, {
    Theme: {
      _: addProps({ 'data-shadowed-by': 'vital-demo:Typography:H5' }),
    },
  }),
};
