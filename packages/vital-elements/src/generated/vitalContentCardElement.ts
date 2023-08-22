import { asTokenGroup } from '../util';
import { vitalColor } from '../components/Color';

export const meta = {
  categories: {
    Type: ['Element'],
    Group: ['ContentCardElement'],
  },
};

export default asTokenGroup(meta)({
  TextBody: vitalColor.TextDarkBase,
  TextHeadline: vitalColor.TextDarkBase,
  TextEyebrow: vitalColor.TextDarkBase,
  BackgroundBackground: vitalColor.BackgroundAlt6,
  BorderRadiusBottomLeft: 'rounded-bl-0px',
  BorderRadiusBottomRight: 'rounded-br-0px',
  TextDarkThemeHeadline: vitalColor.TextLightBase,
  ImageBorderRadiusTopRight: 'rounded-tr-0px',
  BorderRadiusTopLeft: 'rounded-tl-0px',
  BorderRadiusTopRight: 'rounded-tr-0px',
  ImageBorderRadiusBottomLeft: 'rounded-bl-0px',
  TextDarkThemeBody: vitalColor.TextLightBase,
  TextDarkThemeEyebrow: vitalColor.TextLightBase,
  TextLightThemeBody: vitalColor.TextDarkBase,
  TextLightThemeHeadline: vitalColor.TextDarkBase,
  ImageBorderRadiusTopLeft: 'rounded-tl-0px',
  BackgroundDarkThemeBackground: vitalColor.BackgroundAlt5,
  ImageBorderRadiusBottomRight: 'rounded-br-0px',
  TextLightThemeEyebrow: vitalColor.TextDarkBase,
  BackgroundLightThemeBackground: vitalColor.BackgroundAlt6,
  PaddingLeft: 'pl-16px md:pl-16px lg:pl-24px',
  PaddingBottom: 'pb-16px md:pb-16px lg:pb-24px',
  PaddingRight: 'pr-16px md:pr-16px lg:pr-24px',
  PaddingTop: 'pt-16px md:pt-16px lg:pt-24px',
});
