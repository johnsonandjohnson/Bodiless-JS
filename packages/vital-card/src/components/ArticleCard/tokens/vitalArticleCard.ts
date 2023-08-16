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
import { vitalButton, ButtonClean, asButtonToken } from '@bodiless/vital-button';
import {
  vitalArticleCardElement, vitalTypography, vitalSpacing, DefaultDomains,
} from '@bodiless/vital-elements';
import {
  flowHoc, extendMeta, TokenCollection, replaceWith, on, Div, P, as,
} from '@bodiless/fclasses';

import { CardComponents } from '../../Card/CardClean';
import type { CardToken } from '../../Card/CardClean';
import Base, {
  WithVerticalOrientation, WithHorizontalLeftOrientation, WithHorizontalContentCentered,
} from '../../Card/tokens/Base';

import { asArticleCardToken } from '../ArticleCardClean';

/**
 * Default Article Card Button.
 * Plain vital button with `WithTertiaryStyle` token and `READ MORE` placeholder.
 */
const ArticleCardButton = asButtonToken(
  vitalButton.Plain,
  vitalButton.WithTertiaryStyle,
  {
    Content: {
      Body: withPlaceholder('READ MORE'),
    },
  }
);

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
    CTAWrapper: undefined,
    CTALink: on(ButtonClean)(ArticleCardButton),
  },
  Theme: {
    TitleWrapper: as(
      vitalTypography.HeadlineLarge,
      vitalArticleCardElement.TextLightThemeHeadline,
    ),
    Description: vitalTypography.BodyRegular,
  },
  Spacing: {
    TitleWrapper: vitalSpacing.PaddingYXSmall,
    CTAWrapper: vitalSpacing.PaddingYXSmall,
  },
  Content: {
    Title: withPlaceholder('Article Title'),
    CTAText: withPlaceholder('Read More'),
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
    Eyebrow: withPlaceholder('Eyebrow'),
  },
  Theme: {
    EyebrowWrapper: as(
      vitalTypography.EyebrowBold,
      vitalArticleCardElement.TextLightThemeEyebrow,
    ),
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

/**
 * Token that sets Horizontal Orientation for the Article Card.
 * Re-Exported `WithHorizontalLeftOrientation` combined with the `WithHorizontalContentCentered`
 * unchanged from the `vitalCard` collection.
 *
 * Note: This token is meant to be layered on top of the `vitalArticleCard.Default` Article token.
 */
const WithHorizontalOrientation = asArticleCardToken(
  WithHorizontalLeftOrientation,
  WithHorizontalContentCentered,
);

export interface VitalArticleCard extends TokenCollection<CardComponents, DefaultDomains> {
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
  /**
   * Token that sets Vertical Orientation for the Article Card.
   * Re-Exported directly unchanged from the `vitalCard`.
   *
   * Note: This token is meant to be layered on top of the `vitalArticleCard.Default` Article token.
   */
  WithVerticalOrientation: CardToken,
  /**
   * Token that sets Horizontal Orientation for the Article Card.
   * Re-Exported `WithHorizontalLeftOrientation` combined with the `WithHorizontalContentCentered`
   * unchanged from the `vitalCard` collection.
   *
   * Note: This token is meant to be layered on top of the `vitalArticleCard.Default` Article token.
   */
  WithHorizontalOrientation: CardToken,
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
  WithVerticalOrientation,
  WithHorizontalOrientation,
};

export default vitalArticleCard;
