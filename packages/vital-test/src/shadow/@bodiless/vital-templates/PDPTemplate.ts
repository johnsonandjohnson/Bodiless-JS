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
  addProps, Div, flowHoc, replaceWith
} from '@bodiless/fclasses';
import { vitalEditorsFlowContainer } from '@bodiless/vital-editors';
import { asFluidToken } from '@bodiless/vital-elements';
import { vitalFlowContainer } from '@bodiless/vital-flowcontainer';
import { vitalImageFlowContainer } from '@bodiless/vital-image';
import { asPDPTemplateToken } from '@bodiless/vital-templates';
import { vitalPDPTemplate } from '@bodiless/vital-templates/lib/base';
import { vitalYouTubeFlowContainer } from '@bodiless/vital-youtube';

/* Limit the product description to only images, video & editor */
const WithProductDescriptionVariations = asFluidToken(
  vitalImageFlowContainer.WithImageVariations,
  vitalYouTubeFlowContainer.WithYouTubeVariations,
  vitalEditorsFlowContainer.WithEditorVariations,
);

const ProductDescription = asFluidToken(
  vitalFlowContainer.Base,
  vitalFlowContainer.WithContentLibrary,
  vitalFlowContainer.WithFullWidthConstraint,
  WithProductDescriptionVariations,
);

const Default = asPDPTemplateToken({
  ...vitalPDPTemplate.Default,
  Behavior: {
    TopWrapper: flowHoc(
      replaceWith(Div),
      addProps({ 'data-shadowed-by': '__vitaltest__:PDPTemplate' }),
    ),
  },
  Components: {
    ...vitalPDPTemplate.Default.Components,
    ProductDescription,
  },
});

export default {
  ...vitalPDPTemplate,
  Default,
};
