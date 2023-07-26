import { asTokenGroup } from '../util';
import { vitalColor } from '../components/Color';

export const meta = {
  categories: {
    Type: ['Element'],
    Group: ['ArticleCardElement'],
  },
};

export default asTokenGroup(meta)({
  BorderRadius: 'rounded-0px',
  TextDarkThemeEyebrow: vitalColor.TextDarkThemeBase,
  TextDarkThemeBody: vitalColor.TextDarkThemeBase,
  TextDarkThemeHeadline: vitalColor.TextDarkThemeBase,
  TextLightThemeEyebrow: vitalColor.TextLightThemeBase,
  TextLightThemeBody: vitalColor.TextLightThemeBase,
  TextLightThemeHeadline: vitalColor.TextLightThemeBase,
  ImageBorderRadius: 'rounded-0px',
  BackgroundDarkThemeBackground: vitalColor.BackgroundAlt5,
  BackgroundLightThemeBackground: vitalColor.BackgroundBase,
});
