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

// Note: when used with the __vital__ package on vital-demo, that package takes precedence
// over this one.  This test override has no effect and just an example.

import { vitalHelmet } from '@bodiless/vital-layout/lib/base';
import { asFluidToken } from '@bodiless/vital-elements';
import { addProps } from '@bodiless/fclasses';

const Default = asFluidToken(vitalHelmet.Default, {
  Behavior: {
    BodyHelmet: addProps({ 'data-shadowed-by': '__vitaltest__:Helmet' }),
  },
});

export default {
  ...vitalHelmet,
  Default,
};
