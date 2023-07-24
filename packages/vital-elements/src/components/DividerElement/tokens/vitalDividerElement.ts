import { asTokenGroup } from '../../../util';
import { vitalColor } from '../../Color';
import { DividerElementMeta } from '../meta';

export default asTokenGroup(DividerElementMeta)({
  DarkThemeSecondary: vitalColor.BorderDarkThemeBase,
  LightThemePrimary: vitalColor.BorderLightThemeBase,
  LightThemeSecondary: vitalColor.BorderLightThemeAlt1,
  DarkThemePrimary: vitalColor.BorderDarkThemeBase,
});
