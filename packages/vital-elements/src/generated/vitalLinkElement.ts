import { asTokenGroup } from '../util';
import { vitalColor } from '../components/Color';

export const meta = {
  categories: {
    Type: ['Element'],
    Group: ['LinkElement'],
  },
};

export default asTokenGroup(meta)({
  TextDisabled: vitalColor.TextInteractiveDarkDisabled,
  TextPressed: vitalColor.TextInteractiveDarkPressed,
  TextIdle: vitalColor.TextInteractiveDarkIdle,
  TextFocus: vitalColor.TextInteractiveDarkFocus,
  TextHover: vitalColor.TextInteractiveDarkHover,
  TextDarkThemeIdle: vitalColor.TextInteractiveLightIdle,
  TextLightThemeDisabled: vitalColor.TextInteractiveDarkDisabled,
  TextLightThemePressed: vitalColor.TextInteractiveDarkPressed,
  TextLightThemeIdle: vitalColor.TextInteractiveDarkIdle,
  TextLightThemeFocus: vitalColor.TextInteractiveDarkFocus,
  TextDarkThemeFocus: vitalColor.TextInteractiveLightFocus,
  TextDarkThemePressed: vitalColor.TextInteractiveLightPressed,
  TextDarkThemeDisabled: vitalColor.TextInteractiveLightDisabled,
  TextDarkThemeHover: vitalColor.TextInteractiveLightHover,
  TextLightThemeHover: vitalColor.TextInteractiveDarkHover,
  BorderRadiusTopLeft: 'rounded-tl-2px md:rounded-tl-2px lg:rounded-tl-2px',
  BorderRadiusTopRight: 'rounded-tr-2px md:rounded-tr-2px lg:rounded-tr-2px',
  BorderRadiusBottomRight: 'rounded-br-2px md:rounded-br-2px lg:rounded-br-2px',
  BorderRadiusBottomLeft: 'rounded-bl-2px md:rounded-bl-2px lg:rounded-bl-2px',
});
