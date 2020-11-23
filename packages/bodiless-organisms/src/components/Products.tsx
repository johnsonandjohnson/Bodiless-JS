/**
 * Copyright © 2019 Johnson & Johnson
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

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, ComponentType } from 'react';
import { flow } from 'lodash';
import {
  withDesign,
  designable,
  DesignableComponentsProps,
  Div,
  A,
  Img,
  H2,
  StylableProps,
  HOC,
} from '@bodiless/fclasses';
import {
  asBodilessLink,
  asEditable,
} from '@bodiless/components';
import { asBodilessImage } from '@bodiless/components-ui';
import { withNode } from '@bodiless/core';
import { BVInlineRatings } from '@bodiless/bv';

export type ProductComponents = {
  Wrapper: ComponentType<StylableProps>,
  ImageWrapper: ComponentType<StylableProps>,
  ImageLink: ComponentType<StylableProps>,
  Image: ComponentType<StylableProps>,
  ContentWrapper: ComponentType<StylableProps>,
  TitleLink: ComponentType<StylableProps>,
  Title: ComponentType<StylableProps>,
  BvReviewLink: ComponentType<StylableProps>,
  BvReview: ComponentType<StylableProps>,
  Body: ComponentType<StylableProps>,
};
const ProductComponentStart:ProductComponents = {
  Wrapper: Div,
  ImageWrapper: Div,
  ImageLink: A,
  Image: Img,
  ContentWrapper: Div,
  TitleLink: A,
  Title: H2,
  BvReviewLink: A,
  BvReview: Div,
  Body: Div,
};

type Props = DesignableComponentsProps<ProductComponents> & { };

const ProductBase: FC<Props> = ({ components }) => {
  const {
    Wrapper,
    ImageWrapper,
    Image,
    ImageLink,
    ContentWrapper,
    TitleLink,
    Title,
    BvReview,
    BvReviewLink,
    Body,
  } = components;

  return (
    <Wrapper>
      <ImageWrapper>
        <ImageLink>
          <Image />
        </ImageLink>
      </ImageWrapper>
      <ContentWrapper>
        <TitleLink>
          <Title />
        </TitleLink>
        <BvReviewLink>
          <BvReview />
        </BvReviewLink>
        <Body />
      </ContentWrapper>
    </Wrapper>
  );
};

const ProductClean = flow(
  designable(ProductComponentStart, 'Product'),
  withNode,
)(ProductBase);

const asEditableProduct = withDesign<ProductComponents>({
  Image: asBodilessImage('image') as HOC,
  ImageLink: asBodilessLink('cta') as HOC,
  TitleLink: asBodilessLink('cta') as HOC,
  Title: asEditable('title', 'Product Title Text'),
  BvReviewLink: asBodilessLink('cta') as HOC,
  BvReview: () => BVInlineRatings,
  Body: asEditable('body', 'Product Body Text'),
});

const Product = asEditableProduct(ProductClean);

export default Product;
export {
  Product,
  ProductClean,
  asEditableProduct,
};
