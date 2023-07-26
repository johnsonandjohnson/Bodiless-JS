import { asTokenGroup } from '../util';
import { vitalColor } from '../components/Color';

export const meta = {
  categories: {
    Type: ['Element'],
    Group: ['ProductCardElement'],
  },
};

export default asTokenGroup(meta)({
  BorderLightThemeBorder: vitalColor.BorderLightThemeBase,
  TextDarkThemeReviews: vitalColor.TextDarkThemeBase,
  TextDarkThemeHeadline: vitalColor.TextDarkThemeBase,
  TextLightThemeHeadline: vitalColor.TextLightThemeBase,
  BackgroundDarkThemeBackground: vitalColor.BackgroundAlt5,
  BorderDarkThemeBorder: vitalColor.BorderDarkThemeBase,
  ImageBorderRadius: 'rounded-0px',
  TextLightThemeReviews: vitalColor.TextLightThemeBase,
  BackgroundLightThemeBackground: vitalColor.BackgroundBase,
  BorderRadius: 'rounded-0px',
});
