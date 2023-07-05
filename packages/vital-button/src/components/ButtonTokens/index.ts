import { as } from '@bodiless/fclasses';
import { asTokenGroup, vitalColor, vital2Typography } from '@bodiless/vital-elements';

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
  ColorButtonPrimaryBackgroundDefault: vitalColor.InteractiveDarkDefault,
  ColorButtonPrimaryBackgroundHover: vitalColor.InteractiveDarkHover,
  ColorButtonPrimaryBackgroundFocus: vitalColor.InteractiveDarkFocus,
  ColorButtonPrimaryBackgroundPressed: vitalColor.InteractiveDarkPressed,
  ColorButtonPrimaryBackgroundDisabled: vitalColor.InteractiveDarkDisabled,
  ColorButtonPrimaryTextDefault: vitalColor.TextLight1,
  ColorButtonSecondaryBackgroundHover: vitalColor.InteractiveDarkHover,
  ColorButtonSecondaryBackgroundFocus: vitalColor.InteractiveDarkFocus,
  ColorButtonSecondaryBackgroundPressed: vitalColor.InteractiveDarkPressed,
  ColorButtonSecondaryTextDefault: vitalColor.InteractiveDarkDefault,
  ColorButtonSecondaryTextHover: vitalColor.InteractiveDarkHover,
  ColorButtonSecondaryTextFocus: vitalColor.InteractiveDarkFocus,
  ColorButtonSecondaryTextPressed: vitalColor.InteractiveDarkPressed,
  ColorButtonSecondaryTextDisable: vitalColor.InteractiveDarkDisabled,
  ColorButtonTertiaryTextDefault: vitalColor.InteractiveDarkDefault,
  ColorButtonTertiaryTextHover: vitalColor.InteractiveDarkHover,
  ColorButtonTertiaryTextFocus: vitalColor.InteractiveDarkFocus,
  ColorButtonTertiaryTextPressed: vitalColor.InteractiveDarkPressed,
  ColorButtonTertiaryTextDisable: vitalColor.InteractiveDarkDisabled,
  ColorButtonTertiaryBackgroundFocus: vitalColor.InteractiveDarkBackgroundFocused,
  BorderRadiusButton: 'rounded-lg',
  BorderPaddingButton: 'pt-md pb-x-lg',
  BorderButtonSecondaryDefault: as(vitalColor.InteractiveDarkDefault, 'border-solid border-1'),
  BorderButtonSecondaryHover: as(vitalColor.InteractiveDarkBackgroundHover, 'border-solid border-1'),
  BorderButtonSecondaryFocus: as(vitalColor.InteractiveDarkBackgroundFocused, 'border-solid border-1'),
  BorderButtonSecondaryPressed: as(vitalColor.InteractiveDarkBackgroundPressed, 'border-solid border-1'),
  BorderButtonSecondaryDisabled: as(vitalColor.InteractiveDarkDisabled, 'border-solid border-1'),
  // TODO Needs work shouldn't have defined
  ShadowButtonFocus: 'drop-shadow-button',
  TextButtonDefault: vital2Typography.BodyBold,
});

export default vitalButtonTokens;
