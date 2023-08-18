import { asTokenGroup } from '../util';
import { vitalColor } from '../components/Color';

export const meta = {
  categories: {
    Type: ['Element'],
    Group: ['ProductCardElement'],
  },
};

export default asTokenGroup(meta)({
  BorderBorder: vitalColor.BorderDarkBase,
  TextDescription: vitalColor.TextDarkBase,
  TextEyebrow: vitalColor.TextDarkBase,
  TextHeadline: vitalColor.TextDarkBase,
  TextReviews: vitalColor.TextDarkBase,
  BackgroundBackground: vitalColor.BackgroundBase,
  TextDarkThemeEyebrow: vitalColor.TextLightBase,
  ImageBorderRadiusBottomLeft: 'rounded-bl-0px',
  BorderLightThemeBorder: vitalColor.BorderDarkBase,
  TextLightThemeDescription: vitalColor.TextDarkBase,
  TextDarkThemeDescription: vitalColor.TextLightBase,
  TextDarkThemeReviews: vitalColor.TextLightBase,
  TextLightThemeEyebrow: vitalColor.TextDarkBase,
  ImageBorderRadiusTopRight: 'rounded-tr-0px',
  ImageBorderRadiusBottomRight: 'rounded-br-0px',
  BorderRadiusBottomLeft: 'rounded-bl-0px',
  BorderRadiusTopRight: 'rounded-tr-0px',
  BorderRadiusBottomRight: 'rounded-br-0px',
  TextDarkThemeHeadline: vitalColor.TextLightBase,
  TextLightThemeHeadline: vitalColor.TextDarkBase,
  BackgroundDarkThemeBackground: vitalColor.BackgroundAlt5,
  BorderDarkThemeBorder: vitalColor.BorderLightBase,
  ImageBorderRadiusTopLeft: 'rounded-tl-0px',
  TextLightThemeReviews: vitalColor.TextDarkBase,
  BackgroundLightThemeBackground: vitalColor.BackgroundBase,
  BorderRadiusTopLeft: 'rounded-tl-0px',
  PaddingTop: 'pt-16px md:pt-16px lg:pt-24px',
  PaddingBottom: 'pb-16px md:pb-16px lg:pb-24px',
  PaddingLeft: 'pl-16px md:pl-16px lg:pl-24px',
  PaddingRight: 'pr-16px md:pr-16px lg:pr-24px',
});
