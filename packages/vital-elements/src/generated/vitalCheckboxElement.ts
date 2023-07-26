import { asTokenGroup } from '../util';
import { vitalColor } from '../components/Color';

export const meta = {
  categories: {
    Type: ['Element'],
    Group: ['CheckboxElement'],
  },
};

export default asTokenGroup(meta)({
  BorderLightThemeChecked: vitalColor.BorderInteractiveLightThemeIdle,
  BorderLightThemeHover: vitalColor.BorderLightThemeBase,
  BorderLightThemeIdle: vitalColor.BorderLightThemeBase,
  BackgroundLightThemeDisabled: vitalColor.BackgroundInteractiveLightThemeDisabled,
  BackgroundLightThemeChecked: vitalColor.BackgroundInteractiveLightThemeIdle,
  BackgroundLightThemeHover: vitalColor.BackgroundInteractiveLightThemeHover,
  TextLightThemeLabel: vitalColor.TextLightThemeBase,
  BorderLightThemeDisabled: vitalColor.BorderInteractiveLightThemeDisabled,
  MarginRight: 'mr-12px',
  TextDarkThemeLabel: vitalColor.TextLightThemeBase,
});
