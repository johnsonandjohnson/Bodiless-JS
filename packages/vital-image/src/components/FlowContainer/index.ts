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

import { asFluidToken, asMetaToken } from '@bodiless/vital-elements';
import {
  Img, on, as, flowHoc
} from '@bodiless/fclasses';
import { vitalImage } from '../Image';

const imageVariations = {
  ImageSquare: on(Img)(as(
    vitalImage.Default,
    asMetaToken(flowHoc.meta.term('Placeholder')('Square')),
  )),
  ImageLandscape: on(Img)(as(
    vitalImage.Default,
    vitalImage.WithLandscapePlaceholder,
  )),
};

/**
 * Token which adds image variations to a flow container.
 */
const WithImageVariations = asFluidToken({
  Components: imageVariations,
});

export const vitalImageFlowContainer = { WithImageVariations };
