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
import { on, varyDesigns, flowHoc } from '@bodiless/fclasses';
import {
  asButtonToken, ButtonClean, vitalButtons,
} from '../Buttons';

const BaseVariation = {
  Button: on(ButtonClean)(vitalButtons.Default),
};

const ColorVariations = {
  Primary: vitalButtons.WithPrimary,
  Secondary: vitalButtons.WithSecondary,
};

const ButtonStyles = {
  WithArrow: vitalButtons.WithArrow,
  WithOutArrow: asButtonToken({
    Meta: flowHoc.meta.term('Style')('Without Hover Arrow'),
  }),
};

/**
 * Token which adds image variations to a flow container.
 */
const WithButtonVariations = asFluidToken({
  Components: {
    ...varyDesigns(
      BaseVariation,
      ColorVariations,
      ButtonStyles,
    ),
  }
});

export const vitalButtonFlowContainer = { WithButtonVariations };
