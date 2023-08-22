import { asTokenGroup } from '../util';
import { vitalColor } from '../components/Color';

export const meta = {
  categories: {
    Type: ['Element'],
    Group: ['AlertElement'],
  },
};

export default asTokenGroup(meta)({
  TextHeadline: vitalColor.TextDarkBase,
  TextBody: vitalColor.TextDarkBase,
  TextLightThemeHeadline: vitalColor.TextDarkBase,
  TextLightThemeBody: vitalColor.TextDarkBase,
  BorderRadiusAll: 'rounded-0px',
  PaddingSidesY: 'py-16px md:py-16px lg:py-24px',
  PaddingSidesX: 'px-16px md:px-16px lg:px-24px',
});
