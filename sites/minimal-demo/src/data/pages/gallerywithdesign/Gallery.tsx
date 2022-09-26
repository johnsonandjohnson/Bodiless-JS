/*
 * FOR TUTORIAL REFERENCE ONLY
 * not used by this page as its moved to packages/minimal-demo/src/components/Gallery
 */

import React, { FC, HTMLProps } from 'react';
import {
  H2, Section, addClasses, as, stylable, withDesign, on,
} from '@bodiless/fclasses';
import { FlowContainer } from '@bodiless/layouts-ui';
import { withNode } from '@bodiless/core';
import { CaptionedImageClean, mysiteCaptionedImage } from '@bodiless/minimal-demo';

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

const Wrapper = addClasses('my-2')(Section);
const Header = addClasses('text-2xl')(H2);
const Body = withDesign(design)(FlowContainer);

const GalleryBase: FC<HTMLProps<HTMLDivElement>> = ({ children, ...rest }) => (
  <Wrapper {...rest}>
    <Header>Gallery</Header>
    <Body nodeKey="gallery-body" />
  </Wrapper>
);

const Gallery = as(
  stylable,
  withNode,
)(GalleryBase);

export default Gallery;
