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
  flowHoc, replaceWith, extendMeta,
} from '@bodiless/fclasses';
import { asCardToken } from '../CardClean';
import type { CardToken } from '../CardClean';
import Base from './Base';

/**
  * TBD: STUB Category Base Card Design.
  */
const Category = asCardToken(Base, {
  Components: {
    EyebrowWrapper: replaceWith(() => null),
    DescriptionWrapper: replaceWith(() => null),
    RatingWrapper: replaceWith(() => null),
  },
  Meta: extendMeta(
    flowHoc.meta.term('Sub Type')('Category'),
    flowHoc.meta.term('CTA Type')('Fully Clickable'),
  ),
});

export interface VitalCardCategory {
  /**
   * Defines the Category card for the Vital DS.
   * - Extends the Base card with vertical orientation & the fully clickable card.
   * - Components domain:
   *   - Removes Eyebrow, Description, Rating
   *
   * <b>NOTE</b> Not Fully Implemented.
   */
  Category: CardToken,
}

export {
  Category,
};
