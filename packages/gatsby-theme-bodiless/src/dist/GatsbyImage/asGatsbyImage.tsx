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

import React, { ComponentType as CT, HTMLProps } from 'react';
import GatsbyImg from 'gatsby-image';
import {
  ifEditable,
  withActivatorWrapper,
} from '@bodiless/core';
import type { ImageData } from '@bodiless/components';
import type {
  FluidObject,
  FixedObject,
  GatsbyImageOptionalProps,
} from 'gatsby-image';
import {
  addClasses, DesignableComponentsProps, Div, withDesign, withoutProps, designable,
} from '@bodiless/fclasses';
import flow from 'lodash/flow';
import GatsbyImagePresets from './GatsbyImagePresets';

type Components = {
  GatsbyImage: CT<any>,
  Image: CT<any>,
};

export type GatsbyImageData = ImageData & {
  preset: GatsbyImagePresets;
  gatsbyImg?: { fluid: FluidObject | FluidObject[] } | { fixed: FixedObject | FixedObject[] };
};

export type GasbyImageProps = HTMLProps<HTMLImageElement>
& GatsbyImageData
& GatsbyImageOptionalProps & DesignableComponentsProps<Components>;

const asDesignableGatsbyImage = (Component: CT<any>) => {
  const startComponents: Components = {
    GatsbyImage: GatsbyImg,
    Image: Component,
  };
  const AsDesignableGatsbyImage = (props: GasbyImageProps) => {
    const {
      components, gatsbyImg, preset, ...rest
    } = props;
    const {
      GatsbyImage,
      Image,
    } = components;
    if (gatsbyImg !== undefined) {
      return (
        <GatsbyImage {...rest} {...gatsbyImg} />
      );
    }
    return (
      <Image {...rest} />
    );
  };
  return designable(startComponents, 'GatsbyImage')(AsDesignableGatsbyImage);
};

const withActivatorWrapperDefaultStyles = addClasses('bl-w-full');

const asGatsbyImage = flow(
  asDesignableGatsbyImage,
  withDesign({
    GatsbyImage: ifEditable(
      withActivatorWrapper(
        'onClick',
        withActivatorWrapperDefaultStyles(Div),
      ),
    ),
  }),
);

export const isGatsbyImage = ({ gatsbyImg }: GasbyImageProps) => gatsbyImg !== undefined;

/**
 * hoc to remove props configured for GatsbyImage in image data
 * and to remove props added during image gatsby nodes creation
 *
 * it can be useful for cases when an image is procesed by gatsby
 * but Gatsby Image is not enabled for the image
 */
export const withoutGatsbyImageProps = withoutProps([
  'preset',
  'gatsbyImg',
]);

export default asGatsbyImage;
