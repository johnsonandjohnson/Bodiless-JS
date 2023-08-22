import { asTokenGroup } from '../util';
import { vitalColor } from '../components/Color';

export const meta = {
  categories: {
    Type: ['Element'],
    Group: ['DividerElement'],
  },
};

export default asTokenGroup(meta)({
  Primary: vitalColor.BorderDarkBase,
  Secondary: vitalColor.BorderDarkAlt1,
  DarkThemeSecondary: vitalColor.BorderLightBase,
  LightThemePrimary: vitalColor.BorderDarkBase,
  LightThemeSecondary: vitalColor.BorderDarkAlt1,
  DarkThemePrimary: vitalColor.BorderLightBase,
});
