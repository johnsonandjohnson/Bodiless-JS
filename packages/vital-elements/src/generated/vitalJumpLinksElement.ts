import { asTokenGroup } from '../util';
import { vitalColor } from '../components/Color';

export const meta = {
  categories: {
    Type: ['Element'],
    Group: ['JumpLinksElement'],
  },
};

export default asTokenGroup(meta)({
  BorderBorder: vitalColor.BorderInteractiveDarkIdle,
  TextIdle: vitalColor.TextInteractiveDarkIdle,
  BackgroundBackground: vitalColor.BackgroundAlt6,
  TextHover: vitalColor.TextInteractiveDarkHover,
  TextBody: vitalColor.TextDarkBase,
  TextActive: vitalColor.TextInteractiveDarkIdle,
  BorderDarkThemeBorder: vitalColor.BorderInteractiveLightIdle,
  BorderLightThemeBorder: vitalColor.BorderInteractiveDarkIdle,
  TextDarkThemeBody: vitalColor.TextLightBase,
  TextDarkThemeActive: vitalColor.TextInteractiveLightIdle,
  TextLightThemeIdle: vitalColor.TextInteractiveDarkIdle,
  BackgroundLightThemeBackground: vitalColor.BackgroundAlt6,
  BackgroundDarkThemeBackground: vitalColor.BackgroundAlt8,
  TextLightThemeHover: vitalColor.TextInteractiveDarkHover,
  TextDarkThemeHover: vitalColor.TextInteractiveLightHover,
  TextDarkThemeIdle: vitalColor.TextInteractiveLightIdle,
  TextLightThemeBody: vitalColor.TextDarkBase,
  TextLightThemeActive: vitalColor.TextInteractiveDarkIdle,
  LinkMarginRight: 'mr-8px md:mr-8px lg:mr-16px',
  LinkPaddingLeft: 'pl-8px md:pl-8px lg:pl-16px',
  PaddingTop: 'pt-8px md:pt-8px lg:pt-16px',
  LinkPaddingRight: 'pr-8px md:pr-8px lg:pr-16px',
  LinkPaddingBottom: 'pb-8px md:pb-8px lg:pb-16px',
});
