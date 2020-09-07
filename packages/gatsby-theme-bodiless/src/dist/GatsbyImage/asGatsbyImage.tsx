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
import type { GatsbyImageProps } from 'gatsby-image';
import { Div } from '@bodiless/fclasses';

type ImageProps = {
  src: string;
  alt: string;
};

type GasbyImageProps = ImageProps & {
  preset: string;
  gatsbyImg?: GatsbyImageProps;
};

const GatsbyImgWrapper = (props: ImageProps) => {
  const { src, alt, ...rest } = props;
  return (
    <Div {...rest} />
  );
};

const asGatsbyImage = (Component: CT<any>) => {
  const AsGatsbyImage = (props: GasbyImageProps) => {
    const { gatsbyImg, preset, ...rest } = props;
    if (gatsbyImg !== undefined) {
      return (
        <GatsbyImgWrapper {...rest}>
          <GatsbyImg {...gatsbyImg} />
        </GatsbyImgWrapper>
      );
    }
    return (
      <Component {...rest} />
    );
  };
  return AsGatsbyImage;
};

export default asGatsbyImage;
