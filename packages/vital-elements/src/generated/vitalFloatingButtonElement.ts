import { asTokenGroup } from '../util';
import { vitalColor } from './semantic';

const meta = {
  categories: {
    Type: ['Element'],
    Group: ['FloatingButtonElement'],
  },
};

export default asTokenGroup(meta)({
  TextDarkThemeBodySmall: vitalColor.TextLightThemeAlt1,
  TextLightThemeBodySmall: vitalColor.TextLightThemeAlt1,
  BorderLightThemeBorder: vitalColor.BorderLightThemeBase,
  BorderDarkThemeBorder: vitalColor.BorderDarkThemeBase,
  BackgroundDarkThemeBackground: vitalColor.BackgroundAlt5,
  BackgroundLightThemeBackground: vitalColor.BackgroundAlt6,
});
