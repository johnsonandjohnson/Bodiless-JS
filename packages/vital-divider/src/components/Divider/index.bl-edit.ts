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

import { DividerStatic } from './DividerClean';
import vitalDividers from './tokens';

/**
 * Use this version of the token collection when all sub-components are static.
 * Be sure to use it with `CardStatic` (not `CardClean`).
 *
 * @see [[DividerStatic]]
 * @see [[vitalDividers]]
 *
 * @category Token Collection
 */
const vitalDividerStatic = vitalDividers;

export {
  DividerStatic,
  vitalDividerStatic
};
