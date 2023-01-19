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

import { BodilessImageComponents } from '@bodiless/gatsby-theme-bodiless';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import vitalImageBaseOrig from './tokens/vitalImage.gatsby';
import type { VitalImage } from './tokens/vitalImage.gatsby';

/**
 * A token modifier that respects the Image Components.
 *
 * @category Token Collection
 */
const asImageToken = asVitalTokenSpec<BodilessImageComponents>();

/**
 * Use this version of the vital image tokens when extending or shadowing.
 * @category Token Collection
 * @see [[VitalImage]]
 */
const vitalImageBase = vitalImageBaseOrig;

export type { VitalImage, BodilessImageComponents };
export {
  vitalImageBase, asImageToken,
};

export * from './index.bl-edit';
