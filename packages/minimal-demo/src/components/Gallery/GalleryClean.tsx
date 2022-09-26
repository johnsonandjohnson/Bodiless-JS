import React from 'react';
import type { FC, HTMLProps } from 'react';
import {
  ComponentOrTag, DesignableComponentsProps, Section, designable, H2,
} from '@bodiless/fclasses';
import { FlowContainer } from '@bodiless/layouts-ui';
import { asTokenSpec } from '../../asTokenSpec';

// Design: set of base components which will be used in the component itself
type GalleryComponents = {
  Wrapper: ComponentOrTag<any>,
  Header: ComponentOrTag<any>,
  Body: ComponentOrTag<any>,
};

type GalleryProps =
  HTMLProps<HTMLElement> & DesignableComponentsProps<GalleryComponents>;

// JSX: Bare Template usually with minimal styling/functionality
const GalleryBase: FC<GalleryProps> = ({ components: C, ...rest }) => (
  <C.Wrapper {...rest}>
    <C.Header />
    <C.Body />
  </C.Wrapper>
);

// Designable: Define the starting sub-components of the design
const galleryComponents: GalleryComponents = {
  Wrapper: Section,
  Header: H2,
  Body: FlowContainer,
};

const GalleryClean = designable(galleryComponents, 'Gallery')(GalleryBase);

const asGalleryToken = asTokenSpec<GalleryComponents>();

export default GalleryClean;
export { asGalleryToken };
