import { asTokenGroup } from '../util';
import { vitalColor } from '../components/Color';

export const meta = {
  categories: {
    Type: ['Element'],
    Group: ['ArticleCardElement'],
  },
};

export default asTokenGroup(meta)({
  BorderRadiusTopRight: 'rounded-tr-0px',
  ImageBorderRadiusBottomRight: 'rounded-br-0px',
  ImageBorderRadiusTopRight: 'rounded-tr-0px',
  BorderRadiusBottomLeft: 'rounded-bl-0px',
  BorderRadiusBottomRight: 'rounded-br-0px',
  BorderRadiusTopLeft: 'rounded-tl-0px',
  TextDarkThemeEyebrow: vitalColor.TextDarkThemeBase,
  TextDarkThemeBody: vitalColor.TextDarkThemeBase,
  TextDarkThemeHeadline: vitalColor.TextDarkThemeBase,
  TextLightThemeEyebrow: vitalColor.TextLightThemeBase,
  TextLightThemeBody: vitalColor.TextLightThemeBase,
  TextLightThemeHeadline: vitalColor.TextLightThemeBase,
  ImageBorderRadiusTopLeft: 'rounded-tl-0px',
  ImageBorderRadiusBottomLeft: 'rounded-bl-0px',
  BackgroundDarkThemeBackground: vitalColor.BackgroundAlt5,
  BackgroundLightThemeBackground: vitalColor.BackgroundBase,
});
