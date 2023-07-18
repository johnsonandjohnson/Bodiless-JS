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
  ButtonPrimaryBorderRadius: 'rounded-8',
  BorderPaddingButton: 'px-x-lg py-md',
  // TODO Needs work shouldn't have defined
  ShadowButtonFocus: 'focus:drop-shadow-button',
  TextButtonDefault: vitalTypography.BodyBold,
  // Primary
  ButtonPrimaryBackgroundLightThemeIdle: vitalColor.SemanticColorPrimaryBackgroundLightThemeIdle,
  ButtonPrimaryBackgroundLightThemeHover: vitalColor.SemanticColorPrimaryBackgroundLightThemeHover,
  ButtonPrimaryBackgroundLightThemeFocus: vitalColor.SemanticColorPrimaryBackgroundLightThemeFocus,
  // eslint-disable-next-line max-len
  ButtonPrimaryBackgroundLightThemePressed: vitalColor.SemanticColorPrimaryBackgroundLightThemePressed,
  // eslint-disable-next-line max-len
  ButtonPrimaryBackgroundLightThemeDisabled: vitalColor.SemanticColorPrimaryBackgroundLightThemeDisabled,
  ButtonPrimaryTextLightThemeText: vitalColor.ColorButtonPrimaryTextDarkThemeText,
  // Secondary
  ButtonSecondaryTextLightThemeDefault: vitalColor.SemanticColorSecondaryTextLightThemeDefault,
  ButtonSecondaryTextLightThemeHover: vitalColor.SemanticColorSecondaryTextLightThemeHover,
  ButtonSecondaryTextLightThemeFocus: vitalColor.SemanticColorSecondaryTextLightThemeFocus,
  ButtonSecondaryTextLightThemePressed: vitalColor.SemanticColorSecondaryTextLightThemePressed,
  ButtonSecondaryTextLightThemeDisabled: vitalColor.SemanticColorSecondaryTextLightThemeDisabled,
  ButtonSecondaryBorderLightThemeDefault: as(vitalColor.SemanticColorSecondaryBorderLightThemeDefault, 'border-solid border-1'),
  ButtonSecondaryBorderLightThemeHover: as(vitalColor.SemanticColorSecondaryBorderLightThemeHover, 'border-solid border-1'),
  ButtonSecondaryBorderLightThemeFocus: as(vitalColor.SemanticColorSecondaryBorderLightThemeFocus, 'border-solid border-1'),
  ButtonSecondaryBorderLightThemePressed: as(vitalColor.SemanticColorSecondaryBorderLightThemePressed, 'border-solid border-1'),
  ButtonSecondaryBorderLightThemeDisabled: as(vitalColor.SemanticColorSecondaryBorderLightThemeDisabled, 'border-solid border-1'),
  // Tertiary
  ButtonTertiaryTextLightThemeDefault: vitalColor.SemanticColorTertiaryTextLightThemeIdle,
  ButtonTertiaryTextLightThemeHover: vitalColor.SemanticColorTertiaryTextLightThemeHover,
  ButtonTertiaryTextLightThemeFocus: vitalColor.SemanticColorTertiaryTextLightThemeFocus,
  ButtonTertiaryTextLightThemePressed: vitalColor.SemanticColorTertiaryTextLightThemePressed,
  ButtonTertiaryTextLightThemeDisabled: vitalColor.SemanticColorTertiaryTextLightThemeDisabled,
});

export default vitalButtonElement;
