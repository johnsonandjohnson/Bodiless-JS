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

// Normal flow container and tokens are the same in both edit/static
export { default as FlowContainerClean } from './FlowContainerClean';
export { default as vitalFlowContainer } from './tokens';
// Base token collection is the same in both edit and static.
// Exported directly from its location so it cannot be shadowed.
export { default as vitalFlowContainerBase } from './tokens/vitalFlowContainer';
// Static flow container has edit/static alternatives.
export * from './index.bl-edit';
