import { as, TokenCollection } from '@bodiless/fclasses';
import { vitalColor, vitalTypography } from '@bodiless/vital-elements';

import { asCardToken, CardComponents, CardToken } from '../Card/CardClean';

const BorderProductCard = asCardToken({
  Theme: {
    _: as(
      vitalColor.BorderLight,
      'border-solid border-1'
    ),
  }
});

const BorderRadiusProductCard = asCardToken({
  Theme: { _: 'rounded-none' },
});

const ColorProductCardIcon = asCardToken({
  Theme: { _: vitalColor.IconDark },
});

const ColorProductCardBackground = asCardToken({
  Theme: { _: vitalColor.BackgroundBase },
});

const ColorProductCardTextTitle = asCardToken({
  Theme: { _: vitalColor.TextDark1 },
});

const ColorProductCardTextReview = asCardToken({
  Theme: { _: vitalColor.TextDark1 },
});

const ColorProductCardTextDescription = asCardToken({
  Theme: { _: vitalColor.TextDark2 },
});

const ColorProductCardTextEyebrow = asCardToken({
  Theme: { _: vitalColor.TextDark1 },
});

const ColorProductCardScrollDotActive = asCardToken({
  Theme: { _: vitalColor.InteractiveDarkDefault },
});

const ColorProductCardScrollDotInactive = asCardToken({
  Theme: { _: 'neutral-400' },
});

const SpacingProductCardPadding = asCardToken({
  Spacing: { _: 'p-md' },
});

const TextProductCardTitle = asCardToken({
  // Should Typography be under Theme or Components?
  Theme: { _: vitalTypography.H4 },
});

const TextProductCardEyebrow = asCardToken({
  // Should Typography be under Theme or Components?
  Theme: { _: vitalTypography.Eyebrow },
});

const TextProductCardDescription = asCardToken({
  // Should Typography be under Theme or Components?
  // @TODO: this should be vitalTypography.BodyRegular — update vitalTypography.
  Theme: { _: vitalTypography.Body },
});

const TextProductCardReview = asCardToken({
  // Should Typography be under Theme or Components?
  Theme: { _: vitalTypography.TextCrumbsReviewsRegular },
});

// @TODO: What should be the name for this collection?
interface Vital2ProductCardTokens {
  BorderProductCard: CardToken,
  BorderRadiusProductCard: CardToken,
  ColorProductCardIcon: CardToken,
  ColorProductCardBackground: CardToken,
  ColorProductCardTextTitle: CardToken,
  ColorProductCardTextReview: CardToken,
  ColorProductCardTextDescription: CardToken,
  ColorProductCardTextEyebrow: CardToken,
  ColorProductCardScrollDotActive: CardToken,
  ColorProductCardScrollDotInactive: CardToken,
  SpacingProductCardPadding: CardToken,
  TextProductCardTitle: CardToken,
  TextProductCardEyebrow: CardToken,
  TextProductCardDescription: CardToken,
  TextProductCardReview: CardToken,
}

export interface VitalProductCard extends
  Vital2ProductCardTokens,
  TokenCollection<CardComponents, {}>
{}

const vitalProductCard: VitalProductCard = {
  BorderProductCard,
  BorderRadiusProductCard,
  ColorProductCardIcon,
  ColorProductCardBackground,
  ColorProductCardTextTitle,
  ColorProductCardTextReview,
  ColorProductCardTextDescription,
  ColorProductCardTextEyebrow,
  ColorProductCardScrollDotActive,
  ColorProductCardScrollDotInactive,
  SpacingProductCardPadding,
  TextProductCardTitle,
  TextProductCardEyebrow,
  TextProductCardDescription,
  TextProductCardReview,
};

export default vitalProductCard;
