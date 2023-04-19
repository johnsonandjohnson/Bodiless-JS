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

import vitalCardFlowContainer from './tokens';
import vitalCardFlowContainerBaseOrig, {
  VitalCardFlowContainer,
} from './tokens/vitalCardFlowContainer';

/**
 * Use this version of the vital card tokens when extending or shadowing.
 * @category Token Collection
 * @see [[VitalCardFlowContainer]]
 */
const vitalCardFlowContainerBase = vitalCardFlowContainerBaseOrig;

export { vitalCardFlowContainer, vitalCardFlowContainerBase };
export type { VitalCardFlowContainer };
