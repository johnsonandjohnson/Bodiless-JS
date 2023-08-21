import { asTokenGroup } from '../util';
import { vitalColor } from '../components/Color';

export const meta = {
  categories: {
    Type: ['Element'],
    Group: ['CategoryCardElement'],
  },
};

export default asTokenGroup(meta)({
  TextHeadline: vitalColor.TextLightBase,
  PaddingLeft: 'pl-16px md:pl-16px lg:pl-24px',
  PaddingBottom: 'pb-16px md:pb-16px lg:pb-24px',
  PaddingTop: 'pt-16px md:pt-16px lg:pt-24px',
  BorderRadiusBottomRight: 'rounded-br-0px',
  BorderRadiusTopRight: 'rounded-tr-0px',
  PaddingRight: 'pr-16px md:pr-16px lg:pr-24px',
  TextDarkThemeHeadline: vitalColor.TextDarkBase,
  BorderRadiusTopLeft: 'rounded-tl-0px',
  BorderRadiusBottomLeft: 'rounded-bl-0px',
  TextLightThemeHeadline: vitalColor.TextDarkBase,
  ImageBorderRadiusAll: 'rounded-0px',
});
