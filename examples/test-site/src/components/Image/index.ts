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

/* eslint-disable max-len */

import { ComponentType } from 'react';
import {
  withChild,
  withSidecarNodes,
} from '@bodiless/core';
import flowRight from 'lodash/flowRight';
import {
  asBodilessLink,
  withImagePlaceholder,
  withDefaultImageContent,
} from '@bodiless/components';
import {
  asBodilessImage,
} from '@bodiless/components-ui';
import {
  GatsbyImagePresets,
  withGatsbyImagePreset,
  withoutGatsbyImageProps,
} from '@bodiless/gatsby-theme-bodiless';
import {
  asToken,
  stylable,
  A,
  Img,
} from '@bodiless/fclasses';
import landscapeImage from './landscape_image.png';

export const asBaseEditableImagePlain = (nodeKey?, placeholder?, useOverrides?) => asToken(
  asToken.meta.term('Component')('Image'),
  asToken.meta.term('Category')('Editors'),
  stylable,
  asBodilessImage(nodeKey, undefined, useOverrides),
  withImagePlaceholder(placeholder),
);

/**
 * util function to build a hoc for rendering a non-responsive image.
 */
export const asEditableImagePlain = (nodeKey?, placeholder?, useOverrides?) => asToken(
  withoutGatsbyImageProps,
  asBaseEditableImagePlain.meta,
  asBaseEditableImagePlain(nodeKey, placeholder, useOverrides),
);

/**
 * util function to build a hoc for rendering a responsive image.
 */
const asEditableImage = withGatsbyImagePreset(GatsbyImagePresets.FluidWithWebp)(asBaseEditableImagePlain);

// Allows to set default content for image based component.
const asContentfulImage = withDefaultImageContent(asEditableImage);

const DEFAULT_IMAGE_NODE_KEY = 'image';
const DEFAULT_LINK_NODE_KEY = 'link';

const asEditableImageWithPlaceholder = (placeholder: string) => (nodeKey: string) => flowRight(
  withImagePlaceholder({ src: placeholder }),
  asEditableImagePlain(nodeKey),
);

const asLinkableImage = (ImageComponent: ComponentType<any>) => (nodeKey: string) => flowRight(
  withSidecarNodes(
    asBodilessLink(nodeKey),
  ),
  withChild(ImageComponent),
);

const asSquareImage = asEditableImagePlain;
const SquareImage = asSquareImage(DEFAULT_IMAGE_NODE_KEY)(Img);
const SquareLinkableImage = asLinkableImage(SquareImage)(DEFAULT_LINK_NODE_KEY)(A);
const asLandscapeImage = asEditableImageWithPlaceholder(landscapeImage);
const LandscapeImage = asLandscapeImage(DEFAULT_IMAGE_NODE_KEY)(Img);
const LandscapeLinkableImage = asLinkableImage(LandscapeImage)(DEFAULT_LINK_NODE_KEY)(A);

export {
  SquareImage,
  LandscapeImage,
  SquareLinkableImage,
  LandscapeLinkableImage,
  asContentfulImage,
  asLandscapeImage,
  asEditableImageWithPlaceholder,
  asLinkableImage,
  asEditableImage,
};
