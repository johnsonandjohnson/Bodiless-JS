import { asTokenGroup } from '../util';
import { vitalColor } from '../components/Color';

export const meta = {
  categories: {
    Type: ['Element'],
    Group: ['CategoryCardElement'],
  },
};

export default asTokenGroup(meta)({
  PaddingLeft: 'pl-0px',
  PaddingBottom: 'pb-0px',
  PaddingTop: 'pt-0px',
  BorderRadiusBottomRight: 'rounded-br-0px',
  BorderRadiusTopRight: 'rounded-tr-0px',
  PaddingRight: 'pr-0px',
  TextDarkThemeHeadline: vitalColor.TextDarkThemeBase,
  BorderRadiusTopLeft: 'rounded-tl-0px',
  BorderRadiusBottomLeft: 'rounded-bl-0px',
  TextLightThemeHeadline: vitalColor.TextLightThemeBase,
  ImageBorderRadius: 'rounded-0px',
});
