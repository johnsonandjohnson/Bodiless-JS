import { asTokenGroup } from '../util';
import { vitalColor } from '../components/Color';

export const meta = {
  categories: {
    Type: ['Element'],
    Group: ['LinkElement'],
  },
};

export default asTokenGroup(meta)({
  TextDarkThemeIdle: vitalColor.TextInteractiveDarkThemeIdle,
  TextLightThemeDisabled: vitalColor.TextInteractiveLightThemeDisabled,
  TextLightThemePressed: vitalColor.TextInteractiveLightThemePressed,
  TextLightThemeIdle: vitalColor.TextInteractiveLightThemeIdle,
  TextLightThemeFocus: vitalColor.TextInteractiveLightThemeFocus,
  TextDarkThemeFocus: vitalColor.TextInteractiveDarkThemeFocus,
  TextDarkThemePressed: vitalColor.TextInteractiveDarkThemePressed,
  TextDarkThemeDisabled: vitalColor.TextInteractiveDarkThemeDisabled,
  TextDarkThemeHover: vitalColor.TextInteractiveDarkThemeHover,
  TextLightThemeHover: vitalColor.TextInteractiveLightThemeHover,
});
