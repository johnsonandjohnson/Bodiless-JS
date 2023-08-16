import { asTokenGroup } from '../util';
import { vitalColor } from '../components/Color';

export const meta = {
  categories: {
    Type: ['Element'],
    Group: ['DividerElement'],
  },
};

export default asTokenGroup(meta)({
  DarkThemeSecondary: vitalColor.BorderDarkThemeBase,
  LightThemePrimary: vitalColor.BorderLightThemeBase,
  LightThemeSecondary: vitalColor.BorderLightThemeAlt1,
  DarkThemePrimary: vitalColor.BorderDarkThemeBase,
});
