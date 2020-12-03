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

import React, { ComponentType as CT } from 'react';
import GatsbyImg from 'gatsby-image';
import {
  ifToggledOn,
  withActivatorWrapper,
} from '@bodiless/core';
import type {
  FluidObject,
  FixedObject,
  GatsbyImageOptionalProps,
} from 'gatsby-image';
import { Div } from '@bodiless/fclasses';
import { pick, flow } from 'lodash';

type ImageProps = {
  src: string;
  alt: string;
};

export type GasbyImageProps = ImageProps & {
  preset: string;
  gatsbyImg?: { fluid: FluidObject | FluidObject[] } | { fixed: FixedObject | FixedObject[] };
} & GatsbyImageOptionalProps;

// the list is taken from GatsbyImageOptionalProps interface
const GATSBY_IMG_PROPS = [
  'fadeIn',
  'durationFadeIn',
  'title',
  'alt',
  'className',
  'critical',
  'crossOrigin',
  'style',
  'imgStyle',
  'placeholderStyle',
  'placeholderClassName',
  'backgroundColor',
  'onLoad',
  'onError',
  'onStartLoad',
  'Tag',
  'itemProp',
  'loading',
  'draggable',
];

const isGatsbyImage = ({ gatsbyImg }: GasbyImageProps) => gatsbyImg !== undefined;

const asGatsbyImage$ = (Component: CT<any>) => {
  const AsGatsbyImage = (props: GasbyImageProps) => {
    const { gatsbyImg, preset, ...rest } = props;
    if (gatsbyImg !== undefined) {
      const gatsbyImgProps = pick(props, GATSBY_IMG_PROPS) as GatsbyImageOptionalProps;
      return (
        <GatsbyImg {...gatsbyImg} {...gatsbyImgProps} />
      );
    }
    return (
      <Component {...rest} />
    );
  };
  return AsGatsbyImage;
};

const asGatsbyImage = flow(
  asGatsbyImage$,
  ifToggledOn(isGatsbyImage)(withActivatorWrapper('onClick', Div)),
);

export default asGatsbyImage;
export { isGatsbyImage };
