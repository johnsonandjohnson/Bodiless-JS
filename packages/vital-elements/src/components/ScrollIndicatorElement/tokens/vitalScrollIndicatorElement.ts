import { asTokenGroup } from '../../../util';
import { vitalColor } from '../../Color';
import { ScrollIndicatorElementMeta } from '../meta';

export default asTokenGroup(ScrollIndicatorElementMeta)({
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
