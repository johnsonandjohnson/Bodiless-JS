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
  ifEditable,
  ifToggledOn,
  withActivatorWrapper,
} from '@bodiless/core';
import type {
  FluidObject,
  FixedObject,
  GatsbyImageOptionalProps,
} from 'gatsby-image';
import { addClasses, Div } from '@bodiless/fclasses';
import { flow } from 'lodash';

type ImageProps = {
  src: string;
  alt: string;
  title: string;
};

export type GasbyImageProps = ImageProps & {
  preset: string;
  gatsbyImg?: { fluid: FluidObject | FluidObject[] } | { fixed: FixedObject | FixedObject[] };
} & GatsbyImageOptionalProps;

const isGatsbyImage = ({ gatsbyImg }: GasbyImageProps) => gatsbyImg !== undefined;

const asGatsbyImage$ = (Component: CT<any>) => {
  const AsGatsbyImage = (props: GasbyImageProps) => {
    const { gatsbyImg, preset, ...rest } = props;
    if (gatsbyImg !== undefined) {
      return (
        <GatsbyImg {...rest} {...gatsbyImg} />
      );
    }
    return (
      <Component {...rest} />
    );
  };
  return AsGatsbyImage;
};

const withActivatorWrapperDefaultStyles = addClasses('bl-w-full');

/**
 * @deprecated in favor of asDesignableGatsbyImage
 */
const asGatsbyImage = flow(
  asGatsbyImage$,
  ifEditable(
    ifToggledOn(isGatsbyImage)(
      withActivatorWrapper(
        'onClick',
        withActivatorWrapperDefaultStyles(Div),
      ),
    ),
  ),
);

export default asGatsbyImage;
export { isGatsbyImage };
