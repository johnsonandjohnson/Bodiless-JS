import { asTokenGroup } from '../../../util';
import { vitalColor } from '../../Color';
import { AccordionElementMeta } from '../meta';

export default asTokenGroup(AccordionElementMeta)({
  DarkThemeSecondary: vitalColor.BorderDarkThemeBase,
  LightThemePrimary: vitalColor.BorderLightThemeBase,
  LightThemeSecondary: vitalColor.BorderLightThemeAlt1,
  DarkThemePrimary: vitalColor.BorderDarkThemeBase,
});
