import { asTokenGroup } from '../util';
import { vitalColor } from '../components/Color';

export const meta = {
  categories: {
    Type: ['Element'],
    Group: ['ChipElement'],
  },
};

export default asTokenGroup(meta)({
  BackgroundAlt1: vitalColor.BackgroundAlt2,
  TextLabelBase: vitalColor.TextDarkBase,
  BackgroundBase: vitalColor.BackgroundAlt1,
  BackgroundAlt3: vitalColor.BackgroundAlt4,
  BackgroundAlt2: vitalColor.BackgroundAlt3,
  BorderRadiusBottomLeft: 'rounded-bl-2px',
  BorderRadiusBottomRight: 'rounded-br-2px',
  BorderRadiusTopLeft: 'rounded-tl-2px',
  BackgroundLightThemeAlt1: vitalColor.BackgroundAlt2,
  TextLightThemeLabelBase: vitalColor.TextDarkBase,
  BackgroundLightThemeBase: vitalColor.BackgroundAlt1,
  BorderRadiusTopRight: 'rounded-tr-2px',
  BackgroundLightThemeAlt3: vitalColor.BackgroundAlt4,
  BackgroundLightThemeAlt2: vitalColor.BackgroundAlt3,
  PaddingSidesY: 'py-2px md:py-2px lg:py-2px',
  PaddingSidesX: 'px-8px md:px-8px lg:px-8px',
});
