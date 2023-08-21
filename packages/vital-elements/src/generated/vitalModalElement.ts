import { asTokenGroup } from '../util';
import { vitalColor } from '../components/Color';

export const meta = {
  categories: {
    Type: ['Element'],
    Group: ['ModalElement'],
  },
};

export default asTokenGroup(meta)({
  TextLink: vitalColor.TextInteractiveDarkIdle,
  TextHeadline: vitalColor.TextDarkBase,
  BorderBorder: vitalColor.BorderDarkBase,
  BackgroundBackground: vitalColor.BackgroundBase,
  TextBodySmall: vitalColor.TextDarkBase,
  TextBody: vitalColor.TextDarkBase,
  TextLightThemeLink: vitalColor.TextInteractiveDarkIdle,
  TextLightThemeHeadline: vitalColor.TextDarkBase,
  BorderLightThemeBorder: vitalColor.BorderDarkBase,
  BackgroundLightThemeBackground: vitalColor.BackgroundBase,
  TextLightThemeBodySmall: vitalColor.TextDarkBase,
  TextLightThemeBody: vitalColor.TextDarkBase,
  BorderRadiusAll: 'rounded-0px',
  PaddingTop: 'pt-16px md:pt-24px lg:pt-36px',
  PaddingLeft: 'pl-16px md:pl-24px lg:pl-36px',
  PaddingRight: 'pr-16px md:pr-24px lg:pr-36px',
  PaddingBottom: 'pb-16px md:pb-24px lg:pb-36px',
});
