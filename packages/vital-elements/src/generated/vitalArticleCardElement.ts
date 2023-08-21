import { asTokenGroup } from '../util';
import { vitalColor } from '../components/Color';

export const meta = {
  categories: {
    Type: ['Element'],
    Group: ['ArticleCardElement'],
  },
};

export default asTokenGroup(meta)({
  TextEyebrow: vitalColor.TextDarkBase,
  TextBody: vitalColor.TextDarkBase,
  TextHeadline: vitalColor.TextDarkBase,
  BackgroundBackground: vitalColor.BackgroundAlt6,
  BorderRadiusTopRight: 'rounded-tr-0px',
  ImageBorderRadiusBottomRight: 'rounded-br-0px',
  ImageBorderRadiusTopRight: 'rounded-tr-0px',
  BorderRadiusBottomLeft: 'rounded-bl-0px',
  BorderRadiusBottomRight: 'rounded-br-0px',
  BorderRadiusTopLeft: 'rounded-tl-0px',
  TextDarkThemeEyebrow: vitalColor.TextLightBase,
  TextDarkThemeBody: vitalColor.TextLightBase,
  TextDarkThemeHeadline: vitalColor.TextLightBase,
  TextLightThemeEyebrow: vitalColor.TextDarkBase,
  TextLightThemeBody: vitalColor.TextDarkBase,
  TextLightThemeHeadline: vitalColor.TextDarkBase,
  ImageBorderRadiusTopLeft: 'rounded-tl-0px',
  ImageBorderRadiusBottomLeft: 'rounded-bl-0px',
  BackgroundDarkThemeBackground: vitalColor.BackgroundAlt5,
  BackgroundLightThemeBackground: vitalColor.BackgroundAlt6,
  PaddingBottom: 'pb-16px md:pb-16px lg:pb-24px',
  PaddingTop: 'pt-16px md:pt-16px lg:pt-24px',
  PaddingRight: 'pr-16px md:pr-16px lg:pr-24px',
  PaddingLeft: 'pl-16px md:pl-16px lg:pl-24px',
});
