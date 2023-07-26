import { asTokenGroup } from '../util';
import { vitalColor } from '../components/Color';

export const meta = {
  categories: {
    Type: ['Element'],
    Group: ['NavigationElement'],
  },
};

export default asTokenGroup(meta)({
  PrimaryDropdownBackgroundDarkThemeBackground: vitalColor.BackgroundAlt8,
  PrimaryDropdownBackgroundLightThemeBackground: vitalColor.BackgroundBase,
  PrimaryBackgroundDarkThemePrimaryNavigation: vitalColor.BackgroundAlt5,
  PrimaryBackgroundLightThemePrimaryNavigation: vitalColor.BackgroundBase,
  PrimaryDropdownBorderDarkThemeBorder: vitalColor.BorderInteractiveDarkThemeIdle,
  PrimaryDropdownBorderLightThemeBorder: vitalColor.BorderInteractiveLightThemeIdle,
  SecondaryBackgroundDarkThemeBackground: vitalColor.BackgroundAlt8,
  SecondaryBackgroundLightThemeBackground: vitalColor.BackgroundAlt6,
});
