import { as } from '@bodiless/fclasses';
import { asTokenGroup, vitalColor, vitalTypography } from '@bodiless/vital-elements';

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
const vitalButtonElement = asTokenGroup(ButtonMeta)({
  // All button styles
  ButtonPrimaryBorderRadius: 'rounded-8px',
  BorderPaddingButton: 'px-x-lg py-md',
  // TODO Needs work shouldn't have defined
  ShadowButtonFocus: 'focus:drop-shadow-button',
  TextButtonDefault: vitalTypography.BodyBold,
  // Primary
  ButtonPrimaryBackgroundLightThemeIdle: vitalColor.ColorPrimaryBackgroundLightThemeIdle,
  ButtonPrimaryBackgroundLightThemeHover: vitalColor.ColorPrimaryBackgroundLightThemeHover,
  ButtonPrimaryBackgroundLightThemeFocus: vitalColor.ColorPrimaryBackgroundLightThemeFocus,
  // eslint-disable-next-line max-len
  ButtonPrimaryBackgroundLightThemePressed: vitalColor.ColorPrimaryBackgroundLightThemePressed,
  // eslint-disable-next-line max-len
  ButtonPrimaryBackgroundLightThemeDisabled: vitalColor.ColorPrimaryBackgroundLightThemeDisabled,
  ButtonPrimaryTextLightThemeText: vitalColor.ColorButtonPrimaryTextLightThemeText,
  // Secondary
  ButtonSecondaryTextLightThemeDefault: vitalColor.ColorSecondaryTextLightThemeDefault,
  ButtonSecondaryTextLightThemeHover: vitalColor.ColorSecondaryTextLightThemeHover,
  ButtonSecondaryTextLightThemeFocus: vitalColor.ColorSecondaryTextLightThemeFocus,
  ButtonSecondaryTextLightThemePressed: vitalColor.ColorSecondaryTextLightThemePressed,
  ButtonSecondaryTextLightThemeDisabled: vitalColor.ColorSecondaryTextLightThemeDisabled,
  ButtonSecondaryBorderLightThemeDefault: as(vitalColor.ColorSecondaryBorderLightThemeDefault, 'border-solid border-1'),
  ButtonSecondaryBorderLightThemeHover: as(vitalColor.ColorSecondaryBorderLightThemeHover, 'border-solid border-1'),
  ButtonSecondaryBorderLightThemeFocus: as(vitalColor.ColorSecondaryBorderLightThemeFocus, 'border-solid border-1'),
  ButtonSecondaryBorderLightThemePressed: as(vitalColor.ColorSecondaryBorderLightThemePressed, 'border-solid border-1'),
  ButtonSecondaryBorderLightThemeDisabled: as(vitalColor.ColorSecondaryBorderLightThemeDisabled, 'border-solid border-1'),
  // Tertiary
  ButtonTertiaryTextLightThemeDefault: vitalColor.ColorTertiaryTextLightThemeIdle,
  ButtonTertiaryTextLightThemeHover: vitalColor.ColorTertiaryTextLightThemeHover,
  ButtonTertiaryTextLightThemeFocus: vitalColor.ColorTertiaryTextLightThemeFocus,
  ButtonTertiaryTextLightThemePressed: vitalColor.ColorTertiaryTextLightThemePressed,
  ButtonTertiaryTextLightThemeDisabled: vitalColor.ColorTertiaryTextLightThemeDisabled,
});

export default vitalButtonElement;
