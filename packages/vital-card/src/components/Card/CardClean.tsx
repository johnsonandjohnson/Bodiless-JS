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
import {
  designable,
  DesignableComponents,
  DesignableComponentsProps,
  Div,
  A,
  Img,
  H3,
  StylableProps,
  DesignableProps,
  Fragment,
  as,
} from '@bodiless/fclasses';
import { withNode } from '@bodiless/data';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { LinkClean } from '@bodiless/vital-link';
import { withoutHydration } from '@bodiless/hydration';

/**
 * Design keys available for the vital card.
 *
 * @category Component
 */
export interface CardComponents extends DesignableComponents {
  /**
   * The outer wrapper of the card.  By default this is A to make entire card clickable.
   */
  Wrapper: ComponentType<StylableProps>,
  /**
   * A wrapper to style the Image. By default is a Div.
   */
  ImageWrapper: ComponentType<StylableProps>,
  /**
   * The image. By Default this is Img.
   */
  Image: ComponentType<StylableProps>,
  /**
   * A wrapper to style the Eyebrow. By default is a Div.
   */
  EyebrowWrapper: ComponentType<StylableProps>,
  /**
   * A wrapper to style the Description. By default is a Div.
   */
  Eyebrow: ComponentType<StylableProps>,
  /**
   * The eyebrow text of the card.  By default this is a plain editor.
   */
  ContentWrapper: ComponentType<StylableProps>,
  /**
   * A wrapper to style the Title. By default is a H3.
   */
  TitleWrapper: ComponentType<StylableProps>,
  /**
   * The text title of the card.  By default this a plain editor.
   */
  Title: ComponentType<StylableProps>,
  /**
   * A wrapper to style the subtitle. By default is a H3.
   */
  SubtitleWrapper: ComponentType<StylableProps>,
  /**
   * The text subtitle of the card.  By default this a plain editor.
   */
  Subtitle: ComponentType<StylableProps>,
  /**
   * A wrapper to style the Description. By default is a Fragment.
   */
  DescriptionWrapper: ComponentType<StylableProps>,
  /**
   * The text body or description of the card.  Recommended: a plain rich text editor.
   */
  Description: ComponentType<StylableProps>,
  /**
   * A wrapper to style the Rating. By default is a Fragment.
   */
  RatingWrapper: ComponentType<StylableProps>,
  /**
   * A slot to render the rating.  By default this is a Fragment.
   */
  Rating: ComponentType<StylableProps>,
  /**
   * A wrapper to style the CTA. By default is a Div.
   */
  CTAWrapper: ComponentType<StylableProps>,
  /**
   * The cta link.  By default is vital linkclean.
   */
  CTALink: ComponentType<StylableProps>,
  /**
   * The text of link.  Recommended: a plain editor.
   */
  CTAText: ComponentType<StylableProps>,
}

export const cardComponentStart: CardComponents = {
  Wrapper: A,
  ImageWrapper: Div,
  Image: Img,
  EyebrowWrapper: Div,
  Eyebrow: Fragment,
  ContentWrapper: Div,
  TitleWrapper: H3,
  Title: Fragment,
  SubtitleWrapper: Fragment,
  Subtitle: Fragment,
  DescriptionWrapper: Fragment,
  Description: Div,
  Rating: Fragment,
  RatingWrapper: Fragment,
  CTAText: Fragment,
  // @todo: use LinkClean without as throws ts type error.
  CTALink: as()(LinkClean),
  CTAWrapper: Div,
};

export type CardProps = DesignableProps<CardComponents> & HTMLProps<HTMLElement>;
type CardBaseProps = DesignableComponentsProps<CardComponents> & HTMLProps<HTMLElement>;

export const CardBase: FC<CardBaseProps> = ({ components, ...rest }) => {
  const {
    Wrapper,
    Image,
    ImageWrapper,
    ContentWrapper,
    EyebrowWrapper,
    Eyebrow,
    TitleWrapper,
    Title,
    SubtitleWrapper,
    Subtitle,
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
      <ImageWrapper>
        <Image />
      </ImageWrapper>
      <ContentWrapper>
        <EyebrowWrapper>
          <Eyebrow />
        </EyebrowWrapper>
        <TitleWrapper>
          <Title />
        </TitleWrapper>
        <SubtitleWrapper>
          <Subtitle />
        </SubtitleWrapper>
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

/**
 * This is the base component for cards.
 *
 * @category Component
 *
 * @example
 * **Create a default card:**
 * ```
 * const DefaultCard = on(CardClean)(vitalCardStatic.Default)
 * ```
 * @example
 * **Create a custom card using a token defined in your package**
 * ```
 * const CustomCard = on(CardClean)(myBrandCard.Custom)
 * ```
 */
const CardClean = as(
  designable(cardComponentStart, 'Card'),
  withNode,
)(CardBase);

/**
 * A token modifier that respects the Card Compoments.
 *
 * @category Token Collection
 */
const asCardToken = asVitalTokenSpec<CardComponents>();

// These are used in definig the VitalCard interface.
const cardToken = asCardToken();
type CardToken = typeof cardToken;

const CardDescriptionPreview = () => <span className="bl-text-gray-800">Description</span>;

/**
 * Use this version of the card when all components are static.
 *
 * @category Component
 */
const CardStatic: ComponentType<CardProps> = withoutHydration()(CardClean);

export default CardClean;
export {
  asCardToken, CardDescriptionPreview, CardStatic
};
export type { CardToken };
