/* eslint-disable max-len */
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
  PrimaryBorderRadius: 'rounded-8',
  BorderPaddingButton: 'px-24px py-16px',
  // TODO Needs work shouldn't have defined
  ShadowButtonFocus: 'focus:drop-shadow-button',
  TextButtonDefault: vitalTypography.BodyBold,
  // Primary
  // ButtonPrimaryBackgroundLightThemeIdle: vitalColor.ColorPrimaryBackgroundLightThemeIdle,
  // ButtonPrimaryBackgroundLightThemeHover: vitalColor.ColorPrimaryBackgroundLightThemeHover,
  // ButtonPrimaryBackgroundLightThemeFocus: vitalColor.ColorPrimaryBackgroundLightThemeFocus,
  // // eslint-disable-next-line max-len
  // ButtonPrimaryBackgroundLightThemePressed: vitalColor.ColorPrimaryBackgroundLightThemePressed,
  // // eslint-disable-next-line max-len
  // ButtonPrimaryBackgroundLightThemeDisabled: vitalColor.ColorPrimaryBackgroundLightThemeDisabled,
  // ButtonPrimaryTextLightThemeText: vitalColor.ColorButtonPrimaryTextLightThemeText,
  // // Secondary
  // ButtonSecondaryTextLightThemeDefault: vitalColor.ColorSecondaryTextLightThemeDefault,
  // ButtonSecondaryTextLightThemeHover: vitalColor.ColorSecondaryTextLightThemeHover,
  // ButtonSecondaryTextLightThemeFocus: vitalColor.ColorSecondaryTextLightThemeFocus,
  // ButtonSecondaryTextLightThemePressed: vitalColor.ColorSecondaryTextLightThemePressed,
  // ButtonSecondaryTextLightThemeDisabled: vitalColor.ColorSecondaryTextLightThemeDisabled,
  // ButtonSecondaryBorderLightThemeDefault: as(vitalColor.ColorSecondaryBorderLightThemeDefault, 'border-solid border-1'),
  // ButtonSecondaryBorderLightThemeHover: as(vitalColor.ColorSecondaryBorderLightThemeHover, 'border-solid border-1'),
  // ButtonSecondaryBorderLightThemeFocus: as(vitalColor.ColorSecondaryBorderLightThemeFocus, 'border-solid border-1'),
  // ButtonSecondaryBorderLightThemePressed: as(vitalColor.ColorSecondaryBorderLightThemePressed, 'border-solid border-1'),
  // ButtonSecondaryBorderLightThemeDisabled: as(vitalColor.ColorSecondaryBorderLightThemeDisabled, 'border-solid border-1'),
  // // Tertiary
  // ButtonTertiaryTextLightThemeDefault: vitalColor.ColorTertiaryTextLightThemeIdle,
  // ButtonTertiaryTextLightThemeHover: vitalColor.ColorTertiaryTextLightThemeHover,
  // ButtonTertiaryTextLightThemeFocus: vitalColor.ColorTertiaryTextLightThemeFocus,
  // ButtonTertiaryTextLightThemePressed: vitalColor.ColorTertiaryTextLightThemePressed,
  // ButtonTertiaryTextLightThemeDisabled: vitalColor.ColorTertiaryTextLightThemeDisabled,

  PrimaryBackgroundLightThemeIdle: vitalColor.BackgroundInteractiveLightThemeIdle,
  PrimaryBackgroundLightThemeHover: vitalColor.BackgroundInteractiveLightThemeHover,
  PrimaryBackgroundLightThemeFocus: vitalColor.BackgroundInteractiveLightThemeFocus,
  PrimaryBackgroundLightThemePressed: vitalColor.BackgroundInteractiveLightThemePressed,
  PrimaryBackgroundLightThemeDisabled: vitalColor.BackgroundInteractiveLightThemeDisabled,

  PrimaryBackgroundDarkThemeIdle: vitalColor.BackgroundInteractiveDarkThemeIdle,
  PrimaryBackgroundDarkThemeHover: vitalColor.BackgroundInteractiveDarkThemeHover,
  PrimaryBackgroundDarkThemeFocus: vitalColor.BackgroundInteractiveDarkThemeFocus,
  PrimaryBackgroundDarkThemePressed: vitalColor.BackgroundInteractiveDarkThemePressed,
  PrimaryBackgroundDarkThemeDisabled: vitalColor.BackgroundInteractiveDarkThemeDisabled,

  PrimaryTextDarkThemeText: vitalColor.TextLightThemeBase,
  PrimaryTextLightThemeText: vitalColor.TextDarkThemeBase,

  PrimaryIconDarkThemeIcon: vitalColor.TextLightThemeBase,
  PrimaryIconLightThemeIcon: vitalColor.TextDarkThemeBase,

  SecondaryTextLightThemeDefault: vitalColor.TextInteractiveLightThemeIdle,
  SecondaryTextLightThemeHover: vitalColor.TextInteractiveLightThemeHover,
  SecondaryTextLightThemeFocus: vitalColor.TextInteractiveLightThemeFocus,
  SecondaryTextLightThemePressed: vitalColor.TextInteractiveLightThemePressed,
  SecondaryTextLightThemeDisabled: vitalColor.TextInteractiveLightThemeDisabled,

  SecondaryTextDarkThemePressed: vitalColor.TextInteractiveDarkThemePressed,
  SecondaryTextDarkThemeDisabled: vitalColor.TextInteractiveDarkThemeDisabled,
  SecondaryTextDarkThemeFocus: vitalColor.TextInteractiveDarkThemeFocus,
  SecondaryTextDarkThemeDefault: vitalColor.TextInteractiveDarkThemeIdle,
  SecondaryTextDarkThemeHover: vitalColor.TextInteractiveDarkThemeHover,

  SecondaryBorderLightThemeDefault: as(vitalColor.BorderInteractiveLightThemeIdle, 'border-solid border-1px'),
  SecondaryBorderLightThemeFocus: as(vitalColor.BorderInteractiveLightThemeFocus, 'border-solid border-1px'),
  SecondaryBorderLightThemeHover: as(vitalColor.BorderInteractiveLightThemeHover, 'border-solid border-1px'),
  SecondaryBorderLightThemePressed: as(vitalColor.BorderInteractiveLightThemePressed, 'border-solid border-1px'),
  SecondaryBorderLightThemeDisabled: as(vitalColor.BorderInteractiveLightThemeDisabled, 'border-solid border-1px'),

  SecondaryBorderDarkThemeDefault: as(vitalColor.BorderInteractiveDarkThemeIdle, 'border-solid border-1px'),
  SecondaryBorderDarkThemeDisabled: as(vitalColor.BorderInteractiveDarkThemeDisabled, 'border-solid border-1px'),
  SecondaryBorderDarkThemeFocus: as(vitalColor.BorderInteractiveDarkThemeFocus, 'border-solid border-1px'),
  SecondaryBorderDarkThemeHover: as(vitalColor.BorderInteractiveDarkThemeHover, 'border-solid border-1px'),
  SecondaryBorderDarkThemePressed: as(vitalColor.BorderInteractiveDarkThemePressed, 'border-solid border-1px'),

  TertiaryTextLightThemeDefault: vitalColor.TextInteractiveLightThemeIdle,
  TertiaryTextLightThemeHover: vitalColor.TextInteractiveLightThemeHover,
  TertiaryTextLightThemeFocus: vitalColor.TextInteractiveLightThemeFocus,
  TertiaryTextLightThemePressed: vitalColor.TextInteractiveLightThemePressed,
  TertiaryTextLightThemeDisabled: vitalColor.TextInteractiveLightThemeDisabled,

  TertiaryTextDarkThemeDefault: vitalColor.TextInteractiveDarkThemeIdle,
  TertiaryTextDarkThemeHover: vitalColor.TextInteractiveDarkThemeHover,
  TertiaryTextDarkThemeFocus: vitalColor.TextInteractiveDarkThemeFocus,
  TertiaryTextDarkThemePressed: vitalColor.TextInteractiveDarkThemePressed,
  TertiaryTextDarkThemeDisabled: vitalColor.TextInteractiveDarkThemeDisabled,

});

export default vitalButtonElement;
