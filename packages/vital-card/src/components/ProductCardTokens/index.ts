import { as } from '@bodiless/fclasses';
import { asTokenGroup, vitalColor, vitalTypography } from '@bodiless/vital-elements';

export const ProductCardMeta = {
  categories: {
    Type: ['Component'],
    Group: ['Card'],
  },
};

/**
 * @TODO: What should be the name for these token groups with vital 2.0 component tokens?
 */
const vitalProductCard = asTokenGroup(ProductCardMeta)({
  BorderProductCard: as(vitalColor.BorderLight, 'border-solid border-1'),
  BorderRadiusProductCard: 'rounded-none',
  ColorProductCardIcon: vitalColor.IconDark,
  ColorProductCardBackground: vitalColor.BackgroundBase,
  ColorProductCardTextTitle: vitalColor.TextDark1,
  ColorProductCardTextReview: vitalColor.TextDark1,
  ColorProductCardTextDescription: vitalColor.TextDark2,
  ColorProductCardTextEyebrow: vitalColor.TextDark1,
  ColorProductCardScrollDotActive: vitalColor.InteractiveDarkDefault,
  ColorProductCardScrollDotInactive: 'neutral-400',
  SpacingProductCardPadding: 'p-md',
  TextProductCardTitle: vitalTypography.H4V2,
  TextProductCardEyebrow: vitalTypography.EyebrowV2,
  TextProductCardDescription: vitalTypography.BodyRegular,
  TextProductCardReview: vitalTypography.CrumbsReviewsRegular,
});

export default vitalProductCard;
