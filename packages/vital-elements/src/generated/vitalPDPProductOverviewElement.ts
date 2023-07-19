import { asTokenGroup } from '../util';
import { vitalColor } from './semantic';

const meta = {
  categories: {
    Type: ['Element'],
    Group: ['PDPProductOverviewElement'],
  },
};

export default asTokenGroup(meta)({
  TextLightThemeHeadline: vitalColor.TextLightThemeBase,
  BackgroundDarkThemeBackground: vitalColor.BackgroundAlt8,
  BackgroundLightThemeBackground: vitalColor.BackgroundBase,
  TextLightThemeBody: vitalColor.TextLightThemeBase,
  TextLightThemeReviews: vitalColor.TextLightThemeBase,
  TextDarkThemeBody: vitalColor.TextDarkThemeBase,
  TextDarkThemeReviews: vitalColor.TextDarkThemeBase,
  TextDarkThemeHeadline: vitalColor.TextDarkThemeBase,
});
