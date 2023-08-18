import { asTokenGroup } from '../util';
import { vitalColor } from '../components/Color';

export const meta = {
  categories: {
    Type: ['Element'],
    Group: ['ScrollIndicatorElement'],
  },
};

export default asTokenGroup(meta)({
  BackgroundActive: vitalColor.ScrollbarInteractiveDarkIdle,
  BackgroundInactive: vitalColor.BorderDarkBase,
  BackgroundLightThemeActive: vitalColor.ScrollbarInteractiveDarkIdle,
  BackgroundLightThemeInactive: vitalColor.BorderDarkBase,
  BackgroundDarkThemeActive: vitalColor.ScrollbarInteractiveLightIdle,
  BackgroundDarkThemeInactive: vitalColor.BorderLightBase,
});
