import { asTokenGroup } from '../util';
import { vitalColor } from '../components/Color';

export const meta = {
  categories: {
    Type: ['Element'],
    Group: ['HeroBannerElement'],
  },
};

export default asTokenGroup(meta)({
  TextSubheadline: vitalColor.TextDarkBase,
  TextBody: vitalColor.TextDarkBase,
  TextHeadline: vitalColor.TextDarkBase,
  TextEyebrow: vitalColor.TextDarkBase,
  BackgroundBackground: vitalColor.BackgroundBase,
  TextDarkThemeSubheadline: vitalColor.TextLightBase,
  TextLightThemeSubheadline: vitalColor.TextDarkBase,
  TextDarkThemeHeadline: vitalColor.TextLightBase,
  TextLightThemeBody: vitalColor.TextDarkBase,
  TextLightThemeHeadline: vitalColor.TextDarkBase,
  TextDarkThemeBody: vitalColor.TextLightBase,
  ImageBorderRadiusTopLeft: 'rounded-tl-0px',
  TextLightThemeEyebrow: vitalColor.TextDarkBase,
  TextDarkThemeEyebrow: vitalColor.TextLightBase,
  BackgroundLightThemeBackground: vitalColor.BackgroundBase,
  ImageBorderRadiusTopRight: 'rounded-tr-0px',
  ImageBorderRadiusBottomRight: 'rounded-br-0px',
  BackgroundDarkThemeBackground: vitalColor.BackgroundAlt5,
  ImageBorderRadiusBottomLeft: 'rounded-bl-0px',
});
