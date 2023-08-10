import { asTokenGroup } from '../util';
import { vitalColor } from '../components/Color';

export const meta = {
  categories: {
    Type: ['Element'],
    Group: ['ModalElement'],
  },
};

export default asTokenGroup(meta)({
  TextLightThemeLink: vitalColor.TextInteractiveLightThemeIdle,
  TextLightThemeHeadline: vitalColor.TextLightThemeBase,
  BorderLightThemeBorder: vitalColor.BorderLightThemeBase,
  BackgroundLightThemeBackground: vitalColor.BackgroundBase,
  TextLightThemeBodySmall: vitalColor.TextLightThemeBase,
  TextLightThemeBody: vitalColor.TextLightThemeBase,
  BorderRadiusAll: 'rounded-0px',
});
