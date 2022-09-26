import { as, withDesign, on, } from '@bodiless/fclasses';
import { withNodeKey } from '@bodiless/core';
import { asGalleryToken } from '../GalleryClean';
import { CaptionedImageClean, mysiteCaptionedImage } from '../../CaptionedImage';

const design = {
  BlueImageTile: on(CaptionedImageClean)(
    mysiteCaptionedImage.Base,
    mysiteCaptionedImage.WithBlueBorder,
  ),
  TealImageTile: on(CaptionedImageClean)(
    mysiteCaptionedImage.Base,
    mysiteCaptionedImage.WithTealBorder,
  ),
  OrangeImageTile: on(CaptionedImageClean)(
    mysiteCaptionedImage.Base,
    mysiteCaptionedImage.WithOrangeBorder,
  ),
  BlueImageLightCaptionTile: on(CaptionedImageClean)(
    mysiteCaptionedImage.LightCaption,
    mysiteCaptionedImage.WithBlueBorder,
  ),
  TealImageLightCaptionTile: on(CaptionedImageClean)(
    mysiteCaptionedImage.LightCaption,
    mysiteCaptionedImage.WithTealBorder,
  ),
  OrangeImageLightCaptionTile: on(CaptionedImageClean)(
    mysiteCaptionedImage.LightCaption,
    mysiteCaptionedImage.WithOrangeBorder,
  ),
  CMSTile: on(CaptionedImageClean)(
    mysiteCaptionedImage.LightCaption,
    mysiteCaptionedImage.WithContentFromCMS,
  ),
};

const Base = asGalleryToken({
  Editors: {
    Body: as(
      withDesign(design),
      withNodeKey('gallery-body'),
    ),
  },
  Theme: {
    Wrapper: 'my-2',
    Header: 'text-2xl',
  },
});

export default {
  Base,
};
