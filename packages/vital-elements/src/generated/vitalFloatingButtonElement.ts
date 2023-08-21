import { asTokenGroup } from '../util';
import { vitalColor } from '../components/Color';

export const meta = {
  categories: {
    Type: ['Element'],
    Group: ['FloatingButtonElement'],
  },
};

export default asTokenGroup(meta)({
  TextBodySmall: vitalColor.TextDarkAlt1,
  BorderBorder: vitalColor.BorderDarkBase,
  BackgroundBackground: vitalColor.BackgroundAlt6,
  TextDarkThemeBodySmall: vitalColor.TextDarkAlt1,
  TextLightThemeBodySmall: vitalColor.TextDarkAlt1,
  BorderLightThemeBorder: vitalColor.BorderDarkBase,
  BorderDarkThemeBorder: vitalColor.BorderLightBase,
  BackgroundDarkThemeBackground: vitalColor.BackgroundAlt5,
  BackgroundLightThemeBackground: vitalColor.BackgroundAlt6,
});
