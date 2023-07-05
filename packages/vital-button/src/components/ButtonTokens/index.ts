import { as } from '@bodiless/fclasses';
import { asTokenGroup, vitalColor } from '@bodiless/vital-elements';

export const ButtonMeta = {
  categories: {
    Type: ['Component'],
    Group: ['Button'],
  },
};

// REFERENCE: https://github.com/dxp-prototype/vital-design-tokens/blob/tokens.json/components/buttons.json
/**
 * @TODO: What should be the name for these token groups with vital 2.0 component tokens?
 * It feels redundant to have `vitalProductCard.BorderProductCard` etc. We should either change
 * the collection name or discuss the options we have for changing the token names (in JSON file?).
 */
const vitalButtonTokens = asTokenGroup(ButtonMeta)({
  // Primary
  ColorButtonPrimaryBackgroundDefault: vitalColor.InteractiveDarkBackgroundDefault,
  ColorButtonPrimaryBackgroundHover: vitalColor.InteractiveDarkBackgroundHover,
  ColorButtonPrimaryBackgroundFocus: vitalColor.InteractiveDarkBackgroundFocus,
  ColorButtonPrimaryBackgroundPressed: vitalColor.InteractiveDarkBackgroundPressed,
  ColorButtonPrimaryBackgroundDisabled: vitalColor.InteractiveDarkBackgroundDisabled,
  ColorButtonPrimaryTextDefault: vitalColor.TextLight1,
  // Secondary
  ColorButtonSecondaryBackgroundHover: vitalColor.InteractiveDarkBackgroundHover,
  ColorButtonSecondaryBackgroundFocus: vitalColor.InteractiveDarkBackgroundFocus,
  ColorButtonSecondaryBackgroundPressed: vitalColor.InteractiveDarkBackgroundPressed,
  ColorButtonSecondaryTextDefault: vitalColor.InteractiveDarkTextDefault,
  ColorButtonSecondaryTextHover: vitalColor.InteractiveDarkTextHover,
  ColorButtonSecondaryTextFocus: vitalColor.InteractiveDarkTextFocus,
  ColorButtonSecondaryTextPressed: vitalColor.InteractiveDarkTextPressed,
  ColorButtonSecondaryTextDisabled: vitalColor.InteractiveDarkTextDisabled,
  BorderButtonSecondaryDefault: as(vitalColor.InteractiveDarkBorderDefault, 'border-solid border-1'),
  BorderButtonSecondaryHover: as(vitalColor.InteractiveDarkBorderHover, 'border-solid border-1'),
  BorderButtonSecondaryFocus: as(vitalColor.InteractiveDarkBorderFocus, 'border-solid border-1'),
  BorderButtonSecondaryPressed: as(vitalColor.InteractiveDarkBorderPressed, 'border-solid border-1'),
  BorderButtonSecondaryDisabled: as(vitalColor.InteractiveDarkBorderDisabled, 'border-solid border-1'),
  // Tertiary
  ColorButtonTertiaryTextDefault: vitalColor.InteractiveDarkTextDefault,
  ColorButtonTertiaryTextHover: vitalColor.InteractiveDarkTextHover,
  ColorButtonTertiaryTextFocus: vitalColor.InteractiveDarkTextFocus,
  ColorButtonTertiaryTextPressed: vitalColor.InteractiveDarkTextPressed,
  ColorButtonTertiaryTextDisabled: vitalColor.InteractiveDarkTextDisabled,
  ColorButtonTertiaryBackgroundFocus: vitalColor.InteractiveDarkBackgroundFocus,
  BorderRadiusButton: 'rounded-lg',
  BorderPaddingButton: 'px-x-lg py-md',
  // TODO Needs work shouldn't have defined
  ShadowButtonFocus: 'focus:drop-shadow-button',
  // TextButtonDefault: vital2Typography.BodyBold,
  TextButtonDefault: 'text-base leading-6 font-bold font-2',
});

export default vitalButtonTokens;
