import { asTokenGroup } from '../util';
import { vitalColor } from '../components/Color';

export const meta = {
  categories: {
    Type: ['Element'],
    Group: ['ImageCarouselElement'],
  },
};

export default asTokenGroup(meta)({
  ImageThumbnailBorderActive: vitalColor.BorderInteractiveDarkIdle,
  ImageBorderBorder: vitalColor.BorderDarkBase,
  ImageThumbnailBorderIdle: vitalColor.BorderDarkBase,
  ImageBorderDarkThemeIdle: vitalColor.BorderLightBase,
  ImageThumbnailBorderDarkThemeIdle: vitalColor.BorderLightBase,
  ImageThumbnailBorderLightThemeActive: vitalColor.BorderInteractiveDarkIdle,
  ImageBorderLightThemeBorder: vitalColor.BorderDarkBase,
  ImageBorderRadiusBorderRadius: 'rounded-0px',
  ImageThumbnailBorderLightThemeIdle: vitalColor.BorderDarkBase,
  ImageThumbnailBorderDarkThemeActive: vitalColor.BorderInteractiveLightIdle,
});
