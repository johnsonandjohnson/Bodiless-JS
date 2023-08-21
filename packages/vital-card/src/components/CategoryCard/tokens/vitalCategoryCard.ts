import { withPlaceholder } from '@bodiless/components';
import {
  as, extendMeta, flowHoc, H3, on, replaceWith, TokenCollection
} from '@bodiless/fclasses';
import { asButtonToken, ButtonClean, vitalButton } from '@bodiless/vital-button';
import { EditorPlainClean, vitalEditorPlain } from '@bodiless/vital-editors';
import {
  DefaultDomains, vitalCategoryCardElement, vitalSpacing, vitalTypography
} from '@bodiless/vital-elements';
import { CardComponents } from '../../Card';
import { CardToken } from '../../Card/CardClean';
import Base from '../../Card/tokens/Base';
import { asCategoryCardToken } from '../CategoryCardClean';

/**
 * Default Category Card Button.
 * Plain vital button with `WithTertiaryStyle` token and `CATEGORY LINK` placeholder.
 */
const CategoryCardButton = asButtonToken(
  vitalButton.Plain,
  vitalButton.WithTertiaryStyle,
  {
    Content: {
      Body: withPlaceholder('CATEGORY LINK'),
    },
  }
);

/**
 * Default Category Card Token.
 * By default Category Card has `Image` and `Link` slots.
 */
const Default = asCategoryCardToken({
  ...Base,
  Components: {
    ...Base.Components,
    Eyebrow: undefined,
    Description: undefined,
    CTAWrapper: undefined,
    Title: undefined,
    CTALink: on(ButtonClean)(CategoryCardButton),
  },
  Layout: {
    ...Base.Layout,
    ContentWrapper: 'items-start',
  },
  Spacing: {
    ...Base.Spacing,
    ContentWrapper: as(
      vitalCategoryCardElement.PaddingTop,
      vitalCategoryCardElement.PaddingBottom
    ),
  },
  Meta: extendMeta(
    flowHoc.meta.term('Sub Type')('Category'),
    flowHoc.meta.term('CTA Type')('Fully Clickable'),
  ),
});

/**
 * Token that adds a Title to the Category Card.
 * Adds the `TitleWrapper` slot as an `H3` and the `Title` slot as default Plain Editor.
 *
 * Note: This token is meant to be layered on top of the `Default` token.
 */
const WithTitle = asCategoryCardToken({
  Components: {
    TitleWrapper: replaceWith(H3),
    Title: on(EditorPlainClean)(vitalEditorPlain.Default),
  },
  Theme: {
    TitleWrapper: as(
      vitalTypography.HeadlineSmall,
      vitalCategoryCardElement.TextLightThemeHeadline,
    ),
  },
  Spacing: {
    CTAWrapper: vitalSpacing.MarginTopMedium,
  },
  Content: {
    Title: withPlaceholder('Category Title'),
  }
});

export interface VitalCategoryCard extends TokenCollection<CardComponents, DefaultDomains> {
  /**
   * Defines the default Category card for the Vital DS.
   * - Extends the Base card.
   */
  Default: CardToken,
  /**
   * Token that adds an Title to the Category Card.
   * Adds the `TitleWrapper` slot as an `H3` and the `Title` slot as default Plain Editor.
   *
   * Note: This token is meant to be layered on top of the `Default` token.
   */
  WithTitle: CardToken,
}
/**
   *
/**
 * Tokens for CategoryCardClean
 * This token collection extends vitalCategoryCard
 *
 * @category Token Collection
 * @see vitalCategoryCard
 */

const vitalCategoryCard: VitalCategoryCard = {
  Default,
  WithTitle,
};

export default vitalCategoryCard;
