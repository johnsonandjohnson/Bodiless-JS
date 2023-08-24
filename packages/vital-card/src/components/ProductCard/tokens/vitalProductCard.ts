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
import { ButtonClean, vitalButton } from '@bodiless/vital-button';
import {
  DefaultDomains, vitalSpacing, vitalTypography, vitalProductCardElement,
} from '@bodiless/vital-elements';
import {
  flowHoc, extendMeta, on, Div, P, Img, addProps, TokenCollection, startWith, as,
} from '@bodiless/fclasses';

import { asProductCardToken } from '../ProductCardClean';
import { CardComponents } from '../../Card/CardClean';
import type { CardToken } from '../../Card/CardClean';
import Base, { WithHorizontalLeftOrientation, WithHorizontalContentCentered } from '../../Card/tokens/Base';

/**
  * Default Product Card Token. By default Product Card has `Image`, `Title` and `Link` slots.
  */
const Default = asProductCardToken({
  ...Base,
  Components: {
    ...Base.Components,
    CTAWrapper: undefined,
    CTAText: undefined,
    Eyebrow: undefined,
    Description: undefined,
  },
  Content: {
    Title: withPlaceholder('Product Title'),
  },
  Meta: extendMeta(
    flowHoc.meta.term('Sub Type')('Product'),
  ),
  Theme: {
    TitleWrapper: as(
      vitalTypography.HeadlineMedium,
      vitalProductCardElement.TextLightThemeHeadline,
    ),
  },
  Layout: {
    Wrapper: 'w-full flex flex-col',
  },
  Spacing: {
    TitleWrapper: as(vitalSpacing.MarginTopXSmall, vitalSpacing.MarginBottomXSmall),
  },
});

/**
 * Token that adds a Line Clamping to the Product Card Title.
 * Ensures that the Title doesn't span on more than 3 lines.
 *
 * Note: This token is meant to be layered on top of the `Default` token.
 *
 * @TODO: Consider making this more generic. A function that accepts (lines: number) as an
 * argument since line clamping is different based on card placement / page. Will need to tweak
 * types of `TokenCollection` to allow functions that returns token.
 */
const WithTitleLineClamp = asProductCardToken({
  Theme: {
    Title: 'line-clamp-3',
  },
});

/**
 * Token that adds Background the Product Card Wrapper.
 * Some Brands are expected to have a Product Card background.
 *
 * Note: This token is meant to be layered on top of the `Default` token.
 */
const WithBackground = asProductCardToken({
  Theme: {
    Wrapper: vitalProductCardElement.BackgroundLightThemeBackground,
  },
  Spacing: {
    ContentWrapper: as(
      vitalSpacing.MarginLeftXSmall,
      vitalSpacing.MarginRightXSmall,
    ),
  },
});

/**
 * Token that adds Padding the Product Card Wrapper.
 * This is primarily used for the product carousels.
 *
 * Note: This token is meant to be layered on top of the `Default` token.
 */
const WithPaddings = asProductCardToken({
  Spacing: {
    Wrapper: vitalSpacing.PaddingXSmall,
  },
});

/**
 * Token that adds an Eyebrow slot to the Product Card.
 * Adds the `EyebrowWrapper` slot as a `Div` and the `Eyebrow` slot as default Plain Text Editor.
 *
 * Note: This token is meant to be layered on top of the `Default` token.
 */
const WithEyebrow = asProductCardToken({
  Components: {
    EyebrowWrapper: startWith(Div),
    Eyebrow: on(EditorPlainClean)(vitalEditorPlain.Default),
  },
  Content: {
    Eyebrow: withPlaceholder('Eyebrow Text'),
  },
  Theme: {
    EyebrowWrapper: as(
      vitalTypography.EyebrowBold,
      vitalProductCardElement.TextLightThemeEyebrow,
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
 * Note: This token is meant to be layered on top of the `Default` token.
 */
const WithDescription = asProductCardToken({
  Components: {
    DescriptionWrapper: startWith(P),
    Description: on(EditorPlainClean)(vitalEditorPlain.Default),
  },
  Content: {
    Description: withPlaceholder('Description Text'),
  },
  Theme: {
    DescriptionWrapper: vitalProductCardElement.TextDescription,
  },
});

/**
 * Token that adds the Vital Button to the Product Card.
 *
 * Note: This token is not part of the Token Collection for the Product Card.
 * Used to create Primary, Secondary, or Tertiary button variations.
 */
const WithButton = asProductCardToken({
  Components: {
    CTAWrapper: startWith(Div),
    CTALink: startWith(ButtonClean),
  },
  Theme: {
    CTALink: 'w-full text-center',
  },
  Layout: {
    CTAWrapper: as('flex', vitalSpacing.MarginTopSmall),
  },
  Content: {
    CTAText: withPlaceholder('Button Text'),
  },
});

/**
 * Token that adds the Second Button to the Product Card.
 * Second Button is a Tertiary button which will be rendered below the Main Card Button.
 */
const WithSecondButton = asProductCardToken({
  Components: {
    ButtonWrapper: startWith(Div),
    ButtonLink: startWith(ButtonClean),
  },
  Theme: {
    ButtonLink: as(vitalButton.WithTertiaryStyle, 'w-full text-center'),
  },
  Layout: {
    ButtonWrapper: as('flex', vitalSpacing.MarginTopSmall),
  },
  Content: {
    ButtonText: withPlaceholder('Button Text'),
  },
});

/**
 * Token that adds the Primary Vital Button to the Product Card.
 *
 * Note: This token is meant to be layered on top of the `Default` token.
 */
const WithPrimaryButton = asProductCardToken(WithButton, {
  Theme: {
    CTALink: vitalButton.WithPrimaryStyle,
  },
});

/**
 * Token that adds the Secondary Vital Button to the Product Card.
 *
 * Note: This token is meant to be layered on top of the `Default` token.
 */
const WithSecondaryButton = asProductCardToken(WithButton, {
  Theme: {
    CTALink: vitalButton.WithSecondaryStyle,
  },
});

/**
 * Token that adds the Tertiary Vital Button to the Product Card.
 *
 * Note: This token is meant to be layered on top of the `Default` token.
 */
const WithTertiaryButton = asProductCardToken(WithButton, {
  Theme: {
    CTALink: vitalButton.WithTertiaryStyle,
  },
});

/**
 * A token that adds a placeholder ratings to the Product Card.
 *
 * Note: This token is meant to be layered on top of the `Default` token.
 */
const WithRatings = asProductCardToken({
  Components: {
    RatingWrapper: startWith(Div),
    Rating: on(Img)(addProps({
      src: 'https://svgshare.com/i/sTg.svg',
      alt: 'Stars with 4.1 rating, out of 5 max.',
      title: 'Rating stars',
    })),
  },
  Theme: {
    Rating: 'brightness-50',
  },
  Spacing: {
    RatingWrapper: as(
      vitalSpacing.MarginTopMedium,
      vitalSpacing.MarginBottomMedium,
    ),
  },
});

/**
 * Token that sets Horizontal Orientation for the Product Card.
 * Re-Exported `WithHorizontalLeftOrientation` combined with the `WithHorizontalContentCentered`
 * unchanged from the `vitalCard` collection.
 *
 * Note: This token is meant to be layered on top of the `vitalArticleCard.Default` token.
 */
const WithHorizontalOrientation = asProductCardToken(
  WithHorizontalLeftOrientation,
  WithHorizontalContentCentered,
);

export interface VitalProductCard extends TokenCollection<CardComponents, DefaultDomains> {
  /**
   * Defines the Product card for the Vital DS.
   * - Extends the Base card with vertical orientation.
   */
  Default: CardToken,
  /**
   * Token that adds an Eyebrow to the Product Card.
   * Adds the `EyebrowWrapper` slot as a `Div` and the `Eyebrow` slot as default Plain Editor.
   *
   * Note: This token is meant to be layered on top of the `Default` token.
   */
  WithEyebrow: CardToken,
  /**
   * Token that adds the Description slot to the Product Card.
   * Adds the `DescriptionWrapper` slot as `P` element and the `Description` slot
   * as default Plain Text Editor.
   *
   * Note: This token is meant to be layered on top of the `Default` token.
   */
  WithDescription: CardToken,
  /**
   * Token that adds the Primary Vital Button to the Product Card.
   *
   * Note: This token is meant to be layered on top of the `Default` token.
   */
  WithPrimaryButton: CardToken,
  /**
   * Token that adds the Secondary Vital Button to the Product Card.
   *
   * Note: This token is meant to be layered on top of the `Default` token.
   */
  WithSecondaryButton: CardToken,
  /**
   * Token that adds the Tertiary Vital Button to the Product Card.
   *
   * Note: This token is meant to be layered on top of the `Default` token.
   */
  WithTertiaryButton: CardToken,
  /**
   * Token that adds the Second Button to the Product Card.
   * Second Button is a Tertiary button which will be rendered below the Main Card Button.
   */
  WithSecondButton: CardToken,
  /**
   * A token that adds a placeholder ratings to the Product Card.
   *
   * Note: This token is meant to be layered on top of the `Default` token.
   */
  WithRatings: CardToken,
  /**
   * Token that adds a Line Clamping to the Product Card Title.
   * Ensures that the Title doesn't span on more than 3 lines.
   *
   * Note: This token is meant to be layered on top of the `Default` token.
   */
  WithTitleLineClamp: CardToken,
  /**
   * Token that adds Padding the Product Card.
   * This is primarily used for the product carousels.
   *
   * Note: This token is meant to be layered on top of the `Default` token.
   */
  WithPaddings: CardToken,
  /**
   * Token that adds Background the Product Card Wrapper.
   * Some Brands are expected to have a Product Card background.
   *
   * Note: This token is meant to be layered on top of the `Default` token.
   */
  WithBackground: CardToken,
  /**
   * Token that sets Horizontal Orientation for the Product Card.
   * Re-Exported `WithHorizontalLeftOrientation` combined with the `WithHorizontalContentCentered`
   * unchanged from the `vitalCard` collection.
   *
   * Note: This token is meant to be layered on top of the `vitalArticleCard.Default` token.
   */
  WithHorizontalOrientation: CardToken,
}

const vitalProductCard: VitalProductCard = {
  Default,
  WithEyebrow,
  WithDescription,
  WithPrimaryButton,
  WithSecondaryButton,
  WithTertiaryButton,
  WithSecondButton,
  WithRatings,
  WithTitleLineClamp,
  WithPaddings,
  WithBackground,
  WithHorizontalOrientation,
};

export default vitalProductCard;
