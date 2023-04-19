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

import vitalLayoutBaseOrig from './tokens/vitalLayout';
import type { VitalLayout } from './tokens/vitalLayout';

/**
 * Use this version of the vital layout tokens when extending or shadowing.
 * @category Token Collection
 * @see [[VitalLayout]]
 */
const vitalLayoutBase = vitalLayoutBaseOrig;

export { LayoutClean, asLayoutToken } from './LayoutClean';
export { default as vitalLayout } from './tokens';
export type { LayoutComponents, LayoutProps } from './types';

export { vitalLayoutBase };
export type { VitalLayout };
