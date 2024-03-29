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

import { asImageToken } from '@bodiless/vital-image';
import { vitalImageBase } from '@bodiless/vital-image/lib/base';
import { addProps } from '@bodiless/fclasses';

const Default = asImageToken(vitalImageBase.Default, {
  Behavior: {
    _: addProps({ 'data-shadowed-by': 'vital-demo:Image:Gatsby' }),
  },
});

const Plain = asImageToken(vitalImageBase.Plain, {
  Behavior: {
    _: addProps({ 'data-shadowed-by': 'vital-demo:Image:Plain' }),
  },
});

const Hero = asImageToken(vitalImageBase.Hero, {
  Behavior: {
    _: addProps({ 'data-shadowed-by': 'vital-demo:Image:Hero' }),
  },
});

export default {
  ...vitalImageBase,
  Default,
  Plain,
  Hero,
};
