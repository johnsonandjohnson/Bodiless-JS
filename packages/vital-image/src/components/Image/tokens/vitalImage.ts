/**
 * Copyright © 2022 Johnson & Johnson
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

import {
  withParent,
} from '@bodiless/core';
import {
  withNodeKey,
  withSidecarNodes,
} from '@bodiless/data';
import {
  flowHoc,
  stylable,
  addProps,
  A,
  extendMeta,
  as,
  withDesign,
} from '@bodiless/fclasses';
import { withImagePlaceholder } from '@bodiless/components';
import { asBodilessLink, asBodilessImage } from '@bodiless/components-ui';
import { asElementToken } from '@bodiless/vital-elements';
import type { ElementToken } from '@bodiless/vital-elements';
import { withoutHydration } from '@bodiless/hydration';
import {
  ImagePresets,
  withoutImageProps,
  asImage,
  withImageLogger,
  withImageNode,
} from './vitalImage.bl-noframework';

// @ts-ignore Cannot find module
import landscapeImage from '../../../../assets/landscape_image.png';

/**
 * @private
 * Provides the editable schema for an image depending on the Gatsby preset. Also
 * provides a default node key.
 *
 * @param preset
 * The Gatsby image preset to use.
 */
const withImageSchema = (preset?: ImagePresets) => flowHoc(
  asBodilessImage(),
  preset === undefined ? withoutImageProps : withImageNode(preset),
  withNodeKey('image'),
);

/**
 * @private
 */
const objectFitContainProps = {
  imgStyle: { objectFit: 'contain' },
};

/**
 * @private
 */
const objectFitCoverProps = {
  imgStyle: { objectFit: 'cover' },
};

const Base = asElementToken({
  Core: {
    _: as(
      asImage,
      stylable,
      withImageLogger(),
      withoutHydration(),
    ),
  },
  Meta: flowHoc.meta.term('Type')('Image'),
});

const WithEditorPlain = asElementToken({
  Schema: {
    _: withImageSchema(),
  },
  Meta: flowHoc.meta.term('Optimization')('Plain'),
});

const WithEditorBlurUp = asElementToken({
  Schema: {
    _: withImageSchema(ImagePresets.FluidWithWebp),
  },
  Meta: extendMeta(
    flowHoc.meta.term('Optimization')('Optimized'),
    flowHoc.meta.term('Effect')('BlurUp'),
  ),
  Layout: {
    _: addProps(objectFitCoverProps),
  },
});

const WithEditorTraced = asElementToken({
  Schema: {
    _: withImageSchema(ImagePresets.FluidWithWebpTracedSVG),
  },
  Meta: extendMeta(
    flowHoc.meta.term('Optimization')('Optimized'),
    flowHoc.meta.term('Effect')('Traced'),
  ),
  Layout: {
    _: addProps(objectFitContainProps),
  },
});

const WithEditorNoEffect = asElementToken({
  Schema: {
    _: withImageSchema(ImagePresets.FluidWithWebpNoBase64),
  },
  Meta: extendMeta(
    flowHoc.meta.term('Optimization')('Optimized'),
    flowHoc.meta.term('Effect')('No Effect'),
  ),
  Layout: {
    _: addProps(objectFitContainProps),
  },
});

const WithLandscapePlaceholder = asElementToken({
  Content: {
    _: withImagePlaceholder({ src: landscapeImage }),
  },
  Meta: extendMeta(flowHoc.meta.term('Placeholder')('Landscape')),
});

/**
 * @private
 */
const LinkBase = withSidecarNodes(asBodilessLink('link'))(A);

const WithLink = asElementToken({
  Core: {
    _: withParent(LinkBase, 'ImageLink'),
  },
  Meta: flowHoc.meta.term('Link')('With Link'),
});

const WithFullWidthImage = asElementToken({
  Layout: {
    _: withDesign({
      Image: 'w-full',
    }),
  }
});

/**
 * @private
 */
const EditablePlain = asElementToken(Base, WithEditorPlain);

const Plain = EditablePlain;

const Default = asElementToken(Base, WithEditorBlurUp);

const EditableTraced = asElementToken(Base, WithEditorTraced);

const EditableNoEffect = asElementToken(Base, WithEditorNoEffect);

const WithEager = asElementToken({
  Core: {
    _: addProps({ loading: 'eager'}),
  },
});

const Hero = asElementToken({
  ...Default,
  Compose: {
    WithEager,
    WithLandscapePlaceholder,
    WithFullWidthImage,
  },
});

/**
 * Tokens for the vital image
 *
 * @category Token Collection
 */
export interface VitalImage {
  /**
   * Token which creates the VitalDS Base Image. Defines the Base as:
   * - Gatsby Image
   * - With GatsbyImageLogger
   * - Without Hydration
   * - Schema has nodekey 'image'
   * - Meta is Type: Image
   */
  Base: ElementToken,
  /**
   * Composable Token which apply the following tokens/features to an image:
   * - Bodiless image.
   * - withNode
   * - without Gatsby Image props
   * - Meta is Optimization: Plain
   */
  WithEditorPlain: ElementToken,
  /**
   * Composable Token which apply the following tokens/features to an image:
   * - Bodiless image.
   * - withGatsbyImageNode using FluidWithWebp preset.
   * - sets object to cover for image resizing to fit container
   * - Meta is Optimization: Optimized & Effect: BlurUp
   */
  WithEditorBlurUp: ElementToken,
  /**
   * Composable Token which apply the following tokens/features to an image:
   * - Bodiless image.
   * - withGatsbyImageNode using FluidWithWebpTracedSVG preset.
   * - sets object to contain for image resizing to fit container
   * - Meta is Optimization: Optimized & Effect: Traced
   */
  WithEditorTraced: ElementToken,
  /**
   * Composable Token which apply the following tokens/features to an image:
   * - Bodiless image.
   * - withGatsbyImageNode using FluidWithWebpNoBase64 preset.
   * - sets object to contain for image resizing to fit container
   * - Meta is Optimization: Optimized & Effect: No Effect
   */
  WithEditorNoEffect: ElementToken,
  /**
   * Composable Token which apply the landscape placeholder image.
   * - Meta is Placeholder : Landscape
   */
  WithLandscapePlaceholder: ElementToken,
  /**
   * Composable Token which wraps the image in a link
   * - Meta is Link : With Link
   */
  WithLink: ElementToken,
  /**
   * Composable Token which makes the non-GatsbyImage <img> component full-width.
   *
   * When adding a new image into a page, it is placed as a normal <img> tag instead of a
   * GatsbyImage component. After refreshing the page, it is rendered as a GatsbyImage,
   * which is full-width by default. Although not desirable, this behavior is expected.
   *
   * Applying this token makes this <img> tag full-width, so it renders just like a GatsbyImage.
   * This is only required if you don't want the image to "change its size" when refreshing the
   * page after placing it.
   */
  WithFullWidthImage: ElementToken,
  /**
   * Token which recomposes the Base image as Plain Image.
   */
  Plain: ElementToken,
  /**
   * Token which recomposes the Default image as a BlurUp Image.
   *
   * #### Customizing:
   *
   * @example Override and have all Default Images be non-gatsby plain images via shadowing
   * ```js
   * import { vitalImageBase } from '@bodiless/vital-image';
   *
   * const Default = asImageToken(vitalImageBase.Plain);
   *
   * export default {
   *   ...vitalImageBase,
   *   Default,
   * };
   * ```
   *
   */
  Default: ElementToken,
  /**
   * Token which recomposes the base image as Traced Image.
   */
  EditableTraced: ElementToken,
  /**
   * Token which recomposes the base image as NoEffect Image.
   */
  EditableNoEffect: ElementToken,
  /**
   * Composable Token which adds the `loading: eager` property for performance.
   */
  WithEager: ElementToken,
  /**
   * Composed Token token that defines some defaults for the Hero Image.
   * - Default (Gatsby Fluid WebP)
   * - WithEager
   * - WithLandscapePlaceholder
   * - withFullWidthImage
   *
   * #### Customizing:
   *
   * @example Extends the HERO Images to be a link hero image via shadowing.
   * ```js
   * import { vitalImageBase } from '@bodiless/vital-image';
   *
   * const Hero = asImageToken(vitalImageBase.Hero, {
   *   Compose: {
   *     _: vitalImageBase.WithLink,
   *   },
   * });
   *
   * export default {
   *   ...vitalImageBase,
   *   Hero,
   * };
   * ```
   */
  Hero: ElementToken,
}

/**
 * Tokens for Vital Image
 *
 * @category Token Collection
 * @see [[VitalImage]]
 */
const vitalImage: VitalImage = {
  Base,
  Plain,
  Default,
  WithEditorPlain,
  WithEditorBlurUp,
  WithEditorTraced,
  WithEditorNoEffect,
  EditableTraced,
  EditableNoEffect,
  WithLandscapePlaceholder,
  WithLink,
  WithFullWidthImage,
  WithEager,
  Hero,
};

export default vitalImage;
