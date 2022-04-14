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
  withNode,
  withParent,
} from '@bodiless/core';
import {
  GatsbyImagePresets,
  withoutGatsbyImageProps,
  asGatsbyImage,
  withGatsbyImageLogger,
  withGatsbyImageNode,
} from '@bodiless/gatsby-theme-bodiless';
import {
  flowHoc,
  stylable,
  addProps,
  A,
  extendMeta,
  as,
} from '@bodiless/fclasses';
import { withImagePlaceholder } from '@bodiless/components';
import { asBodilessLink, asBodilessImage } from '@bodiless/components-ui';
import { asElementToken } from '@bodiless/vital-elements';
import { withoutHydration } from '@bodiless/hydration';

// @ts-ignore Cannot find module
import landscapeImage from '../../../../assets/landscape_image.png';

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

/**
 * Token which creates the VitalDS base Image.
 */
const Base = asElementToken({
  Core: {
    _: as(
      asGatsbyImage,
      stylable,
      withGatsbyImageLogger(),
      withoutHydration(),
    ),
  },
  Meta: flowHoc.meta.term('Type')('Image'),
});

/**
 * Token which apply the Plain image.
 */
const WithEditorPlain = asElementToken({
  Editors: {
    _: asBodilessImage(),
  },
  Behavior: {
    _: as(
      withNode,
      withoutGatsbyImageProps,
    ),
  },
  Meta: flowHoc.meta.term('Optimization')('Plain'),
});

/**
 * Token which apply the BlurUp Effect.
 */
const WithEditorBlurUp = asElementToken({
  Editors: {
    _: asBodilessImage(),
  },
  Behavior: {
    _: withGatsbyImageNode(GatsbyImagePresets.FluidWithWebp),
  },
  Meta: extendMeta(
    flowHoc.meta.term('Optimization')('Optimized'),
    flowHoc.meta.term('Effect')('BlurUp'),
  ),
  Layout: {
    _: addProps(objectFitCoverProps),
  },
});

/**
 * Token which apply the Traced Effect.
 */
const WithEditorTraced = asElementToken({
  Editors: {
    _: asBodilessImage(),
  },
  Behavior: {
    _: withGatsbyImageNode(GatsbyImagePresets.FluidWithWebpTracedSVG),
  },
  Meta: extendMeta(
    flowHoc.meta.term('Optimization')('Optimized'),
    flowHoc.meta.term('Effect')('Traced'),
  ),
  Layout: {
    _: addProps(objectFitContainProps),
  },
});

/**
 * Token which apply NoEffect.
 */
const WithEditorNoEffect = asElementToken({
  Editors: {
    _: asBodilessImage(),
  },
  Behavior: {
    _: withGatsbyImageNode(GatsbyImagePresets.FluidWithWebpNoBase64),
  },
  Meta: extendMeta(
    flowHoc.meta.term('Optimization')('Optimized'),
    flowHoc.meta.term('Effect')('No Effect'),
  ),
  Layout: {
    _: addProps(objectFitContainProps),
  },
});

/**
 * Token which apply a Landscape Placeholder.
 */
const WithLandscapePlaceholder = asElementToken({
  Content: {
    _: withImagePlaceholder({ src: landscapeImage }),
  },
  Meta: extendMeta(flowHoc.meta.term('Placeholder')('Landscape')),
});

const LinkBase = asBodilessLink('link')(A);

/**
 * Token which wrap the image in a link.
 */
const WithLink = asElementToken({
  Core: {
    _: withParent(LinkBase, 'ImageLink'),
  },
  Meta: flowHoc.meta.term('Link')('With Link'),
});

/**
 * Token which recompose the base image as Plain Image.
*/
const EditablePlain = asElementToken(Base, WithEditorPlain);

/**
* Token which recompose the base image as BlurUp Image.
*/
const Default = asElementToken(Base, WithEditorBlurUp);

/**
* Token which recompose the base image as Traced Image.
*/
const EditableTraced = asElementToken(Base, WithEditorTraced);

/**
* Token which recompose the base image as NoEffect Image.
*/
const EditableNoEffect = asElementToken(Base, WithEditorNoEffect);

const WithEager = asElementToken({
  Core: {
    _: addProps({ loading: 'eager'}),
  },
});

export default {
  Base,
  Plain: EditablePlain,
  Default,
  WithEditorPlain,
  WithEditorBlurUp,
  WithEditorTraced,
  WithEditorNoEffect,
  EditableTraced,
  EditableNoEffect,
  WithLandscapePlaceholder,
  WithLink,
  WithEager,
};
