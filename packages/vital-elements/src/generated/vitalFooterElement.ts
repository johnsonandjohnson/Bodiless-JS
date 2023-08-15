import { asTokenGroup } from '../util';
import { vitalColor } from '../components/Color';

export const meta = {
  categories: {
    Type: ['Element'],
    Group: ['FooterElement'],
  },
};

export default asTokenGroup(meta)({
  PrimaryTextDarkThemeHeadline: vitalColor.TextDarkThemeBase,
  PrimaryTextDarkThemeLink: vitalColor.TextDarkThemeBase,
  PrimaryTextLightThemeHeadline: vitalColor.TextDarkThemeBase,
  PrimaryTextLightThemeCaption: vitalColor.TextDarkThemeBase,
  PrimaryTextLightThemeLink: vitalColor.TextDarkThemeBase,
  PrimaryBackgroundLightThemeBackground: vitalColor.BackgroundAlt8,
  PrimaryBackgroundDarkThemeBackground: vitalColor.BackgroundAlt8,
  PrimaryTextDarkThemeCaption: vitalColor.TextDarkThemeBase,
  SecondaryTextLightThemeCaption: vitalColor.TextLightThemeAlt1,
  SecondaryTextLightThemeHeadline: vitalColor.TextLightThemeBase,
  SecondaryTextDarkThemeCaption: vitalColor.TextDarkThemeBase,
  SecondaryTextDarkThemeBody: vitalColor.TextDarkThemeBase,
  SecondaryTextDarkThemeHeadline: vitalColor.TextDarkThemeBase,
  SecondaryBackgroundDarkThemeBackground: vitalColor.BackgroundAlt8,
  SecondaryBackgroundLightThemeBackground: vitalColor.BackgroundAlt6,
  SecondaryTextLightThemeBody: vitalColor.TextLightThemeBase,
});
