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
  flowHoc, replaceWith, as, Div, H2, withProps
} from '@bodiless/fclasses';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
import { vitalTypography } from '@bodiless/vital-elements';
import { CardStatic, vitalCardStatic } from '@bodiless/vital-card';

const Subtitle = as(vitalTypography.H2, 'pt-4')(H2);

const withTestId = (testId: string) => withProps({ 'data-testid': testId })

/**
 * Default Card component.
 */
const DefaultCard = as(
  vitalCardStatic.Default,
  withNodeKey('default-card'),
  withTestId('default-card'),
)(CardStatic);

/**
 * Vertical Card component.
 */
const VerticalCard = as(
  vitalCardStatic.Default,
  vitalCardStatic.WithVerticalOrientation,
  withNodeKey('vertical-card'),
  withTestId('vertical-card'),
)(CardStatic);

const HorizontalLeftCard = as(
  vitalCardStatic.Default,
  vitalCardStatic.WithHorizontalLeftOrientation,
  vitalCardStatic.WithHorizontalContentAtTop,
  withNodeKey('horizontal-left-card'),
  withTestId('horizontal-left-card'),
)(CardStatic);
const HorizontalLeftImageCenteredContentCard = as(
  vitalCardStatic.Default,
  vitalCardStatic.WithHorizontalLeftOrientation,
  vitalCardStatic.WithHorizontalContentCentered,
  withNodeKey('horizontal-left-centered-card'),
  withTestId('horizontal-left-centered-card'),
)(CardStatic);
const HorizontalRightCard = as(
  vitalCardStatic.Default,
  vitalCardStatic.WithHorizontalRightOrientation,
  vitalCardStatic.WithHorizontalContentAtTop,
  withNodeKey('horizontal-right-card'),
  withTestId('horizontal-right-card'),
)(CardStatic);
const HorizontalRightImageCenteredContentCard = as(
  vitalCardStatic.Default,
  vitalCardStatic.WithHorizontalRightOrientation,
  vitalCardStatic.WithHorizontalContentCentered,
  withNodeKey('horizontal-right-centered-card'),
  withTestId('horizontal-right-centered-card'),
)(CardStatic);

const HeroCard = as(
  vitalCardStatic.Hero,
  withNodeKey('hero-card'),
  withTestId('hero-card'),
)(CardStatic);
const HeroPrimaryButtonCard = as(
  vitalCardStatic.Hero,
  vitalCardStatic.WithPrimaryButton,
  withNodeKey('hero-card-primary-button'),
  withTestId('hero-card-primary-button'),
)(CardStatic);
const HeroSecondaryButtonCard = as(
  vitalCardStatic.Hero,
  vitalCardStatic.WithSecondaryButton,
  withNodeKey('hero-card-secondary-button'),
  withTestId('hero-card-secondary-button'),
)(CardStatic);

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
