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

import vitalFooterBaseOrig from './tokens/vitalFooter';
import type { VitalFooter } from './tokens/vitalFooter';

/**
 * Use this version of the vital footer tokens when extending or shadowing.
 * @category Token Collection
 * @see [[vitalFooter]]
 */
const vitalFooterBase = vitalFooterBaseOrig;

export { default as FooterClean, asFooterToken } from './FooterClean';
export { default as vitalFooter } from './tokens';
export type { FooterComponents, FooterProps } from './types';

export * from './Rewards';
export * from './CopyrightRow';
export * from './SocialLinks';

export { vitalFooterBase };
export type { VitalFooter };
