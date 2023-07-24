import { asTokenGroup } from '../util';
import { vitalColor } from './semantic';

const meta = {
  categories: {
    Type: ['Element'],
    Group: ['HeroBannerElement'],
  },
};

export default asTokenGroup(meta)({
  TextDarkThemeHeadline: vitalColor.TextDarkThemeBase,
  TextLightThemeBody: vitalColor.TextLightThemeBase,
  TextLightThemeHeadline: vitalColor.TextLightThemeBase,
  TextDarkThemeBody: vitalColor.TextDarkThemeBase,
  ImageBorderRadiusTopLeft: 'rounded-tl-0px',
  TextLightThemeEyebrow: vitalColor.TextLightThemeBase,
  TextDarkThemeEyebrow: vitalColor.TextDarkThemeBase,
  BackgroundLightThemeBackground: vitalColor.BackgroundBase,
  ImageBorderRadiusTopRight: 'rounded-tr-0px',
  ImageBorderRadiusBottomRight: 'rounded-br-0px',
  BackgroundDarkThemeBackground: vitalColor.BackgroundAlt5,
  ImageBorderRadiusBottomLeft: 'rounded-bl-0px',
});
