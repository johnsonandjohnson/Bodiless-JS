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

import { on } from '@bodiless/fclasses';
import { asFluidToken } from '@bodiless/vital-elements';
import { vitalFlowContainerBase } from '@bodiless/vital-flowcontainer';
import { vitalImageFlowContainer } from '@bodiless/vital-image';
import { FlowContainerClean, vitalEditorsFlowContainer } from '@bodiless/vital-editors';
import { vitalYouTubeFlowContainer } from '@bodiless/@bodiless/vital-youtube';
import { vitalListFlowContainer } from '@bodiless/vital-list';
import { vitalCardFlowContainer } from '@bodiless/vital-card';
import { vitalTableFlowContainer } from '@bodiless/vital-table';
import { vitalAccordionFlowContainer } from '@bodiless/vital-accordion';
import { vitalButtonFlowContainer } from '@bodiless/vital-button';

/**
 * A Composable token that collects all the different Vital DS components.
 * @todo Remove those you are not using!
 */
const WithBaseVariations = asFluidToken(
  vitalImageFlowContainer.WithImageVariations,
  vitalEditorsFlowContainer.WithEditorVariations,
  vitalYouTubeFlowContainer.WithYouTubeVariations,
  vitalListFlowContainer.WithListVariations,
  vitalCardFlowContainer.WithCardVariations,
  vitalTableFlowContainer.WithTableVariations,
  vitalAccordionFlowContainer.WithAccordionVariations,
  vitalButtonFlowContainer.WithButtonVariations,
);

/**
 * A composable token that adds a content region
 */
const WithContentRegionVariations = asFluidToken({
  Components: {
    ContentRegion: on(FlowContainerClean)(WithBaseVariations),
  }
});

/**
 * Add variations to the content region.
 */
const ContentRegion = asFluidToken(
  vitalFlowContainerBase.ContentRegion,
  WithBaseVariations,
);

/**
 * Add variations to the default flow container.
 */
const Default = asFluidToken(
  vitalFlowContainerBase.Default,
  WithBaseVariations,
  WithContentRegionVariations,
};

/**
 * Add varitions to the Hero flow container.
 */
const Hero = asFluidToken(
  vitalFlowContainerBase.Hero,
  WithBaseVariations,
);

export default {
  ...vitalFlowContainerBase,
  Default,
  Hero,
  ContentRegion,
};
