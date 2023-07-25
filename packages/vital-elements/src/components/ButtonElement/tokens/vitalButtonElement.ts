/* eslint-disable max-len */
import { as } from '@bodiless/fclasses';
import { vitalTypography } from '../../Typography';
import { asTokenGroup } from '../../../util';
import { vitalColor } from '../../Color';

// REFERENCE: https://github.com/dxp-prototype/vital-design-tokens/blob/tokens.json/components/buttons.json
/**
 * @TODO: What should be the name for these token groups with vital 2.0 component tokens?
 * It feels redundant to have `vitalProductCard.BorderProductCard` etc. We should either change
 * the collection name or discuss the options we have for changing the token names (in JSON file?).
 */
export default asTokenGroup()({
  // All button styles
  PrimaryBorderRadiusBorderRadius: 'rounded-8px',
  SecondaryBorderRadiusBorderRadius: 'rounded-8px',
  TertiaryBorderRadius: 'rounded-8px',
  BorderPaddingButton: 'px-24px py-16px',
  // TODO Needs work shouldn't have defined
  ShadowButtonFocus: 'focus:drop-shadow-button',
  TextButtonDefault: vitalTypography.BodyBold,

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

  SecondaryTextDarkThemeDefault: vitalColor.TextInteractiveDarkThemeIdle,
  SecondaryTextDarkThemeHover: vitalColor.TextInteractiveDarkThemeHover,
  SecondaryTextDarkThemeFocus: vitalColor.TextInteractiveDarkThemeFocus,
  SecondaryTextDarkThemePressed: vitalColor.TextInteractiveDarkThemePressed,
  SecondaryTextDarkThemeDisabled: vitalColor.TextInteractiveDarkThemeDisabled,

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
