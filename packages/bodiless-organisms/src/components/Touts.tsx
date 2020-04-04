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
  stylable,
} from '@bodiless/fclasses';
import {
  asBodilessImage,
  asBodilessLink,
  asEditable,
  TextLink,
} from '@bodiless/components';
import { withNode, withNodeKey } from '@bodiless/core';

export type ToutComponents = {
  Wrapper: ComponentType<StylableProps>,
  ImageWrapper: ComponentType<StylableProps>,
  ImageLink: ComponentType<StylableProps>,
  Image: ComponentType<StylableProps>,
  ContentWrapper: ComponentType<StylableProps>,
  Title: ComponentType<StylableProps>,
  Body: ComponentType<StylableProps>,
  Link: ComponentType<StylableProps>,
};
const toutComponentStart:ToutComponents = {
  Wrapper: Div,
  ImageWrapper: Div,
  ImageLink: A,
  Image: Img,
  ContentWrapper: Div,
  Title: H2,
  Body: Div,
  // @ts-ignore ToDo: resolve types
  Link: stylable(TextLink),
};

type Props = DesignableComponentsProps<ToutComponents> & HTMLProps<HTMLElement>;

const ToutBase: FC<Props> = ({ components, ...rest }) => {
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

const ToutClean = flow(
  designable(toutComponentStart),
  withNode,
)(ToutBase);

const withToutNodeKeys = withDesign({
  Image: withNodeKey('image'),
  ImageLink: withNodeKey('cta'),
  Title: withNodeKey('title'),
  Link: flow(
    withDesign({
      Link: withNodeKey('cta'),
      Content: withNodeKey('text'),
    }),
  ),
  Body: withNodeKey('body'),
});

const asEditableTout = withDesign({
  Image: asBodilessImage('image'),
  ImageLink: asBodilessLink('cta'),
  Title: asEditable('title', 'Tout Title Text'),
  Link: flow(
    asBodilessLink('cta'),
    asEditable('ctaText', 'Tout Button Text'),
  ),
  Body: asEditable('body', 'Tout Body Text'),
});
const Tout = asEditableTout(ToutClean);

/**
 * Adds data- identifiers to help select tout elements in automated tests.
 *
 * @param id The id attribute to apply to the outer wrapper.
 */
const asTestableTout = withDesign({
  Wrapper: addProps({ 'data-tout-element': 'wrapper' }),
  ImageWrapper: addProps({ 'data-tout-element': 'image-wrapper' }),
  Image: addProps({ 'data-tout-element': 'image' }),
  ImageLink: addProps({ 'data-tout-element': 'image-link' }),
  ContentWrapper: addProps({ 'data-tout-element': 'content-wrapper' }),
  Title: addProps({ 'data-tout-element': 'title' }),
  Body: addProps({ 'data-tout-element': 'body' }),
  Link: addProps({ 'data-tout-element': 'link' }),
});

export default Tout;
export {
  Tout,
  ToutClean,
  withToutNodeKeys,
  asEditableTout,
  asTestableTout,
};
