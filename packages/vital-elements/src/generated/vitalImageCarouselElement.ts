import { asTokenGroup } from '../util';
import { vitalColor } from '../components/Color';

export const meta = {
  categories: {
    Type: ['Element'],
    Group: ['ImageCarouselElement'],
  },
};

export default asTokenGroup(meta)({
  ImageBorderDarkThemeIdle: vitalColor.BorderDarkThemeBase,
  ImageThumbnailBorderDarkThemeIdle: vitalColor.BorderDarkThemeBase,
  ImageThumbnailBorderLightThemeActive: vitalColor.BorderInteractiveLightThemeIdle,
  ImageBorderLightThemeBorder: vitalColor.BorderLightThemeBase,
  ImageBorderRadiusBorderRadius: 'rounded-0px',
  ImageThumbnailBorderLightThemeIdle: vitalColor.BorderLightThemeBase,
  ImageThumbnailBorderDarkThemeActive: vitalColor.BorderInteractiveDarkThemeIdle,
});
