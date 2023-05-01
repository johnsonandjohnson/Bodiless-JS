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
import { vitalImage } from '@bodiless/vital-image/lib/base';
import { addProps } from '@bodiless/fclasses';

const Default = asImageToken(vitalImage.Default, {
  Behavior: {
    _: addProps({ 'data-shadowed-by': '__vital__:Image:Gatsby' }),
  },
});

const Plain = asImageToken(vitalImage.Plain, {
  Behavior: {
    _: addProps({ 'data-shadowed-by': '__vital__:Image:Plain' }),
  },
});

const Hero = asImageToken(vitalImage.Hero, {
  Behavior: {
    _: addProps({ 'data-shadowed-by': '__vital__:Image:Hero' }),
  },
});

export default {
  ...vitalImage,
  Default,
  Plain,
  Hero,
};
