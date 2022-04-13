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
  Img, on, varyDesigns, withDesign, as, flowHoc
} from '@bodiless/fclasses';
import { vitalImage } from '../Img';

// For the base variation, we apply the default token to the design key of
// the designable element. This can be overridden from the design context.
const baseVariation = {
  Image: on(Img)(withDesign({
    Image: vitalImage.Default,
  })),
};

// For variations, we apply tokens directly (not to the design key). These will
// not be overridden from the design context. This allows a site to override
// the base image globally, while still preserving variations in the flow container.
const placeholderVariations = {
  Square: as(
    vitalImage.Default,
    asMetaToken(flowHoc.meta.term('Placeholder')('Square')),
  ),
  Landscape: as(
    vitalImage.Default,
    vitalImage.WithLandscapePlaceholder,
  ),
};

/**
 * Token which adds image variations to a flow container.
 */
const WithImageVariations = asFluidToken({
  Components: varyDesigns(
    baseVariation,
    placeholderVariations,
  ),
});

export const vitalImageFlowContainer = { WithImageVariations };
