import React from 'react';
import type { FC, HTMLProps } from 'react';
import {
  ComponentOrTag, DesignableComponentsProps, Img, Section, designable, Div,
} from '@bodiless/fclasses';
import { RichText } from '@bodiless/richtext-ui';
import { asTokenSpec } from '../../asTokenSpec';

// Design: set of base components which will be used in the component itself
type CaptionedImageComponents = {
  Wrapper: ComponentOrTag<any>,
  Image: ComponentOrTag<any>,
  BodyWrapper: ComponentOrTag<any>,
  Body: ComponentOrTag<any>,
};

type CaptionedImageProps =
  HTMLProps<HTMLElement> & DesignableComponentsProps<CaptionedImageComponents>;

// JSX: Bare Template usually with minimal styling/functionality
const CaptionedImageBase: FC<CaptionedImageProps> = ({ components: C, ...rest }) => (
  <C.Wrapper {...rest}>
    <C.Image />
    <C.BodyWrapper>
      <C.Body />
    </C.BodyWrapper>
  </C.Wrapper>
);

// Designable: Define the starting sub-components of the design
const captionedImageComponents: CaptionedImageComponents = {
  Wrapper: Section,
  Image: Img,
  Body: RichText,
  BodyWrapper: Div,
};

const CaptionedImageClean = designable(captionedImageComponents, 'CaptionedImage')(CaptionedImageBase);

const asCaptionedImageToken = asTokenSpec<CaptionedImageComponents>();

export default CaptionedImageClean;
export { asCaptionedImageToken };
