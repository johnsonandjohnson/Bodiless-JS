import React, { FC, HTMLProps } from 'react';
import { asBodilessImage } from '@bodiless/components-ui';
import { withNode } from '@bodiless/core';
import {
  Img, Section, Div, addClasses, as, stylable,
} from '@bodiless/fclasses';
import withSimpleEditor from './withSimpleEditor';

const Wrapper = addClasses('flex flex-col rounded-t-lg h-full mx-2 border-8')(Section);
const Image = as(
  addClasses('w-full'),
  asBodilessImage('image')
)(Img);
const Body = as(
  addClasses('text-white bg-black flex-grow p-2'),
  withSimpleEditor('caption', 'Caption')
)(Div);

const CaptionedImageBase: FC<HTMLProps<HTMLElement>> = props => (
  <Wrapper {...props}>
    <Image />
    <Body />
  </Wrapper>
);

const CaptionedImage = as(
  stylable,
  withNode,
)(CaptionedImageBase);

export default CaptionedImage;
