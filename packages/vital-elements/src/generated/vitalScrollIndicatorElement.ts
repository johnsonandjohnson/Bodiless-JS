import { asTokenGroup } from '../util';
import { vitalColor } from './semantic';

const meta = {
  categories: {
    Type: ['Element'],
    Group: ['ScrollIndicatorElement'],
  },
};

export default asTokenGroup(meta)({
  LightThemeActive: vitalColor.ScrollbarInteractiveLightThemeIdle,
  LightThemeInactive: vitalColor.BorderLightThemeBase,
  DarkThemeActive: vitalColor.ScrollbarInteractiveDarkThemeIdle,
  DarkThemeInactive: vitalColor.BorderDarkThemeBase,
});
