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
import { flowRight } from 'lodash';
import { useEditContext } from '@bodiless/core';
import {
  Div,
  Img,
} from '@bodiless/fclasses';
import { asBodilessImage } from '@bodiless/components-ui';

type ImageProps = {
  src: string;
  alt: string;
};

type GasbyImageProps = ImageProps & {
  gatsbyImg?: any;
};

const GatsbyImgEditWrapper = (props: ImageProps) => {
  const { src, alt, ...rest } = props;
  return (
    <Div {...rest} />
  );
};

const GatsbyImgStaticWrapper: CT<ImageProps> = ({ children }) => <>{children}</>;

const asGatsbyImage = (Component: CT<any>) => {
  const AsGatsbyImage = (props: GasbyImageProps) => {
    const { isEdit } = useEditContext();
    const { gatsbyImg, ...rest } = props;
    const Wrapper = isEdit ? GatsbyImgEditWrapper : GatsbyImgStaticWrapper;
    if (gatsbyImg !== undefined) {
      return (
        <Wrapper {...rest}>
          <GatsbyImg fluid={gatsbyImg} />
        </Wrapper>
      );
    }
    return (
      <Component {...rest} />
    );
  };
  return AsGatsbyImage;
};

const GatsbyImage = flowRight(
  asBodilessImage(),
  asGatsbyImage,
)(Img);

export default asGatsbyImage;
export { GatsbyImage };
