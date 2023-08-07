import { asTokenGroup } from '../util';
import { vitalColor } from '../components/Color';

export const meta = {
  categories: {
    Type: ['Element'],
    Group: ['PDPProductOverviewElement'],
  },
};

export default asTokenGroup(meta)({
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
