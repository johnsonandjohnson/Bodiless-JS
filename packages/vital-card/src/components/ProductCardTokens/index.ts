import { as } from '@bodiless/fclasses';
import { asTokenGroup, vitalColor, vital2Typography } from '@bodiless/vital-elements';

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
  TextProductCardTitle: vital2Typography.H4,
  TextProductCardEyebrow: vital2Typography.Eyebrow,
  TextProductCardDescription: vital2Typography.BodyRegular,
  TextProductCardReview: vital2Typography.CrumbsReviewsRegular,
});

export default vitalProductCard;
