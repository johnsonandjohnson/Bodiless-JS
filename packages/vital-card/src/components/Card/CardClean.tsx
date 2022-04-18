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
  H2,
  StylableProps,
  DesignableProps,
  Fragment,
  as,
} from '@bodiless/fclasses';
import { withNode } from '@bodiless/core';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { EditorPlainClean } from '@bodiless/vital-editors';
import { LinkClean } from '@bodiless/vital-link';

export type CardComponents = {
  Wrapper: ComponentType<StylableProps>,
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
  CTALink: ComponentType<StylableProps>,
  CTAText: ComponentType<StylableProps>,
};

const cardComponentStart: CardComponents = {
  Wrapper: A,
  ImageLink: A,
  Image: Img,
  EyebrowWrapper: Fragment,
  // @todo: use EditorPlainClean without as throws ts type error.
  Eyebrow: as()(EditorPlainClean),
  ContentWrapper: Div,
  TitleWrapper: H2,
  Title: Fragment,
  DescriptionWrapper: Fragment,
  Description: Div,
  Rating: Fragment,
  RatingWrapper: Fragment,
  // @todo: EditorPlainClean or RichTextClean?
  CTAText: as()(EditorPlainClean),
  // @todo: use LinkClean without as throws ts type error.
  CTALink: as()(LinkClean),
  CTAWrapper: Div,
};

export type CardProps = DesignableProps<CardComponents> & HTMLProps<HTMLElement>;
type CardBaseProps = DesignableComponentsProps<CardComponents> & HTMLProps<HTMLElement>;

const CardBase: FC<CardBaseProps> = ({ components, ...rest }) => {
  const {
    Wrapper,
    Image,
    ImageLink,
    ContentWrapper,
    EyebrowWrapper,
    Eyebrow,
    TitleWrapper,
    Title,
    DescriptionWrapper,
    Description,
    RatingWrapper,
    Rating,
    CTAWrapper,
    CTALink,
    CTAText,
  } = components;

  return (
    <Wrapper {...rest}>
      <ImageLink>
        <Image />
      </ImageLink>
      <ContentWrapper>
        <EyebrowWrapper>
          <Eyebrow />
        </EyebrowWrapper>
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
          <CTALink>
            <CTAText />
          </CTALink>
        </CTAWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

const CardClean = flow(
  designable(cardComponentStart, 'Card'),
  withNode,
)(CardBase);

const asCardToken = asVitalTokenSpec<CardComponents>();

export default CardClean;
export { CardClean, asCardToken };
