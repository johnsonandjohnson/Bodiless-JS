import React, { FC, HTMLProps } from 'react';
import {
  H2, Section, addClasses, as, stylable, replaceWith, withMeta, withDesign,
} from '@bodiless/fclasses';
import { FlowContainer } from '@bodiless/layouts-ui';
import { withNode } from '@bodiless/data';
import CaptionedImage from './CaptionedImage';

const asGalleryTile = addClasses('mx-2 border-8');

const withBlueBorder = addClasses('border-blue-400');
const withTealBorder = addClasses('border-teal-400');
const withOrangeBorder = addClasses('border-orange-400');

const design = {
  BlueImageTile: as(
    replaceWith(CaptionedImage),
    asGalleryTile,
    withBlueBorder,
    withMeta({
      title: 'Blue Image Tile',
      categories: {
        Color: ['Blue'],
      },
    }),
  ),
  TealImageTile: as(
    replaceWith(CaptionedImage),
    asGalleryTile,
    withTealBorder,
    withMeta({
      title: 'Teal Image Tile',
      categories: {
        Color: ['Teal'],
      },
    }),
  ),
  OrangeImageTile: as(
    replaceWith(CaptionedImage),
    asGalleryTile,
    withOrangeBorder,
    withMeta({
      title: 'Orange Image Tile',
      categories: {
        Color: ['Orange'],
      },
    }),
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

export const GalleryTile = asGalleryTile(CaptionedImage);
export default Gallery;
