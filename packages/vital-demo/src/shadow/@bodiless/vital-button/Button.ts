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

import { asButtonToken } from '@bodiless/vital-button';
import { vitalButtonBase } from '@bodiless/vital-button/lib/base';
import { addProps } from '@bodiless/fclasses';

const Plain = asButtonToken(vitalButtonBase.Plain, {
  Behavior: {
    Wrapper: addProps({ 'data-shadowed-by': 'vital-demo:DefaultButton' }),
  },
});

const WithPrimaryStyle = asButtonToken(
  vitalButtonBase.Plain,
  vitalButtonBase.WithPrimaryStyle, {
    Behavior: {
      Wrapper: addProps({ 'data-shadowed-by': 'vital-demo:PrimaryButton' }),
    },
  }
);

const WithSecondaryStyle = asButtonToken(
  vitalButtonBase.Plain,
  vitalButtonBase.WithSecondaryStyle, {
    Behavior: {
      Wrapper: addProps({ 'data-shadowed-by': 'vital-demo:SecondaryButton' }),
    },
  }
);

const WithTertiaryStyle = asButtonToken(
  vitalButtonBase.Plain,
  vitalButtonBase.WithTertiaryStyle, {
    Behavior: {
      Wrapper: addProps({ 'data-shadowed-by': 'vital-demo:TertiaryButton' }),
    },
  }
);

export default {
  ...vitalButtonBase,
  Plain,
  WithPrimaryStyle,
  WithSecondaryStyle,
  WithTertiaryStyle,
};
