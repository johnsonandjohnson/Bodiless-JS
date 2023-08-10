import { asTokenGroup } from '../util';
import { vitalColor } from '../components/Color';

export const meta = {
  categories: {
    Type: ['Element'],
    Group: ['PDPProductOverviewElement'],
  },
};

export default asTokenGroup(meta)({
  TextHeadline: vitalColor.TextLightThemeBase,
  BackgroundBackground: vitalColor.BackgroundBase,
  TextBody: vitalColor.TextLightThemeBase,
  TextReviews: vitalColor.TextLightThemeBase,
  TextLightThemeHeadline: vitalColor.TextLightThemeBase,
  BackgroundDarkThemeBackground: vitalColor.BackgroundAlt8,
  BorderRadius: 'rounded-0px',
  BackgroundLightThemeBackground: vitalColor.BackgroundBase,
  TextLightThemeBody: vitalColor.TextLightThemeBase,
  TextLightThemeReviews: vitalColor.TextLightThemeBase,
  TextDarkThemeBody: vitalColor.TextDarkThemeBase,
  TextDarkThemeReviews: vitalColor.TextDarkThemeBase,
  TextDarkThemeHeadline: vitalColor.TextDarkThemeBase,
});
