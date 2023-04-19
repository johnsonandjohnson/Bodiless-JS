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

import vitalLogoBaseOrig from './tokens/vitalLogo';
import type { VitalLogo } from './tokens/vitalLogo';

/**
 * Use this version of the vital logo tokens when extending or shadowing.
 * @category Token Collection
 * @see [[vitalLogo]]
 */
const vitalLogoBase = vitalLogoBaseOrig;

export { default as LogoClean, asLogoToken } from './LogoClean';
export { default as vitalLogo } from './tokens';
export type { LogoComponents } from './LogoClean';

export { vitalLogoBase };
export type { VitalLogo };
