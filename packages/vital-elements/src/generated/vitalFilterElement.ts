import { asTokenGroup } from '../util';
import { vitalColor } from '../components/Color';

export const meta = {
  categories: {
    Type: ['Element'],
    Group: ['FilterElement'],
  },
};

export default asTokenGroup(meta)({
  BreadcrumbBorderRadiusAll: 'rounded-NaNpx',
  BreadcrumbBackgroundLightThemeBackground: vitalColor.BackgroundAlt6,
  BreadcrumbTextLightThemeLabel: vitalColor.TextLightThemeBase,
  QuickFilterTextLightThemeDisabled: vitalColor.TextInteractiveLightThemeDisabled,
  QuickFilterTextLightThemeHover: vitalColor.TextInteractiveLightThemeHover,
  QuickFilterBorderLightThemeDisabledChecked: vitalColor.BorderInteractiveLightThemeDisabled,
  QuickFilterBorderLightThemeDisabledUnchecked: vitalColor.BorderInteractiveLightThemeDisabled,
  QuickFilterBorderLightThemeHoverChecked: vitalColor.BorderInteractiveLightThemeHover,
  QuickFilterBorderLightThemeHoverUnchecked: vitalColor.BorderInteractiveLightThemeHover,
  QuickFilterBackgroundLightThemeIdleChecked: vitalColor.BackgroundInteractiveLightThemeIdle,
  QuickFilterBackgroundLightThemeIdleUnchecked: vitalColor.BackgroundBase,
  BackgroundLightThemeBackground: vitalColor.BackgroundBase,
  CategoryTextLightThemeTitle: vitalColor.TextLightThemeBase,
  HeaderTextLightThemeHeadline: vitalColor.TextLightThemeBase,
  HeaderBorderLightThemeBorder: vitalColor.BorderLightThemeBase,
  QuickFilterBorderLightThemeIdleUnchecked: vitalColor.BorderInteractiveLightThemeIdle,
  QuickFilterBorderLightThemeIdleChecked: vitalColor.BorderInteractiveLightThemeIdle,
  QuickFilterBackgroundLightThemeDisabledChecked: vitalColor.BackgroundInteractiveLightThemeDisabled,
  CategoryPaddingBottom: 'pb-0px',
  QuickFilterBackgroundLightThemeHoverUnchecked: vitalColor.BackgroundBase,
  TextLightThemeLink: vitalColor.TextInteractiveLightThemeIdle,
  QuickFilterBackgroundLightThemeHoverChecked: vitalColor.BackgroundInteractiveLightThemeHover,
  TextLightThemeLabel: vitalColor.TextLightThemeBase,
  QuickFilterBackgroundLightThemeDisabledUnchecked: vitalColor.BackgroundBase,
  QuickFilterTextLightThemeIdle: vitalColor.TextInteractiveLightThemeIdle,
  QuickFilterBorderRadiusAll: 'rounded-NaNpx',
});
