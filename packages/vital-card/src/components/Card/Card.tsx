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

import React, { FC, ComponentType, HTMLProps } from 'react';
import flow from 'lodash/flow';
import {
  designable,
  DesignableComponentsProps,
  Div,
  A,
  Img,
  StylableProps,
  DesignableProps,
  Fragment,
} from '@bodiless/fclasses';
import { withNode } from '@bodiless/core';
import { asCxTokenSpec } from '@bodiless/cx-elements';

export type CardComponents = {
  CardWrapper: ComponentType<StylableProps>,
  ImageWrapper: ComponentType<StylableProps>,
  ImageLink: ComponentType<StylableProps>,
  Image: ComponentType<StylableProps>,
  EyebrowWrapper: ComponentType<StylableProps>,
  Eyebrow: ComponentType<StylableProps>,
  ContentWrapper: ComponentType<StylableProps>,
  TitleWrapper: ComponentType<StylableProps>,
  Title: ComponentType<StylableProps>,
  DescriptionWrapper: ComponentType<StylableProps>,
  Description: ComponentType<StylableProps>,
  RatingWrapper: ComponentType<StylableProps>,
  Rating: ComponentType<StylableProps>,
  CTAWrapper: ComponentType<StylableProps>,
  CTA: ComponentType<StylableProps>,
};
const cardComponentStart: CardComponents = {
  CardWrapper: Div,
  ImageWrapper: Fragment,
  ImageLink: Fragment,
  Image: Img,
  EyebrowWrapper: Fragment,
  Eyebrow: Fragment,
  ContentWrapper: Fragment,
  TitleWrapper: Fragment,
  Title: Fragment,
  Description: Fragment,
  DescriptionWrapper: Fragment,
  Rating: Fragment,
  RatingWrapper: Fragment,
  CTA: A,
  CTAWrapper: A,
};

export type CardProps = DesignableProps<CardComponents> & HTMLProps<HTMLElement>;
type CardBaseProps = DesignableComponentsProps<CardComponents> & HTMLProps<HTMLElement>;

const CardBase: FC<CardBaseProps> = ({ components, ...rest }) => {
  const {
    CardWrapper,
    ImageWrapper,
    Image,
    ImageLink,
    ContentWrapper,
    TitleWrapper,
    Title,
    DescriptionWrapper,
    Description,
    RatingWrapper,
    Rating,
    CTAWrapper,
    CTA,
  } = components;

  return (
    <CardWrapper {...rest}>
      <ImageWrapper>
        <ImageLink>
          <Image />
        </ImageLink>
      </ImageWrapper>
      <ContentWrapper>
        <TitleWrapper>
          <Title />
        </TitleWrapper>
        <DescriptionWrapper>
          <Description />
        </DescriptionWrapper>
        <RatingWrapper>
          <Rating />
        </RatingWrapper>
        <CTAWrapper>
          <CTA />
        </CTAWrapper>
      </ContentWrapper>
    </CardWrapper>
  );
};

const CardClean = flow(
  designable(cardComponentStart, 'Card'),
  withNode,
)(CardBase);

const asCardToken = asCxTokenSpec<CardComponents>();

export { CardClean, asCardToken };
