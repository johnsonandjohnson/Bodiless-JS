import { asTokenGroup } from '../util';
import { vitalColor } from '../components/Color';

export const meta = {
  categories: {
    Type: ['Element'],
    Group: ['PDPProductOverviewElement'],
  },
};

export default asTokenGroup(meta)({
  TextEyebrow: vitalColor.TextDarkAlt1,
  TextCaption: vitalColor.TextDarkAlt1,
  TextIndicator: vitalColor.TextDarkBase,
  ToolTipTextLabel: vitalColor.TextLightBase,
  TextHeadline: vitalColor.TextDarkBase,
  TextSubheadline: vitalColor.TextDarkBase,
  ToolTipBackgroundBackground: vitalColor.BackgroundAlt5,
  BackgroundBackground: vitalColor.BackgroundBase,
  TextBody: vitalColor.TextDarkBase,
  TextReviews: vitalColor.TextDarkBase,
  TextDarkThemeEyebrow: vitalColor.TextLightBase,
  TextLightThemeEyebrow: vitalColor.TextDarkAlt1,
  TextDarkThemeCaption: vitalColor.TextLightBase,
  TextLightThemeCaption: vitalColor.TextDarkAlt1,
  TextDarkThemeIndicator: vitalColor.TextLightBase,
  TextLightThemeIndicator: vitalColor.TextDarkBase,
  ToolTipTextLightThemeLabel: vitalColor.TextLightBase,
  TextLightThemeHeadline: vitalColor.TextDarkBase,
  BackgroundDarkThemeBackground: vitalColor.BackgroundAlt8,
  TextLightThemeSubheadline: vitalColor.TextDarkBase,
  ToolTipBackgroundLightThemeBackground: vitalColor.BackgroundAlt5,
  TextDarkThemeSubheadline: vitalColor.TextLightBase,
  ToolTipBorderRadiusAll: 'rounded-NaNpx',
  BackgroundLightThemeBackground: vitalColor.BackgroundBase,
  TextLightThemeBody: vitalColor.TextDarkBase,
  TextLightThemeReviews: vitalColor.TextDarkBase,
  TextDarkThemeBody: vitalColor.TextLightBase,
  TextDarkThemeReviews: vitalColor.TextLightBase,
  TextDarkThemeHeadline: vitalColor.TextLightBase,
  ToolTipPaddingSidesY: 'py-8px md:py-8px lg:py-8px',
  ToolTipPaddingSidesX: 'px-16px md:px-16px lg:px-16px',
});
