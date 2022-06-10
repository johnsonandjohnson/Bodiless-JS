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

import React from 'react';
import { withNodeKey } from '@bodiless/core';
import {
  flowHoc, replaceWith, as, Div, H2
} from '@bodiless/fclasses';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
import { vitalTypography } from '@bodiless/vital-elements';
import { CardClean, vitalCard } from '@bodiless/vital-card';

const Subtitle = as(vitalTypography.H2, 'pt-4')(H2);

/**
 * Default Card component.
 */
const DefaultCard = as(
  vitalCard.Default,
  withNodeKey('default-card'),
)(CardClean);

/**
 * Vertical Card component.
 */
const VerticalCard = as(
  vitalCard.Default,
  vitalCard.WithVerticalOrientation,
  withNodeKey('vertical-card'),
)(CardClean);

const HorizontalLeftCard = as(
  vitalCard.Default,
  vitalCard.WithHorizontalLeftOrientation,
  vitalCard.WithHorizontalContentAtTop,
  withNodeKey('horizontal-left-card'),
)(CardClean);
const HorizontalLeftImageCenteredContentCard = as(
  vitalCard.Default,
  vitalCard.WithHorizontalLeftOrientation,
  vitalCard.WithHorizontalContentCentered,
  withNodeKey('horizontal-left-centered-card'),
)(CardClean);
const HorizontalRightCard = as(
  vitalCard.Default,
  vitalCard.WithHorizontalRightOrientation,
  vitalCard.WithHorizontalContentAtTop,
  withNodeKey('horizontal-right-card'),
)(CardClean);
const HorizontalRightImageCenteredContentCard = as(
  vitalCard.Default,
  vitalCard.WithHorizontalRightOrientation,
  vitalCard.WithHorizontalContentCentered,
  withNodeKey('horizontal-right-centered-card'),
)(CardClean);

const HeroCard = as(
  vitalCard.Hero,
  withNodeKey('hero-card'),
)(CardClean);
const HeroPrimaryButtonCard = as(
  vitalCard.Hero,
  vitalCard.WithPrimaryButton,
  withNodeKey('hero-card-primary-button'),
)(CardClean);
const HeroSecondaryButtonCard = as(
  vitalCard.Hero,
  vitalCard.WithSecondaryButton,
  withNodeKey('hero-card-secondary-button'),
)(CardClean);

const CardVariations = (props: any) => (
  <>
    <Div className="md:w-1/3 mb-8">
      <Subtitle>Default Card</Subtitle>
      <DefaultCard />
      <Subtitle>Vertical Card</Subtitle>
      <VerticalCard />
    </Div>
    <Subtitle>Horizontal Card Variations</Subtitle>
    <Div className="md:w-1/2 mb-8">
      <Subtitle>Left Image : Content Top Aligned </Subtitle>
      <HorizontalLeftCard />
      <Subtitle>Left Image : Content Centered</Subtitle>
      <HorizontalLeftImageCenteredContentCard />
      <Subtitle>Right Image : Content Top Aligned </Subtitle>
      <HorizontalRightCard />
      <Subtitle>Right Image : Content Centered</Subtitle>
      <HorizontalRightImageCenteredContentCard />
    </Div>
    <Div className="mb-8">
      <Subtitle>Hero Card</Subtitle>
      <HeroCard />
      <Subtitle>Hero Card with Primary Button</Subtitle>
      <HeroPrimaryButtonCard />
      <Subtitle>Hero Card with Secondary Button</Subtitle>
      <HeroSecondaryButtonCard />
    </Div>
  </>
);

export const Card = asStyleGuideTemplateToken(vitalStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('Card'),
  Content: {
    Title: replaceWith(() => <>Card</>),
    Examples: replaceWith(CardVariations),
  },
});
