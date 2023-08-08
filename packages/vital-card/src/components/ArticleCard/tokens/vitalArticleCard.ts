/**
 * Copyright © 2023 Johnson & Johnson
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

import { withPlaceholder } from '@bodiless/components';
import { EditorPlainClean, vitalEditorPlain } from '@bodiless/vital-editors';
import {
  flowHoc, extendMeta, TokenCollection, replaceWith, on, Div, P,
} from '@bodiless/fclasses';

import { CardComponents } from '../../Card/CardClean';
import type { CardToken } from '../../Card/CardClean';
import Base from '../../Card/tokens/Base';

import { asArticleCardToken } from '../ArticleCardClean';

/**
  * Default Article Card Token.
  * By default Article Card has `Image`, `Title` and `Link` slots.
  */
const Default = asArticleCardToken({
  ...Base,
  Components: {
    ...Base.Components,
    Eyebrow: undefined,
    Description: undefined,
  },
  Content: {
    Title: withPlaceholder('Article Title'),
    CTAText: withPlaceholder('Article Link'),
  },
  Meta: extendMeta(
    flowHoc.meta.term('Sub Type')('Article'),
  ),
});

/**
 * Token that adds an Eyebrow slot to the Product Card.
 * Adds the `EyebrowWrapper` slot as a `Div` and the `Eyebrow` slot as default Plain Text Editor.
 *
 * Note: This token is meant to be layered on top of the `Product` token.
 */
const WithEyebrow = asArticleCardToken({
  Components: {
    EyebrowWrapper: replaceWith(Div),
    Eyebrow: on(EditorPlainClean)(vitalEditorPlain.Default),
  },
  Content: {
    Eyebrow: withPlaceholder('Eyebrow Text'),
  }
});

/**
 * Token that adds the Description slot to the Product Card.
 * Adds the `DescriptionWrapper` slot as `P` element and the `Description` slot
 * as default Plain Text Editor.
 *
 * Note: This token is meant to be layered on top of the `Product` token.
 */
const WithDescription = asArticleCardToken({
  Components: {
    DescriptionWrapper: replaceWith(P),
    Description: on(EditorPlainClean)(vitalEditorPlain.Default),
  },
  Content: {
    Description: withPlaceholder('Description Text'),
  }
});

export interface VitalArticleCard extends TokenCollection<CardComponents, {}> {
  /**
   * Defines the default Article card for the Vital DS.
   * - Extends the Base card.
   */
  Default: CardToken,
  /**
   * Token that adds an Eyebrow to the Article Card.
   * Adds the `EyebrowWrapper` slot as a `Div` and the `Eyebrow` slot as default Plain Editor.
   *
   * Note: This token is meant to be layered on top of the `Article` token.
   */
  WithEyebrow: CardToken,
  /**
   * Token that adds the Description slot to the Article Card.
   * Adds the `DescriptionWrapper` slot as `P` element and the `Description` slot
   * as default Plain Text Editor.
   *
   * Note: This token is meant to be layered on top of the `vitalArticleCard.Default` Article token.
   */
  WithDescription: CardToken,
}

/**
 * Tokens for ArticleCardClean
 * This token collection extends vitalArticleCard
 *
 * @category Token Collection
 * @see vitalArticleCard
 */
const vitalArticleCard: VitalArticleCard = {
  Default,
  WithEyebrow,
  WithDescription,
};

export default vitalArticleCard;
