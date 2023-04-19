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

import FlowContainerClean, { FlowContainerComponents } from './FlowContainerClean';
import vitalFlowContainer from './tokens';
import vitalFlowContainerOrig from './tokens/vitalFlowContainer';
import type { VitalFlowContainer } from './tokens/vitalFlowContainer';

/**
 * Use this version of the vital flow container tokens when extending or shadowing.
 * @category Token Collection
 * @see vitalFlowContainer
 */
const vitalFlowContainerBase = vitalFlowContainerOrig;

export type { VitalFlowContainer };
export {
  FlowContainerClean, vitalFlowContainer, vitalFlowContainerBase,
  FlowContainerComponents,
};

// Static flow container has edit/static alternatives.
export * from './index.bl-edit';
