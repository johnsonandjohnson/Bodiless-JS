/**
 * Copyright © 2020 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ComponentType } from 'react';
import {
  withChild,
  withDefaultContent,
  withResetButton,
  withSidecarNodes,
} from '@bodiless/core';
import { flowRight } from 'lodash';
import {
  asBodilessLink,
  withImagePlaceholder,
} from '@bodiless/components';
import {
  asGatsbyImage as asBaseGatsbyImage,
  withGatsbyImageNode,
  GatsbyImagePresets,
  withGatsbyImageLogger,
} from '@bodiless/gatsby-theme-bodiless';
import { A, Img } from '@bodiless/fclasses';
import landscapeImage from './landscape_image.png';
import { asEditableImage } from '../Elements.token';

type Data = {
  src: string;
  alt: string;
};

// Allows to set default content for image based component.
const asContentfulImage = (nodeContent: Partial<Data>) => (nodeKey: string) => flowRight(
  withDefaultContent({
    [nodeKey]: nodeContent,
  }),
  withResetButton(),
  asEditableImage(nodeKey),
);

const DEFAULT_IMAGE_NODE_KEY = 'image';
const DEFAULT_LINK_NODE_KEY = 'link';

const asEditableImageWithPlaceholder = (placeholder: string) => (nodeKey: string) => flowRight(
  withImagePlaceholder({ src: placeholder }),
  asEditableImage(nodeKey),
);

const asLinkableImage = (ImageComponent: ComponentType<any>) => (nodeKey: string) => flowRight(
  withSidecarNodes(
    asBodilessLink(nodeKey),
  ),
  withChild(ImageComponent),
);

const asSquareImage = asEditableImage;
const SquareImage = asSquareImage(DEFAULT_IMAGE_NODE_KEY)(Img);
const SquareLinkableImage = asLinkableImage(SquareImage)(DEFAULT_LINK_NODE_KEY)(A);
const asLandscapeImage = asEditableImageWithPlaceholder(landscapeImage);
const LandscapeImage = asLandscapeImage(DEFAULT_IMAGE_NODE_KEY)(Img);
const LandscapeLinkableImage = asLinkableImage(LandscapeImage)(DEFAULT_LINK_NODE_KEY)(A);

const asGatsbyImg = (preset: string) => flowRight(
  withGatsbyImageNode(preset),
  asEditableImage(),
  withGatsbyImageLogger(preset),
  asBaseGatsbyImage,
);

const asFluidGatsbyImage = asGatsbyImg(GatsbyImagePresets.Fluid);
const asFluidNoBase64GatsbyImage = asGatsbyImg(GatsbyImagePresets.FluidNoBase64);
const asFluidTracedSVGGatsbyImage = asGatsbyImg(GatsbyImagePresets.FluidTracedSVG);
const asFluidWithWebpGatsbyImage = asGatsbyImg(GatsbyImagePresets.FluidWithWebp);
const asFluidWithWebpNoBase64GatsbyImage = asGatsbyImg(GatsbyImagePresets.FluidWithWebpNoBase64);
const asFluidWithWebpTracedSVGGatsbyImage = asGatsbyImg(GatsbyImagePresets.FluidWithWebpTracedSVG);
const asFixedGatsbyImage = asGatsbyImg(GatsbyImagePresets.Fixed);
const asFixedNoBase64GatsbyImage = asGatsbyImg(GatsbyImagePresets.FixedNoBase64);
const asFixedTracedSVGGatsbyImage = asGatsbyImg(GatsbyImagePresets.FixedTracedSVG);
const asFixedWithWebpGatsbyImage = asGatsbyImg(GatsbyImagePresets.FixedWithWebp);
const asFixedWithWebpNoBase64GatsbyImage = asGatsbyImg(GatsbyImagePresets.FixedWithWebpNoBase64);
const asFixedWithWebpTracedSVGGatsbyImage = asGatsbyImg(GatsbyImagePresets.FixedWithWebpTracedSVG);

const FluidGatsbyImage = asFluidGatsbyImage(Img);
const FluidNoBase64GatsbyImage = asFluidNoBase64GatsbyImage(Img);
const FluidTracedSVGGatsbyImage = asFluidTracedSVGGatsbyImage(Img);
const FluidWithWebpGatsbyImage = asFluidWithWebpGatsbyImage(Img);
const FluidWithWebpNoBase64GatsbyImage = asFluidWithWebpNoBase64GatsbyImage(Img);
const FluidWithWebpTracedSVGGatsbyImage = asFluidWithWebpTracedSVGGatsbyImage(Img);
const FixedGatsbyImage = asFixedGatsbyImage(Img);
const FixedNoBase64GatsbyImage = asFixedNoBase64GatsbyImage(Img);
const FixedTracedSVGGatsbyImage = asFixedTracedSVGGatsbyImage(Img);
const FixedWithWebpGatsbyImage = asFixedWithWebpGatsbyImage(Img);
const FixedWithWebpNoBase64GatsbyImage = asFixedWithWebpNoBase64GatsbyImage(Img);
const FixedWithWebpTracedSVGGatsbyImage = asFixedWithWebpTracedSVGGatsbyImage(Img);

export {
  SquareImage,
  LandscapeImage,
  SquareLinkableImage,
  LandscapeLinkableImage,
  asContentfulImage,
  asLandscapeImage,
  asEditableImageWithPlaceholder,
  asLinkableImage,
  asFluidGatsbyImage,
  asFluidNoBase64GatsbyImage,
  asFluidTracedSVGGatsbyImage,
  asFluidWithWebpGatsbyImage,
  asFluidWithWebpNoBase64GatsbyImage,
  asFluidWithWebpTracedSVGGatsbyImage,
  asFixedGatsbyImage,
  asFixedNoBase64GatsbyImage,
  asFixedTracedSVGGatsbyImage,
  asFixedWithWebpGatsbyImage,
  asFixedWithWebpNoBase64GatsbyImage,
  asFixedWithWebpTracedSVGGatsbyImage,
  FluidGatsbyImage,
  FluidNoBase64GatsbyImage,
  FluidTracedSVGGatsbyImage,
  FluidWithWebpGatsbyImage,
  FluidWithWebpNoBase64GatsbyImage,
  FluidWithWebpTracedSVGGatsbyImage,
  FixedGatsbyImage,
  FixedNoBase64GatsbyImage,
  FixedTracedSVGGatsbyImage,
  FixedWithWebpGatsbyImage,
  FixedWithWebpNoBase64GatsbyImage,
  FixedWithWebpTracedSVGGatsbyImage,
};
