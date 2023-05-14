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

import { vitalCardFlowContainerBase } from '@bodiless/vital-card/lib/base';
import { asFluidToken } from '@bodiless/vital-elements';

// Demostrating only showing Basic & Hero Card Variations in Component Picker
const WithCardVariations = asFluidToken(
  vitalCardFlowContainerBase.WithBasicVariations,
  vitalCardFlowContainerBase.WithHeroVariations,
);

export default {
  ...vitalCardFlowContainerBase,
  WithCardVariations,
};
