/**
 * Copyright © 2021 Johnson & Johnson
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
import React, { FC, ComponentType, HTMLProps } from 'react';
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
  addProps,
  DesignableProps,
} from '@bodiless/fclasses';
import { withNode } from '@bodiless/core';

export type CardComponents = {
  Wrapper: ComponentType<StylableProps>,
  ImageWrapper: ComponentType<StylableProps>,
  ImageLink: ComponentType<StylableProps>,
  Image: ComponentType<StylableProps>,
  ContentWrapper: ComponentType<StylableProps>,
  Title: ComponentType<StylableProps>,
  Body: ComponentType<StylableProps>,
  Link: ComponentType<StylableProps>,
};
const cardComponentStart:CardComponents = {
  Wrapper: Div,
  ImageWrapper: Div,
  ImageLink: A,
  Image: Img,
  ContentWrapper: Div,
  Title: H2,
  Body: Div,
  Link: A,
};

export type CardProps = DesignableProps<CardComponents> & HTMLProps<HTMLElement>;
type CardBaseProps = DesignableComponentsProps<CardComponents> & HTMLProps<HTMLElement>;

const CardBase: FC<CardBaseProps> = ({ components, ...rest }) => {
  const {
    Wrapper,
    ImageWrapper,
    Image,
    ImageLink,
    ContentWrapper,
    Title,
    Body,
    Link,
  } = components;

  return (
    <Wrapper {...rest}>
      <ImageWrapper>
        <ImageLink>
          <Image />
        </ImageLink>
      </ImageWrapper>
      <ContentWrapper>
        <Title />
        <Body />
        <Link />
      </ContentWrapper>
    </Wrapper>
  );
};

const CardClean = flow(
  designable(cardComponentStart, 'Card'),
  withNode,
)(CardBase);

/**
 * Adds data- identifiers to help select card elements in automated tests.
 *
 * @param id The id attribute to apply to the outer wrapper.
 */
const asTestableCard = withDesign({
  Wrapper: addProps({ 'data-card-element': 'wrapper' }),
  ImageWrapper: addProps({ 'data-card-element': 'image-wrapper' }),
  Image: addProps({ 'data-card-element': 'image' }),
  ImageLink: addProps({ 'data-card-element': 'image-link' }),
  ContentWrapper: addProps({ 'data-card-element': 'content-wrapper' }),
  Title: addProps({ 'data-card-element': 'title' }),
  Body: addProps({ 'data-card-element': 'body' }),
  Link: addProps({ 'data-card-element': 'link' }),
});

export {
  CardClean,
  asTestableCard,
};
