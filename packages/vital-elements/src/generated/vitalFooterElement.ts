import { asTokenGroup } from '../util';
import { vitalColor } from '../components/Color';

export const meta = {
  categories: {
    Type: ['Element'],
    Group: ['FooterElement'],
  },
};

export default asTokenGroup(meta)({
  PrimaryTextHeadline: vitalColor.TextLightBase,
  PrimaryTextCaption: vitalColor.TextLightBase,
  PrimaryTextLink: vitalColor.TextLightBase,
  PrimaryBackgroundBackground: vitalColor.BackgroundAlt8,
  SecondaryTextCaption: vitalColor.TextDarkAlt1,
  SecondaryTextHeadline: vitalColor.TextDarkBase,
  SecondaryBackgroundBackground: vitalColor.BackgroundAlt6,
  SecondaryTextBody: vitalColor.TextDarkBase,
  PrimaryTextDarkThemeHeadline: vitalColor.TextLightBase,
  PrimaryTextDarkThemeLink: vitalColor.TextLightBase,
  PrimaryTextLightThemeHeadline: vitalColor.TextLightBase,
  PrimaryTextLightThemeCaption: vitalColor.TextLightBase,
  PrimaryTextLightThemeLink: vitalColor.TextLightBase,
  PrimaryBackgroundLightThemeBackground: vitalColor.BackgroundAlt8,
  PrimaryBackgroundDarkThemeBackground: vitalColor.BackgroundAlt8,
  PrimaryTextDarkThemeCaption: vitalColor.TextLightBase,
  SecondaryTextLightThemeCaption: vitalColor.TextDarkAlt1,
  SecondaryTextLightThemeHeadline: vitalColor.TextDarkBase,
  SecondaryTextDarkThemeCaption: vitalColor.TextLightBase,
  SecondaryTextDarkThemeBody: vitalColor.TextLightBase,
  SecondaryTextDarkThemeHeadline: vitalColor.TextLightBase,
  SecondaryBackgroundDarkThemeBackground: vitalColor.BackgroundAlt8,
  SecondaryBackgroundLightThemeBackground: vitalColor.BackgroundAlt6,
  SecondaryTextLightThemeBody: vitalColor.TextDarkBase,
  PrimaryNavigationLinksPaddingLeft: 'pl-16px md:pl-0px lg:pl-0px',
});
