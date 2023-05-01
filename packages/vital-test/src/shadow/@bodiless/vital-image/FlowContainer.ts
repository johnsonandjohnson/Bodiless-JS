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

import {
  as, flowHoc, Img, on
} from '@bodiless/fclasses';
import { asFluidToken, asMetaToken } from '@bodiless/vital-elements';
import { vitalImage } from '@bodiless/vital-image';
import { vitalImageFlowContainerBase } from '@bodiless/vital-image/lib/shadow';

const imagePlainVariations = {
  ImagePlainSquare: on(Img)(as(
    vitalImage.Plain,
    asMetaToken(flowHoc.meta.term('Placeholder')('Square')),
  )),
  ImagePlainLandscape: on(Img)(as(
    vitalImage.Plain,
    vitalImage.WithLandscapePlaceholder,
  )),
};

/* Extend the WithImageVariations and add Plain images */
const WithImageVariations = asFluidToken(vitalImageFlowContainerBase.WithImageVariations, {
  Components: imagePlainVariations,
});

export default {
  ...vitalImageFlowContainerBase,
  WithImageVariations,
};
