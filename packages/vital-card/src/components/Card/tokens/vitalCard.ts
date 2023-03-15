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

import { extendMeta, flowHoc, replaceWith } from '@bodiless/fclasses';
import { asCardToken } from '../CardClean';
import type { CardToken } from '../CardClean';
import Base, {
  WithFlowContainerPreview,
  WithHorizontalOrientationBase,
  WithHorizontalLeftOrientation,
  WithHorizontalRightOrientation,
  WithHorizontalContentAtTop,
  WithHorizontalContentCentered,
  WithVerticalOrientation,
  WithPrimaryTextLink,
  WithPrimaryButton,
  WithSecondaryButton,
} from './Base';
import type { VitalCardBase } from './Base';
import { Hero } from './Hero';
import type { VitalCardHero } from './Hero';
import { Category } from './Category';
import type { VitalCardCategory } from './Category';
import { Topic } from './Topic';
import type { VitalCardTopic } from './Topic';
import { Product } from './Product';
import type { VitalCardProduct } from './Product';

const WithNoTitle = asCardToken({
  Components: {
    TitleWrapper: replaceWith(() => null),
  },
  Meta: flowHoc.meta.term('Features')('No Title'),
});

const WithNoEyebrow = asCardToken({
  Components: {
    EyebrowWrapper: replaceWith(() => null),
  },
  Meta: flowHoc.meta.term('Features')('No Eyebrow'),
});

/**
 * WithNoDescription removes the description from the card and adjusts title.
 *
 *  where
 *     Title - adds grow because description will not exist
 */
const WithNoDescription = asCardToken({
  Components: {
    DescriptionWrapper: replaceWith(() => null),
  },
  Layout: {
    Title: 'flex-grow',
  },
  Meta: flowHoc.meta.term('Features')('No Description'),
});

const WithFlexGrowImage = asCardToken({
  Layout: {
    ImageWrapper: 'flex-grow',
  },
  Meta: flowHoc.meta.term('Features')('Image controls height of Vertical cards in a row'),
});

const Default = asCardToken(Base);

const Basic = asCardToken(Default, {
  Meta: extendMeta(
    flowHoc.meta.term('Sub Type')('Basic'),
    flowHoc.meta.term('CTA Type')('Fully Clickable'),
  ),
});

/**
 * Tokens for the vital card
 *
 * @category Token Collection
 * @see [[VitalCardClean]]
 */
interface VitalCardCore {
  /**
   * Defines the Default card for the Vital DS.
   * - Editor/Content/Schema domains defines editors on Title/Eyebrow/Description/CTA
   *   and makes the entire Card clickable.
   * - Components domain hides the CTA and adds in vitalImage.Default for Image.
   * - Theme domain styles Wrappers for Eyebrow, Title, Description.
   * - Layout domain defines a basic full-width component in flex.
   * - Spacing domain: add spacing to Eyebrow
   *
   * #### Customizing:
   *
   * @example Add a component
   * ```js
   * import { vitalCard } from '@bodiless/vital-flowcontainer';
   *
   * const Default = asFluidToken(vitalCardStatic.Default, {
   *   Components: {
   *     MyComponent: on(cardClean)(
   *       vitalCardStatic.Default,
   *       WithMyCustomBorder,
   *       WithNoDescription
   *     ),
   *   }
   * });
   * ```
   * @example Add a component
   * ```js
   * import { vitalCard } from '@bodiless/vital-flowcontainer';
   *
   * const Default = asFluidToken(vitalCardStatic.Default, {
   *   Components: {
   *     MyComponent: on(cardClean)(vitalCardStatic.Default, WithCustomBorder),
   *   }
   * });
   * ```
   *
   * @example Shadowing the basic card to render H2 for title and image margins.
   * ```js
   * import { H2, replaceWith } from '@bodiless/fclasses';
   * import { asCardToken, vitalCardBase } from '@bodiless/vital-card';
   *
   * const Basic = asCardToken(vitalCardBase.Basic, {
   *   Components: {
   *     TitleWrapper: replaceWith(H2),
   *   },
   *   Theme: {
   *     ImageWrapper: 'md:mx-16',
   *   },
   * });
   *
   * export default {
   *   ...vitalCardBase,
   *   Basic,
   * };
   * ```
   */
  Default: CardToken,
  /**
   * Defines a primary vertical card
   */
  Basic: CardToken,
  /**
   * Composable token which removes the description from the card and adjusts title
   * by adding flex-grow to it because description will not exist (default field to control
   * height.) This will allow vertical cards with no description to continue to maintain
   * same height within a flow-container.
   */
  WithNoDescription: CardToken,
  /**
   * Composable token which removes title from the card
   */
  WithNoTitle: CardToken,
  /**
   * Composable token which removes eyebrow from the card
   */
  WithNoEyebrow: CardToken,
  /**
   * Composable token which adds adds flex-grow to image, allowing the vertical cards
   * to maintain same size images.
   */
  WithFlexGrowImage: CardToken,
}

/**
 * Tokens for the vital card
 *
 * @category Token Collection
 * @see [[CardClean]]
 */
export interface VitalCard extends
  VitalCardBase,
  VitalCardHero,
  VitalCardCategory,
  VitalCardTopic,
  VitalCardProduct,
  VitalCardCore
{}

/**
 * Tokens for cards.
 *
 * @category Token Collection
 */
const vitalCard: VitalCard = {
  Default,
  Basic,
  Hero,
  Category,
  Topic,
  Product,
  WithPrimaryTextLink,
  WithPrimaryButton,
  WithSecondaryButton,
  WithNoDescription,
  WithNoTitle,
  WithNoEyebrow,
  WithHorizontalOrientationBase,
  WithHorizontalLeftOrientation,
  WithHorizontalRightOrientation,
  WithHorizontalContentAtTop,
  WithHorizontalContentCentered,
  WithVerticalOrientation,
  WithFlowContainerPreview,
  WithFlexGrowImage,
};

export default vitalCard;
