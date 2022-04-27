import React, { FC, HTMLProps } from 'react';
import {
  H2, Section, addClasses, stylable, flowHoc, replaceWith, withDesign,
} from '@bodiless/fclasses';
import { FlowContainer } from '@bodiless/layouts-ui';
import { withNode } from '@bodiless/core';
import CaptionedImage from './CaptionedImage';

const asGalleryTile = addClasses('mx-2 border-8');

const withBlueBorder = addClasses('border-blue-400');
const withTealBorder = addClasses('border-teal-400');
const withOrangeBorder = addClasses('border-orange-400');

const design = {
  BlueImageTile: flowHoc(
    replaceWith(CaptionedImage),
    asGalleryTile,
    withBlueBorder,
    { title: 'Blue Image Tile' },
    flowHoc.meta.term('Color')('Blue'),
  ),
  TealImageTile: flowHoc(
    replaceWith(CaptionedImage),
    asGalleryTile,
    withTealBorder,
    { title: 'Teal Image Tile' },
    flowHoc.meta.term('Color')('Teal'),
  ),
  OrangeImageTile: flowHoc(
    replaceWith(CaptionedImage),
    asGalleryTile,
    withOrangeBorder,
    { title: 'Orange Image Tile' },
    flowHoc.meta.term('Color')('Orange'),
  ),
};

const Wrapper = addClasses('my-2')(Section);
const Header = addClasses('text-2xl')(H2);
const Body = withDesign(design)(FlowContainer);

const GalleryBase: FC<HTMLProps<HTMLDivElement>> = ({ children, ...rest }) => (
  <Wrapper {...rest}>
    <Header>Gallery</Header>
    <Body nodeKey="" />
  </Wrapper>
);

const Gallery = flowHoc(
  stylable,
  withNode,
)(GalleryBase);

export const GalleryTile = asGalleryTile(CaptionedImage);
export default Gallery;
