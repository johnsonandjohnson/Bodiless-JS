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
  flowHoc, extendMeta, TokenCollection, replaceWith, on, Div, P, as, startWith, H2,
} from '@bodiless/fclasses';

import { CardComponents } from '../../Card/CardClean';
import type { CardToken } from '../../Card/CardClean';
import Base from '../../Card/tokens/Base';

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
 * Defines the default Vertical Article card for the Vital DS.
 * - Extends the Base card. By default Article Card has `Image`, `Title` and `Link` slots.
 */
const Vertical = asArticleCardToken({
  ...Base,
  Components: {
    ...Base.Components,
    Eyebrow: undefined,
    Description: undefined,
    CTAWrapper: undefined,
    CTALink: on(ButtonClean)(ArticleCardButton),
  },
  Layout: {
    Wrapper: 'w-full flex flex-col',
  },
  Theme: {
    TitleWrapper: as(
      vitalTypography.HeadlineLarge,
      vitalArticleCardElement.TextLightThemeHeadline,
    ),
    Description: vitalTypography.BodyRegular,
    Image: as(
      vitalArticleCardElement.ImageBorderRadiusTopLeft,
      vitalArticleCardElement.ImageBorderRadiusBottomRight,
      vitalArticleCardElement.ImageBorderRadiusBottomRight,
      vitalArticleCardElement.ImageBorderRadiusBottomLeft,
    ),
    Wrapper: as(
      vitalArticleCardElement.BorderRadiusTopLeft,
      vitalArticleCardElement.BorderRadiusBottomRight,
      vitalArticleCardElement.BorderRadiusBottomRight,
      vitalArticleCardElement.BorderRadiusBottomLeft,
    ),
  },
  Spacing: {
    TitleWrapper: vitalSpacing.MarginYXSmall,
    CTAWrapper: vitalSpacing.MarginTopMedium,
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
 * Defines the default Horizontal Article card for the Vital DS.
 * - Extends Vertical card. By default Article Card has `Image`, `Title` and `Link` slots.
 */
const Horizontal = asArticleCardToken({
  ...Vertical,
  Layout: {
    Wrapper: 'items-center w-full flex',
    Image: 'w-full',
  },
});

/**
 * Token that sets Horizontal Orientation with Image on the Left for the Article Card.
 *
 * Note: This token is meant to be layered on top of the `vitalArticleCard.Horizontal` token.
 */
const WithHorizontalLeftOrientation = asArticleCardToken({
  Spacing: {
    ContentWrapper: vitalSpacing.MarginLeftMedium,
  },
});

/**
 * Token that sets Horizontal Orientation with Image on the Right for the Article Card.
 *
 * Note: This token is meant to be layered on top of the `vitalArticleCard.Horizontal` token.
 */
const WithHorizontalRightOrientation = asArticleCardToken({
  Layout: {
    Wrapper: 'flex-row-reverse',
  },
  Spacing: {
    ContentWrapper: vitalSpacing.MarginRightMedium,
  },
});

/**
 * Token that adds an Eyebrow slot to the Product Card.
 * Adds the `EyebrowWrapper` slot as a `Div` and the `Eyebrow` slot as default Plain Text Editor.
 *
 * Note: This token is meant to be layered on top of `Horizontal` or `Vertical` tokens.
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
  },
  Spacing: {
    ContentWrapper: vitalSpacing.MarginTopSmall,
  },
});

/**
 * Token that adds the Description slot to the Product Card.
 * Adds the `DescriptionWrapper` slot as `P` element and the `Description` slot
 * as default Plain Text Editor.
 *
 * Note: This token is meant to be layered on top of `Horizontal` or `Vertical` tokens.
 */
const WithDescription = asArticleCardToken({
  Components: {
    DescriptionWrapper: replaceWith(P),
    Description: on(EditorPlainClean)(vitalEditorPlain.Default),
  },
  Content: {
    Description: withPlaceholder('Description Text'),
  },
});

/**
 * Token that adds Background the Article Card Wrapper.
 * Some Brands are expected to have a Article Card background.
 *
 * Note: This token is meant to be layered on top of `Horizontal` or `Vertical` tokens.
 */
const WithBackground = asArticleCardToken({
  Theme: {
    Wrapper: vitalArticleCardElement.BackgroundLightThemeBackground,
  },
  Spacing: {
    ContentWrapper: vitalSpacing.MarginXSmall,
  },
});

/**
 * Token that converts Article card Title into H2 element.
 */
const WithH2Title = asArticleCardToken({
  Components: {
    TitleWrapper: startWith(H2),
  },
  Theme: {
    TitleWrapper: vitalTypography.HeadlineXLarge,
  },
});

export interface VitalArticleCard extends TokenCollection<CardComponents, DefaultDomains> {
  /**
   * Defines the default Vertical Article card for the Vital DS.
   * - Extends the Base card. By default Article Card has `Image`, `Title` and `Link` slots.
  */
  Vertical: CardToken,
  /**
   * Defines the default Horizontal Article card for the Vital DS.
   * - Extends the Base card. By default Article Card has `Image`, `Title` and `Link` slots.
   */
  Horizontal: CardToken,
  /**
   * Token that sets Horizontal Orientation with Image on the Left for the Article Card.
   *
   * Note: This token is meant to be layered on top of the `vitalArticleCard.Horizontal` token.
   */
  WithHorizontalLeftOrientation: CardToken,
  /**
   * Token that sets Horizontal Orientation with Image on the Right for the Article Card.
   *
   * Note: This token is meant to be layered on top of the `vitalArticleCard.Horizontal` token.
   */
  WithHorizontalRightOrientation: CardToken,
  /**
   * Token that adds an Eyebrow to the Article Card.
   * Adds the `EyebrowWrapper` slot as a `Div` and the `Eyebrow` slot as default Plain Editor.
   *
   * Note: This token is meant to be layered on top of the `Horizontal` or `Vertical` tokens.
   */
  WithEyebrow: CardToken,
  /**
   * Token that adds the Description slot to the Article Card.
   * Adds the `DescriptionWrapper` slot as `P` element and the `Description` slot
   * as default Plain Text Editor.
   *
   * Note: This token is meant to be layered on top of the `Horizontal` or `Vertical` tokens.
   */
  WithDescription: CardToken,
  /**
   * Token that adds Background the Product Card Wrapper.
   * Some Brands are expected to have a Product Card background.
   *
   * Note: This token is meant to be layered on top of the `Horizontal` or `Vertical` tokens.
   */
  WithBackground: CardToken,
  /**
   * Token that converts Article card Title into H2 element.
   */
  WithH2Title: CardToken,
}

/**
 * Tokens for ArticleCardClean
 * This token collection extends vitalArticleCard
 *
 * @category Token Collection
 * @see vitalArticleCard
 */
const vitalArticleCard: VitalArticleCard = {
  Vertical,
  Horizontal,
  WithHorizontalLeftOrientation,
  WithHorizontalRightOrientation,
  WithEyebrow,
  WithDescription,
  WithBackground,
  WithH2Title,
};

export default vitalArticleCard;
