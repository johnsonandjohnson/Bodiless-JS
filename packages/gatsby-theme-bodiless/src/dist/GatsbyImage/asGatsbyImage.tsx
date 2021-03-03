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
import type {
  FluidObject,
  FixedObject,
  GatsbyImageOptionalProps,
} from 'gatsby-image';
import {
  addClasses, DesignableComponentsProps, Div, extendDesignable, withDesign, withoutProps,
} from '@bodiless/fclasses';
import flow from 'lodash/flow';
import omit from 'lodash/omit';

type Components = {
  GatsbyImage: CT<any>,
  Image: CT<any>,
};

export type GasbyImageProps = HTMLProps<HTMLImageElement> & {
  preset: string;
  publicUrl?: string;
  gatsbyImg?: { fluid: FluidObject | FluidObject[] } | { fixed: FixedObject | FixedObject[] };
} & GatsbyImageOptionalProps & DesignableComponentsProps<Components>;

const asDesignableGatsbyImage = (Component: CT<any>) => {
  const startComponents: Components = {
    GatsbyImage: GatsbyImg,
    Image: Component,
  };
  const AsDesignableGatsbyImage = (props: GasbyImageProps) => {
    const {
      components, gatsbyImg, preset, publicUrl, src, ...rest
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
    const publicUrl$ = publicUrl || src;
    return (
      <Image {...rest} src={publicUrl$} />
    );
  };
  const applyDesign = extendDesignable(design => omit(design, ['GatsbyImage', 'Image']));
  return applyDesign(startComponents, 'GatsbyImage')(AsDesignableGatsbyImage);
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
  'publicUrl',
  'gatsbyImg',
]);

export default asGatsbyImage;
