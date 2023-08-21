import { asTokenGroup } from '../util';
import { vitalColor } from '../components/Color';

export const meta = {
  categories: {
    Type: ['Element'],
    Group: ['BreadcrumbElement'],
  },
};

export default asTokenGroup(meta)({
  TextActive: vitalColor.TextDarkBase,
  TextHover: vitalColor.TextInteractiveDarkIdle,
  TextIdle: vitalColor.TextDarkBase,
  TextDarkThemeActive: vitalColor.TextLightBase,
  TextDarkThemeHover: vitalColor.TextInteractiveLightIdle,
  TextDarkThemeIdle: vitalColor.TextLightBase,
  TextLightThemeActive: vitalColor.TextDarkBase,
  TextLightThemeHover: vitalColor.TextInteractiveDarkIdle,
  TextLightThemeIdle: vitalColor.TextDarkBase,
});
